import type { OxlintConfig } from 'oxlint'
import type { OptionsFiles, OptionsHasTypeScript } from '~types'


export interface ReactOptions extends OptionsFiles, OptionsHasTypeScript {
  settings?: NonNullable<OxlintConfig['settings']>['react']

  ruleOptions?: RuleOptions
}


interface RuleOptions {
  /**
   * For `react/boolean-prop-naming` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/boolean-prop-naming.md
   */
  booleanPropNaming?: {
    extraPropTypeNames?: [string, ...string[]]
  }

  /**
   * For `react/jsx-no-script-url` rule.
   *
   * @see https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-script-url.html
   */
  jsxNoScriptUrl?: {
    extraComponentNameAndProps?: { name: string; props: string[] }[]
  }

  /**
   * For `react/no-unknown-property` rule.
   *
   * @see https://oxc.rs/docs/guide/usage/linter/rules/react/no-unknown-property.html
   */
  noUnknownProperty?: {
    ignoredProperties?: string[]
  }

  /**
   * For `react/style-prop-object` rule.
   *
   * @see https://oxc.rs/docs/guide/usage/linter/rules/react/style-prop-object.html
   */
  stylePropObject?: {
    allowedComponents?: string[]
  }


  /**
   * For `react/exhaustive-deps` rule.
   *
   * @see https://oxc.rs/docs/guide/usage/linter/rules/react/exhaustive-deps.html
   */
  reactHooksExhaustiveDeps?: {
    additionalHooks?: string
  }


  /**
   * For `react/only-export-components` rule.
   *
   * @see https://oxc.rs/docs/guide/usage/linter/rules/react/only-export-components.html
   */
  fastRefresh?: {
    allowedExportNames?: string[]
  }
}
