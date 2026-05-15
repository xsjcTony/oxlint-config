import type { StylisticBaseOptions, StylisticOptions } from '~types'
import type { OxlintConfig } from 'oxlint'


type FilledStylisticConfig = Required<StylisticBaseOptions>

type ResolvedStylisticOptions = StylisticOptions & FilledStylisticConfig


const STYLISTIC_DEFAULT_CONFIG: FilledStylisticConfig = {
  semi: false,
  indent: 2,
  quotes: 'single',
  commaDangle: 'always-multiline',
}


export function resolveStylisticConfig(
  options: StylisticOptions | boolean,
): ResolvedStylisticOptions | false {
  if (options === false)
    return false

  return typeof options === 'object'
    ? { ...STYLISTIC_DEFAULT_CONFIG, ...options }
    : STYLISTIC_DEFAULT_CONFIG
}


export function composeStylisticConfig(options: StylisticOptions): OxlintConfig {

  const config = resolveStylisticConfig(options)

  if (!config)
    return {}


  const resolvedOptions: ResolvedStylisticOptions = typeof options === 'boolean'
    ? config
    : { ...options, ...config }


  const { typescript = false } = options


  return {
    rules: {
      ...jsTsSharedRules(resolvedOptions),
      ...typescript && typescriptRules(resolvedOptions),
      ...jsxRules(resolvedOptions),
    },
  }
}


function jsTsSharedRules(options: ResolvedStylisticOptions): OxlintConfig['rules'] {

  const {
    semi,
    quotes,
    indent,
    commaDangle,
  } = options


  return {
    'style#js/array-bracket-newline': ['error', 'consistent'],
    'style#js/array-bracket-spacing': ['error', 'never'],
    'style#js/array-element-newline': ['error', { consistent: true, multiline: true }],
    'style#js/arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'style#js/arrow-spacing': ['error', { before: true, after: true }],
    'style#js/block-spacing': ['error', 'always'],
    'style#js/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'style#js/comma-dangle': ['error', commaDangle],
    'style#js/comma-spacing': ['error', { before: false, after: true }],
    'style#js/comma-style': ['error', 'last'],
    'style#js/computed-property-spacing': ['error', 'never', { enforceForClassMembers: true }],
    'style#js/dot-location': ['error', 'property'],
    'style#js/eol-last': ['error', 'always'],
    'style#js/function-call-argument-newline': ['error', 'consistent'],
    'style#js/function-call-spacing': ['error', 'never'],
    'style#js/function-paren-newline': ['error', 'consistent'],
    'style#js/generator-star-spacing': ['error', { before: false, after: true }],
    'style#js/indent': ['error', indent, { SwitchCase: 1, ignoreComments: false }],
    'style#js/jsx-quotes': ['error', 'prefer-double'],
    'style#js/key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
    'style#js/keyword-spacing': ['error', { before: true, after: true }],
    'style#js/lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
        exceptAfterOverload: true,
      },
    ],
    'style#js/multiline-ternary': ['error', 'always-multiline'],
    'style#js/new-parens': ['error', 'always'],
    'style#js/newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
    'style#js/no-extra-parens': [
      'error',
      'all',
      {
        ignoreJSX: 'multi-line',
        nestedBinaryExpressions: false,
        nestedConditionalExpressions: false,
        ternaryOperandBinaryExpressions: false,
      },
    ],
    'style#js/no-extra-semi': 'error',
    'style#js/no-floating-decimal': 'error',
    'style#js/no-mixed-operators': ['error', { allowSamePrecedence: true }],
    'style#js/no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'style#js/no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0 }],
    'style#js/no-tabs': ['error', { allowIndentationTabs: false }],
    'style#js/no-trailing-spaces': ['error', { ignoreComments: false, skipBlankLines: false }],
    'style#js/no-whitespace-before-property': 'error',
    'style#js/nonblock-statement-body-position': ['error', 'below'],
    'style#js/object-curly-spacing': ['error', 'always', { emptyObjects: 'never' }],
    'style#js/one-var-declaration-per-line': ['error', 'always'],
    'style#js/operator-linebreak': ['error', 'before', { overrides: { '=': 'ignore' } }],
    'style#js/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: ['class', 'function', 'iife', 'interface'] },
      { blankLine: 'always', prev: ['class', 'function', 'iife', 'interface'], next: '*' },
    ],
    'style#js/quote-props': ['error', 'as-needed', { keywords: true }],
    'style#js/quotes': ['error', quotes, { avoidEscape: true, allowTemplateLiterals: 'always' }],
    'style#js/rest-spread-spacing': ['error', 'never'],
    'style#js/semi': ['error', semi ? 'always' : 'never'],
    'style#js/semi-spacing': ['error', { before: false, after: true }],
    'style#js/semi-style': ['error', 'last'],
    'style#js/space-before-blocks': ['error', 'always'],
    'style#js/space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'style#js/space-in-parens': ['error', 'never'],
    'style#js/space-infix-ops': ['error', { int32Hint: false, ignoreTypes: false }],
    'style#js/space-unary-ops': ['error', { words: true, nonwords: false }],
    'style#js/spaced-comment': ['error', 'always', { exceptions: ['-', '+', '*'], markers: ['/'] }],
    'style#js/switch-colon-spacing': ['error', { before: false, after: true }],
    'style#js/template-curly-spacing': ['error', 'never'],
    'style#js/template-tag-spacing': ['error', 'never'],
    'style#js/wrap-iife': ['error', 'inside', { functionPrototypeMethods: false }],
    'style#js/yield-star-spacing': ['error', { before: false, after: true }],
    'style#js/indent-binary-ops': ['error', indent],
    'style#js/curly-newline': ['error', { consistent: true }],

    'antfu#js/consistent-list-newline': 'error',
    'antfu#js/top-level-function': 'error',
    'antfu#js/consistent-chaining': ['error', { allowLeadingPropertyAccess: true }],
  }
}


function typescriptRules(options: ResolvedStylisticOptions): OxlintConfig['rules'] {
  return {
    'style#js/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: options.semi ? 'semi' : 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      },
    ],
    'style#js/type-annotation-spacing': [
      'error',
      {
        before: false,
        after: true,
        overrides: {
          arrow: 'ignore',
        },
      },
    ],
    'style#js/type-generic-spacing': 'error',
    'style#js/type-named-tuple-spacing': 'error',
  }
}


function jsxRules(options: ResolvedStylisticOptions): OxlintConfig['rules'] {
  return {
    'style#js/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'style#js/jsx-closing-tag-location': ['error', 'tag-aligned'],
    'style#js/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
        propElementValues: 'always',
      },
    ],
    'style#js/jsx-curly-newline': ['error', { multiline: 'consistent', singleline: 'consistent' }],
    'style#js/jsx-curly-spacing': [
      'error',
      {
        when: 'never',
        children: true,
        allowMultiline: false,
        attributes: true,
      },
    ],
    'style#js/jsx-equals-spacing': ['error', 'never'],
    'style#js/jsx-first-prop-new-line': ['error', 'multiline'],
    'style#js/jsx-function-call-newline': ['error', 'multiline'],
    'style#js/jsx-indent-props': ['error', options.indent],
    'style#js/jsx-max-props-per-line': ['error', { maximum: { single: 3, multi: 1 } }],
    'style#js/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: false,
        allowLeadingUnderscore: false,
        allowNamespace: true,
        ignore: options.jsxPascalCaseIgnore ?? [],
      },
    ],
    'style#js/jsx-self-closing-comp': ['error', { html: true, component: true }],
    'style#js/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],
    'style#js/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        'return': 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ],
  }
}
