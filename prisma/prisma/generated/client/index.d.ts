
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model ApiKey
 * 
 */
export type ApiKey = $Result.DefaultSelection<Prisma.$ApiKeyPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model ProcessingJob
 * 
 */
export type ProcessingJob = $Result.DefaultSelection<Prisma.$ProcessingJobPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model PromptTemplate
 * 
 */
export type PromptTemplate = $Result.DefaultSelection<Prisma.$PromptTemplatePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const DocumentType: {
  INVOICE: 'INVOICE',
  RECEIPT: 'RECEIPT',
  PAYSLIP: 'PAYSLIP',
  BANK_STATEMENT: 'BANK_STATEMENT',
  TAX_FORM: 'TAX_FORM',
  CONTRACT: 'CONTRACT',
  OTHER: 'OTHER'
};

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType]


export const DocumentStatus: {
  UPLOADING: 'UPLOADING',
  PROCESSING: 'PROCESSING',
  NEEDS_REVIEW: 'NEEDS_REVIEW',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  ARCHIVED: 'ARCHIVED'
};

export type DocumentStatus = (typeof DocumentStatus)[keyof typeof DocumentStatus]


export const PipelineStage: {
  UPLOAD: 'UPLOAD',
  CLASSIFICATION: 'CLASSIFICATION',
  EXTRACTION: 'EXTRACTION',
  VALIDATION: 'VALIDATION',
  CORRECTION: 'CORRECTION',
  REVALIDATION: 'REVALIDATION',
  FINALIZE: 'FINALIZE'
};

export type PipelineStage = (typeof PipelineStage)[keyof typeof PipelineStage]


export const StageStatus: {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  RETRYING: 'RETRYING'
};

export type StageStatus = (typeof StageStatus)[keyof typeof StageStatus]


export const PromptCategory: {
  CLASSIFICATION: 'CLASSIFICATION',
  EXTRACTION: 'EXTRACTION',
  VALIDATION: 'VALIDATION',
  CORRECTION: 'CORRECTION'
};

export type PromptCategory = (typeof PromptCategory)[keyof typeof PromptCategory]

}

export type DocumentType = $Enums.DocumentType

export const DocumentType: typeof $Enums.DocumentType

export type DocumentStatus = $Enums.DocumentStatus

export const DocumentStatus: typeof $Enums.DocumentStatus

export type PipelineStage = $Enums.PipelineStage

export const PipelineStage: typeof $Enums.PipelineStage

export type StageStatus = $Enums.StageStatus

export const StageStatus: typeof $Enums.StageStatus

export type PromptCategory = $Enums.PromptCategory

