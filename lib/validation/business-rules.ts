/**
 * Business Rules Validation Module
 *
 * Document-specific semantic and business logic validation.
 * Enforces domain rules that go beyond format checking.
 *
 * Key principles:
 * 1. Type-specific rules (INVOICE has different rules than RECEIPT)
 * 2. Semantic validation (totals must match, dates must be coherent)
 * 3. Business logic (gross - deductions = net, subtotal + tax = total)
 * 4. Required field enforcement per document type
 */

import { DocumentType } from '@prisma/client'
import type { ValidationIssue } from '@/lib/llm/types'
import { logger } from '@/lib/utils/logger'

/**
 * Business rule definition
 */
export interface BusinessRule {
  field: string
  check: (data: Record<string, unknown>) => boolean
  errorMessage: string
  severity: 'error' | 'warning' | 'info'
}

/**
 * Document type validation configuration
 */
export interface DocumentValidationConfig {
  requiredFields: string[]
  optionalFields: string[]
  businessRules: BusinessRule[]
}

/**
 * Validate extracted data against business rules for document type
 *
 * @param documentType - Type of document being validated
 * @param extractedData - Extracted data to validate
 * @returns Array of validation issues found
 */
export function validateBusinessRules(
  documentType: DocumentType,
  extractedData: Record<string, unknown>
): ValidationIssue[] {
  const config = getValidationConfig(documentType)
  const issues: ValidationIssue[] = []

  logger.info({ documentType, fieldCount: Object.keys(extractedData).length }, 'Running business rules validation')

  // Check required fields
  for (const requiredField of config.requiredFields) {
    const value = extractedData[requiredField]
    if (value === undefined || value === null || value === '') {
      issues.push({
        field: requiredField,
        issue: `Required field '${requiredField}' is missing`,
        severity: 'error',
        suggestedFix: `Please extract the ${requiredField} from the document`,
      })
    }
  }

  // Run business rules
  for (const rule of config.businessRules) {
    try {
      const isValid = rule.check(extractedData)
      if (!isValid) {
        issues.push({
          field: rule.field,
          issue: rule.errorMessage,
          severity: rule.severity,
        })
      }
    } catch (error) {
      logger.warn({ error, rule: rule.field }, 'Business rule check failed')
      issues.push({
        field: rule.field,
        issue: `Unable to validate: ${rule.errorMessage}`,
        severity: 'warning',
      })
    }
  }

  logger.info(
    {
      documentType,
      issuesFound: issues.length,
      errorCount: issues.filter((i) => i.severity === 'error').length,
      warningCount: issues.filter((i) => i.severity === 'warning').length,
    },
    'Business rules validation completed'
  )

  return issues
}

/**
 * Helper: Extract value from field (handles both simple values and nested {value, confidence} objects)
 */
function extractValue(field: unknown): unknown {
  if (field === null || field === undefined) {
    return null
  }

  // If it's an object with a 'value' property, extract it
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return (field as { value: unknown }).value
  }

  // Otherwise return as-is
  return field
}

/**
 * Helper: Extract numeric value from field
 */
function extractNumber(field: unknown): number {
  const value = extractValue(field)
  if (value === null || value === undefined) {
    return 0
  }
  return parseFloat(String(value))
}

/**
 * Helper: Extract string value from field
 */
function extractString(field: unknown): string {
  const value = extractValue(field)
  if (value === null || value === undefined) {
    return ''
  }
  return String(value)
}

/**
 * Get validation configuration for document type
 */
function getValidationConfig(documentType: DocumentType): DocumentValidationConfig {
  switch (documentType) {
    case 'INVOICE':
      return getInvoiceValidationConfig()
    case 'RECEIPT':
      return getReceiptValidationConfig()
    case 'PAYSLIP':
      return getPayslipValidationConfig()
    case 'BANK_STATEMENT':
      return getBankStatementValidationConfig()
    case 'TAX_FORM':
      return getTaxFormValidationConfig()
    case 'CONTRACT':
      return getContractValidationConfig()
    case 'OTHER':
      return getOtherValidationConfig()
    default:
      logger.warn({ documentType }, 'Unknown document type, using minimal validation')
      return getOtherValidationConfig()
  }
}

