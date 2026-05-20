// oxlint-disable unicorn#js/prefer-single-call

import type { OxlintConfig } from 'oxlint'
import type { ConfigOptions } from '~types'
import { isPackageExists } from 'local-pkg'
import {
  composeIgnorePatterns,
  composeImportConfig,
  composeJavaScriptConfig,
  composeJsxA11yConfig,
  composeNodeConfig,
  composePerfectionistConfig,
  composePlaywrightConfig,
  composeReactConfig,
  composeStylisticConfig,
  composeTanStackQueryConfig,
  composeTanStackRouterConfig,
  composeTypeScriptConfig,
  composeUnicornConfig,
  composeVitestConfig,
  composeVueConfig,
  resolveStylisticConfig,
} from '~configs'


export function defineConfig(
  options: ConfigOptions = {},
): OxlintConfig {

  const {
    options: globalOptions = {},

    oxlintOptions = {},
    overrides: userOverrides = [],

    componentExtensions = [],
    isInEditor = !!(
      (process.env.VSCODE_PID || process.env.VSCODE_CWD || process.env.JETBRAINS_IDE || process.env.VIM)
      && !process.env.CI
    ),
    ignore: ignoreOptions,
    javascript: javascriptOptions = {},
    unicorn: unicornOptions = {},
    node: nodeOptions = {},
    'import': enableImport = true,
    stylistic: _stylistic = true,
    typescript: enableTypeScript = isPackageExists('typescript'),
    perfectionist: enablePerfectionist = true,
    vue: enableVue = VUE_PACKAGES.some(pkg => isPackageExists(pkg)),
    react: enableReact = REACT_PACKAGES.some(pkg => isPackageExists(pkg)),
    jsxA11y: enableJsxA11y = !!enableReact,
    playwright: enablePlaywright = isPackageExists('@playwright/test'),
    vitest: enableVitest = isPackageExists('vitest'),
    tanStackQuery: enableTanStackQuery = isPackageExists('@tanstack/query-core'),
    tanStackRouter: enableTanStackRouter = isPackageExists('@tanstack/router-core'),
  } = options


  const {
    projectType = 'app',
  } = globalOptions


  const stylisticOptions = resolveStylisticConfig(_stylistic)


  if (enableVue)
    componentExtensions.push('vue')


  const baseConfig: OxlintConfig = {
    // manage plugins in one place
    plugins: [
      'eslint',
      'unicorn',
      'node',
      'import',
      ...enableNativePlugin(!!enableTypeScript, 'typescript'),
      ...enableNativePlugin(!!enableReact, 'react'),
      ...enableNativePlugin(!!enableJsxA11y, 'jsx-a11y'),
    ],
    jsPlugins: [
      { name: 'eslint#js', specifier: 'oxlint-plugin-eslint' },
      { name: 'unicorn#js', specifier: 'eslint-plugin-unicorn' },
      { name: 'node#js', specifier: 'eslint-plugin-n' },
      ...enableJsPlugin(!!stylisticOptions, [
        { name: 'style#js', specifier: '@stylistic/eslint-plugin' },
        { name: 'antfu#js', specifier: 'eslint-plugin-antfu' },
      ]),
      ...enableJsPlugin(!!enablePerfectionist, [
        { name: 'perfectionist#js', specifier: 'eslint-plugin-perfectionist' },
      ]),
      ...enableJsPlugin(!!enableReact, [
        { name: 'react#js', specifier: 'eslint-plugin-react' },
      ]),
      ...enableJsPlugin(!!enablePlaywright, [
        { name: 'playwright#js', specifier: 'eslint-plugin-playwright' },
      ]),
      ...enableJsPlugin(!!enableTanStackQuery, [
        { name: 'tanstack-query#js', specifier: '@tanstack/eslint-plugin-query' },
      ]),
      ...enableJsPlugin(!!enableTanStackRouter, [
        { name: 'tanstack-router#js', specifier: '@tanstack/eslint-plugin-router' },
      ]),
    ],
    categories: {
      correctness: 'off',
      nursery: 'off',
      pedantic: 'off',
      perf: 'off',
      restriction: 'off',
      style: 'off',
      suspicious: 'off',
    },
    options: {
      reportUnusedDisableDirectives: 'warn',
      respectEslintDisableDirectives: true,
      ...oxlintOptions,
    },
  }


  const moduleConfigs: OxlintConfig[] = []


  // ignore
  if (ignoreOptions)
    baseConfig.ignorePatterns = composeIgnorePatterns(ignoreOptions)


  // javascript
  moduleConfigs.push(
    composeJavaScriptConfig({
      isInEditor,
      ...javascriptOptions,
    }),
  )


  // unicorn
  moduleConfigs.push(
    composeUnicornConfig({
      typescript: !!enableTypeScript,
      ...unicornOptions,
    }),
  )


  // node
  moduleConfigs.push(composeNodeConfig(nodeOptions))


  // import
  if (enableImport) {
    moduleConfigs.push(
      composeImportConfig({
        typescript: !!enableTypeScript,
        stylistic: !!stylisticOptions,
        vue: !!enableVue,
        ...typeof enableImport !== 'boolean' && enableImport,
      }),
    )
  }


  // stylistic
  if (stylisticOptions) {
    moduleConfigs.push(
      composeStylisticConfig({
        typescript: !!enableTypeScript,
        ...stylisticOptions,
      }),
    )
  }


  // typescript
  if (enableTypeScript) {
    moduleConfigs.push(
      composeTypeScriptConfig({
        projectType,
        ...typeof enableTypeScript !== 'boolean' && enableTypeScript,
      }),
    )
  }


  // perfectionist
  if (enablePerfectionist) {
    moduleConfigs.push(
      composePerfectionistConfig({
        projectType,
        ...typeof enablePerfectionist !== 'boolean' && enablePerfectionist,
      }),
    )
  }


  // vue
  // TODO: add vue support once oxlint supports template linting - https://github.com/oxc-project/oxc/issues/11440
  if (enableVue) {
    moduleConfigs.push(
      composeVueConfig({
        typescript: !!enableTypeScript,
        stylistic: !!stylisticOptions,
        ...typeof enableVue !== 'boolean' && enableVue,
      }),
    )
  }


  // react
  if (enableReact) {
    moduleConfigs.push(
      composeReactConfig({
        typescript: !!enableTypeScript,
        ...typeof enableReact !== 'boolean' && enableReact,
      }),
    )
  }


  // jsx-a11y
  if (enableJsxA11y) {
    moduleConfigs.push(
      composeJsxA11yConfig({
        ...typeof enableJsxA11y !== 'boolean' && enableJsxA11y,
      }),
    )
  }


  // playwright
  if (enablePlaywright) {
    moduleConfigs.push(
      composePlaywrightConfig({
        ...typeof enablePlaywright !== 'boolean' && enablePlaywright,
      }),
    )
  }


  // vitest
  if (enableVitest) {
    moduleConfigs.push(
      composeVitestConfig({
        isInEditor,
        ...typeof enableVitest !== 'boolean' && enableVitest,
      }),
    )
  }


  // tanstack query
  if (enableTanStackQuery) {
    moduleConfigs.push(
      composeTanStackQueryConfig({
        ...typeof enableTanStackQuery !== 'boolean' && enableTanStackQuery,
      }),
    )
  }


  // tanstack router
  if (enableTanStackRouter) {
    moduleConfigs.push(
      composeTanStackRouterConfig({
        ...typeof enableTanStackRouter !== 'boolean' && enableTanStackRouter,
      }),
    )
  }


  // merge configs
  for (const moduleConfig of moduleConfigs)
    mergeOxlintConfigs(baseConfig, moduleConfig)


  // add user overrides at the end
  if (userOverrides.length > 0)
    baseConfig.overrides = [...baseConfig.overrides ?? [], ...userOverrides]


  return baseConfig
}


