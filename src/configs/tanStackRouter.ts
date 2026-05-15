import type { TanStackRouterOptions } from '~types'
import type { OxlintConfig } from 'oxlint'
import { GLOB_SRC } from '~/globs'


export function composeTanStackRouterConfig(options: TanStackRouterOptions): OxlintConfig {

  const { files = [GLOB_SRC] } = options


  return {
    overrides: [
      {
        files,
        rules: tanStackRouterRules,
      },
    ],
  }
}


const tanStackRouterRules: OxlintConfig['rules'] = {
  'tanstack-router#js/create-route-property-order': 'error',
}
