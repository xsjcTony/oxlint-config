import type { OxlintConfig } from 'oxlint'
import globals from 'globals'
import { GLOB_SRC, GLOB_SRC_EXT } from '~/globs'


export function composeJavaScriptConfig(): OxlintConfig {
  return {
    env: {
      browser: true,
      builtin: true,
    },
    // @ts-expect-error - oxlint global type issue
    globals: {
      ...globals.browser,
      ...globals.builtin,
    },
    rules: {
      ...javascriptRules,
      // using js plugin because some rules or their options are not implemented in the native plugin yet
      ...javascriptJsPluginRules,
    },
    overrides: [
      {
        files: [`scripts/${GLOB_SRC}`, `cli.${GLOB_SRC_EXT}`],
        rules: {
          'no-console': 'off',
        },
      },
    ],
  }
}


const javascriptRules: OxlintConfig['rules'] = {
  curly: ['error', 'multi-or-nest', 'consistent'],
  'dot-notation': ['error', { allowKeywords: true }],
  'new-cap': [
    'error',
    {
      newIsCap: true,
      capIsNew: true,
      properties: true,
    },
  ],
  'no-console': ['error', { allow: ['warn', 'error'] }],
  'no-multi-assign': 'error',
  'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  'no-unexpected-multiline': 'error',
  'prefer-const': ['error', { destructuring: 'all' }],
  'no-const-assign': 'error',
  'no-constant-condition': ['error', { checkLoops: 'allExceptWhileTrue' }],
  'no-var': 'error',
  'no-object-constructor': 'error',
  'object-shorthand': ['error', 'always'],
  'no-prototype-builtins': 'error',
  'no-array-constructor': 'error',
  'prefer-template': 'error',
  'no-empty-pattern': ['error', { allowObjectPatternsAsParameters: false }],
  'no-eval': ['error', { allowIndirect: false }],
  'no-useless-escape': 'error',
  'no-new-func': 'error',
  'prefer-rest-params': 'error',
  'no-loop-func': 'error',
  'prefer-spread': 'error',
  'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
  'no-useless-concat': 'error',
  'no-useless-constructor': 'error',
  'no-dupe-class-members': 'error',
  'no-iterator': 'error',
  'no-undef': ['error', { 'typeof': true }],
  'no-unused-vars': [
    'warn',
    {
      args: 'after-used',
      argsIgnorePattern: '^_',
      vars: 'all',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
      destructuredArrayIgnorePattern: '^_',
    },
  ],
  eqeqeq: ['error', 'always', { 'null': 'ignore' }],
  'no-with': 'error',
  'default-param-last': 'error',
  'no-else-return': ['error', { allowElseIf: false }],
  'no-implied-eval': 'error',
  'no-loss-of-precision': 'error',
  'use-isnan': ['error', { enforceForIndexOf: true, enforceForSwitchCase: true }],
  'symbol-description': 'error',
  'sort-imports': [
    'error',
    {
      allowSeparatedGroups: false,
      ignoreCase: false,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
    },
  ],
}


const javascriptJsPluginRules: OxlintConfig['rules'] = {
  'eslint#js/one-var': ['error', 'never'],
  'eslint#js/prefer-arrow-callback': [
    'error',
    { allowNamedFunctions: false, allowUnboundThis: true },
  ],
}
