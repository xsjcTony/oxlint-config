import type { OxlintConfig } from 'oxlint'
import type { ReactOptions } from '~types'
import { GLOB_SRC } from '~/globs'


export function composeReactConfig(options: ReactOptions): OxlintConfig {

  const {
    files = [GLOB_SRC],
    typescript = false,
    settings,
  } = options


  return {
    settings: {
      react: {
        version: '19.0.0',
        ...settings,
      },
    },
    overrides: [
      {
        files,
        rules: {
          ...reactRules(options),
          ...jsxRules(options),
          ...typescript && reactTypeScriptRules,
          ...typescript && jsxTypeScriptRules,
          // using js plugins because some rules or their options are not implemented in the native plugin yet
          ...reactJsPluginRules,
          ...jsxJsPluginRules,
          ...typescript && jsxTypeScriptJsPluginRules,
        },
      },
    ],
  }
}


function reactRules(options: ReactOptions): OxlintConfig['rules'] {

  const { ruleOptions = {} } = options


  return {
    'react/button-has-type': ['error', { button: true, submit: true, reset: true }],
    'react/display-name': ['error', { ignoreTranspilerName: false, checkContextObjects: false }],
    'react/hook-use-state': ['error', { allowDestructuredState: true }],
    'react/no-array-index-key': 'warn',
    'react/no-children-prop': 'error',
    'react/no-danger': 'warn',
    'react/no-danger-with-children': 'error',
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'react/no-string-refs': ['error', { noTemplateLiterals: true }],
    'react/no-this-in-sfc': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': [
      'error',
      {
        requireDataLowercase: true,
        ignore: ruleOptions.noUnknownProperty?.ignoredProperties,
      },
    ],
    'react/style-prop-object': ['error', { allow: ruleOptions.stylePropObject?.allowedComponents }],
    'react/void-dom-elements-no-children': 'error',
    'react/no-object-type-as-default-prop': 'error',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],

    // react-hooks rules
    'react/rules-of-hooks': 'error',
    'react/exhaustive-deps': [
      'warn',
      { additionalHooks: ruleOptions.reactHooksExhaustiveDeps?.additionalHooks },
    ],

    // react-refresh rules
    'react/only-export-components': [
      'warn',
      {
        checkJS: false,
        allowConstantExport: true,
        allowExportNames: ruleOptions.fastRefresh?.allowedExportNames,
      },
    ],
  }
}


function jsxRules(options: ReactOptions): OxlintConfig['rules'] {

  const { ruleOptions = {} } = options


  return {
    'react/jsx-boolean-value': ['error', 'never', { assumeUndefinedIsFalse: false }],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-script-url': [
      'error',
      [
        { name: 'Link', props: ['to', 'href'] },
        ...ruleOptions.jsxNoScriptUrl?.extraComponentNameAndProps ?? [],
      ],
    ],
    'react/jsx-no-target-blank': [
      'error',
      {
        allowReferrer: false,
        enforceDynamicLinks: 'always',
        warnOnSpreadAttributes: true,
        links: true,
        forms: true,
      },
    ],
    'react/jsx-no-undef': 'error',
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-props-no-spread-multi': 'error',
  }
}


const reactTypeScriptRules: OxlintConfig['rules'] = {
  'react/no-unknown-property': 'off',
}


const jsxTypeScriptRules: OxlintConfig['rules'] = {
  'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
}


const reactJsPluginRules: OxlintConfig['rules'] = {
  'react#js/destructuring-assignment': ['error', 'always', { destructureInSignature: 'always' }],
  'react#js/no-deprecated': 'error',
}


const jsxJsPluginRules: OxlintConfig['rules'] = {
  'react#js/jsx-no-leaked-render': 'warn',
}


const jsxTypeScriptJsPluginRules: OxlintConfig['rules'] = {
  'react#js/jsx-no-leaked-render': 'off',
}