/**
 * INVOICE validation rules
 */
function getInvoiceValidationConfig(): DocumentValidationConfig {
  return {
    requiredFields: ['invoice_number', 'date', 'total', 'currency'],
    optionalFields: ['subtotal', 'tax', 'tax_rate', 'vendor', 'customer', 'line_items', 'due_date'],
    businessRules: [
      {
        field: 'total',
        check: (data) => {
          const total = extractNumber(data.total)
          return total > 0
        },
        errorMessage: 'Invoice total must be greater than zero',
        severity: 'error',
      },
      {
        field: 'date',
        check: (data) => {
          const dateStr = extractString(data.date)
          if (!dateStr) return false
          const invoiceDate = new Date(dateStr)
          const today = new Date()
          // Invoice date should not be in the future
          return invoiceDate <= today
        },
        errorMessage: 'Invoice date cannot be in the future',
        severity: 'error',
      },
      {
        field: 'total',
        check: (data) => {
          // If subtotal and tax are present, validate: subtotal + tax ≈ total
          const subtotal = extractNumber(data.subtotal)
          const tax = extractNumber(data.tax)
          const total = extractNumber(data.total)

          if (subtotal > 0 && tax >= 0) {
            const calculated = subtotal + tax
            const difference = Math.abs(calculated - total)
            const tolerance = 0.02 // 2 cents tolerance for rounding
            return difference <= tolerance
          }

          return true // Skip if subtotal/tax not present
        },
        errorMessage: 'Total does not match subtotal + tax (expected: subtotal + tax = total)',
        severity: 'error',
      },
      {
        field: 'due_date',
        check: (data) => {
          // If due_date is present, it should be >= invoice date
          const dateStr = extractString(data.date)
          const dueDateStr = extractString(data.due_date)

          if (!dueDateStr) return true // Optional field

          const invoiceDate = new Date(dateStr)
          const dueDate = new Date(dueDateStr)

          return dueDate >= invoiceDate
        },
        errorMessage: 'Due date must be on or after invoice date',
        severity: 'warning',
      },
      {
        field: 'invoice_number',
        check: (data) => {
          const invoiceNumber = extractString(data.invoice_number)
          return invoiceNumber.length > 0 && invoiceNumber.length < 100
        },
        errorMessage: 'Invoice number must be between 1 and 100 characters',
        severity: 'error',
      },
    ],
  }
}

/**
 * RECEIPT validation rules
 */
function getReceiptValidationConfig(): DocumentValidationConfig {
  return {
    requiredFields: ['merchant', 'total', 'date', 'currency'],
    optionalFields: ['payment_method', 'transaction_id', 'items', 'tax', 'tip'],
    businessRules: [
      {
        field: 'total',
        check: (data) => {
          const total = extractNumber(data.total)
          return total > 0
        },
        errorMessage: 'Receipt total must be greater than zero',
        severity: 'error',
      },
      {
        field: 'merchant',
        check: (data) => {
          const merchant = extractString(data.merchant)
          // Also check nested merchant.name if merchant is an object
          let merchantName = ''
          if (typeof data.merchant === 'object' && data.merchant !== null && 'name' in data.merchant) {
            merchantName = extractString((data.merchant as { name?: unknown }).name)
          }
          return merchant.length > 0 || merchantName.length > 0
        },
        errorMessage: 'Merchant name is required',
        severity: 'error',
      },
      {
        field: 'date',
        check: (data) => {
          const dateStr = extractString(data.date)
          if (!dateStr) return false
          const receiptDate = new Date(dateStr)
          const today = new Date()
          // Receipt date should not be in the future
          return receiptDate <= today
        },
        errorMessage: 'Receipt date cannot be in the future',
        severity: 'error',
      },
      {
        field: 'payment_method',
        check: (data) => {
          const paymentMethod = extractString(data.payment_method).toLowerCase()
          if (!paymentMethod) return true // Optional

          const validMethods = ['cash', 'card', 'credit', 'debit', 'mobile', 'online', 'check', 'other']
          return validMethods.some((method) => paymentMethod.includes(method))
        },
        errorMessage: 'Payment method should be one of: cash, card, credit, debit, mobile, online, check',
        severity: 'info',
      },
      {
        field: 'total',
        check: (data) => {
          // If tax and tip are present, check if they're reasonable (< total)
          const total = extractNumber(data.total)
          const tax = extractNumber(data.tax)
          const tip = extractNumber(data.tip)

          if (tax > 0 && tax >= total) return false
          if (tip > 0 && tip >= total) return false

          return true
        },
        errorMessage: 'Tax or tip amount seems unreasonably high (>= total)',
        severity: 'warning',
      },
    ],
  }
}

