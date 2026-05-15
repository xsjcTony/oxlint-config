import type { OptionsFiles } from '~types'


export interface TanStackQueryOptions extends OptionsFiles {
  ruleOptions?: {
    /**
     * @see https://tanstack.com/query/latest/docs/eslint/exhaustive-deps
     */
    exhaustiveDeps?: {
      allowList?: {
        variables?: string[]
        types?: string[]
      }
    }
  }
}
