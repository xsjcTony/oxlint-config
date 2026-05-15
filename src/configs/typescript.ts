import type { TypeScriptOptions } from '~types'
import type { OxlintConfig } from 'oxlint'
import { GLOB_DTS, GLOB_TS, GLOB_TSX } from '~/globs'


export function composeTypeScriptConfig(options: TypeScriptOptions): OxlintConfig {

  const {
    componentExtensions = [],
    enableTypeAwareRules = true,
  } = options


  return {
    options: {
      typeAware: enableTypeAwareRules,
    },
    overrides: [
      {
        files: [
          GLOB_TS,
          GLOB_TSX,
          ...componentExtensions.map(ext => `**/*.${ext}`),
        ],
        rules: {
          ...typescriptRules(options),
          ...enableTypeAwareRules && typeAwareRules(options),
        },
      },
      {
        files: [GLOB_TSX],
        rules: {
          'typescript/no-unnecessary-type-constraint': 'off',
        },
      },
      {
        files: [GLOB_DTS],
        rules: {
          'typescript/consistent-indexed-object-style': 'off',
          'typescript/consistent-type-definitions': 'off',
          'typescript/no-empty-object-type': 'off',
          'no-unused-vars': 'off',
          'no-var': 'off',
        },
      },
      {
        files: ['**/*.{test,spec}.{ts,tsx}'],
        rules: {
          'typescript/no-empty-function': 'off',
        },
      },
      {
        files: ['**/*.{ts,cts}'],
        rules: {
          'typescript/no-require-imports': 'off',
        },
      },
    ],
  }
}


function typescriptRules(options: TypeScriptOptions): OxlintConfig['rules'] {

  const { projectType = 'app' } = options


  return {
    'typescript/adjacent-overload-signatures': 'error',
    'typescript/array-type': ['error', { 'default': 'array', readonly: 'array' }],
    'typescript/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 2,
      },
    ],
    'typescript/no-unsafe-function-type': 'error',
    'typescript/no-wrapper-object-types': 'error',
    'typescript/consistent-indexed-object-style': ['error', 'record'],
    'typescript/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow',
      },
    ],
    'typescript/consistent-type-definitions': [
      'error',
      projectType === 'app' ? 'type' : 'interface',
    ],
    'typescript/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      },
    ],

    'default-param-last': 'off',
    'typescript/default-param-last': 'error',

    'typescript/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        allowFunctionsWithoutTypeParameters: false,
        allowIIFEs: false,
        allowedNames: [],
      },
    ],
    'typescript/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],

    // TODO: not implemented yet: https://github.com/oxc-project/oxc/issues/2180
    // 'typescript/method-signature-style': ['error', 'property'],

    'no-array-constructor': 'off',
    'typescript/no-array-constructor': 'error',

    'typescript/no-confusing-non-null-assertion': 'error',

    'no-dupe-class-members': 'off',

    'no-empty-function': 'off',
    'typescript/no-empty-function': ['error', { allow: ['decoratedFunctions'] }],

    'typescript/no-empty-object-type': [
      'error',
      {
        allowInterfaces: 'with-single-extends',
        allowObjectTypes: 'always',
      },
    ],
    'typescript/no-extra-non-null-assertion': 'error',
    'typescript/no-extraneous-class': 'error',
    'typescript/no-inferrable-types': [
      'error',
      {
        ignoreParameters: false,
        ignoreProperties: false,
      },
    ],

    'typescript/no-invalid-void-type': [
      'error',
      {
        allowInGenericTypeArguments: true,
        allowAsThisParameter: true,
      },
    ],

    'no-loop-func': 'off',
    'typescript/no-loop-func': 'error',

    'typescript/no-misused-new': 'error',
    'typescript/no-namespace': [
      'error',
      {
        allowDeclarations: true,
        allowDefinitionFiles: true,
      },
    ],
    'typescript/no-non-null-assertion': 'warn',

    'no-redeclare': 'off',

    'typescript/no-require-imports': 'error',
    'typescript/no-this-alias': [
      'error',
      {
        allowDestructuring: true,
        allowedNames: [],
      },
    ],

    'no-useless-constructor': 'off',
    'typescript/no-useless-constructor': 'error',

    'typescript/no-useless-empty-export': 'error',
    'typescript/parameter-properties': ['error', { prefer: 'class-property', allow: [] }],
    'typescript/prefer-as-const': 'error',
    'typescript/prefer-for-of': 'error',
    'typescript/prefer-function-type': 'error',
    'typescript/triple-slash-reference': [
      'error',
      {
        path: 'never',
        types: 'prefer-import',
        lib: 'never',
      },
    ],
    'typescript/unified-signatures': 'error',

    'no-undef': 'off',
  }
}


