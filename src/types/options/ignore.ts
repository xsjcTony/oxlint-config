interface IgnoreOptionsObject {
  patterns: string[]

  /**
   * Whether to replace the default ignore patterns with the provided ones.
   *
   * @default false
   */
  replaceDefault?: boolean
}


export type IgnoreOptions = string[] | IgnoreOptionsObject
