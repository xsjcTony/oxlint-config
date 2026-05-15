import type { VitestOptions } from '~types'
import type { OxlintConfig } from 'oxlint'
import { GLOB_UNIT_TESTS } from '~/globs'


export function composeVitestConfig(options: VitestOptions): OxlintConfig {

  const {
    files = GLOB_UNIT_TESTS,
    settings,
  } = options


  return {
    settings: {
      vitest: settings,
    },
    overrides: [
      {
        files,
        rules: vitestRules(options),
      },
    ],
  }
}


function vitestRules(options: VitestOptions): OxlintConfig['rules'] {

  const { isInEditor = false } = options


  return {
    'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
    'vitest/no-identical-title': 'error',
    'vitest/no-import-node-test': 'error',
    'vitest/no-focused-tests': isInEditor ? 'off' : ['error', { fixable: false }],
    'vitest/prefer-hooks-in-order': 'error',
    'vitest/prefer-lowercase-title': 'error',
    // TODO: not implemented yet - https://github.com/oxc-project/oxc/issues/4656
    /*
    'vitest/prefer-vi-mocked': 'error',
    */
    'vitest/require-mock-type-parameters': ['error', { checkImportFunctions: false }],
    'vitest/prefer-strict-boolean-matchers': 'error',
  }
}
