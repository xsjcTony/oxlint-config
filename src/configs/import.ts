import type { ImportOptions } from '~types'
import type { OxlintConfig } from 'oxlint'


export function composeImportConfig(options: ImportOptions): OxlintConfig {

  const {
    typescript = false,
    stylistic = true,
  } = options


  return {
    rules: {
      ...importRules(options),
      ...typescript && importTypescriptRules(options),
      ...stylistic && importStylisticRules,
      ...typescript && stylistic && importTypescriptStylisticRules,
    },
  }
}


function importRules(options: ImportOptions): OxlintConfig['rules'] {

  const { vue } = options


  return {
    'import/first': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/extensions': [
      'error',
      'always',
      {
        ignorePackages: true,
        checkTypeImports: true,
        js: 'never',
        jsx: 'never',
        ...vue && { vue: 'always' },
      },
    ],
    'import/named': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'import/no-self-import': 'error',
  }
}


function importTypescriptRules(options: ImportOptions): OxlintConfig['rules'] {

  const { vue } = options


  return {
    'import/extensions': [
      'error',
      'always',
      {
        ignorePackages: true,
        checkTypeImports: true,
        ts: 'never',
        tsx: 'never',
        ...vue && { vue: 'always' },
      },
    ],
    'import/named': 'off',
  }
}


const importStylisticRules: OxlintConfig['rules'] = {
  'import/newline-after-import': ['error', { count: 2, exactCount: true, considerComments: true }],
}


const importTypescriptStylisticRules: OxlintConfig['rules'] = {
  'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
}