export const PromptCategory: typeof $Enums.PromptCategory

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apiKey`: Exposes CRUD operations for the **ApiKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiKeys
    * const apiKeys = await prisma.apiKey.findMany()
    * ```
    */
  get apiKey(): Prisma.ApiKeyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.processingJob`: Exposes CRUD operations for the **ProcessingJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProcessingJobs
    * const processingJobs = await prisma.processingJob.findMany()
    * ```
    */
  get processingJob(): Prisma.ProcessingJobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.promptTemplate`: Exposes CRUD operations for the **PromptTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PromptTemplates
    * const promptTemplates = await prisma.promptTemplate.findMany()
    * ```
    */
  get promptTemplate(): Prisma.PromptTemplateDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Session: 'Session',
    ApiKey: 'ApiKey',
    Document: 'Document',
    ProcessingJob: 'ProcessingJob',
    AuditLog: 'AuditLog',
    PromptTemplate: 'PromptTemplate'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "session" | "apiKey" | "document" | "processingJob" | "auditLog" | "promptTemplate"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      ApiKey: {
        payload: Prisma.$ApiKeyPayload<ExtArgs>
        fields: Prisma.ApiKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findFirst: {
            args: Prisma.ApiKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findMany: {
            args: Prisma.ApiKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          create: {
            args: Prisma.ApiKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          createMany: {
            args: Prisma.ApiKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          delete: {
            args: Prisma.ApiKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          update: {
            args: Prisma.ApiKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          deleteMany: {
            args: Prisma.ApiKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApiKeyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          upsert: {
            args: Prisma.ApiKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          aggregate: {
            args: Prisma.ApiKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiKey>
          }
          groupBy: {
            args: Prisma.ApiKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiKeyCountArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      ProcessingJob: {
        payload: Prisma.$ProcessingJobPayload<ExtArgs>
        fields: Prisma.ProcessingJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcessingJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcessingJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingJobPayload>
          }
          findFirst: {
            args: Prisma.ProcessingJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcessingJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingJobPayload>
          }
          findMany: {
            args: Prisma.ProcessingJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingJobPayload>[]
          }
          create: {
            args: Prisma.ProcessingJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingJobPayload>
          }
          createMany: {
            args: Prisma.ProcessingJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcessingJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingJobPayload>[]
          }
          delete: {
            args: Prisma.ProcessingJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingJobPayload>
          }
          update: {
            args: Prisma.ProcessingJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingJobPayload>
          }
          deleteMany: {
            args: Prisma.ProcessingJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcessingJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProcessingJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingJobPayload>[]
          }
          upsert: {
            args: Prisma.ProcessingJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingJobPayload>
          }
          aggregate: {
            args: Prisma.ProcessingJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcessingJob>
          }
          groupBy: {
            args: Prisma.ProcessingJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcessingJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcessingJobCountArgs<ExtArgs>
            result: $Utils.Optional<ProcessingJobCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      PromptTemplate: {
        payload: Prisma.$PromptTemplatePayload<ExtArgs>
        fields: Prisma.PromptTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PromptTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PromptTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>
          }
          findFirst: {
            args: Prisma.PromptTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PromptTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>
          }
          findMany: {
            args: Prisma.PromptTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>[]
          }
          create: {
            args: Prisma.PromptTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>
          }
          createMany: {
            args: Prisma.PromptTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PromptTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>[]
          }
          delete: {
            args: Prisma.PromptTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>
          }
          update: {
            args: Prisma.PromptTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>
          }
          deleteMany: {
            args: Prisma.PromptTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PromptTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PromptTemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>[]
          }
          upsert: {
            args: Prisma.PromptTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>
          }
          aggregate: {
            args: Prisma.PromptTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePromptTemplate>
          }
          groupBy: {
            args: Prisma.PromptTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<PromptTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.PromptTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<PromptTemplateCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    session?: SessionOmit
    apiKey?: ApiKeyOmit
    document?: DocumentOmit
    processingJob?: ProcessingJobOmit
    auditLog?: AuditLogOmit
    promptTemplate?: PromptTemplateOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    documents: number
    sessions: number
    apiKeys: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | UserCountOutputTypeCountDocumentsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    apiKeys?: boolean | UserCountOutputTypeCountApiKeysArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApiKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
  }


  /**
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    processingJobs: number
    auditLogs: number
  }

  export type DocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    processingJobs?: boolean | DocumentCountOutputTypeCountProcessingJobsArgs
    auditLogs?: boolean | DocumentCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountProcessingJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessingJobWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    password: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    documents?: boolean | User$documentsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    apiKeys?: boolean | User$apiKeysArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | User$documentsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    apiKeys?: boolean | User$apiKeysArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      apiKeys: Prisma.$ApiKeyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      password: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    documents<T extends User$documentsArgs<ExtArgs> = {}>(args?: Subset<T, User$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    apiKeys<T extends User$apiKeysArgs<ExtArgs> = {}>(args?: Subset<T, User$apiKeysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.documents
   */
  export type User$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.apiKeys
   */
  export type User$apiKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    cursor?: ApiKeyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    token: string
    expiresAt: Date
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "token" | "expiresAt" | "createdAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly token: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model ApiKey
   */

  export type AggregateApiKey = {
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  export type ApiKeyMinAggregateOutputType = {
    id: string | null
    userId: string | null
    key: string | null
    name: string | null
    isActive: boolean | null
    lastUsed: Date | null
    createdAt: Date | null
  }

  export type ApiKeyMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    key: string | null
    name: string | null
    isActive: boolean | null
    lastUsed: Date | null
    createdAt: Date | null
  }

  export type ApiKeyCountAggregateOutputType = {
    id: number
    userId: number
    key: number
    name: number
    isActive: number
    lastUsed: number
    createdAt: number
    _all: number
  }


  export type ApiKeyMinAggregateInputType = {
    id?: true
    userId?: true
    key?: true
    name?: true
    isActive?: true
    lastUsed?: true
    createdAt?: true
  }

  export type ApiKeyMaxAggregateInputType = {
    id?: true
    userId?: true
    key?: true
    name?: true
    isActive?: true
    lastUsed?: true
    createdAt?: true
  }

  export type ApiKeyCountAggregateInputType = {
    id?: true
    userId?: true
    key?: true
    name?: true
    isActive?: true
    lastUsed?: true
    createdAt?: true
    _all?: true
  }

  export type ApiKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKey to aggregate.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiKeys
    **/
    _count?: true | ApiKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiKeyMaxAggregateInputType
  }

  export type GetApiKeyAggregateType<T extends ApiKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateApiKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiKey[P]>
      : GetScalarType<T[P], AggregateApiKey[P]>
  }




  export type ApiKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithAggregationInput | ApiKeyOrderByWithAggregationInput[]
    by: ApiKeyScalarFieldEnum[] | ApiKeyScalarFieldEnum
    having?: ApiKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiKeyCountAggregateInputType | true
    _min?: ApiKeyMinAggregateInputType
    _max?: ApiKeyMaxAggregateInputType
  }

  export type ApiKeyGroupByOutputType = {
    id: string
    userId: string
    key: string
    name: string
    isActive: boolean
    lastUsed: Date | null
    createdAt: Date
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  type GetApiKeyGroupByPayload<T extends ApiKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
            : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
        }
      >
    >


  export type ApiKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    key?: boolean
    name?: boolean
    isActive?: boolean
    lastUsed?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    key?: boolean
    name?: boolean
    isActive?: boolean
    lastUsed?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    key?: boolean
    name?: boolean
    isActive?: boolean
    lastUsed?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectScalar = {
    id?: boolean
    userId?: boolean
    key?: boolean
    name?: boolean
    isActive?: boolean
    lastUsed?: boolean
    createdAt?: boolean
  }

  export type ApiKeyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "key" | "name" | "isActive" | "lastUsed" | "createdAt", ExtArgs["result"]["apiKey"]>
  export type ApiKeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ApiKeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ApiKeyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ApiKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiKey"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      key: string
      name: string
      isActive: boolean
      lastUsed: Date | null
      createdAt: Date
    }, ExtArgs["result"]["apiKey"]>
    composites: {}
  }

  type ApiKeyGetPayload<S extends boolean | null | undefined | ApiKeyDefaultArgs> = $Result.GetResult<Prisma.$ApiKeyPayload, S>

  type ApiKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiKeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiKeyCountAggregateInputType | true
    }

  export interface ApiKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiKey'], meta: { name: 'ApiKey' } }
    /**
     * Find zero or one ApiKey that matches the filter.
     * @param {ApiKeyFindUniqueArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiKeyFindUniqueArgs>(args: SelectSubset<T, ApiKeyFindUniqueArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiKey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiKeyFindUniqueOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiKeyFindFirstArgs>(args?: SelectSubset<T, ApiKeyFindFirstArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiKeys
     * const apiKeys = await prisma.apiKey.findMany()
     * 
     * // Get first 10 ApiKeys
     * const apiKeys = await prisma.apiKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiKeyFindManyArgs>(args?: SelectSubset<T, ApiKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiKey.
     * @param {ApiKeyCreateArgs} args - Arguments to create a ApiKey.
     * @example
     * // Create one ApiKey
     * const ApiKey = await prisma.apiKey.create({
     *   data: {
     *     // ... data to create a ApiKey
     *   }
     * })
     * 
     */
    create<T extends ApiKeyCreateArgs>(args: SelectSubset<T, ApiKeyCreateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiKeys.
     * @param {ApiKeyCreateManyArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiKeyCreateManyArgs>(args?: SelectSubset<T, ApiKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiKeys and returns the data saved in the database.
     * @param {ApiKeyCreateManyAndReturnArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApiKey.
     * @param {ApiKeyDeleteArgs} args - Arguments to delete one ApiKey.
     * @example
     * // Delete one ApiKey
     * const ApiKey = await prisma.apiKey.delete({
     *   where: {
     *     // ... filter to delete one ApiKey
     *   }
     * })
     * 
     */
    delete<T extends ApiKeyDeleteArgs>(args: SelectSubset<T, ApiKeyDeleteArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiKey.
     * @param {ApiKeyUpdateArgs} args - Arguments to update one ApiKey.
     * @example
     * // Update one ApiKey
     * const apiKey = await prisma.apiKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiKeyUpdateArgs>(args: SelectSubset<T, ApiKeyUpdateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiKeys.
     * @param {ApiKeyDeleteManyArgs} args - Arguments to filter ApiKeys to delete.
     * @example
     * // Delete a few ApiKeys
     * const { count } = await prisma.apiKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiKeyDeleteManyArgs>(args?: SelectSubset<T, ApiKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiKeyUpdateManyArgs>(args: SelectSubset<T, ApiKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys and returns the data updated in the database.
     * @param {ApiKeyUpdateManyAndReturnArgs} args - Arguments to update many ApiKeys.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApiKeyUpdateManyAndReturnArgs>(args: SelectSubset<T, ApiKeyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApiKey.
     * @param {ApiKeyUpsertArgs} args - Arguments to update or create a ApiKey.
     * @example
     * // Update or create a ApiKey
     * const apiKey = await prisma.apiKey.upsert({
     *   create: {
     *     // ... data to create a ApiKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiKey we want to update
     *   }
     * })
     */
    upsert<T extends ApiKeyUpsertArgs>(args: SelectSubset<T, ApiKeyUpsertArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyCountArgs} args - Arguments to filter ApiKeys to count.
     * @example
     * // Count the number of ApiKeys
     * const count = await prisma.apiKey.count({
     *   where: {
     *     // ... the filter for the ApiKeys we want to count
     *   }
     * })
    **/
    count<T extends ApiKeyCountArgs>(
      args?: Subset<T, ApiKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApiKeyAggregateArgs>(args: Subset<T, ApiKeyAggregateArgs>): Prisma.PrismaPromise<GetApiKeyAggregateType<T>>

    /**
     * Group by ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApiKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiKeyGroupByArgs['orderBy'] }
        : { orderBy?: ApiKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApiKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiKey model
   */
  readonly fields: ApiKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApiKey model
   */
  interface ApiKeyFieldRefs {
    readonly id: FieldRef<"ApiKey", 'String'>
    readonly userId: FieldRef<"ApiKey", 'String'>
    readonly key: FieldRef<"ApiKey", 'String'>
    readonly name: FieldRef<"ApiKey", 'String'>
    readonly isActive: FieldRef<"ApiKey", 'Boolean'>
    readonly lastUsed: FieldRef<"ApiKey", 'DateTime'>
    readonly createdAt: FieldRef<"ApiKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiKey findUnique
   */
  export type ApiKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findUniqueOrThrow
   */
  export type ApiKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findFirst
   */
  export type ApiKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findFirstOrThrow
   */
  export type ApiKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findMany
   */
  export type ApiKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKeys to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey create
   */
  export type ApiKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiKey.
     */
    data: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
  }

  /**
   * ApiKey createMany
   */
  export type ApiKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiKey createManyAndReturn
   */
  export type ApiKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiKey update
   */
  export type ApiKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiKey.
     */
    data: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
    /**
     * Choose, which ApiKey to update.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey updateMany
   */
  export type ApiKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
  }

  /**
   * ApiKey updateManyAndReturn
   */
  export type ApiKeyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiKey upsert
   */
  export type ApiKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiKey to update in case it exists.
     */
    where: ApiKeyWhereUniqueInput
    /**
     * In case the ApiKey found by the `where` argument doesn't exist, create a new ApiKey with this data.
     */
    create: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
    /**
     * In case the ApiKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
  }

  /**
   * ApiKey delete
   */
  export type ApiKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter which ApiKey to delete.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey deleteMany
   */
  export type ApiKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKeys to delete
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to delete.
     */
    limit?: number
  }

  /**
   * ApiKey without action
   */
  export type ApiKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    fileSize: number | null
    confidence: number | null
  }

  export type DocumentSumAggregateOutputType = {
    fileSize: number | null
    confidence: number | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    originalFilename: string | null
    mimeType: string | null
    fileSize: number | null
    s3Key: string | null
    s3Bucket: string | null
    documentType: $Enums.DocumentType | null
    status: $Enums.DocumentStatus | null
    confidence: number | null
    needsReview: boolean | null
    reviewedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    originalFilename: string | null
    mimeType: string | null
    fileSize: number | null
    s3Key: string | null
    s3Bucket: string | null
    documentType: $Enums.DocumentType | null
    status: $Enums.DocumentStatus | null
    confidence: number | null
    needsReview: boolean | null
    reviewedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    userId: number
    originalFilename: number
    mimeType: number
    fileSize: number
    s3Key: number
    s3Bucket: number
    documentType: number
    status: number
    confidence: number
    parsedData: number
    needsReview: number
    reviewedAt: number
    completedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    fileSize?: true
    confidence?: true
  }

  export type DocumentSumAggregateInputType = {
    fileSize?: true
    confidence?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    userId?: true
    originalFilename?: true
    mimeType?: true
    fileSize?: true
    s3Key?: true
    s3Bucket?: true
    documentType?: true
    status?: true
    confidence?: true
    needsReview?: true
    reviewedAt?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    userId?: true
    originalFilename?: true
    mimeType?: true
    fileSize?: true
    s3Key?: true
    s3Bucket?: true
    documentType?: true
    status?: true
    confidence?: true
    needsReview?: true
    reviewedAt?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    userId?: true
    originalFilename?: true
    mimeType?: true
    fileSize?: true
    s3Key?: true
    s3Bucket?: true
    documentType?: true
    status?: true
    confidence?: true
    parsedData?: true
    needsReview?: true
    reviewedAt?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    userId: string
    originalFilename: string
    mimeType: string
    fileSize: number
    s3Key: string
    s3Bucket: string
    documentType: $Enums.DocumentType | null
    status: $Enums.DocumentStatus
    confidence: number | null
    parsedData: JsonValue | null
    needsReview: boolean
    reviewedAt: Date | null
    completedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    originalFilename?: boolean
    mimeType?: boolean
    fileSize?: boolean
    s3Key?: boolean
    s3Bucket?: boolean
    documentType?: boolean
    status?: boolean
    confidence?: boolean
    parsedData?: boolean
    needsReview?: boolean
    reviewedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    processingJobs?: boolean | Document$processingJobsArgs<ExtArgs>
    auditLogs?: boolean | Document$auditLogsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    originalFilename?: boolean
    mimeType?: boolean
    fileSize?: boolean
    s3Key?: boolean
    s3Bucket?: boolean
    documentType?: boolean
    status?: boolean
    confidence?: boolean
    parsedData?: boolean
    needsReview?: boolean
    reviewedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    originalFilename?: boolean
    mimeType?: boolean
    fileSize?: boolean
    s3Key?: boolean
    s3Bucket?: boolean
    documentType?: boolean
    status?: boolean
    confidence?: boolean
    parsedData?: boolean
    needsReview?: boolean
    reviewedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    userId?: boolean
    originalFilename?: boolean
    mimeType?: boolean
    fileSize?: boolean
    s3Key?: boolean
    s3Bucket?: boolean
    documentType?: boolean
    status?: boolean
    confidence?: boolean
    parsedData?: boolean
    needsReview?: boolean
    reviewedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "originalFilename" | "mimeType" | "fileSize" | "s3Key" | "s3Bucket" | "documentType" | "status" | "confidence" | "parsedData" | "needsReview" | "reviewedAt" | "completedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    processingJobs?: boolean | Document$processingJobsArgs<ExtArgs>
    auditLogs?: boolean | Document$auditLogsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      processingJobs: Prisma.$ProcessingJobPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      originalFilename: string
      mimeType: string
      fileSize: number
      s3Key: string
      s3Bucket: string
      documentType: $Enums.DocumentType | null
      status: $Enums.DocumentStatus
      confidence: number | null
      parsedData: Prisma.JsonValue | null
      needsReview: boolean
      reviewedAt: Date | null
      completedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    processingJobs<T extends Document$processingJobsArgs<ExtArgs> = {}>(args?: Subset<T, Document$processingJobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessingJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends Document$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Document$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly userId: FieldRef<"Document", 'String'>
    readonly originalFilename: FieldRef<"Document", 'String'>
    readonly mimeType: FieldRef<"Document", 'String'>
    readonly fileSize: FieldRef<"Document", 'Int'>
    readonly s3Key: FieldRef<"Document", 'String'>
    readonly s3Bucket: FieldRef<"Document", 'String'>
    readonly documentType: FieldRef<"Document", 'DocumentType'>
    readonly status: FieldRef<"Document", 'DocumentStatus'>
    readonly confidence: FieldRef<"Document", 'Float'>
    readonly parsedData: FieldRef<"Document", 'Json'>
    readonly needsReview: FieldRef<"Document", 'Boolean'>
    readonly reviewedAt: FieldRef<"Document", 'DateTime'>
    readonly completedAt: FieldRef<"Document", 'DateTime'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
    readonly updatedAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document.processingJobs
   */
  export type Document$processingJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingJob
     */
    select?: ProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingJob
     */
    omit?: ProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingJobInclude<ExtArgs> | null
    where?: ProcessingJobWhereInput
    orderBy?: ProcessingJobOrderByWithRelationInput | ProcessingJobOrderByWithRelationInput[]
    cursor?: ProcessingJobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProcessingJobScalarFieldEnum | ProcessingJobScalarFieldEnum[]
  }

  /**
   * Document.auditLogs
   */
  export type Document$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model ProcessingJob
   */

  export type AggregateProcessingJob = {
    _count: ProcessingJobCountAggregateOutputType | null
    _avg: ProcessingJobAvgAggregateOutputType | null
    _sum: ProcessingJobSumAggregateOutputType | null
    _min: ProcessingJobMinAggregateOutputType | null
    _max: ProcessingJobMaxAggregateOutputType | null
  }

  export type ProcessingJobAvgAggregateOutputType = {
    retryCount: number | null
  }

  export type ProcessingJobSumAggregateOutputType = {
    retryCount: number | null
  }

  export type ProcessingJobMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    inngestJobId: string | null
    currentStage: $Enums.PipelineStage | null
    stageStatus: $Enums.StageStatus | null
    retryCount: number | null
    errorMessage: string | null
    startedAt: Date | null
    completedAt: Date | null
  }

  export type ProcessingJobMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    inngestJobId: string | null
    currentStage: $Enums.PipelineStage | null
    stageStatus: $Enums.StageStatus | null
    retryCount: number | null
    errorMessage: string | null
    startedAt: Date | null
    completedAt: Date | null
  }

  export type ProcessingJobCountAggregateOutputType = {
    id: number
    documentId: number
    inngestJobId: number
    currentStage: number
    stageStatus: number
    retryCount: number
    errorMessage: number
    startedAt: number
    completedAt: number
    _all: number
  }


  export type ProcessingJobAvgAggregateInputType = {
    retryCount?: true
  }

  export type ProcessingJobSumAggregateInputType = {
    retryCount?: true
  }

  export type ProcessingJobMinAggregateInputType = {
    id?: true
    documentId?: true
    inngestJobId?: true
    currentStage?: true
    stageStatus?: true
    retryCount?: true
    errorMessage?: true
    startedAt?: true
    completedAt?: true
  }

  export type ProcessingJobMaxAggregateInputType = {
    id?: true
    documentId?: true
    inngestJobId?: true
    currentStage?: true
    stageStatus?: true
    retryCount?: true
    errorMessage?: true
    startedAt?: true
    completedAt?: true
  }

  export type ProcessingJobCountAggregateInputType = {
    id?: true
    documentId?: true
    inngestJobId?: true
    currentStage?: true
    stageStatus?: true
    retryCount?: true
    errorMessage?: true
    startedAt?: true
    completedAt?: true
    _all?: true
  }

  export type ProcessingJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessingJob to aggregate.
     */
    where?: ProcessingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessingJobs to fetch.
     */
    orderBy?: ProcessingJobOrderByWithRelationInput | ProcessingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcessingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessingJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProcessingJobs
    **/
    _count?: true | ProcessingJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProcessingJobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProcessingJobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcessingJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcessingJobMaxAggregateInputType
  }

  export type GetProcessingJobAggregateType<T extends ProcessingJobAggregateArgs> = {
        [P in keyof T & keyof AggregateProcessingJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcessingJob[P]>
      : GetScalarType<T[P], AggregateProcessingJob[P]>
  }




  export type ProcessingJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessingJobWhereInput
    orderBy?: ProcessingJobOrderByWithAggregationInput | ProcessingJobOrderByWithAggregationInput[]
    by: ProcessingJobScalarFieldEnum[] | ProcessingJobScalarFieldEnum
    having?: ProcessingJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcessingJobCountAggregateInputType | true
    _avg?: ProcessingJobAvgAggregateInputType
    _sum?: ProcessingJobSumAggregateInputType
    _min?: ProcessingJobMinAggregateInputType
    _max?: ProcessingJobMaxAggregateInputType
  }

  export type ProcessingJobGroupByOutputType = {
    id: string
    documentId: string
    inngestJobId: string
    currentStage: $Enums.PipelineStage
    stageStatus: $Enums.StageStatus
    retryCount: number
    errorMessage: string | null
    startedAt: Date
    completedAt: Date | null
    _count: ProcessingJobCountAggregateOutputType | null
    _avg: ProcessingJobAvgAggregateOutputType | null
    _sum: ProcessingJobSumAggregateOutputType | null
    _min: ProcessingJobMinAggregateOutputType | null
    _max: ProcessingJobMaxAggregateOutputType | null
  }

  type GetProcessingJobGroupByPayload<T extends ProcessingJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcessingJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcessingJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcessingJobGroupByOutputType[P]>
            : GetScalarType<T[P], ProcessingJobGroupByOutputType[P]>
        }
      >
    >


  export type ProcessingJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    inngestJobId?: boolean
    currentStage?: boolean
    stageStatus?: boolean
    retryCount?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    completedAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["processingJob"]>

  export type ProcessingJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    inngestJobId?: boolean
    currentStage?: boolean
    stageStatus?: boolean
    retryCount?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    completedAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["processingJob"]>

  export type ProcessingJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    inngestJobId?: boolean
    currentStage?: boolean
    stageStatus?: boolean
    retryCount?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    completedAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["processingJob"]>

  export type ProcessingJobSelectScalar = {
    id?: boolean
    documentId?: boolean
    inngestJobId?: boolean
    currentStage?: boolean
    stageStatus?: boolean
    retryCount?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    completedAt?: boolean
  }

  export type ProcessingJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentId" | "inngestJobId" | "currentStage" | "stageStatus" | "retryCount" | "errorMessage" | "startedAt" | "completedAt", ExtArgs["result"]["processingJob"]>
  export type ProcessingJobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type ProcessingJobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type ProcessingJobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $ProcessingJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProcessingJob"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentId: string
      inngestJobId: string
      currentStage: $Enums.PipelineStage
      stageStatus: $Enums.StageStatus
      retryCount: number
      errorMessage: string | null
      startedAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["processingJob"]>
    composites: {}
  }

  type ProcessingJobGetPayload<S extends boolean | null | undefined | ProcessingJobDefaultArgs> = $Result.GetResult<Prisma.$ProcessingJobPayload, S>

  type ProcessingJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProcessingJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProcessingJobCountAggregateInputType | true
    }

  export interface ProcessingJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProcessingJob'], meta: { name: 'ProcessingJob' } }
    /**
     * Find zero or one ProcessingJob that matches the filter.
     * @param {ProcessingJobFindUniqueArgs} args - Arguments to find a ProcessingJob
     * @example
     * // Get one ProcessingJob
     * const processingJob = await prisma.processingJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcessingJobFindUniqueArgs>(args: SelectSubset<T, ProcessingJobFindUniqueArgs<ExtArgs>>): Prisma__ProcessingJobClient<$Result.GetResult<Prisma.$ProcessingJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProcessingJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProcessingJobFindUniqueOrThrowArgs} args - Arguments to find a ProcessingJob
     * @example
     * // Get one ProcessingJob
     * const processingJob = await prisma.processingJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcessingJobFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcessingJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcessingJobClient<$Result.GetResult<Prisma.$ProcessingJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessingJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingJobFindFirstArgs} args - Arguments to find a ProcessingJob
     * @example
     * // Get one ProcessingJob
     * const processingJob = await prisma.processingJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcessingJobFindFirstArgs>(args?: SelectSubset<T, ProcessingJobFindFirstArgs<ExtArgs>>): Prisma__ProcessingJobClient<$Result.GetResult<Prisma.$ProcessingJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessingJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingJobFindFirstOrThrowArgs} args - Arguments to find a ProcessingJob
     * @example
     * // Get one ProcessingJob
     * const processingJob = await prisma.processingJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcessingJobFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcessingJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcessingJobClient<$Result.GetResult<Prisma.$ProcessingJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProcessingJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProcessingJobs
     * const processingJobs = await prisma.processingJob.findMany()
     * 
     * // Get first 10 ProcessingJobs
     * const processingJobs = await prisma.processingJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const processingJobWithIdOnly = await prisma.processingJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProcessingJobFindManyArgs>(args?: SelectSubset<T, ProcessingJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessingJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProcessingJob.
     * @param {ProcessingJobCreateArgs} args - Arguments to create a ProcessingJob.
     * @example
     * // Create one ProcessingJob
     * const ProcessingJob = await prisma.processingJob.create({
     *   data: {
     *     // ... data to create a ProcessingJob
     *   }
     * })
     * 
     */
    create<T extends ProcessingJobCreateArgs>(args: SelectSubset<T, ProcessingJobCreateArgs<ExtArgs>>): Prisma__ProcessingJobClient<$Result.GetResult<Prisma.$ProcessingJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProcessingJobs.
     * @param {ProcessingJobCreateManyArgs} args - Arguments to create many ProcessingJobs.
     * @example
     * // Create many ProcessingJobs
     * const processingJob = await prisma.processingJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcessingJobCreateManyArgs>(args?: SelectSubset<T, ProcessingJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProcessingJobs and returns the data saved in the database.
     * @param {ProcessingJobCreateManyAndReturnArgs} args - Arguments to create many ProcessingJobs.
     * @example
     * // Create many ProcessingJobs
     * const processingJob = await prisma.processingJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProcessingJobs and only return the `id`
     * const processingJobWithIdOnly = await prisma.processingJob.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcessingJobCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcessingJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessingJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProcessingJob.
     * @param {ProcessingJobDeleteArgs} args - Arguments to delete one ProcessingJob.
     * @example
     * // Delete one ProcessingJob
     * const ProcessingJob = await prisma.processingJob.delete({
     *   where: {
     *     // ... filter to delete one ProcessingJob
     *   }
     * })
     * 
     */
    delete<T extends ProcessingJobDeleteArgs>(args: SelectSubset<T, ProcessingJobDeleteArgs<ExtArgs>>): Prisma__ProcessingJobClient<$Result.GetResult<Prisma.$ProcessingJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProcessingJob.
     * @param {ProcessingJobUpdateArgs} args - Arguments to update one ProcessingJob.
     * @example
     * // Update one ProcessingJob
     * const processingJob = await prisma.processingJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcessingJobUpdateArgs>(args: SelectSubset<T, ProcessingJobUpdateArgs<ExtArgs>>): Prisma__ProcessingJobClient<$Result.GetResult<Prisma.$ProcessingJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProcessingJobs.
     * @param {ProcessingJobDeleteManyArgs} args - Arguments to filter ProcessingJobs to delete.
     * @example
     * // Delete a few ProcessingJobs
     * const { count } = await prisma.processingJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcessingJobDeleteManyArgs>(args?: SelectSubset<T, ProcessingJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessingJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProcessingJobs
     * const processingJob = await prisma.processingJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcessingJobUpdateManyArgs>(args: SelectSubset<T, ProcessingJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessingJobs and returns the data updated in the database.
     * @param {ProcessingJobUpdateManyAndReturnArgs} args - Arguments to update many ProcessingJobs.
     * @example
     * // Update many ProcessingJobs
     * const processingJob = await prisma.processingJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProcessingJobs and only return the `id`
     * const processingJobWithIdOnly = await prisma.processingJob.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProcessingJobUpdateManyAndReturnArgs>(args: SelectSubset<T, ProcessingJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessingJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProcessingJob.
     * @param {ProcessingJobUpsertArgs} args - Arguments to update or create a ProcessingJob.
     * @example
     * // Update or create a ProcessingJob
     * const processingJob = await prisma.processingJob.upsert({
     *   create: {
     *     // ... data to create a ProcessingJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProcessingJob we want to update
     *   }
     * })
     */
    upsert<T extends ProcessingJobUpsertArgs>(args: SelectSubset<T, ProcessingJobUpsertArgs<ExtArgs>>): Prisma__ProcessingJobClient<$Result.GetResult<Prisma.$ProcessingJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProcessingJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingJobCountArgs} args - Arguments to filter ProcessingJobs to count.
     * @example
     * // Count the number of ProcessingJobs
     * const count = await prisma.processingJob.count({
     *   where: {
     *     // ... the filter for the ProcessingJobs we want to count
     *   }
     * })
    **/
    count<T extends ProcessingJobCountArgs>(
      args?: Subset<T, ProcessingJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcessingJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProcessingJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProcessingJobAggregateArgs>(args: Subset<T, ProcessingJobAggregateArgs>): Prisma.PrismaPromise<GetProcessingJobAggregateType<T>>

    /**
     * Group by ProcessingJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingJobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProcessingJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcessingJobGroupByArgs['orderBy'] }
        : { orderBy?: ProcessingJobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProcessingJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessingJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProcessingJob model
   */
  readonly fields: ProcessingJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProcessingJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcessingJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProcessingJob model
   */
  interface ProcessingJobFieldRefs {
    readonly id: FieldRef<"ProcessingJob", 'String'>
    readonly documentId: FieldRef<"ProcessingJob", 'String'>
    readonly inngestJobId: FieldRef<"ProcessingJob", 'String'>
    readonly currentStage: FieldRef<"ProcessingJob", 'PipelineStage'>
    readonly stageStatus: FieldRef<"ProcessingJob", 'StageStatus'>
    readonly retryCount: FieldRef<"ProcessingJob", 'Int'>
    readonly errorMessage: FieldRef<"ProcessingJob", 'String'>
    readonly startedAt: FieldRef<"ProcessingJob", 'DateTime'>
    readonly completedAt: FieldRef<"ProcessingJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProcessingJob findUnique
   */
  export type ProcessingJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingJob
     */
    select?: ProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingJob
     */
    omit?: ProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingJobInclude<ExtArgs> | null
    /**
     * Filter, which ProcessingJob to fetch.
     */
    where: ProcessingJobWhereUniqueInput
  }

  /**
   * ProcessingJob findUniqueOrThrow
   */
  export type ProcessingJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingJob
     */
    select?: ProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingJob
     */
    omit?: ProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingJobInclude<ExtArgs> | null
    /**
     * Filter, which ProcessingJob to fetch.
     */
    where: ProcessingJobWhereUniqueInput
  }

  /**
   * ProcessingJob findFirst
   */
  export type ProcessingJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingJob
     */
    select?: ProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingJob
     */
    omit?: ProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingJobInclude<ExtArgs> | null
    /**
     * Filter, which ProcessingJob to fetch.
     */
    where?: ProcessingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessingJobs to fetch.
     */
    orderBy?: ProcessingJobOrderByWithRelationInput | ProcessingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessingJobs.
     */
    cursor?: ProcessingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessingJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessingJobs.
     */
    distinct?: ProcessingJobScalarFieldEnum | ProcessingJobScalarFieldEnum[]
  }

  /**
   * ProcessingJob findFirstOrThrow
   */
  export type ProcessingJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingJob
     */
    select?: ProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingJob
     */
    omit?: ProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingJobInclude<ExtArgs> | null
    /**
     * Filter, which ProcessingJob to fetch.
     */
    where?: ProcessingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessingJobs to fetch.
     */
    orderBy?: ProcessingJobOrderByWithRelationInput | ProcessingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessingJobs.
     */
    cursor?: ProcessingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessingJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessingJobs.
     */
    distinct?: ProcessingJobScalarFieldEnum | ProcessingJobScalarFieldEnum[]
  }

  /**
   * ProcessingJob findMany
   */
  export type ProcessingJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingJob
     */
    select?: ProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingJob
     */
    omit?: ProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingJobInclude<ExtArgs> | null
    /**
     * Filter, which ProcessingJobs to fetch.
     */
    where?: ProcessingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessingJobs to fetch.
     */
    orderBy?: ProcessingJobOrderByWithRelationInput | ProcessingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProcessingJobs.
     */
    cursor?: ProcessingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessingJobs.
     */
    skip?: number
    distinct?: ProcessingJobScalarFieldEnum | ProcessingJobScalarFieldEnum[]
  }

  /**
   * ProcessingJob create
   */
  export type ProcessingJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingJob
     */
    select?: ProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingJob
     */
    omit?: ProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingJobInclude<ExtArgs> | null
    /**
     * The data needed to create a ProcessingJob.
     */
    data: XOR<ProcessingJobCreateInput, ProcessingJobUncheckedCreateInput>
  }

  /**
   * ProcessingJob createMany
   */
  export type ProcessingJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProcessingJobs.
     */
    data: ProcessingJobCreateManyInput | ProcessingJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessingJob createManyAndReturn
   */
  export type ProcessingJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingJob
     */
    select?: ProcessingJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingJob
     */
    omit?: ProcessingJobOmit<ExtArgs> | null
    /**
     * The data used to create many ProcessingJobs.
     */
    data: ProcessingJobCreateManyInput | ProcessingJobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingJobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProcessingJob update
   */
  export type ProcessingJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingJob
     */
    select?: ProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingJob
     */
    omit?: ProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingJobInclude<ExtArgs> | null
    /**
     * The data needed to update a ProcessingJob.
     */
    data: XOR<ProcessingJobUpdateInput, ProcessingJobUncheckedUpdateInput>
    /**
     * Choose, which ProcessingJob to update.
     */
    where: ProcessingJobWhereUniqueInput
  }

  /**
   * ProcessingJob updateMany
   */
  export type ProcessingJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProcessingJobs.
     */
    data: XOR<ProcessingJobUpdateManyMutationInput, ProcessingJobUncheckedUpdateManyInput>
    /**
     * Filter which ProcessingJobs to update
     */
    where?: ProcessingJobWhereInput
    /**
     * Limit how many ProcessingJobs to update.
     */
    limit?: number
  }

  /**
   * ProcessingJob updateManyAndReturn
   */
  export type ProcessingJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingJob
     */
    select?: ProcessingJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingJob
     */
    omit?: ProcessingJobOmit<ExtArgs> | null
    /**
     * The data used to update ProcessingJobs.
     */
    data: XOR<ProcessingJobUpdateManyMutationInput, ProcessingJobUncheckedUpdateManyInput>
    /**
     * Filter which ProcessingJobs to update
     */
    where?: ProcessingJobWhereInput
    /**
     * Limit how many ProcessingJobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingJobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProcessingJob upsert
   */
  export type ProcessingJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingJob
     */
    select?: ProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingJob
     */
    omit?: ProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingJobInclude<ExtArgs> | null
    /**
     * The filter to search for the ProcessingJob to update in case it exists.
     */
    where: ProcessingJobWhereUniqueInput
    /**
     * In case the ProcessingJob found by the `where` argument doesn't exist, create a new ProcessingJob with this data.
     */
    create: XOR<ProcessingJobCreateInput, ProcessingJobUncheckedCreateInput>
    /**
     * In case the ProcessingJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcessingJobUpdateInput, ProcessingJobUncheckedUpdateInput>
  }

  /**
   * ProcessingJob delete
   */
  export type ProcessingJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingJob
     */
    select?: ProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingJob
     */
    omit?: ProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingJobInclude<ExtArgs> | null
    /**
     * Filter which ProcessingJob to delete.
     */
    where: ProcessingJobWhereUniqueInput
  }

  /**
   * ProcessingJob deleteMany
   */
  export type ProcessingJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessingJobs to delete
     */
    where?: ProcessingJobWhereInput
    /**
     * Limit how many ProcessingJobs to delete.
     */
    limit?: number
  }

  /**
   * ProcessingJob without action
   */
  export type ProcessingJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingJob
     */
    select?: ProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingJob
     */
    omit?: ProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingJobInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogAvgAggregateOutputType = {
    confidence: number | null
    processingTime: number | null
    tokensUsed: number | null
    cost: number | null
    agreementLevel: number | null
  }

  export type AuditLogSumAggregateOutputType = {
    confidence: number | null
    processingTime: number | null
    tokensUsed: number | null
    cost: number | null
    agreementLevel: number | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    stage: $Enums.PipelineStage | null
    llmProvider: string | null
    llmModel: string | null
    promptTemplate: string | null
    promptUsed: string | null
    rawResponse: string | null
    confidence: number | null
    processingTime: number | null
    tokensUsed: number | null
    cost: number | null
    attemptId: string | null
    inngestEventId: string | null
    agreementLevel: number | null
    sensitive: boolean | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    stage: $Enums.PipelineStage | null
    llmProvider: string | null
    llmModel: string | null
    promptTemplate: string | null
    promptUsed: string | null
    rawResponse: string | null
    confidence: number | null
    processingTime: number | null
    tokensUsed: number | null
    cost: number | null
    attemptId: string | null
    inngestEventId: string | null
    agreementLevel: number | null
    sensitive: boolean | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    documentId: number
    stage: number
    llmProvider: number
    llmModel: number
    promptTemplate: number
    promptUsed: number
    rawResponse: number
    extractedData: number
    confidence: number
    processingTime: number
    tokensUsed: number
    cost: number
    attemptId: number
    inngestEventId: number
    agreementLevel: number
    providerWeights: number
    sensitive: number
    createdAt: number
    _all: number
  }


  export type AuditLogAvgAggregateInputType = {
    confidence?: true
    processingTime?: true
    tokensUsed?: true
    cost?: true
    agreementLevel?: true
  }

  export type AuditLogSumAggregateInputType = {
    confidence?: true
    processingTime?: true
    tokensUsed?: true
    cost?: true
    agreementLevel?: true
  }

  export type AuditLogMinAggregateInputType = {
    id?: true
    documentId?: true
    stage?: true
    llmProvider?: true
    llmModel?: true
    promptTemplate?: true
    promptUsed?: true
    rawResponse?: true
    confidence?: true
    processingTime?: true
    tokensUsed?: true
    cost?: true
    attemptId?: true
    inngestEventId?: true
    agreementLevel?: true
    sensitive?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    documentId?: true
    stage?: true
    llmProvider?: true
    llmModel?: true
    promptTemplate?: true
    promptUsed?: true
    rawResponse?: true
    confidence?: true
    processingTime?: true
    tokensUsed?: true
    cost?: true
    attemptId?: true
    inngestEventId?: true
    agreementLevel?: true
    sensitive?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    documentId?: true
    stage?: true
    llmProvider?: true
    llmModel?: true
    promptTemplate?: true
    promptUsed?: true
    rawResponse?: true
    extractedData?: true
    confidence?: true
    processingTime?: true
    tokensUsed?: true
    cost?: true
    attemptId?: true
    inngestEventId?: true
    agreementLevel?: true
    providerWeights?: true
    sensitive?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _avg?: AuditLogAvgAggregateInputType
    _sum?: AuditLogSumAggregateInputType
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    documentId: string
    stage: $Enums.PipelineStage
    llmProvider: string
    llmModel: string
    promptTemplate: string
    promptUsed: string
    rawResponse: string
    extractedData: JsonValue | null
    confidence: number | null
    processingTime: number | null
    tokensUsed: number | null
    cost: number | null
    attemptId: string | null
    inngestEventId: string | null
    agreementLevel: number | null
    providerWeights: JsonValue | null
    sensitive: boolean
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    stage?: boolean
    llmProvider?: boolean
    llmModel?: boolean
    promptTemplate?: boolean
    promptUsed?: boolean
    rawResponse?: boolean
    extractedData?: boolean
    confidence?: boolean
    processingTime?: boolean
    tokensUsed?: boolean
    cost?: boolean
    attemptId?: boolean
    inngestEventId?: boolean
    agreementLevel?: boolean
    providerWeights?: boolean
    sensitive?: boolean
    createdAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    stage?: boolean
    llmProvider?: boolean
    llmModel?: boolean
    promptTemplate?: boolean
    promptUsed?: boolean
    rawResponse?: boolean
    extractedData?: boolean
    confidence?: boolean
    processingTime?: boolean
    tokensUsed?: boolean
    cost?: boolean
    attemptId?: boolean
    inngestEventId?: boolean
    agreementLevel?: boolean
    providerWeights?: boolean
    sensitive?: boolean
    createdAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    stage?: boolean
    llmProvider?: boolean
    llmModel?: boolean
    promptTemplate?: boolean
    promptUsed?: boolean
    rawResponse?: boolean
    extractedData?: boolean
    confidence?: boolean
    processingTime?: boolean
    tokensUsed?: boolean
    cost?: boolean
    attemptId?: boolean
    inngestEventId?: boolean
    agreementLevel?: boolean
    providerWeights?: boolean
    sensitive?: boolean
    createdAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    documentId?: boolean
    stage?: boolean
    llmProvider?: boolean
    llmModel?: boolean
    promptTemplate?: boolean
    promptUsed?: boolean
    rawResponse?: boolean
    extractedData?: boolean
    confidence?: boolean
    processingTime?: boolean
    tokensUsed?: boolean
    cost?: boolean
    attemptId?: boolean
    inngestEventId?: boolean
    agreementLevel?: boolean
    providerWeights?: boolean
    sensitive?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentId" | "stage" | "llmProvider" | "llmModel" | "promptTemplate" | "promptUsed" | "rawResponse" | "extractedData" | "confidence" | "processingTime" | "tokensUsed" | "cost" | "attemptId" | "inngestEventId" | "agreementLevel" | "providerWeights" | "sensitive" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentId: string
      stage: $Enums.PipelineStage
      llmProvider: string
      llmModel: string
      promptTemplate: string
      promptUsed: string
      rawResponse: string
      extractedData: Prisma.JsonValue | null
      confidence: number | null
      processingTime: number | null
      tokensUsed: number | null
      cost: number | null
      attemptId: string | null
      inngestEventId: string | null
      agreementLevel: number | null
      providerWeights: Prisma.JsonValue | null
      sensitive: boolean
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly documentId: FieldRef<"AuditLog", 'String'>
    readonly stage: FieldRef<"AuditLog", 'PipelineStage'>
    readonly llmProvider: FieldRef<"AuditLog", 'String'>
    readonly llmModel: FieldRef<"AuditLog", 'String'>
    readonly promptTemplate: FieldRef<"AuditLog", 'String'>
    readonly promptUsed: FieldRef<"AuditLog", 'String'>
    readonly rawResponse: FieldRef<"AuditLog", 'String'>
    readonly extractedData: FieldRef<"AuditLog", 'Json'>
    readonly confidence: FieldRef<"AuditLog", 'Float'>
    readonly processingTime: FieldRef<"AuditLog", 'Int'>
    readonly tokensUsed: FieldRef<"AuditLog", 'Int'>
    readonly cost: FieldRef<"AuditLog", 'Float'>
    readonly attemptId: FieldRef<"AuditLog", 'String'>
    readonly inngestEventId: FieldRef<"AuditLog", 'String'>
    readonly agreementLevel: FieldRef<"AuditLog", 'Float'>
    readonly providerWeights: FieldRef<"AuditLog", 'Json'>
    readonly sensitive: FieldRef<"AuditLog", 'Boolean'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model PromptTemplate
   */

  export type AggregatePromptTemplate = {
    _count: PromptTemplateCountAggregateOutputType | null
    _min: PromptTemplateMinAggregateOutputType | null
    _max: PromptTemplateMaxAggregateOutputType | null
  }

  export type PromptTemplateMinAggregateOutputType = {
    id: string | null
    name: string | null
    category: $Enums.PromptCategory | null
    version: string | null
    template: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PromptTemplateMaxAggregateOutputType = {
    id: string | null
    name: string | null
    category: $Enums.PromptCategory | null
    version: string | null
    template: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PromptTemplateCountAggregateOutputType = {
    id: number
    name: number
    category: number
    version: number
    template: number
    variables: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PromptTemplateMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    version?: true
    template?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PromptTemplateMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    version?: true
    template?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PromptTemplateCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    version?: true
    template?: true
    variables?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PromptTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PromptTemplate to aggregate.
     */
    where?: PromptTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromptTemplates to fetch.
     */
    orderBy?: PromptTemplateOrderByWithRelationInput | PromptTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PromptTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromptTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromptTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PromptTemplates
    **/
    _count?: true | PromptTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PromptTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PromptTemplateMaxAggregateInputType
  }

  export type GetPromptTemplateAggregateType<T extends PromptTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregatePromptTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePromptTemplate[P]>
      : GetScalarType<T[P], AggregatePromptTemplate[P]>
  }




  export type PromptTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromptTemplateWhereInput
    orderBy?: PromptTemplateOrderByWithAggregationInput | PromptTemplateOrderByWithAggregationInput[]
    by: PromptTemplateScalarFieldEnum[] | PromptTemplateScalarFieldEnum
    having?: PromptTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PromptTemplateCountAggregateInputType | true
    _min?: PromptTemplateMinAggregateInputType
    _max?: PromptTemplateMaxAggregateInputType
  }

  export type PromptTemplateGroupByOutputType = {
    id: string
    name: string
    category: $Enums.PromptCategory
    version: string
    template: string
    variables: JsonValue
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: PromptTemplateCountAggregateOutputType | null
    _min: PromptTemplateMinAggregateOutputType | null
    _max: PromptTemplateMaxAggregateOutputType | null
  }

  type GetPromptTemplateGroupByPayload<T extends PromptTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PromptTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PromptTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromptTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], PromptTemplateGroupByOutputType[P]>
        }
      >
    >


  export type PromptTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    version?: boolean
    template?: boolean
    variables?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["promptTemplate"]>

  export type PromptTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    version?: boolean
    template?: boolean
    variables?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["promptTemplate"]>

  export type PromptTemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    version?: boolean
    template?: boolean
    variables?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["promptTemplate"]>

  export type PromptTemplateSelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
    version?: boolean
    template?: boolean
    variables?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PromptTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "category" | "version" | "template" | "variables" | "description" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["promptTemplate"]>

  export type $PromptTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PromptTemplate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      category: $Enums.PromptCategory
      version: string
      template: string
      variables: Prisma.JsonValue
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["promptTemplate"]>
    composites: {}
  }

  type PromptTemplateGetPayload<S extends boolean | null | undefined | PromptTemplateDefaultArgs> = $Result.GetResult<Prisma.$PromptTemplatePayload, S>

  type PromptTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PromptTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PromptTemplateCountAggregateInputType | true
    }

  export interface PromptTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PromptTemplate'], meta: { name: 'PromptTemplate' } }
    /**
     * Find zero or one PromptTemplate that matches the filter.
     * @param {PromptTemplateFindUniqueArgs} args - Arguments to find a PromptTemplate
     * @example
     * // Get one PromptTemplate
     * const promptTemplate = await prisma.promptTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromptTemplateFindUniqueArgs>(args: SelectSubset<T, PromptTemplateFindUniqueArgs<ExtArgs>>): Prisma__PromptTemplateClient<$Result.GetResult<Prisma.$PromptTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PromptTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PromptTemplateFindUniqueOrThrowArgs} args - Arguments to find a PromptTemplate
     * @example
     * // Get one PromptTemplate
     * const promptTemplate = await prisma.promptTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromptTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, PromptTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PromptTemplateClient<$Result.GetResult<Prisma.$PromptTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PromptTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptTemplateFindFirstArgs} args - Arguments to find a PromptTemplate
     * @example
     * // Get one PromptTemplate
     * const promptTemplate = await prisma.promptTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromptTemplateFindFirstArgs>(args?: SelectSubset<T, PromptTemplateFindFirstArgs<ExtArgs>>): Prisma__PromptTemplateClient<$Result.GetResult<Prisma.$PromptTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PromptTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptTemplateFindFirstOrThrowArgs} args - Arguments to find a PromptTemplate
     * @example
     * // Get one PromptTemplate
     * const promptTemplate = await prisma.promptTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromptTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, PromptTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__PromptTemplateClient<$Result.GetResult<Prisma.$PromptTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PromptTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PromptTemplates
     * const promptTemplates = await prisma.promptTemplate.findMany()
     * 
     * // Get first 10 PromptTemplates
     * const promptTemplates = await prisma.promptTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const promptTemplateWithIdOnly = await prisma.promptTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PromptTemplateFindManyArgs>(args?: SelectSubset<T, PromptTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromptTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PromptTemplate.
     * @param {PromptTemplateCreateArgs} args - Arguments to create a PromptTemplate.
     * @example
     * // Create one PromptTemplate
     * const PromptTemplate = await prisma.promptTemplate.create({
     *   data: {
     *     // ... data to create a PromptTemplate
     *   }
     * })
     * 
     */
    create<T extends PromptTemplateCreateArgs>(args: SelectSubset<T, PromptTemplateCreateArgs<ExtArgs>>): Prisma__PromptTemplateClient<$Result.GetResult<Prisma.$PromptTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PromptTemplates.
     * @param {PromptTemplateCreateManyArgs} args - Arguments to create many PromptTemplates.
     * @example
     * // Create many PromptTemplates
     * const promptTemplate = await prisma.promptTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PromptTemplateCreateManyArgs>(args?: SelectSubset<T, PromptTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PromptTemplates and returns the data saved in the database.
     * @param {PromptTemplateCreateManyAndReturnArgs} args - Arguments to create many PromptTemplates.
     * @example
     * // Create many PromptTemplates
     * const promptTemplate = await prisma.promptTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PromptTemplates and only return the `id`
     * const promptTemplateWithIdOnly = await prisma.promptTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PromptTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, PromptTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromptTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PromptTemplate.
     * @param {PromptTemplateDeleteArgs} args - Arguments to delete one PromptTemplate.
     * @example
     * // Delete one PromptTemplate
     * const PromptTemplate = await prisma.promptTemplate.delete({
     *   where: {
     *     // ... filter to delete one PromptTemplate
     *   }
     * })
     * 
     */
    delete<T extends PromptTemplateDeleteArgs>(args: SelectSubset<T, PromptTemplateDeleteArgs<ExtArgs>>): Prisma__PromptTemplateClient<$Result.GetResult<Prisma.$PromptTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PromptTemplate.
     * @param {PromptTemplateUpdateArgs} args - Arguments to update one PromptTemplate.
     * @example
     * // Update one PromptTemplate
     * const promptTemplate = await prisma.promptTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PromptTemplateUpdateArgs>(args: SelectSubset<T, PromptTemplateUpdateArgs<ExtArgs>>): Prisma__PromptTemplateClient<$Result.GetResult<Prisma.$PromptTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PromptTemplates.
     * @param {PromptTemplateDeleteManyArgs} args - Arguments to filter PromptTemplates to delete.
     * @example
     * // Delete a few PromptTemplates
     * const { count } = await prisma.promptTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PromptTemplateDeleteManyArgs>(args?: SelectSubset<T, PromptTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PromptTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PromptTemplates
     * const promptTemplate = await prisma.promptTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PromptTemplateUpdateManyArgs>(args: SelectSubset<T, PromptTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PromptTemplates and returns the data updated in the database.
     * @param {PromptTemplateUpdateManyAndReturnArgs} args - Arguments to update many PromptTemplates.
     * @example
     * // Update many PromptTemplates
     * const promptTemplate = await prisma.promptTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PromptTemplates and only return the `id`
     * const promptTemplateWithIdOnly = await prisma.promptTemplate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PromptTemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, PromptTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromptTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PromptTemplate.
     * @param {PromptTemplateUpsertArgs} args - Arguments to update or create a PromptTemplate.
     * @example
     * // Update or create a PromptTemplate
     * const promptTemplate = await prisma.promptTemplate.upsert({
     *   create: {
     *     // ... data to create a PromptTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PromptTemplate we want to update
     *   }
     * })
     */
    upsert<T extends PromptTemplateUpsertArgs>(args: SelectSubset<T, PromptTemplateUpsertArgs<ExtArgs>>): Prisma__PromptTemplateClient<$Result.GetResult<Prisma.$PromptTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PromptTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptTemplateCountArgs} args - Arguments to filter PromptTemplates to count.
     * @example
     * // Count the number of PromptTemplates
     * const count = await prisma.promptTemplate.count({
     *   where: {
     *     // ... the filter for the PromptTemplates we want to count
     *   }
     * })
    **/
    count<T extends PromptTemplateCountArgs>(
      args?: Subset<T, PromptTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PromptTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PromptTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PromptTemplateAggregateArgs>(args: Subset<T, PromptTemplateAggregateArgs>): Prisma.PrismaPromise<GetPromptTemplateAggregateType<T>>

    /**
     * Group by PromptTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PromptTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromptTemplateGroupByArgs['orderBy'] }
        : { orderBy?: PromptTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PromptTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromptTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PromptTemplate model
   */
  readonly fields: PromptTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PromptTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromptTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PromptTemplate model
   */
  interface PromptTemplateFieldRefs {
    readonly id: FieldRef<"PromptTemplate", 'String'>
    readonly name: FieldRef<"PromptTemplate", 'String'>
    readonly category: FieldRef<"PromptTemplate", 'PromptCategory'>
    readonly version: FieldRef<"PromptTemplate", 'String'>
    readonly template: FieldRef<"PromptTemplate", 'String'>
    readonly variables: FieldRef<"PromptTemplate", 'Json'>
    readonly description: FieldRef<"PromptTemplate", 'String'>
    readonly isActive: FieldRef<"PromptTemplate", 'Boolean'>
    readonly createdAt: FieldRef<"PromptTemplate", 'DateTime'>
    readonly updatedAt: FieldRef<"PromptTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PromptTemplate findUnique
   */
  export type PromptTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null
    /**
     * Filter, which PromptTemplate to fetch.
     */
    where: PromptTemplateWhereUniqueInput
  }

  /**
   * PromptTemplate findUniqueOrThrow
   */
  export type PromptTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null
    /**
     * Filter, which PromptTemplate to fetch.
     */
    where: PromptTemplateWhereUniqueInput
  }

  /**
   * PromptTemplate findFirst
   */
  export type PromptTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null
    /**
     * Filter, which PromptTemplate to fetch.
     */
    where?: PromptTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromptTemplates to fetch.
     */
    orderBy?: PromptTemplateOrderByWithRelationInput | PromptTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PromptTemplates.
     */
    cursor?: PromptTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromptTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromptTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PromptTemplates.
     */
    distinct?: PromptTemplateScalarFieldEnum | PromptTemplateScalarFieldEnum[]
  }

  /**
   * PromptTemplate findFirstOrThrow
   */
  export type PromptTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null
    /**
     * Filter, which PromptTemplate to fetch.
     */
    where?: PromptTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromptTemplates to fetch.
     */
    orderBy?: PromptTemplateOrderByWithRelationInput | PromptTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PromptTemplates.
     */
    cursor?: PromptTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromptTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromptTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PromptTemplates.
     */
    distinct?: PromptTemplateScalarFieldEnum | PromptTemplateScalarFieldEnum[]
  }

  /**
   * PromptTemplate findMany
   */
  export type PromptTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null
    /**
     * Filter, which PromptTemplates to fetch.
     */
    where?: PromptTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromptTemplates to fetch.
     */
    orderBy?: PromptTemplateOrderByWithRelationInput | PromptTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PromptTemplates.
     */
    cursor?: PromptTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromptTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromptTemplates.
     */
    skip?: number
    distinct?: PromptTemplateScalarFieldEnum | PromptTemplateScalarFieldEnum[]
  }

  /**
   * PromptTemplate create
   */
  export type PromptTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null
    /**
     * The data needed to create a PromptTemplate.
     */
    data: XOR<PromptTemplateCreateInput, PromptTemplateUncheckedCreateInput>
  }

  /**
   * PromptTemplate createMany
   */
  export type PromptTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PromptTemplates.
     */
    data: PromptTemplateCreateManyInput | PromptTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PromptTemplate createManyAndReturn
   */
  export type PromptTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many PromptTemplates.
     */
    data: PromptTemplateCreateManyInput | PromptTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PromptTemplate update
   */
  export type PromptTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null
    /**
     * The data needed to update a PromptTemplate.
     */
    data: XOR<PromptTemplateUpdateInput, PromptTemplateUncheckedUpdateInput>
    /**
     * Choose, which PromptTemplate to update.
     */
    where: PromptTemplateWhereUniqueInput
  }

  /**
   * PromptTemplate updateMany
   */
  export type PromptTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PromptTemplates.
     */
    data: XOR<PromptTemplateUpdateManyMutationInput, PromptTemplateUncheckedUpdateManyInput>
    /**
     * Filter which PromptTemplates to update
     */
    where?: PromptTemplateWhereInput
    /**
     * Limit how many PromptTemplates to update.
     */
    limit?: number
  }

  /**
   * PromptTemplate updateManyAndReturn
   */
  export type PromptTemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null
    /**
     * The data used to update PromptTemplates.
     */
    data: XOR<PromptTemplateUpdateManyMutationInput, PromptTemplateUncheckedUpdateManyInput>
    /**
     * Filter which PromptTemplates to update
     */
    where?: PromptTemplateWhereInput
    /**
     * Limit how many PromptTemplates to update.
     */
    limit?: number
  }

  /**
   * PromptTemplate upsert
   */
  export type PromptTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null
    /**
     * The filter to search for the PromptTemplate to update in case it exists.
     */
    where: PromptTemplateWhereUniqueInput
    /**
     * In case the PromptTemplate found by the `where` argument doesn't exist, create a new PromptTemplate with this data.
     */
    create: XOR<PromptTemplateCreateInput, PromptTemplateUncheckedCreateInput>
    /**
     * In case the PromptTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromptTemplateUpdateInput, PromptTemplateUncheckedUpdateInput>
  }

  /**
   * PromptTemplate delete
   */
  export type PromptTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null
    /**
     * Filter which PromptTemplate to delete.
     */
    where: PromptTemplateWhereUniqueInput
  }

  /**
   * PromptTemplate deleteMany
   */
  export type PromptTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PromptTemplates to delete
     */
    where?: PromptTemplateWhereInput
    /**
     * Limit how many PromptTemplates to delete.
     */
    limit?: number
  }

  /**
   * PromptTemplate without action
   */
  export type PromptTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const ApiKeyScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    key: 'key',
    name: 'name',
    isActive: 'isActive',
    lastUsed: 'lastUsed',
    createdAt: 'createdAt'
  };

  export type ApiKeyScalarFieldEnum = (typeof ApiKeyScalarFieldEnum)[keyof typeof ApiKeyScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    originalFilename: 'originalFilename',
    mimeType: 'mimeType',
    fileSize: 'fileSize',
    s3Key: 's3Key',
    s3Bucket: 's3Bucket',
    documentType: 'documentType',
    status: 'status',
    confidence: 'confidence',
    parsedData: 'parsedData',
    needsReview: 'needsReview',
    reviewedAt: 'reviewedAt',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const ProcessingJobScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    inngestJobId: 'inngestJobId',
    currentStage: 'currentStage',
    stageStatus: 'stageStatus',
    retryCount: 'retryCount',
    errorMessage: 'errorMessage',
    startedAt: 'startedAt',
    completedAt: 'completedAt'
  };

  export type ProcessingJobScalarFieldEnum = (typeof ProcessingJobScalarFieldEnum)[keyof typeof ProcessingJobScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    stage: 'stage',
    llmProvider: 'llmProvider',
    llmModel: 'llmModel',
    promptTemplate: 'promptTemplate',
    promptUsed: 'promptUsed',
    rawResponse: 'rawResponse',
    extractedData: 'extractedData',
    confidence: 'confidence',
    processingTime: 'processingTime',
    tokensUsed: 'tokensUsed',
    cost: 'cost',
    attemptId: 'attemptId',
    inngestEventId: 'inngestEventId',
    agreementLevel: 'agreementLevel',
    providerWeights: 'providerWeights',
    sensitive: 'sensitive',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const PromptTemplateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    version: 'version',
    template: 'template',
    variables: 'variables',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PromptTemplateScalarFieldEnum = (typeof PromptTemplateScalarFieldEnum)[keyof typeof PromptTemplateScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DocumentType'
   */
  export type EnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType'>
    


  /**
   * Reference to a field of type 'DocumentType[]'
   */
  export type ListEnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType[]'>
    


  /**
   * Reference to a field of type 'DocumentStatus'
   */
  export type EnumDocumentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentStatus'>
    


  /**
   * Reference to a field of type 'DocumentStatus[]'
   */
  export type ListEnumDocumentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'PipelineStage'
   */
  export type EnumPipelineStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PipelineStage'>
    


  /**
   * Reference to a field of type 'PipelineStage[]'
   */
  export type ListEnumPipelineStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PipelineStage[]'>
    


  /**
   * Reference to a field of type 'StageStatus'
   */
  export type EnumStageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StageStatus'>
    


  /**
   * Reference to a field of type 'StageStatus[]'
   */
  export type ListEnumStageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StageStatus[]'>
    


  /**
   * Reference to a field of type 'PromptCategory'
   */
  export type EnumPromptCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromptCategory'>
    


  /**
   * Reference to a field of type 'PromptCategory[]'
   */
  export type ListEnumPromptCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromptCategory[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    documents?: DocumentListRelationFilter
    sessions?: SessionListRelationFilter
    apiKeys?: ApiKeyListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    documents?: DocumentOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    apiKeys?: ApiKeyOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    documents?: DocumentListRelationFilter
    sessions?: SessionListRelationFilter
    apiKeys?: ApiKeyListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    token?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type ApiKeyWhereInput = {
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    userId?: StringFilter<"ApiKey"> | string
    key?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    isActive?: BoolFilter<"ApiKey"> | boolean
    lastUsed?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ApiKeyOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    key?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    lastUsed?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ApiKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    userId?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    isActive?: BoolFilter<"ApiKey"> | boolean
    lastUsed?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "key">

  export type ApiKeyOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    key?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    lastUsed?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ApiKeyCountOrderByAggregateInput
    _max?: ApiKeyMaxOrderByAggregateInput
    _min?: ApiKeyMinOrderByAggregateInput
  }

  export type ApiKeyScalarWhereWithAggregatesInput = {
    AND?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    OR?: ApiKeyScalarWhereWithAggregatesInput[]
    NOT?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiKey"> | string
    userId?: StringWithAggregatesFilter<"ApiKey"> | string
    key?: StringWithAggregatesFilter<"ApiKey"> | string
    name?: StringWithAggregatesFilter<"ApiKey"> | string
    isActive?: BoolWithAggregatesFilter<"ApiKey"> | boolean
    lastUsed?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    userId?: StringFilter<"Document"> | string
    originalFilename?: StringFilter<"Document"> | string
    mimeType?: StringFilter<"Document"> | string
    fileSize?: IntFilter<"Document"> | number
    s3Key?: StringFilter<"Document"> | string
    s3Bucket?: StringFilter<"Document"> | string
    documentType?: EnumDocumentTypeNullableFilter<"Document"> | $Enums.DocumentType | null
    status?: EnumDocumentStatusFilter<"Document"> | $Enums.DocumentStatus
    confidence?: FloatNullableFilter<"Document"> | number | null
    parsedData?: JsonNullableFilter<"Document">
    needsReview?: BoolFilter<"Document"> | boolean
    reviewedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    processingJobs?: ProcessingJobListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    originalFilename?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    s3Key?: SortOrder
    s3Bucket?: SortOrder
    documentType?: SortOrderInput | SortOrder
    status?: SortOrder
    confidence?: SortOrderInput | SortOrder
    parsedData?: SortOrderInput | SortOrder
    needsReview?: SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    processingJobs?: ProcessingJobOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    s3Key?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    userId?: StringFilter<"Document"> | string
    originalFilename?: StringFilter<"Document"> | string
    mimeType?: StringFilter<"Document"> | string
    fileSize?: IntFilter<"Document"> | number
    s3Bucket?: StringFilter<"Document"> | string
    documentType?: EnumDocumentTypeNullableFilter<"Document"> | $Enums.DocumentType | null
    status?: EnumDocumentStatusFilter<"Document"> | $Enums.DocumentStatus
    confidence?: FloatNullableFilter<"Document"> | number | null
    parsedData?: JsonNullableFilter<"Document">
    needsReview?: BoolFilter<"Document"> | boolean
    reviewedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    processingJobs?: ProcessingJobListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "s3Key">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    originalFilename?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    s3Key?: SortOrder
    s3Bucket?: SortOrder
    documentType?: SortOrderInput | SortOrder
    status?: SortOrder
    confidence?: SortOrderInput | SortOrder
    parsedData?: SortOrderInput | SortOrder
    needsReview?: SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    userId?: StringWithAggregatesFilter<"Document"> | string
    originalFilename?: StringWithAggregatesFilter<"Document"> | string
    mimeType?: StringWithAggregatesFilter<"Document"> | string
    fileSize?: IntWithAggregatesFilter<"Document"> | number
    s3Key?: StringWithAggregatesFilter<"Document"> | string
    s3Bucket?: StringWithAggregatesFilter<"Document"> | string
    documentType?: EnumDocumentTypeNullableWithAggregatesFilter<"Document"> | $Enums.DocumentType | null
    status?: EnumDocumentStatusWithAggregatesFilter<"Document"> | $Enums.DocumentStatus
    confidence?: FloatNullableWithAggregatesFilter<"Document"> | number | null
    parsedData?: JsonNullableWithAggregatesFilter<"Document">
    needsReview?: BoolWithAggregatesFilter<"Document"> | boolean
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
  }

  export type ProcessingJobWhereInput = {
    AND?: ProcessingJobWhereInput | ProcessingJobWhereInput[]
    OR?: ProcessingJobWhereInput[]
    NOT?: ProcessingJobWhereInput | ProcessingJobWhereInput[]
    id?: StringFilter<"ProcessingJob"> | string
    documentId?: StringFilter<"ProcessingJob"> | string
    inngestJobId?: StringFilter<"ProcessingJob"> | string
    currentStage?: EnumPipelineStageFilter<"ProcessingJob"> | $Enums.PipelineStage
    stageStatus?: EnumStageStatusFilter<"ProcessingJob"> | $Enums.StageStatus
    retryCount?: IntFilter<"ProcessingJob"> | number
    errorMessage?: StringNullableFilter<"ProcessingJob"> | string | null
    startedAt?: DateTimeFilter<"ProcessingJob"> | Date | string
    completedAt?: DateTimeNullableFilter<"ProcessingJob"> | Date | string | null
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }

  export type ProcessingJobOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    inngestJobId?: SortOrder
    currentStage?: SortOrder
    stageStatus?: SortOrder
    retryCount?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    document?: DocumentOrderByWithRelationInput
  }

  export type ProcessingJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    inngestJobId?: string
    AND?: ProcessingJobWhereInput | ProcessingJobWhereInput[]
    OR?: ProcessingJobWhereInput[]
    NOT?: ProcessingJobWhereInput | ProcessingJobWhereInput[]
    documentId?: StringFilter<"ProcessingJob"> | string
    currentStage?: EnumPipelineStageFilter<"ProcessingJob"> | $Enums.PipelineStage
    stageStatus?: EnumStageStatusFilter<"ProcessingJob"> | $Enums.StageStatus
    retryCount?: IntFilter<"ProcessingJob"> | number
    errorMessage?: StringNullableFilter<"ProcessingJob"> | string | null
    startedAt?: DateTimeFilter<"ProcessingJob"> | Date | string
    completedAt?: DateTimeNullableFilter<"ProcessingJob"> | Date | string | null
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }, "id" | "inngestJobId">

  export type ProcessingJobOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    inngestJobId?: SortOrder
    currentStage?: SortOrder
    stageStatus?: SortOrder
    retryCount?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: ProcessingJobCountOrderByAggregateInput
    _avg?: ProcessingJobAvgOrderByAggregateInput
    _max?: ProcessingJobMaxOrderByAggregateInput
    _min?: ProcessingJobMinOrderByAggregateInput
    _sum?: ProcessingJobSumOrderByAggregateInput
  }

  export type ProcessingJobScalarWhereWithAggregatesInput = {
    AND?: ProcessingJobScalarWhereWithAggregatesInput | ProcessingJobScalarWhereWithAggregatesInput[]
    OR?: ProcessingJobScalarWhereWithAggregatesInput[]
    NOT?: ProcessingJobScalarWhereWithAggregatesInput | ProcessingJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProcessingJob"> | string
    documentId?: StringWithAggregatesFilter<"ProcessingJob"> | string
    inngestJobId?: StringWithAggregatesFilter<"ProcessingJob"> | string
    currentStage?: EnumPipelineStageWithAggregatesFilter<"ProcessingJob"> | $Enums.PipelineStage
    stageStatus?: EnumStageStatusWithAggregatesFilter<"ProcessingJob"> | $Enums.StageStatus
    retryCount?: IntWithAggregatesFilter<"ProcessingJob"> | number
    errorMessage?: StringNullableWithAggregatesFilter<"ProcessingJob"> | string | null
    startedAt?: DateTimeWithAggregatesFilter<"ProcessingJob"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"ProcessingJob"> | Date | string | null
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    documentId?: StringFilter<"AuditLog"> | string
    stage?: EnumPipelineStageFilter<"AuditLog"> | $Enums.PipelineStage
    llmProvider?: StringFilter<"AuditLog"> | string
    llmModel?: StringFilter<"AuditLog"> | string
    promptTemplate?: StringFilter<"AuditLog"> | string
    promptUsed?: StringFilter<"AuditLog"> | string
    rawResponse?: StringFilter<"AuditLog"> | string
    extractedData?: JsonNullableFilter<"AuditLog">
    confidence?: FloatNullableFilter<"AuditLog"> | number | null
    processingTime?: IntNullableFilter<"AuditLog"> | number | null
    tokensUsed?: IntNullableFilter<"AuditLog"> | number | null
    cost?: FloatNullableFilter<"AuditLog"> | number | null
    attemptId?: StringNullableFilter<"AuditLog"> | string | null
    inngestEventId?: StringNullableFilter<"AuditLog"> | string | null
    agreementLevel?: FloatNullableFilter<"AuditLog"> | number | null
    providerWeights?: JsonNullableFilter<"AuditLog">
    sensitive?: BoolFilter<"AuditLog"> | boolean
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    stage?: SortOrder
    llmProvider?: SortOrder
    llmModel?: SortOrder
    promptTemplate?: SortOrder
    promptUsed?: SortOrder
    rawResponse?: SortOrder
    extractedData?: SortOrderInput | SortOrder
    confidence?: SortOrderInput | SortOrder
    processingTime?: SortOrderInput | SortOrder
    tokensUsed?: SortOrderInput | SortOrder
    cost?: SortOrderInput | SortOrder
    attemptId?: SortOrderInput | SortOrder
    inngestEventId?: SortOrderInput | SortOrder
    agreementLevel?: SortOrderInput | SortOrder
    providerWeights?: SortOrderInput | SortOrder
    sensitive?: SortOrder
    createdAt?: SortOrder
    document?: DocumentOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    documentId_stage_attemptId?: AuditLogDocumentIdStageAttemptIdCompoundUniqueInput
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    documentId?: StringFilter<"AuditLog"> | string
    stage?: EnumPipelineStageFilter<"AuditLog"> | $Enums.PipelineStage
    llmProvider?: StringFilter<"AuditLog"> | string
    llmModel?: StringFilter<"AuditLog"> | string
    promptTemplate?: StringFilter<"AuditLog"> | string
    promptUsed?: StringFilter<"AuditLog"> | string
    rawResponse?: StringFilter<"AuditLog"> | string
    extractedData?: JsonNullableFilter<"AuditLog">
    confidence?: FloatNullableFilter<"AuditLog"> | number | null
    processingTime?: IntNullableFilter<"AuditLog"> | number | null
    tokensUsed?: IntNullableFilter<"AuditLog"> | number | null
    cost?: FloatNullableFilter<"AuditLog"> | number | null
    attemptId?: StringNullableFilter<"AuditLog"> | string | null
    inngestEventId?: StringNullableFilter<"AuditLog"> | string | null
    agreementLevel?: FloatNullableFilter<"AuditLog"> | number | null
    providerWeights?: JsonNullableFilter<"AuditLog">
    sensitive?: BoolFilter<"AuditLog"> | boolean
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }, "id" | "documentId_stage_attemptId">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    stage?: SortOrder
    llmProvider?: SortOrder
    llmModel?: SortOrder
    promptTemplate?: SortOrder
    promptUsed?: SortOrder
    rawResponse?: SortOrder
    extractedData?: SortOrderInput | SortOrder
    confidence?: SortOrderInput | SortOrder
    processingTime?: SortOrderInput | SortOrder
    tokensUsed?: SortOrderInput | SortOrder
    cost?: SortOrderInput | SortOrder
    attemptId?: SortOrderInput | SortOrder
    inngestEventId?: SortOrderInput | SortOrder
    agreementLevel?: SortOrderInput | SortOrder
    providerWeights?: SortOrderInput | SortOrder
    sensitive?: SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _avg?: AuditLogAvgOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
    _sum?: AuditLogSumOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    documentId?: StringWithAggregatesFilter<"AuditLog"> | string
    stage?: EnumPipelineStageWithAggregatesFilter<"AuditLog"> | $Enums.PipelineStage
    llmProvider?: StringWithAggregatesFilter<"AuditLog"> | string
    llmModel?: StringWithAggregatesFilter<"AuditLog"> | string
    promptTemplate?: StringWithAggregatesFilter<"AuditLog"> | string
    promptUsed?: StringWithAggregatesFilter<"AuditLog"> | string
    rawResponse?: StringWithAggregatesFilter<"AuditLog"> | string
    extractedData?: JsonNullableWithAggregatesFilter<"AuditLog">
    confidence?: FloatNullableWithAggregatesFilter<"AuditLog"> | number | null
    processingTime?: IntNullableWithAggregatesFilter<"AuditLog"> | number | null
    tokensUsed?: IntNullableWithAggregatesFilter<"AuditLog"> | number | null
    cost?: FloatNullableWithAggregatesFilter<"AuditLog"> | number | null
    attemptId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    inngestEventId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    agreementLevel?: FloatNullableWithAggregatesFilter<"AuditLog"> | number | null
    providerWeights?: JsonNullableWithAggregatesFilter<"AuditLog">
    sensitive?: BoolWithAggregatesFilter<"AuditLog"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type PromptTemplateWhereInput = {
    AND?: PromptTemplateWhereInput | PromptTemplateWhereInput[]
    OR?: PromptTemplateWhereInput[]
    NOT?: PromptTemplateWhereInput | PromptTemplateWhereInput[]
    id?: StringFilter<"PromptTemplate"> | string
    name?: StringFilter<"PromptTemplate"> | string
    category?: EnumPromptCategoryFilter<"PromptTemplate"> | $Enums.PromptCategory
    version?: StringFilter<"PromptTemplate"> | string
    template?: StringFilter<"PromptTemplate"> | string
    variables?: JsonFilter<"PromptTemplate">
    description?: StringNullableFilter<"PromptTemplate"> | string | null
    isActive?: BoolFilter<"PromptTemplate"> | boolean
    createdAt?: DateTimeFilter<"PromptTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"PromptTemplate"> | Date | string
  }

  export type PromptTemplateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    version?: SortOrder
    template?: SortOrder
    variables?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromptTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: PromptTemplateWhereInput | PromptTemplateWhereInput[]
    OR?: PromptTemplateWhereInput[]
    NOT?: PromptTemplateWhereInput | PromptTemplateWhereInput[]
    category?: EnumPromptCategoryFilter<"PromptTemplate"> | $Enums.PromptCategory
    version?: StringFilter<"PromptTemplate"> | string
    template?: StringFilter<"PromptTemplate"> | string
    variables?: JsonFilter<"PromptTemplate">
    description?: StringNullableFilter<"PromptTemplate"> | string | null
    isActive?: BoolFilter<"PromptTemplate"> | boolean
    createdAt?: DateTimeFilter<"PromptTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"PromptTemplate"> | Date | string
  }, "id" | "name">

  export type PromptTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    version?: SortOrder
    template?: SortOrder
    variables?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PromptTemplateCountOrderByAggregateInput
    _max?: PromptTemplateMaxOrderByAggregateInput
    _min?: PromptTemplateMinOrderByAggregateInput
  }

  export type PromptTemplateScalarWhereWithAggregatesInput = {
    AND?: PromptTemplateScalarWhereWithAggregatesInput | PromptTemplateScalarWhereWithAggregatesInput[]
    OR?: PromptTemplateScalarWhereWithAggregatesInput[]
    NOT?: PromptTemplateScalarWhereWithAggregatesInput | PromptTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PromptTemplate"> | string
    name?: StringWithAggregatesFilter<"PromptTemplate"> | string
    category?: EnumPromptCategoryWithAggregatesFilter<"PromptTemplate"> | $Enums.PromptCategory
    version?: StringWithAggregatesFilter<"PromptTemplate"> | string
    template?: StringWithAggregatesFilter<"PromptTemplate"> | string
    variables?: JsonWithAggregatesFilter<"PromptTemplate">
    description?: StringNullableWithAggregatesFilter<"PromptTemplate"> | string | null
    isActive?: BoolWithAggregatesFilter<"PromptTemplate"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PromptTemplate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PromptTemplate"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateInput = {
    id?: string
    key: string
    name: string
    isActive?: boolean
    lastUsed?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutApiKeysInput
  }

  export type ApiKeyUncheckedCreateInput = {
    id?: string
    userId: string
    key: string
    name: string
    isActive?: boolean
    lastUsed?: Date | string | null
    createdAt?: Date | string
  }

  export type ApiKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutApiKeysNestedInput
  }

  export type ApiKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateManyInput = {
    id?: string
    userId: string
    key: string
    name: string
    isActive?: boolean
    lastUsed?: Date | string | null
    createdAt?: Date | string
  }

  export type ApiKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateInput = {
    id?: string
    originalFilename: string
    mimeType: string
    fileSize: number
    s3Key: string
    s3Bucket: string
    documentType?: $Enums.DocumentType | null
    status?: $Enums.DocumentStatus
    confidence?: number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDocumentsInput
    processingJobs?: ProcessingJobCreateNestedManyWithoutDocumentInput
    auditLogs?: AuditLogCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    userId: string
    originalFilename: string
    mimeType: string
    fileSize: number
    s3Key: string
    s3Bucket: string
    documentType?: $Enums.DocumentType | null
    status?: $Enums.DocumentStatus
    confidence?: number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    processingJobs?: ProcessingJobUncheckedCreateNestedManyWithoutDocumentInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    documentType?: NullableEnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    processingJobs?: ProcessingJobUpdateManyWithoutDocumentNestedInput
    auditLogs?: AuditLogUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    documentType?: NullableEnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processingJobs?: ProcessingJobUncheckedUpdateManyWithoutDocumentNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyInput = {
    id?: string
    userId: string
    originalFilename: string
    mimeType: string
    fileSize: number
    s3Key: string
    s3Bucket: string
    documentType?: $Enums.DocumentType | null
    status?: $Enums.DocumentStatus
    confidence?: number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    documentType?: NullableEnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    documentType?: NullableEnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessingJobCreateInput = {
    id?: string
    inngestJobId: string
    currentStage: $Enums.PipelineStage
    stageStatus?: $Enums.StageStatus
    retryCount?: number
    errorMessage?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    document: DocumentCreateNestedOneWithoutProcessingJobsInput
  }

  export type ProcessingJobUncheckedCreateInput = {
    id?: string
    documentId: string
    inngestJobId: string
    currentStage: $Enums.PipelineStage
    stageStatus?: $Enums.StageStatus
    retryCount?: number
    errorMessage?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ProcessingJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inngestJobId?: StringFieldUpdateOperationsInput | string
    currentStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    stageStatus?: EnumStageStatusFieldUpdateOperationsInput | $Enums.StageStatus
    retryCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    document?: DocumentUpdateOneRequiredWithoutProcessingJobsNestedInput
  }

  export type ProcessingJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    inngestJobId?: StringFieldUpdateOperationsInput | string
    currentStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    stageStatus?: EnumStageStatusFieldUpdateOperationsInput | $Enums.StageStatus
    retryCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProcessingJobCreateManyInput = {
    id?: string
    documentId: string
    inngestJobId: string
    currentStage: $Enums.PipelineStage
    stageStatus?: $Enums.StageStatus
    retryCount?: number
    errorMessage?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ProcessingJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    inngestJobId?: StringFieldUpdateOperationsInput | string
    currentStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    stageStatus?: EnumStageStatusFieldUpdateOperationsInput | $Enums.StageStatus
    retryCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProcessingJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    inngestJobId?: StringFieldUpdateOperationsInput | string
    currentStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    stageStatus?: EnumStageStatusFieldUpdateOperationsInput | $Enums.StageStatus
    retryCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuditLogCreateInput = {
    id?: string
    stage: $Enums.PipelineStage
    llmProvider: string
    llmModel: string
    promptTemplate: string
    promptUsed: string
    rawResponse: string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    confidence?: number | null
    processingTime?: number | null
    tokensUsed?: number | null
    cost?: number | null
    attemptId?: string | null
    inngestEventId?: string | null
    agreementLevel?: number | null
    providerWeights?: NullableJsonNullValueInput | InputJsonValue
    sensitive?: boolean
    createdAt?: Date | string
    document: DocumentCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    documentId: string
    stage: $Enums.PipelineStage
    llmProvider: string
    llmModel: string
    promptTemplate: string
    promptUsed: string
    rawResponse: string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    confidence?: number | null
    processingTime?: number | null
    tokensUsed?: number | null
    cost?: number | null
    attemptId?: string | null
    inngestEventId?: string | null
    agreementLevel?: number | null
    providerWeights?: NullableJsonNullValueInput | InputJsonValue
    sensitive?: boolean
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    promptTemplate?: StringFieldUpdateOperationsInput | string
    promptUsed?: StringFieldUpdateOperationsInput | string
    rawResponse?: StringFieldUpdateOperationsInput | string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    attemptId?: NullableStringFieldUpdateOperationsInput | string | null
    inngestEventId?: NullableStringFieldUpdateOperationsInput | string | null
    agreementLevel?: NullableFloatFieldUpdateOperationsInput | number | null
    providerWeights?: NullableJsonNullValueInput | InputJsonValue
    sensitive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    stage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    promptTemplate?: StringFieldUpdateOperationsInput | string
    promptUsed?: StringFieldUpdateOperationsInput | string
    rawResponse?: StringFieldUpdateOperationsInput | string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    attemptId?: NullableStringFieldUpdateOperationsInput | string | null
    inngestEventId?: NullableStringFieldUpdateOperationsInput | string | null
    agreementLevel?: NullableFloatFieldUpdateOperationsInput | number | null
    providerWeights?: NullableJsonNullValueInput | InputJsonValue
    sensitive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    documentId: string
    stage: $Enums.PipelineStage
    llmProvider: string
    llmModel: string
    promptTemplate: string
    promptUsed: string
    rawResponse: string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    confidence?: number | null
    processingTime?: number | null
    tokensUsed?: number | null
    cost?: number | null
    attemptId?: string | null
    inngestEventId?: string | null
    agreementLevel?: number | null
    providerWeights?: NullableJsonNullValueInput | InputJsonValue
    sensitive?: boolean
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    promptTemplate?: StringFieldUpdateOperationsInput | string
    promptUsed?: StringFieldUpdateOperationsInput | string
    rawResponse?: StringFieldUpdateOperationsInput | string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    attemptId?: NullableStringFieldUpdateOperationsInput | string | null
    inngestEventId?: NullableStringFieldUpdateOperationsInput | string | null
    agreementLevel?: NullableFloatFieldUpdateOperationsInput | number | null
    providerWeights?: NullableJsonNullValueInput | InputJsonValue
    sensitive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    stage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    promptTemplate?: StringFieldUpdateOperationsInput | string
    promptUsed?: StringFieldUpdateOperationsInput | string
    rawResponse?: StringFieldUpdateOperationsInput | string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    attemptId?: NullableStringFieldUpdateOperationsInput | string | null
    inngestEventId?: NullableStringFieldUpdateOperationsInput | string | null
    agreementLevel?: NullableFloatFieldUpdateOperationsInput | number | null
    providerWeights?: NullableJsonNullValueInput | InputJsonValue
    sensitive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromptTemplateCreateInput = {
    id?: string
    name: string
    category: $Enums.PromptCategory
    version: string
    template: string
    variables: JsonNullValueInput | InputJsonValue
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PromptTemplateUncheckedCreateInput = {
    id?: string
    name: string
    category: $Enums.PromptCategory
    version: string
    template: string
    variables: JsonNullValueInput | InputJsonValue
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PromptTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumPromptCategoryFieldUpdateOperationsInput | $Enums.PromptCategory
    version?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    variables?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromptTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumPromptCategoryFieldUpdateOperationsInput | $Enums.PromptCategory
    version?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    variables?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromptTemplateCreateManyInput = {
    id?: string
    name: string
    category: $Enums.PromptCategory
    version: string
    template: string
    variables: JsonNullValueInput | InputJsonValue
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PromptTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumPromptCategoryFieldUpdateOperationsInput | $Enums.PromptCategory
    version?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    variables?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromptTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumPromptCategoryFieldUpdateOperationsInput | $Enums.PromptCategory
    version?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    variables?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type ApiKeyListRelationFilter = {
    every?: ApiKeyWhereInput
    some?: ApiKeyWhereInput
    none?: ApiKeyWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApiKeyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ApiKeyCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    key?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    lastUsed?: SortOrder
    createdAt?: SortOrder
  }

  export type ApiKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    key?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    lastUsed?: SortOrder
    createdAt?: SortOrder
  }

  export type ApiKeyMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    key?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    lastUsed?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumDocumentTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDocumentTypeNullableFilter<$PrismaModel> | $Enums.DocumentType | null
  }

  export type EnumDocumentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusFilter<$PrismaModel> | $Enums.DocumentStatus
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProcessingJobListRelationFilter = {
    every?: ProcessingJobWhereInput
    some?: ProcessingJobWhereInput
    none?: ProcessingJobWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type ProcessingJobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    originalFilename?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    s3Key?: SortOrder
    s3Bucket?: SortOrder
    documentType?: SortOrder
    status?: SortOrder
    confidence?: SortOrder
    parsedData?: SortOrder
    needsReview?: SortOrder
    reviewedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
    confidence?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    originalFilename?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    s3Key?: SortOrder
    s3Bucket?: SortOrder
    documentType?: SortOrder
    status?: SortOrder
    confidence?: SortOrder
    needsReview?: SortOrder
    reviewedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    originalFilename?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    s3Key?: SortOrder
    s3Bucket?: SortOrder
    documentType?: SortOrder
    status?: SortOrder
    confidence?: SortOrder
    needsReview?: SortOrder
    reviewedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    fileSize?: SortOrder
    confidence?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumDocumentTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDocumentTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeNullableFilter<$PrismaModel>
  }

  export type EnumDocumentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentStatusFilter<$PrismaModel>
    _max?: NestedEnumDocumentStatusFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumPipelineStageFilter<$PrismaModel = never> = {
    equals?: $Enums.PipelineStage | EnumPipelineStageFieldRefInput<$PrismaModel>
    in?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    not?: NestedEnumPipelineStageFilter<$PrismaModel> | $Enums.PipelineStage
  }

  export type EnumStageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StageStatus | EnumStageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StageStatus[] | ListEnumStageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StageStatus[] | ListEnumStageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStageStatusFilter<$PrismaModel> | $Enums.StageStatus
  }

  export type DocumentScalarRelationFilter = {
    is?: DocumentWhereInput
    isNot?: DocumentWhereInput
  }

  export type ProcessingJobCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    inngestJobId?: SortOrder
    currentStage?: SortOrder
    stageStatus?: SortOrder
    retryCount?: SortOrder
    errorMessage?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ProcessingJobAvgOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type ProcessingJobMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    inngestJobId?: SortOrder
    currentStage?: SortOrder
    stageStatus?: SortOrder
    retryCount?: SortOrder
    errorMessage?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ProcessingJobMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    inngestJobId?: SortOrder
    currentStage?: SortOrder
    stageStatus?: SortOrder
    retryCount?: SortOrder
    errorMessage?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ProcessingJobSumOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type EnumPipelineStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PipelineStage | EnumPipelineStageFieldRefInput<$PrismaModel>
    in?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    not?: NestedEnumPipelineStageWithAggregatesFilter<$PrismaModel> | $Enums.PipelineStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPipelineStageFilter<$PrismaModel>
    _max?: NestedEnumPipelineStageFilter<$PrismaModel>
  }

  export type EnumStageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StageStatus | EnumStageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StageStatus[] | ListEnumStageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StageStatus[] | ListEnumStageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStageStatusWithAggregatesFilter<$PrismaModel> | $Enums.StageStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStageStatusFilter<$PrismaModel>
    _max?: NestedEnumStageStatusFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AuditLogDocumentIdStageAttemptIdCompoundUniqueInput = {
    documentId: string
    stage: $Enums.PipelineStage
    attemptId: string
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    stage?: SortOrder
    llmProvider?: SortOrder
    llmModel?: SortOrder
    promptTemplate?: SortOrder
    promptUsed?: SortOrder
    rawResponse?: SortOrder
    extractedData?: SortOrder
    confidence?: SortOrder
    processingTime?: SortOrder
    tokensUsed?: SortOrder
    cost?: SortOrder
    attemptId?: SortOrder
    inngestEventId?: SortOrder
    agreementLevel?: SortOrder
    providerWeights?: SortOrder
    sensitive?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogAvgOrderByAggregateInput = {
    confidence?: SortOrder
    processingTime?: SortOrder
    tokensUsed?: SortOrder
    cost?: SortOrder
    agreementLevel?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    stage?: SortOrder
    llmProvider?: SortOrder
    llmModel?: SortOrder
    promptTemplate?: SortOrder
    promptUsed?: SortOrder
    rawResponse?: SortOrder
    confidence?: SortOrder
    processingTime?: SortOrder
    tokensUsed?: SortOrder
    cost?: SortOrder
    attemptId?: SortOrder
    inngestEventId?: SortOrder
    agreementLevel?: SortOrder
    sensitive?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    stage?: SortOrder
    llmProvider?: SortOrder
    llmModel?: SortOrder
    promptTemplate?: SortOrder
    promptUsed?: SortOrder
    rawResponse?: SortOrder
    confidence?: SortOrder
    processingTime?: SortOrder
    tokensUsed?: SortOrder
    cost?: SortOrder
    attemptId?: SortOrder
    inngestEventId?: SortOrder
    agreementLevel?: SortOrder
    sensitive?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogSumOrderByAggregateInput = {
    confidence?: SortOrder
    processingTime?: SortOrder
    tokensUsed?: SortOrder
    cost?: SortOrder
    agreementLevel?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumPromptCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PromptCategory | EnumPromptCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PromptCategory[] | ListEnumPromptCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromptCategory[] | ListEnumPromptCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPromptCategoryFilter<$PrismaModel> | $Enums.PromptCategory
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PromptTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    version?: SortOrder
    template?: SortOrder
    variables?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromptTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    version?: SortOrder
    template?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromptTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    version?: SortOrder
    template?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumPromptCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PromptCategory | EnumPromptCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PromptCategory[] | ListEnumPromptCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromptCategory[] | ListEnumPromptCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPromptCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PromptCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPromptCategoryFilter<$PrismaModel>
    _max?: NestedEnumPromptCategoryFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DocumentCreateNestedManyWithoutUserInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ApiKeyCreateNestedManyWithoutUserInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ApiKeyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DocumentUpdateManyWithoutUserNestedInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutUserInput | DocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutUserInput | DocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutUserInput | DocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ApiKeyUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    upsert?: ApiKeyUpsertWithWhereUniqueWithoutUserInput | ApiKeyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    set?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    disconnect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    delete?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    update?: ApiKeyUpdateWithWhereUniqueWithoutUserInput | ApiKeyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApiKeyUpdateManyWithWhereWithoutUserInput | ApiKeyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutUserInput | DocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutUserInput | DocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutUserInput | DocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ApiKeyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    upsert?: ApiKeyUpsertWithWhereUniqueWithoutUserInput | ApiKeyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    set?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    disconnect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    delete?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    update?: ApiKeyUpdateWithWhereUniqueWithoutUserInput | ApiKeyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApiKeyUpdateManyWithWhereWithoutUserInput | ApiKeyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutApiKeysInput = {
    create?: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
    connectOrCreate?: UserCreateOrConnectWithoutApiKeysInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutApiKeysNestedInput = {
    create?: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
    connectOrCreate?: UserCreateOrConnectWithoutApiKeysInput
    upsert?: UserUpsertWithoutApiKeysInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApiKeysInput, UserUpdateWithoutApiKeysInput>, UserUncheckedUpdateWithoutApiKeysInput>
  }

  export type UserCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    connect?: UserWhereUniqueInput
  }

  export type ProcessingJobCreateNestedManyWithoutDocumentInput = {
    create?: XOR<ProcessingJobCreateWithoutDocumentInput, ProcessingJobUncheckedCreateWithoutDocumentInput> | ProcessingJobCreateWithoutDocumentInput[] | ProcessingJobUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: ProcessingJobCreateOrConnectWithoutDocumentInput | ProcessingJobCreateOrConnectWithoutDocumentInput[]
    createMany?: ProcessingJobCreateManyDocumentInputEnvelope
    connect?: ProcessingJobWhereUniqueInput | ProcessingJobWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutDocumentInput = {
    create?: XOR<AuditLogCreateWithoutDocumentInput, AuditLogUncheckedCreateWithoutDocumentInput> | AuditLogCreateWithoutDocumentInput[] | AuditLogUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutDocumentInput | AuditLogCreateOrConnectWithoutDocumentInput[]
    createMany?: AuditLogCreateManyDocumentInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type ProcessingJobUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<ProcessingJobCreateWithoutDocumentInput, ProcessingJobUncheckedCreateWithoutDocumentInput> | ProcessingJobCreateWithoutDocumentInput[] | ProcessingJobUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: ProcessingJobCreateOrConnectWithoutDocumentInput | ProcessingJobCreateOrConnectWithoutDocumentInput[]
    createMany?: ProcessingJobCreateManyDocumentInputEnvelope
    connect?: ProcessingJobWhereUniqueInput | ProcessingJobWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<AuditLogCreateWithoutDocumentInput, AuditLogUncheckedCreateWithoutDocumentInput> | AuditLogCreateWithoutDocumentInput[] | AuditLogUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutDocumentInput | AuditLogCreateOrConnectWithoutDocumentInput[]
    createMany?: AuditLogCreateManyDocumentInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumDocumentTypeFieldUpdateOperationsInput = {
    set?: $Enums.DocumentType | null
  }

  export type EnumDocumentStatusFieldUpdateOperationsInput = {
    set?: $Enums.DocumentStatus
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    upsert?: UserUpsertWithoutDocumentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDocumentsInput, UserUpdateWithoutDocumentsInput>, UserUncheckedUpdateWithoutDocumentsInput>
  }

  export type ProcessingJobUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<ProcessingJobCreateWithoutDocumentInput, ProcessingJobUncheckedCreateWithoutDocumentInput> | ProcessingJobCreateWithoutDocumentInput[] | ProcessingJobUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: ProcessingJobCreateOrConnectWithoutDocumentInput | ProcessingJobCreateOrConnectWithoutDocumentInput[]
    upsert?: ProcessingJobUpsertWithWhereUniqueWithoutDocumentInput | ProcessingJobUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: ProcessingJobCreateManyDocumentInputEnvelope
    set?: ProcessingJobWhereUniqueInput | ProcessingJobWhereUniqueInput[]
    disconnect?: ProcessingJobWhereUniqueInput | ProcessingJobWhereUniqueInput[]
    delete?: ProcessingJobWhereUniqueInput | ProcessingJobWhereUniqueInput[]
    connect?: ProcessingJobWhereUniqueInput | ProcessingJobWhereUniqueInput[]
    update?: ProcessingJobUpdateWithWhereUniqueWithoutDocumentInput | ProcessingJobUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: ProcessingJobUpdateManyWithWhereWithoutDocumentInput | ProcessingJobUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: ProcessingJobScalarWhereInput | ProcessingJobScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<AuditLogCreateWithoutDocumentInput, AuditLogUncheckedCreateWithoutDocumentInput> | AuditLogCreateWithoutDocumentInput[] | AuditLogUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutDocumentInput | AuditLogCreateOrConnectWithoutDocumentInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutDocumentInput | AuditLogUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: AuditLogCreateManyDocumentInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutDocumentInput | AuditLogUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutDocumentInput | AuditLogUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ProcessingJobUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<ProcessingJobCreateWithoutDocumentInput, ProcessingJobUncheckedCreateWithoutDocumentInput> | ProcessingJobCreateWithoutDocumentInput[] | ProcessingJobUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: ProcessingJobCreateOrConnectWithoutDocumentInput | ProcessingJobCreateOrConnectWithoutDocumentInput[]
    upsert?: ProcessingJobUpsertWithWhereUniqueWithoutDocumentInput | ProcessingJobUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: ProcessingJobCreateManyDocumentInputEnvelope
    set?: ProcessingJobWhereUniqueInput | ProcessingJobWhereUniqueInput[]
    disconnect?: ProcessingJobWhereUniqueInput | ProcessingJobWhereUniqueInput[]
    delete?: ProcessingJobWhereUniqueInput | ProcessingJobWhereUniqueInput[]
    connect?: ProcessingJobWhereUniqueInput | ProcessingJobWhereUniqueInput[]
    update?: ProcessingJobUpdateWithWhereUniqueWithoutDocumentInput | ProcessingJobUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: ProcessingJobUpdateManyWithWhereWithoutDocumentInput | ProcessingJobUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: ProcessingJobScalarWhereInput | ProcessingJobScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<AuditLogCreateWithoutDocumentInput, AuditLogUncheckedCreateWithoutDocumentInput> | AuditLogCreateWithoutDocumentInput[] | AuditLogUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutDocumentInput | AuditLogCreateOrConnectWithoutDocumentInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutDocumentInput | AuditLogUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: AuditLogCreateManyDocumentInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutDocumentInput | AuditLogUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutDocumentInput | AuditLogUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type DocumentCreateNestedOneWithoutProcessingJobsInput = {
    create?: XOR<DocumentCreateWithoutProcessingJobsInput, DocumentUncheckedCreateWithoutProcessingJobsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutProcessingJobsInput
    connect?: DocumentWhereUniqueInput
  }

  export type EnumPipelineStageFieldUpdateOperationsInput = {
    set?: $Enums.PipelineStage
  }

  export type EnumStageStatusFieldUpdateOperationsInput = {
    set?: $Enums.StageStatus
  }

  export type DocumentUpdateOneRequiredWithoutProcessingJobsNestedInput = {
    create?: XOR<DocumentCreateWithoutProcessingJobsInput, DocumentUncheckedCreateWithoutProcessingJobsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutProcessingJobsInput
    upsert?: DocumentUpsertWithoutProcessingJobsInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutProcessingJobsInput, DocumentUpdateWithoutProcessingJobsInput>, DocumentUncheckedUpdateWithoutProcessingJobsInput>
  }

  export type DocumentCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<DocumentCreateWithoutAuditLogsInput, DocumentUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutAuditLogsInput
    connect?: DocumentWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DocumentUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<DocumentCreateWithoutAuditLogsInput, DocumentUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutAuditLogsInput
    upsert?: DocumentUpsertWithoutAuditLogsInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutAuditLogsInput, DocumentUpdateWithoutAuditLogsInput>, DocumentUncheckedUpdateWithoutAuditLogsInput>
  }

  export type EnumPromptCategoryFieldUpdateOperationsInput = {
    set?: $Enums.PromptCategory
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumDocumentTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDocumentTypeNullableFilter<$PrismaModel> | $Enums.DocumentType | null
  }

  export type NestedEnumDocumentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusFilter<$PrismaModel> | $Enums.DocumentStatus
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumDocumentTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDocumentTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentStatusFilter<$PrismaModel>
    _max?: NestedEnumDocumentStatusFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumPipelineStageFilter<$PrismaModel = never> = {
    equals?: $Enums.PipelineStage | EnumPipelineStageFieldRefInput<$PrismaModel>
    in?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    not?: NestedEnumPipelineStageFilter<$PrismaModel> | $Enums.PipelineStage
  }

  export type NestedEnumStageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StageStatus | EnumStageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StageStatus[] | ListEnumStageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StageStatus[] | ListEnumStageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStageStatusFilter<$PrismaModel> | $Enums.StageStatus
  }

  export type NestedEnumPipelineStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PipelineStage | EnumPipelineStageFieldRefInput<$PrismaModel>
    in?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    not?: NestedEnumPipelineStageWithAggregatesFilter<$PrismaModel> | $Enums.PipelineStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPipelineStageFilter<$PrismaModel>
    _max?: NestedEnumPipelineStageFilter<$PrismaModel>
  }

  export type NestedEnumStageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StageStatus | EnumStageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StageStatus[] | ListEnumStageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StageStatus[] | ListEnumStageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStageStatusWithAggregatesFilter<$PrismaModel> | $Enums.StageStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStageStatusFilter<$PrismaModel>
    _max?: NestedEnumStageStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumPromptCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PromptCategory | EnumPromptCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PromptCategory[] | ListEnumPromptCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromptCategory[] | ListEnumPromptCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPromptCategoryFilter<$PrismaModel> | $Enums.PromptCategory
  }

  export type NestedEnumPromptCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PromptCategory | EnumPromptCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PromptCategory[] | ListEnumPromptCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromptCategory[] | ListEnumPromptCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPromptCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PromptCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPromptCategoryFilter<$PrismaModel>
    _max?: NestedEnumPromptCategoryFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DocumentCreateWithoutUserInput = {
    id?: string
    originalFilename: string
    mimeType: string
    fileSize: number
    s3Key: string
    s3Bucket: string
    documentType?: $Enums.DocumentType | null
    status?: $Enums.DocumentStatus
    confidence?: number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    processingJobs?: ProcessingJobCreateNestedManyWithoutDocumentInput
    auditLogs?: AuditLogCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutUserInput = {
    id?: string
    originalFilename: string
    mimeType: string
    fileSize: number
    s3Key: string
    s3Bucket: string
    documentType?: $Enums.DocumentType | null
    status?: $Enums.DocumentStatus
    confidence?: number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    processingJobs?: ProcessingJobUncheckedCreateNestedManyWithoutDocumentInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutUserInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput>
  }

  export type DocumentCreateManyUserInputEnvelope = {
    data: DocumentCreateManyUserInput | DocumentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ApiKeyCreateWithoutUserInput = {
    id?: string
    key: string
    name: string
    isActive?: boolean
    lastUsed?: Date | string | null
    createdAt?: Date | string
  }

  export type ApiKeyUncheckedCreateWithoutUserInput = {
    id?: string
    key: string
    name: string
    isActive?: boolean
    lastUsed?: Date | string | null
    createdAt?: Date | string
  }

  export type ApiKeyCreateOrConnectWithoutUserInput = {
    where: ApiKeyWhereUniqueInput
    create: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput>
  }

  export type ApiKeyCreateManyUserInputEnvelope = {
    data: ApiKeyCreateManyUserInput | ApiKeyCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DocumentUpsertWithWhereUniqueWithoutUserInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutUserInput, DocumentUncheckedUpdateWithoutUserInput>
    create: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutUserInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutUserInput, DocumentUncheckedUpdateWithoutUserInput>
  }

  export type DocumentUpdateManyWithWhereWithoutUserInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutUserInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    userId?: StringFilter<"Document"> | string
    originalFilename?: StringFilter<"Document"> | string
    mimeType?: StringFilter<"Document"> | string
    fileSize?: IntFilter<"Document"> | number
    s3Key?: StringFilter<"Document"> | string
    s3Bucket?: StringFilter<"Document"> | string
    documentType?: EnumDocumentTypeNullableFilter<"Document"> | $Enums.DocumentType | null
    status?: EnumDocumentStatusFilter<"Document"> | $Enums.DocumentStatus
    confidence?: FloatNullableFilter<"Document"> | number | null
    parsedData?: JsonNullableFilter<"Document">
    needsReview?: BoolFilter<"Document"> | boolean
    reviewedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type ApiKeyUpsertWithWhereUniqueWithoutUserInput = {
    where: ApiKeyWhereUniqueInput
    update: XOR<ApiKeyUpdateWithoutUserInput, ApiKeyUncheckedUpdateWithoutUserInput>
    create: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput>
  }

  export type ApiKeyUpdateWithWhereUniqueWithoutUserInput = {
    where: ApiKeyWhereUniqueInput
    data: XOR<ApiKeyUpdateWithoutUserInput, ApiKeyUncheckedUpdateWithoutUserInput>
  }

  export type ApiKeyUpdateManyWithWhereWithoutUserInput = {
    where: ApiKeyScalarWhereInput
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyWithoutUserInput>
  }

  export type ApiKeyScalarWhereInput = {
    AND?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
    OR?: ApiKeyScalarWhereInput[]
    NOT?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    userId?: StringFilter<"ApiKey"> | string
    key?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    isActive?: BoolFilter<"ApiKey"> | boolean
    lastUsed?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutApiKeysInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutApiKeysInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutApiKeysInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
  }

  export type UserUpsertWithoutApiKeysInput = {
    update: XOR<UserUpdateWithoutApiKeysInput, UserUncheckedUpdateWithoutApiKeysInput>
    create: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApiKeysInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApiKeysInput, UserUncheckedUpdateWithoutApiKeysInput>
  }

  export type UserUpdateWithoutApiKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutApiKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutDocumentsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDocumentsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDocumentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
  }

  export type ProcessingJobCreateWithoutDocumentInput = {
    id?: string
    inngestJobId: string
    currentStage: $Enums.PipelineStage
    stageStatus?: $Enums.StageStatus
    retryCount?: number
    errorMessage?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ProcessingJobUncheckedCreateWithoutDocumentInput = {
    id?: string
    inngestJobId: string
    currentStage: $Enums.PipelineStage
    stageStatus?: $Enums.StageStatus
    retryCount?: number
    errorMessage?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ProcessingJobCreateOrConnectWithoutDocumentInput = {
    where: ProcessingJobWhereUniqueInput
    create: XOR<ProcessingJobCreateWithoutDocumentInput, ProcessingJobUncheckedCreateWithoutDocumentInput>
  }

  export type ProcessingJobCreateManyDocumentInputEnvelope = {
    data: ProcessingJobCreateManyDocumentInput | ProcessingJobCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutDocumentInput = {
    id?: string
    stage: $Enums.PipelineStage
    llmProvider: string
    llmModel: string
    promptTemplate: string
    promptUsed: string
    rawResponse: string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    confidence?: number | null
    processingTime?: number | null
    tokensUsed?: number | null
    cost?: number | null
    attemptId?: string | null
    inngestEventId?: string | null
    agreementLevel?: number | null
    providerWeights?: NullableJsonNullValueInput | InputJsonValue
    sensitive?: boolean
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutDocumentInput = {
    id?: string
    stage: $Enums.PipelineStage
    llmProvider: string
    llmModel: string
    promptTemplate: string
    promptUsed: string
    rawResponse: string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    confidence?: number | null
    processingTime?: number | null
    tokensUsed?: number | null
    cost?: number | null
    attemptId?: string | null
    inngestEventId?: string | null
    agreementLevel?: number | null
    providerWeights?: NullableJsonNullValueInput | InputJsonValue
    sensitive?: boolean
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutDocumentInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutDocumentInput, AuditLogUncheckedCreateWithoutDocumentInput>
  }

  export type AuditLogCreateManyDocumentInputEnvelope = {
    data: AuditLogCreateManyDocumentInput | AuditLogCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDocumentsInput = {
    update: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
  }

  export type UserUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProcessingJobUpsertWithWhereUniqueWithoutDocumentInput = {
    where: ProcessingJobWhereUniqueInput
    update: XOR<ProcessingJobUpdateWithoutDocumentInput, ProcessingJobUncheckedUpdateWithoutDocumentInput>
    create: XOR<ProcessingJobCreateWithoutDocumentInput, ProcessingJobUncheckedCreateWithoutDocumentInput>
  }

  export type ProcessingJobUpdateWithWhereUniqueWithoutDocumentInput = {
    where: ProcessingJobWhereUniqueInput
    data: XOR<ProcessingJobUpdateWithoutDocumentInput, ProcessingJobUncheckedUpdateWithoutDocumentInput>
  }

  export type ProcessingJobUpdateManyWithWhereWithoutDocumentInput = {
    where: ProcessingJobScalarWhereInput
    data: XOR<ProcessingJobUpdateManyMutationInput, ProcessingJobUncheckedUpdateManyWithoutDocumentInput>
  }

  export type ProcessingJobScalarWhereInput = {
    AND?: ProcessingJobScalarWhereInput | ProcessingJobScalarWhereInput[]
    OR?: ProcessingJobScalarWhereInput[]
    NOT?: ProcessingJobScalarWhereInput | ProcessingJobScalarWhereInput[]
    id?: StringFilter<"ProcessingJob"> | string
    documentId?: StringFilter<"ProcessingJob"> | string
    inngestJobId?: StringFilter<"ProcessingJob"> | string
    currentStage?: EnumPipelineStageFilter<"ProcessingJob"> | $Enums.PipelineStage
    stageStatus?: EnumStageStatusFilter<"ProcessingJob"> | $Enums.StageStatus
    retryCount?: IntFilter<"ProcessingJob"> | number
    errorMessage?: StringNullableFilter<"ProcessingJob"> | string | null
    startedAt?: DateTimeFilter<"ProcessingJob"> | Date | string
    completedAt?: DateTimeNullableFilter<"ProcessingJob"> | Date | string | null
  }

  export type AuditLogUpsertWithWhereUniqueWithoutDocumentInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutDocumentInput, AuditLogUncheckedUpdateWithoutDocumentInput>
    create: XOR<AuditLogCreateWithoutDocumentInput, AuditLogUncheckedCreateWithoutDocumentInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutDocumentInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutDocumentInput, AuditLogUncheckedUpdateWithoutDocumentInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutDocumentInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutDocumentInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    documentId?: StringFilter<"AuditLog"> | string
    stage?: EnumPipelineStageFilter<"AuditLog"> | $Enums.PipelineStage
    llmProvider?: StringFilter<"AuditLog"> | string
    llmModel?: StringFilter<"AuditLog"> | string
    promptTemplate?: StringFilter<"AuditLog"> | string
    promptUsed?: StringFilter<"AuditLog"> | string
    rawResponse?: StringFilter<"AuditLog"> | string
    extractedData?: JsonNullableFilter<"AuditLog">
    confidence?: FloatNullableFilter<"AuditLog"> | number | null
    processingTime?: IntNullableFilter<"AuditLog"> | number | null
    tokensUsed?: IntNullableFilter<"AuditLog"> | number | null
    cost?: FloatNullableFilter<"AuditLog"> | number | null
    attemptId?: StringNullableFilter<"AuditLog"> | string | null
    inngestEventId?: StringNullableFilter<"AuditLog"> | string | null
    agreementLevel?: FloatNullableFilter<"AuditLog"> | number | null
    providerWeights?: JsonNullableFilter<"AuditLog">
    sensitive?: BoolFilter<"AuditLog"> | boolean
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type DocumentCreateWithoutProcessingJobsInput = {
    id?: string
    originalFilename: string
    mimeType: string
    fileSize: number
    s3Key: string
    s3Bucket: string
    documentType?: $Enums.DocumentType | null
    status?: $Enums.DocumentStatus
    confidence?: number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDocumentsInput
    auditLogs?: AuditLogCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutProcessingJobsInput = {
    id?: string
    userId: string
    originalFilename: string
    mimeType: string
    fileSize: number
    s3Key: string
    s3Bucket: string
    documentType?: $Enums.DocumentType | null
    status?: $Enums.DocumentStatus
    confidence?: number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutProcessingJobsInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutProcessingJobsInput, DocumentUncheckedCreateWithoutProcessingJobsInput>
  }

  export type DocumentUpsertWithoutProcessingJobsInput = {
    update: XOR<DocumentUpdateWithoutProcessingJobsInput, DocumentUncheckedUpdateWithoutProcessingJobsInput>
    create: XOR<DocumentCreateWithoutProcessingJobsInput, DocumentUncheckedCreateWithoutProcessingJobsInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutProcessingJobsInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutProcessingJobsInput, DocumentUncheckedUpdateWithoutProcessingJobsInput>
  }

  export type DocumentUpdateWithoutProcessingJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    documentType?: NullableEnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    auditLogs?: AuditLogUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutProcessingJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    documentType?: NullableEnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuditLogUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateWithoutAuditLogsInput = {
    id?: string
    originalFilename: string
    mimeType: string
    fileSize: number
    s3Key: string
    s3Bucket: string
    documentType?: $Enums.DocumentType | null
    status?: $Enums.DocumentStatus
    confidence?: number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDocumentsInput
    processingJobs?: ProcessingJobCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    userId: string
    originalFilename: string
    mimeType: string
    fileSize: number
    s3Key: string
    s3Bucket: string
    documentType?: $Enums.DocumentType | null
    status?: $Enums.DocumentStatus
    confidence?: number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    processingJobs?: ProcessingJobUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutAuditLogsInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutAuditLogsInput, DocumentUncheckedCreateWithoutAuditLogsInput>
  }

  export type DocumentUpsertWithoutAuditLogsInput = {
    update: XOR<DocumentUpdateWithoutAuditLogsInput, DocumentUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<DocumentCreateWithoutAuditLogsInput, DocumentUncheckedCreateWithoutAuditLogsInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutAuditLogsInput, DocumentUncheckedUpdateWithoutAuditLogsInput>
  }

  export type DocumentUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    documentType?: NullableEnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    processingJobs?: ProcessingJobUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    documentType?: NullableEnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processingJobs?: ProcessingJobUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyUserInput = {
    id?: string
    originalFilename: string
    mimeType: string
    fileSize: number
    s3Key: string
    s3Bucket: string
    documentType?: $Enums.DocumentType | null
    status?: $Enums.DocumentStatus
    confidence?: number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type ApiKeyCreateManyUserInput = {
    id?: string
    key: string
    name: string
    isActive?: boolean
    lastUsed?: Date | string | null
    createdAt?: Date | string
  }

  export type DocumentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    documentType?: NullableEnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processingJobs?: ProcessingJobUpdateManyWithoutDocumentNestedInput
    auditLogs?: AuditLogUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    documentType?: NullableEnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processingJobs?: ProcessingJobUncheckedUpdateManyWithoutDocumentNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    documentType?: NullableEnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parsedData?: NullableJsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessingJobCreateManyDocumentInput = {
    id?: string
    inngestJobId: string
    currentStage: $Enums.PipelineStage
    stageStatus?: $Enums.StageStatus
    retryCount?: number
    errorMessage?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AuditLogCreateManyDocumentInput = {
    id?: string
    stage: $Enums.PipelineStage
    llmProvider: string
    llmModel: string
    promptTemplate: string
    promptUsed: string
    rawResponse: string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    confidence?: number | null
    processingTime?: number | null
    tokensUsed?: number | null
    cost?: number | null
    attemptId?: string | null
    inngestEventId?: string | null
    agreementLevel?: number | null
    providerWeights?: NullableJsonNullValueInput | InputJsonValue
    sensitive?: boolean
    createdAt?: Date | string
  }

  export type ProcessingJobUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    inngestJobId?: StringFieldUpdateOperationsInput | string
    currentStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    stageStatus?: EnumStageStatusFieldUpdateOperationsInput | $Enums.StageStatus
    retryCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProcessingJobUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    inngestJobId?: StringFieldUpdateOperationsInput | string
    currentStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    stageStatus?: EnumStageStatusFieldUpdateOperationsInput | $Enums.StageStatus
    retryCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProcessingJobUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    inngestJobId?: StringFieldUpdateOperationsInput | string
    currentStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    stageStatus?: EnumStageStatusFieldUpdateOperationsInput | $Enums.StageStatus
    retryCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuditLogUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    stage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    promptTemplate?: StringFieldUpdateOperationsInput | string
    promptUsed?: StringFieldUpdateOperationsInput | string
    rawResponse?: StringFieldUpdateOperationsInput | string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    attemptId?: NullableStringFieldUpdateOperationsInput | string | null
    inngestEventId?: NullableStringFieldUpdateOperationsInput | string | null
    agreementLevel?: NullableFloatFieldUpdateOperationsInput | number | null
    providerWeights?: NullableJsonNullValueInput | InputJsonValue
    sensitive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    stage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    promptTemplate?: StringFieldUpdateOperationsInput | string
    promptUsed?: StringFieldUpdateOperationsInput | string
    rawResponse?: StringFieldUpdateOperationsInput | string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    attemptId?: NullableStringFieldUpdateOperationsInput | string | null
    inngestEventId?: NullableStringFieldUpdateOperationsInput | string | null
    agreementLevel?: NullableFloatFieldUpdateOperationsInput | number | null
    providerWeights?: NullableJsonNullValueInput | InputJsonValue
    sensitive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    stage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    llmProvider?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    promptTemplate?: StringFieldUpdateOperationsInput | string
    promptUsed?: StringFieldUpdateOperationsInput | string
    rawResponse?: StringFieldUpdateOperationsInput | string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    attemptId?: NullableStringFieldUpdateOperationsInput | string | null
    inngestEventId?: NullableStringFieldUpdateOperationsInput | string | null
    agreementLevel?: NullableFloatFieldUpdateOperationsInput | number | null
    providerWeights?: NullableJsonNullValueInput | InputJsonValue
    sensitive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}