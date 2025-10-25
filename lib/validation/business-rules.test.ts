/**
 * Test Suite for Business Rules Validation
 *
 * Covers:
 * - Required field validation for each document type
 * - Business logic rules (calculations, date coherence)
 * - Edge cases and error handling
 * - Severity levels (error, warning, info)
 */

import { describe, it, expect } from 'vitest'
import { validateBusinessRules, getBusinessRulesDescription } from './business-rules'
import { DocumentType } from '@prisma/client'

describe('Business Rules Validation', () => {
  describe('INVOICE Validation', () => {
    it('should pass validation for valid invoice', () => {
      const validInvoice = {
        invoice_number: 'INV-2024-001',
        date: '2024-01-15',
        total: 1234.56,
        currency: 'USD',
        subtotal: 1000.00,
        tax: 234.56,
      }

      const issues = validateBusinessRules('INVOICE', validInvoice)
      expect(issues).toHaveLength(0)
    })

    it('should fail validation for missing required fields', () => {
      const invalidInvoice = {
        // Missing: invoice_number, date, total, currency
        subtotal: 1000.00,
      }

      const issues = validateBusinessRules('INVOICE', invalidInvoice)
      expect(issues.length).toBeGreaterThan(0)
      expect(issues.filter((i) => i.severity === 'error').length).toBeGreaterThanOrEqual(4)
    })

    it('should fail validation for negative total', () => {
      const invalidInvoice = {
        invoice_number: 'INV-001',
        date: '2024-01-15',
        total: -100,
        currency: 'USD',
      }

      const issues = validateBusinessRules('INVOICE', invalidInvoice)
      const totalIssue = issues.find((i) => i.field === 'total')
      expect(totalIssue).toBeDefined()
      expect(totalIssue?.severity).toBe('error')
    })

    it('should fail validation for future date', () => {
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)

      const invalidInvoice = {
        invoice_number: 'INV-001',
        date: futureDate.toISOString(),
        total: 100,
        currency: 'USD',
      }

      const issues = validateBusinessRules('INVOICE', invalidInvoice)
      const dateIssue = issues.find((i) => i.field === 'date' && i.issue.includes('future'))
      expect(dateIssue).toBeDefined()
      expect(dateIssue?.severity).toBe('error')
    })

    it('should fail validation for incorrect total calculation', () => {
      const invalidInvoice = {
        invoice_number: 'INV-001',
        date: '2024-01-15',
        subtotal: 1000.00,
        tax: 200.00,
        total: 1500.00, // Wrong! Should be 1200.00
        currency: 'USD',
      }

      const issues = validateBusinessRules('INVOICE', invalidInvoice)
      const totalIssue = issues.find((i) => i.issue.includes('subtotal + tax'))
      expect(totalIssue).toBeDefined()
      expect(totalIssue?.severity).toBe('error')
    })

    it('should pass validation with rounding tolerance', () => {
      const validInvoice = {
        invoice_number: 'INV-001',
        date: '2024-01-15',
        subtotal: 1000.00,
        tax: 200.00,
        total: 1200.01, // Within 2 cents tolerance
        currency: 'USD',
      }

      const issues = validateBusinessRules('INVOICE', validInvoice)
      const totalIssue = issues.find((i) => i.issue.includes('subtotal + tax'))
      expect(totalIssue).toBeUndefined()
    })

    it('should warn for due_date before invoice date', () => {
      const invalidInvoice = {
        invoice_number: 'INV-001',
        date: '2024-01-15',
        due_date: '2024-01-10', // Before invoice date
        total: 100,
        currency: 'USD',
      }

      const issues = validateBusinessRules('INVOICE', invalidInvoice)
      const dueDateIssue = issues.find((i) => i.field === 'due_date')
      expect(dueDateIssue).toBeDefined()
      expect(dueDateIssue?.severity).toBe('warning')
    })
  })

  describe('RECEIPT Validation', () => {
    it('should pass validation for valid receipt', () => {
      const validReceipt = {
        merchant: 'Coffee Shop',
        total: 5.99,
        date: '2024-01-15',
        currency: 'USD',
        payment_method: 'credit card',
      }

      const issues = validateBusinessRules('RECEIPT', validReceipt)
      expect(issues).toHaveLength(0)
    })

    it('should fail validation for missing merchant', () => {
      const invalidReceipt = {
        total: 10.00,
        date: '2024-01-15',
        currency: 'USD',
      }

      const issues = validateBusinessRules('RECEIPT', invalidReceipt)
      const merchantIssue = issues.find((i) => i.field === 'merchant')
      expect(merchantIssue).toBeDefined()
      expect(merchantIssue?.severity).toBe('error')
    })

    it('should fail validation for negative total', () => {
      const invalidReceipt = {
        merchant: 'Store',
        total: -10,
        date: '2024-01-15',
        currency: 'USD',
      }

      const issues = validateBusinessRules('RECEIPT', invalidReceipt)
      const totalIssue = issues.find((i) => i.field === 'total')
      expect(totalIssue).toBeDefined()
      expect(totalIssue?.severity).toBe('error')
    })

    it('should warn for unreasonably high tax', () => {
      const invalidReceipt = {
        merchant: 'Store',
        total: 100,
        tax: 150, // Tax > total
        date: '2024-01-15',
        currency: 'USD',
      }

      const issues = validateBusinessRules('RECEIPT', invalidReceipt)
      const taxIssue = issues.find((i) => i.issue.includes('unreasonably high'))
      expect(taxIssue).toBeDefined()
      expect(taxIssue?.severity).toBe('warning')
    })

    it('should provide info for unknown payment method', () => {
      const receipt = {
        merchant: 'Store',
        total: 10,
        date: '2024-01-15',
        currency: 'USD',
        payment_method: 'bitcoin', // Not in standard list
      }

      const issues = validateBusinessRules('RECEIPT', receipt)
      const paymentIssue = issues.find((i) => i.field === 'payment_method')
      expect(paymentIssue?.severity).toBe('info')
    })
  })

  describe('PAYSLIP Validation', () => {
    it('should pass validation for valid payslip', () => {
      const validPayslip = {
        employee_name: 'John Doe',
        period: 'January 2024',
        gross_salary: 5000.00,
        deductions: 1000.00,
        net_salary: 4000.00,
        currency: 'USD',
      }

      const issues = validateBusinessRules('PAYSLIP', validPayslip)
      expect(issues).toHaveLength(0)
    })

    it('should fail validation for incorrect net salary calculation', () => {
      const invalidPayslip = {
        employee_name: 'John Doe',
        period: 'January 2024',
        gross_salary: 5000.00,
        deductions: 1000.00,
        net_salary: 3500.00, // Wrong! Should be 4000.00
        currency: 'USD',
      }

      const issues = validateBusinessRules('PAYSLIP', invalidPayslip)
      const netIssue = issues.find((i) => i.field === 'net_salary')
      expect(netIssue).toBeDefined()
      expect(netIssue?.severity).toBe('error')
    })

    it('should fail validation for net > gross', () => {
      const invalidPayslip = {
        employee_name: 'John Doe',
        period: 'January 2024',
        gross_salary: 3000.00,
        net_salary: 4000.00, // Higher than gross
        currency: 'USD',
      }

      const issues = validateBusinessRules('PAYSLIP', invalidPayslip)
      const netIssue = issues.find((i) => i.field === 'net_salary')
      expect(netIssue).toBeDefined()
      expect(netIssue?.severity).toBe('error')
    })

    it('should fail validation for negative gross salary', () => {
      const invalidPayslip = {
        employee_name: 'John Doe',
        period: 'January 2024',
        gross_salary: -1000,
        net_salary: -1000,
        currency: 'USD',
      }

      const issues = validateBusinessRules('PAYSLIP', invalidPayslip)
      const grossIssue = issues.find((i) => i.field === 'gross_salary')
      expect(grossIssue).toBeDefined()
      expect(grossIssue?.severity).toBe('error')
    })
  })

  describe('BANK_STATEMENT Validation', () => {
    it('should pass validation for valid bank statement', () => {
      const validStatement = {
        account_number: '1234567890',
        period_start: '2024-01-01',
        period_end: '2024-01-31',
        currency: 'USD',
        opening_balance: 1000.00,
        closing_balance: 1500.00,
        transactions: [
          { amount: 300.00 },
          { amount: 200.00 },
        ],
      }

      const issues = validateBusinessRules('BANK_STATEMENT', validStatement)
      expect(issues).toHaveLength(0)
    })

    it('should fail validation for period_end before period_start', () => {
      const invalidStatement = {
        account_number: '1234567890',
        period_start: '2024-01-31',
        period_end: '2024-01-01', // Before start
        currency: 'USD',
      }

      const issues = validateBusinessRules('BANK_STATEMENT', invalidStatement)
      const periodIssue = issues.find((i) => i.field === 'period_end')
      expect(periodIssue).toBeDefined()
      expect(periodIssue?.severity).toBe('error')
    })

    it('should warn for incorrect closing balance', () => {
      const invalidStatement = {
        account_number: '1234567890',
        period_start: '2024-01-01',
        period_end: '2024-01-31',
        currency: 'USD',
        opening_balance: 1000.00,
        closing_balance: 2000.00, // Wrong! Should be 1500.00
        transactions: [
          { amount: 300.00 },
          { amount: 200.00 },
        ],
      }

      const issues = validateBusinessRules('BANK_STATEMENT', invalidStatement)
      const balanceIssue = issues.find((i) => i.field === 'closing_balance')
      expect(balanceIssue).toBeDefined()
      expect(balanceIssue?.severity).toBe('warning')
    })

    it('should fail validation for future period start', () => {
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)

      const invalidStatement = {
        account_number: '1234567890',
        period_start: futureDate.toISOString(),
        period_end: futureDate.toISOString(),
        currency: 'USD',
      }

      const issues = validateBusinessRules('BANK_STATEMENT', invalidStatement)
      const dateIssue = issues.find((i) => i.field === 'period_start')
      expect(dateIssue).toBeDefined()
      expect(dateIssue?.severity).toBe('error')
    })
  })

  describe('TAX_FORM Validation', () => {
    it('should pass validation for valid tax form', () => {
      const validTaxForm = {
        tax_year: 2023,
        taxpayer_name: 'John Doe',
        total_income: 75000,
        total_tax: 15000,
      }

      const issues = validateBusinessRules('TAX_FORM', validTaxForm)
      expect(issues).toHaveLength(0)
    })

    it('should warn for unreasonable tax year', () => {
      const invalidTaxForm = {
        tax_year: 1990, // Too old
        taxpayer_name: 'John Doe',
      }

      const issues = validateBusinessRules('TAX_FORM', invalidTaxForm)
      const yearIssue = issues.find((i) => i.field === 'tax_year')
      expect(yearIssue).toBeDefined()
      expect(yearIssue?.severity).toBe('warning')
    })

    it('should fail validation for negative total tax', () => {
      const invalidTaxForm = {
        tax_year: 2023,
        taxpayer_name: 'John Doe',
        total_tax: -1000,
      }

      const issues = validateBusinessRules('TAX_FORM', invalidTaxForm)
      const taxIssue = issues.find((i) => i.field === 'total_tax')
      expect(taxIssue).toBeDefined()
      expect(taxIssue?.severity).toBe('error')
    })
  })

  describe('CONTRACT Validation', () => {
    it('should pass validation for valid contract', () => {
      const validContract = {
        parties: ['Company A', 'Company B'],
        effective_date: '2024-01-01',
        expiration_date: '2025-01-01',
      }

      const issues = validateBusinessRules('CONTRACT', validContract)
      expect(issues).toHaveLength(0)
    })

    it('should warn for expiration_date before effective_date', () => {
      const invalidContract = {
        parties: ['Company A', 'Company B'],
        effective_date: '2024-01-01',
        expiration_date: '2023-12-31', // Before effective date
      }

      const issues = validateBusinessRules('CONTRACT', invalidContract)
      const dateIssue = issues.find((i) => i.field === 'expiration_date')
      expect(dateIssue).toBeDefined()
      expect(dateIssue?.severity).toBe('warning')
    })
  })

  describe('OTHER Document Type', () => {
    it('should have no validation rules', () => {
      const document = {
        random_field: 'value',
        another_field: 123,
      }

      const issues = validateBusinessRules('OTHER', document)
      expect(issues).toHaveLength(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty data', () => {
      const issues = validateBusinessRules('INVOICE', {})
      expect(issues.length).toBeGreaterThan(0) // Should find missing required fields
    })

    it('should handle malformed data gracefully', () => {
      const malformedInvoice = {
        invoice_number: 'INV-001',
        date: 'invalid-date',
        total: 'not-a-number',
        currency: 'USD',
      }

      // Should not throw, should return validation issues
      expect(() => validateBusinessRules('INVOICE', malformedInvoice)).not.toThrow()
    })

    it('should handle null values', () => {
      const invoiceWithNulls = {
        invoice_number: null,
        date: null,
        total: null,
        currency: null,
      }

      const issues = validateBusinessRules('INVOICE', invoiceWithNulls)
      expect(issues.length).toBeGreaterThan(0)
    })
  })

  describe('Business Rules Description', () => {
    it('should return readable description for INVOICE', () => {
      const description = getBusinessRulesDescription('INVOICE')
      expect(description).toContain('INVOICE')
      expect(description).toContain('Required Fields')
      expect(description).toContain('invoice_number')
    })

    it('should return description for all document types', () => {
      const types: DocumentType[] = ['INVOICE', 'RECEIPT', 'PAYSLIP', 'BANK_STATEMENT', 'TAX_FORM', 'CONTRACT', 'OTHER']

      for (const type of types) {
        const description = getBusinessRulesDescription(type)
        expect(description).toBeTruthy()
        expect(description).toContain(type)
      }
    })
  })
})
