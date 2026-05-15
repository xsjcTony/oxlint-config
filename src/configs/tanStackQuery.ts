import type { TanStackQueryOptions } from '~types'
import type { OxlintConfig } from 'oxlint'
import { GLOB_SRC } from '~/globs'


export function composeTanStackQueryConfig(options: TanStackQueryOptions): OxlintConfig {

  const { files = [GLOB_SRC] } = options


  return {
    overrides: [
      {
        files,
        rules: tanStackQueryRules(options),
      },
    ],
  }
}


function tanStackQueryRules(options: TanStackQueryOptions): OxlintConfig['rules'] {

  const { ruleOptions = {} } = options


  const {
    exhaustiveDeps,
  } = ruleOptions


  return {
    'tanstack-query#js/exhaustive-deps': [
      'warn',
      {
        allowlist: {
          variables: exhaustiveDeps?.allowList?.variables ?? [],
          types: exhaustiveDeps?.allowList?.types ?? [],
        },
      },
    ],
    'tanstack-query#js/stable-query-client': 'error',
    'tanstack-query#js/no-rest-destructuring': 'error',
    'tanstack-query#js/no-unstable-deps': 'error',
    'tanstack-query#js/infinite-query-property-order': 'error',
    'tanstack-query#js/no-void-query-fn': 'error',
    'tanstack-query#js/mutation-property-order': 'error',
    'tanstack-query#js/prefer-query-options': 'error',
  }
}
