import type {
  IgnoreOptions,
  ImportOptions,
  JavaScriptOptions,
  JsxA11yOptions,
  NodeOptions,
  OptionsComponentExtensions,
  OptionsIsInEditor,
  PerfectionistOptions,
  PlaywrightOptions,
  ReactOptions,
  StylisticOptions,
  TanStackQueryOptions,
  TanStackRouterOptions,
  TypeScriptOptions,
  UnicornOptions,
  VitestOptions,
  VueOptions,
} from '~types'
import type { OxlintConfig, OxlintOverride } from 'oxlint'


export interface ConfigOptions extends OptionsComponentExtensions, OptionsIsInEditor {
  options?: GlobalOptions

  ignore?: IgnoreOptions
  javascript?: JavaScriptOptions
  unicorn?: UnicornOptions
  node?: NodeOptions
  'import'?: boolean | ImportOptions
  stylistic?: boolean | StylisticOptions
  typescript?: boolean | TypeScriptOptions
  perfectionist?: boolean | PerfectionistOptions
  vue?: boolean | VueOptions
  react?: boolean | ReactOptions
  jsxA11y?: boolean | JsxA11yOptions
  playwright?: boolean | PlaywrightOptions
  vitest?: boolean | VitestOptions
  tanStackQuery?: boolean | TanStackQueryOptions
  tanStackRouter?: boolean | TanStackRouterOptions

  overrides?: OxlintOverride[]

  oxlintOptions?: OxlintConfig['options']
}


export interface GlobalOptions {
  /**
   * Whether the project is a library or an app
   *
   * @default 'app'
   */
  projectType?: 'app' | 'lib'
}