function enableNativePlugin<const T extends NonNullable<OxlintConfig['plugins']>[number]>(
  enabled: boolean,
  plugin: T,
): T[] {
  return enabled ? [plugin] : []
}


// copied from Oxlint type definition because it's not exported
interface JsPluginEntry { name: string; specifier: string }

function enableJsPlugin(
  enabled: boolean,
  plugin: JsPluginEntry | JsPluginEntry[],
): JsPluginEntry[] {
  return enabled
    ? Array.isArray(plugin)
      ? plugin
      : [plugin]
    : []
}


function mergeOxlintConfigs(target: OxlintConfig, source: OxlintConfig): void {
  // for plugins, please manage at the top level's base config

  if (source.env)
    target.env = { ...target.env, ...source.env }

  if (source.globals)
    target.globals = { ...target.globals, ...source.globals }

  if (source.settings)
    target.settings = { ...target.settings, ...source.settings }

  if (source.rules)
    target.rules = { ...target.rules, ...source.rules }

  if (source.overrides)
    target.overrides = [...target.overrides ?? [], ...source.overrides]

  if (source.options)
    target.options = { ...target.options, ...source.options }
}


const VUE_PACKAGES = [
  'vue',
  'nuxt',
  'vitepress',
  '@slidev/cli',
]


const REACT_PACKAGES = [
  'react',
  'react-dom',
  'react-native',
  'next',
]
