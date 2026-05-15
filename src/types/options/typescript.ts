import type { GlobalOptions, OptionsComponentExtensions } from '~/types'


export interface TypeScriptOptions extends
  Pick<GlobalOptions, 'projectType'>,
  OptionsComponentExtensions {
  /**
   * Whether to enable type-aware rules (rules that require type information)
   *
   * @default true
   */
  enableTypeAwareRules?: boolean

  ruleOptions?: {
    /**
     * @see https://oxc.rs/docs/guide/usage/linter/rules/typescript/only-throw-error
     */
    onlyThrowError?: {
      /**
       * appended to
       * [
       *   {
       *     "from": "package",
       *     "package": "@tanstack/router-core",
       *     "name": "Redirect"
       *   },
       *   {
       *     "from": "package",
       *     "package": "@tanstack/router-core",
       *     "name": "NotFoundError"
       *   }
       * ]
       *
       * @default []
       */
      allow?: {
        from: 'file' | 'lib' | 'package'
        name: string | string[]
        path?: string
      }[]

      /**
       * @default false
       */
      allowRethrowing?: boolean

      /**
       * @default false
       */
      allowThrowingAny?: boolean

      /**
       * @default false
       */
      allowThrowingUnknown?: boolean
    }
  }
}
