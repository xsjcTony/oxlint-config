export interface StylisticBaseOptions {
  /**
   * Whether to enable semicolons
   * Similar to `semi` option in Prettier
   *
   * @default false
   */
  semi?: boolean

  /**
   * Quote style
   * Similar to `singleQuote` option in Prettier
   *
   * @default 'single'
   */
  quotes?: 'single' | 'double'

  /**
   * Indentation level
   * Similar to the `tabWidth` options in Prettier
   *
   * @default 2
   */
  indent?: number

  /**
   * When to enable comma dangles
   * Similar to `trailingComma` option in Prettier
   *
   * @default 'always-multiline'
   */
  commaDangle?: 'never' | 'always' | 'always-multiline' | 'only-multiline'
}


export interface StylisticOptions extends StylisticBaseOptions {
  /**
   * Whether to enable TS stylistic rules
   *
   * @default true
   */
  typescript?: boolean

  /**
   * For `style/jsx-pascal-case` rule.
   *
   * @see https://eslint.style/rules/jsx/jsx-pascal-case#rule-options
   */
  jsxPascalCaseIgnore?: string[]
}