/**
 * PAYSLIP validation rules
 */
function getPayslipValidationConfig(): DocumentValidationConfig {
  return {
    requiredFields: ['employee_name', 'period', 'gross_salary', 'net_salary', 'currency'],
    optionalFields: ['employer', 'deductions', 'taxes', 'benefits', 'employee_id', 'payment_date'],
    businessRules: [
      {
        field: 'net_salary',
        check: (data) => {
          const grossSalary = extractNumber(data.gross_salary)
          const netSalary = extractNumber(data.net_salary)
          const deductions = extractNumber(data.deductions)

          // Net should be positive and less than gross
          if (netSalary <= 0) return false
          if (netSalary > grossSalary) return false

          // If deductions are present, check: gross - deductions ≈ net
          if (deductions > 0) {
            const calculated = grossSalary - deductions
            const difference = Math.abs(calculated - netSalary)
            const tolerance = 0.02 // 2 cents tolerance
            return difference <= tolerance
          }

          return true
        },
        errorMessage: 'Net salary calculation incorrect (expected: gross_salary - deductions = net_salary)',
        severity: 'error',
      },
      {
        field: 'gross_salary',
        check: (data) => {
          const grossSalary = extractNumber(data.gross_salary)
          return grossSalary > 0
        },
        errorMessage: 'Gross salary must be greater than zero',
        severity: 'error',
      },
      {
        field: 'period',
        check: (data) => {
          const period = String(data.period ?? '')
          return period.length > 0
        },
        errorMessage: 'Pay period is required',
        severity: 'error',
      },
      {
        field: 'employee_name',
        check: (data) => {
          const name = String(data.employee_name ?? '')
          return name.length > 0 && name.length < 200
        },
        errorMessage: 'Employee name must be between 1 and 200 characters',
        severity: 'error',
      },
    ],
  }
}

/**
 * BANK_STATEMENT validation rules
 */
function getBankStatementValidationConfig(): DocumentValidationConfig {
  return {
    requiredFields: ['account_number', 'period_start', 'period_end', 'currency'],
    optionalFields: ['bank_name', 'account_holder', 'opening_balance', 'closing_balance', 'transactions'],
    businessRules: [
      {
        field: 'period_end',
        check: (data) => {
          const startStr = String(data.period_start ?? '')
          const endStr = String(data.period_end ?? '')

          if (!startStr || !endStr) return false

          const periodStart = new Date(startStr)
          const periodEnd = new Date(endStr)

          // Period end must be after or equal to period start
          return periodEnd >= periodStart
        },
        errorMessage: 'Statement period end date must be after or equal to start date',
        severity: 'error',
      },
      {
        field: 'account_number',
        check: (data) => {
          const accountNumber = String(data.account_number ?? '')
          return accountNumber.length > 0
        },
        errorMessage: 'Account number is required',
        severity: 'error',
      },
      {
        field: 'closing_balance',
        check: (data) => {
          const openingBalance = parseFloat(String(data.opening_balance ?? ''))
          const closingBalance = parseFloat(String(data.closing_balance ?? ''))
          const transactions = data.transactions as Array<{ amount: number }> | undefined

          // If all balance and transaction data present, validate: opening + sum(transactions) = closing
          if (!isNaN(openingBalance) && !isNaN(closingBalance) && transactions && transactions.length > 0) {
            const transactionSum = transactions.reduce((sum, tx) => {
              const amount = parseFloat(String(tx.amount ?? '0'))
              return sum + amount
            }, 0)

            const calculated = openingBalance + transactionSum
            const difference = Math.abs(calculated - closingBalance)
            const tolerance = 0.02 // 2 cents tolerance

            return difference <= tolerance
          }

          return true // Skip if incomplete data
        },
        errorMessage: 'Closing balance does not match opening balance + transaction sum',
        severity: 'warning',
      },
      {
        field: 'period_start',
        check: (data) => {
          const startStr = String(data.period_start ?? '')
          if (!startStr) return false

          const periodStart = new Date(startStr)
          const today = new Date()

          // Statement start should not be in the far future
          return periodStart <= today
        },
        errorMessage: 'Statement period start date cannot be in the future',
        severity: 'error',
      },
    ],
  }
}

