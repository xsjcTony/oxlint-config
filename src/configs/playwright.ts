import type { PlaywrightOptions } from '~types'
import type { OxlintConfig } from 'oxlint'
import { GLOB_E2E_TESTS } from '~/globs'


export function composePlaywrightConfig(options: PlaywrightOptions): OxlintConfig {

  const { files = [GLOB_E2E_TESTS] } = options


  return {
    overrides: [
      {
        files,
        rules: playwrightRules,
      },
    ],
  }
}


const playwrightRules: OxlintConfig['rules'] = {
  'playwright#js/no-conditional-in-test': 'warn',
  'playwright#js/no-element-handle': 'error',
  'playwright#js/no-eval': 'error',
  'playwright#js/no-focused-test': 'error',
  'playwright#js/no-force-option': 'warn',
  'playwright#js/no-page-pause': 'error',
  'playwright#js/no-skipped-test': 'error',
  'playwright#js/no-useless-not': 'error',
  'playwright#js/no-wait-for-timeout': 'warn',
  'playwright#js/prefer-strict-equal': 'warn',
  'playwright#js/prefer-lowercase-title': [
    'off',
    {
      ignore: ['test.describe'],
      ignoreTopLevelDescribe: true,
    },
  ],
  'playwright#js/prefer-to-be': 'error',
  'playwright#js/prefer-to-have-length': 'error',
  'playwright#js/valid-expect': [
    'error',
    {
      minArgs: 1,
      maxArgs: 2,
    },
  ],
  'playwright#js/prefer-web-first-assertions': 'error',
  'playwright#js/no-networkidle': 'error',
  'playwright#js/no-nested-step': 'error',
  'playwright#js/prefer-to-contain': 'error',
  'playwright#js/prefer-to-have-count': 'error',
  'playwright#js/valid-title': 'error',
  'playwright#js/no-wait-for-selector': 'error',
  'playwright#js/no-get-by-title': 'warn',
  'playwright#js/no-unsafe-references': 'error',
  'playwright#js/no-conditional-expect': 'error',
  'playwright#js/no-duplicate-hooks': 'error',
  'playwright#js/no-standalone-expect': 'error',
  'playwright#js/prefer-hooks-in-order': 'error',
  'playwright#js/prefer-hooks-on-top': 'error',
  'playwright#js/prefer-comparison-matcher': 'error',
  'playwright#js/prefer-equality-matcher': 'error',
  'playwright#js/valid-describe-callback': 'error',
  'playwright#js/valid-expect-in-promise': 'error',
  'playwright#js/no-slowed-test': ['error', { allowConditional: true }],
}
