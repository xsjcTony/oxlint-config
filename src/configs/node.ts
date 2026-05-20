import type { OxlintConfig } from 'oxlint'
import type { NodeOptions } from '~types'
import globals from 'globals'


export function composeNodeConfig(_options: NodeOptions): OxlintConfig {
  return {
    env: {
      node: true,
    },
    // @ts-expect-error - oxlint global type issue
    globals: {
      ...globals.node,
    },
    rules: {
      ...nodeRules,
      // using js plugin because some rules or their options are not implemented in the native plugin yet
      ...nodeJsPluginRules,
    },
  }
}


const nodeRules: OxlintConfig['rules'] = {
  'node/no-exports-assign': 'error',
  'node/no-new-require': 'error',
  'node/no-path-concat': 'error',
}


const nodeJsPluginRules: OxlintConfig['rules'] = {
  'node#js/no-deprecated-api': 'error',
  'node#js/prefer-global/buffer': ['error', 'never'],
  'node#js/prefer-global/console': ['error', 'always'],
  'node#js/prefer-global/process': ['error', 'always'],
  'node#js/prefer-global/url-search-params': ['error', 'always'],
  'node#js/prefer-global/url': ['error', 'always'],
  'node#js/process-exit-as-throw': 'error',
}