function typeAwareRules(options: TypeScriptOptions): OxlintConfig['rules'] {

  const { ruleOptions = {} } = options


  const {
    onlyThrowError,
  } = ruleOptions


  return {
    'typescript/await-thenable': 'error',
    'typescript/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: false }],

    'dot-notation': 'off',
    'typescript/dot-notation': [
      'error',
      {
        allowKeywords: true,
        allowPrivateClassPropertyAccess: false,
        allowProtectedClassPropertyAccess: false,
        allowIndexSignaturePropertyAccess: false,
      },
    ],

    'typescript/no-confusing-void-expression': [
      'error',
      {
        ignoreArrowShorthand: false,
        ignoreVoidOperator: true,
        ignoreVoidReturningFunctions: false,
      },
    ],
    'typescript/no-duplicate-type-constituents': [
      'error',
      {
        ignoreIntersections: false,
        ignoreUnions: false,
      },
    ],
    'typescript/no-floating-promises': ['error', { checkThenables: false, ignoreVoid: true, ignoreIIFE: false }],
    'typescript/no-for-in-array': 'error',
    'typescript/no-implied-eval': 'error',
    'typescript/no-misused-promises': [
      'error',
      {
        checksConditionals: true,
        checksVoidReturn: false,
        checksSpreads: true,
      },
    ],
    'typescript/no-misused-spread': 'error',
    'typescript/no-unnecessary-boolean-literal-compare': [
      'error',
      {
        allowComparingNullableBooleansToTrue: false,
        allowComparingNullableBooleansToFalse: false,
      },
    ],
    'typescript/no-unnecessary-condition': [
      'error',
      {
        allowConstantLoopConditions: true,
        checkTypePredicates: false,
      },
    ],
    'typescript/no-unnecessary-qualifier': 'error',
    'typescript/no-unnecessary-type-assertion': ['error', { checkLiteralConstAssertions: false }],
    'typescript/no-unnecessary-type-constraint': 'error',
    'typescript/no-unsafe-unary-minus': 'error',
    'typescript/prefer-includes': 'error',
    'typescript/prefer-nullish-coalescing': [
      'error',
      {
        ignoreTernaryTests: true,
        ignoreIfStatements: false,
        ignoreConditionalTests: true,
        ignoreMixedLogicalExpressions: true,
        ignorePrimitives: {
          'boolean': true,
          number: true,
          string: true,
        },
        ignoreBooleanCoercion: true,
      },
    ],
    'typescript/prefer-optional-chain': 'error',
    'typescript/prefer-reduce-type-parameter': 'error',
    'typescript/prefer-regexp-exec': 'error',
    'typescript/prefer-return-this-type': 'error',
    'typescript/prefer-string-starts-ends-with': ['error', { allowSingleElementEquality: 'never' }],
    'typescript/promise-function-async': [
      'error',
      {
        allowAny: true,
        checkArrowFunctions: true,
        checkFunctionDeclarations: true,
        checkFunctionExpressions: true,
        checkMethodDeclarations: true,
        allowedPromiseNames: [],
      },
    ],
    'typescript/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
    'typescript/require-await': 'error',
    'typescript/restrict-plus-operands': [
      'error',
      {
        skipCompoundAssignments: false,
        allowAny: false,
        allowBoolean: false,
        allowNullish: false,
        allowRegExp: false,
        allowNumberAndString: false,
      },
    ],
    'typescript/restrict-template-expressions': [
      'error',
      {
        allowAny: false,
        allowNumber: true,
        allowBoolean: false,
        allowRegExp: false,
        allowNullish: false,
        allowNever: false,
      },
    ],
    'typescript/return-await': ['error', 'always'],
    'typescript/switch-exhaustiveness-check': [
      'error',
      {
        requireDefaultForNonUnion: true,
        allowDefaultCaseForExhaustiveSwitch: false,
        considerDefaultExhaustiveForUnions: true,
      },
    ],
    'typescript/unbound-method': ['error', { ignoreStatic: false }],
    'typescript/prefer-find': 'error',
    'typescript/no-unnecessary-template-expression': 'error',
    'typescript/only-throw-error': [
      'error',
      {
        allow: [
          {
            from: 'package',
            'package': '@tanstack/router-core',
            name: 'Redirect',
          },
          {
            from: 'package',
            'package': '@tanstack/router-core',
            name: 'NotFoundError',
          },
          ...onlyThrowError?.allow ?? [],
        ],
        allowRethrowing: onlyThrowError?.allowRethrowing ?? false,
        allowThrowingAny: onlyThrowError?.allowThrowingAny ?? false,
        allowThrowingUnknown: onlyThrowError?.allowThrowingUnknown ?? false,
      },
    ],
    'typescript/no-deprecated': 'warn',
    'typescript/related-getter-setter-pairs': 'error',
    'typescript/no-unnecessary-type-conversion': 'error',
    'typescript/no-useless-default-assignment': 'error',
  }
}