/**
 * TAX_FORM validation rules (basic)
 */
function getTaxFormValidationConfig(): DocumentValidationConfig {
  return {
    requiredFields: ['tax_year', 'taxpayer_name'],
    optionalFields: ['tax_id', 'total_income', 'total_tax', 'deductions', 'form_type'],
    businessRules: [
      {
        field: 'tax_year',
        check: (data) => {
          const taxYear = parseInt(String(data.tax_year ?? '0'), 10)
          const currentYear = new Date().getFullYear()
          // Tax year should be reasonable (within last 10 years or next year for estimates)
          return taxYear >= currentYear - 10 && taxYear <= currentYear + 1
        },
        errorMessage: 'Tax year should be within reasonable range (last 10 years or next year)',
        severity: 'warning',
      },
      {
        field: 'total_tax',
        check: (data) => {
          const totalTax = extractNumber(data.total_tax)
          if (isNaN(totalTax)) return true // Optional field

          return totalTax >= 0
        },
        errorMessage: 'Total tax cannot be negative',
        severity: 'error',
      },
    ],
  }
}

/**
 * CONTRACT validation rules (basic)
 */
function getContractValidationConfig(): DocumentValidationConfig {
  return {
    requiredFields: ['parties', 'effective_date'],
    optionalFields: ['contract_type', 'expiration_date', 'terms', 'signatures'],
    businessRules: [
      {
        field: 'effective_date',
        check: (data) => {
          const dateStr = String(data.effective_date ?? '')
          if (!dateStr) return false

          const effectiveDate = new Date(dateStr)
          return !isNaN(effectiveDate.getTime())
        },
        errorMessage: 'Effective date must be a valid date',
        severity: 'error',
      },
      {
        field: 'expiration_date',
        check: (data) => {
          const effectiveDateStr = String(data.effective_date ?? '')
          const expirationDateStr = String(data.expiration_date ?? '')

          if (!expirationDateStr) return true // Optional field

          const effectiveDate = new Date(effectiveDateStr)
          const expirationDate = new Date(expirationDateStr)

          return expirationDate >= effectiveDate
        },
        errorMessage: 'Expiration date must be after or equal to effective date',
        severity: 'warning',
      },
    ],
  }
}

/**
 * OTHER document type - minimal validation
 */
function getOtherValidationConfig(): DocumentValidationConfig {
  return {
    requiredFields: [], // No required fields for unknown document types
    optionalFields: [],
    businessRules: [], // No business rules for unknown types
  }
}

/**
 * Get human-readable explanation of business rules for a document type
 * Useful for including in LLM prompts
 */
export function getBusinessRulesDescription(documentType: DocumentType): string {
  const config = getValidationConfig(documentType)

  const requiredFieldsList = config.requiredFields.join(', ')
  const ruleDescriptions = config.businessRules.map((rule) => `- ${rule.errorMessage}`).join('\n')

  return `
Business Rules for ${documentType}:

Required Fields: ${requiredFieldsList || 'None'}

Validation Rules:
${ruleDescriptions || 'None'}
`.trim()
}
