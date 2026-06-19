# @aelita-dev/oxlint-config

An opinionated [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) config for modern JavaScript and TypeScript projects.

This config enables a curated set of rules explicitly, while disabling Oxlint's category defaults.

## Install

```sh
pnpm add -D oxlint @aelita-dev/oxlint-config
```

Oxlint is a peer dependency, so install it alongside this package.

This package is ESM-only. Use `import` rather than CommonJS `require()`.

## Usage

Create `oxlint.config.ts`:

```ts
import { defineConfig } from '@aelita-dev/oxlint-config'

export default defineConfig()
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix"
  }
}
```

Run:

```sh
pnpm lint
pnpm lint:fix
```

## Philosophy

This package is intentionally explicit:

- Oxlint rule categories are disabled by default.
- Only rules selected by this config are enabled.
- Native Oxlint plugins are preferred when available.
- JavaScript ESLint plugins are used where Oxlint does not yet provide an equivalent rule or option.
- TypeScript, React, Vue, Vitest, Playwright, and TanStack support are enabled automatically when the relevant packages are installed.

## Configuration

```ts
import { defineConfig } from '@aelita-dev/oxlint-config'

export default defineConfig({
  options: {
    projectType: 'lib',
  },

  stylistic: {
    semi: false,
    quotes: 'single',
    indent: 2,
    commaDangle: 'always-multiline',
  },

  typescript: {
    enableTypeAwareRules: true,
  },

  react: false,
  playwright: false,
})
```

### Project Type

```ts
export default defineConfig({
  options: {
    projectType: 'app',
  },
})
```

Available values:

- `app`
- `lib`

The default is `app`.

### Feature Modules

Most modules accept either `false` to disable them, `true` to enable them with defaults, or an options object.

```ts
export default defineConfig({
  typescript: true,
  react: false,
  vitest: {
    settings: {
      typecheck: true,
    },
  },
})
```

Supported modules:

- `javascript`
- `unicorn`
- `node`
- `import`
- `stylistic`
- `typescript`
- `perfectionist`
- `vue`
- `react`
- `jsxA11y`
- `playwright`
- `vitest`
- `tanStackQuery`
- `tanStackRouter`

Automatic detection:

- `typescript` is enabled when `typescript` is installed.
- `vue` is enabled when Vue-related packages are installed.
- `react` is enabled when React-related packages are installed.
- `jsxA11y` follows React by default.
- `playwright` is enabled when `@playwright/test` is installed.
- `vitest` is enabled when `vitest` is installed.
- `tanStackQuery` is enabled when `@tanstack/query-core` is installed.
- `tanStackRouter` is enabled when `@tanstack/router-core` is installed.

### Ignore Patterns

```ts
export default defineConfig({
  ignore: [
    'coverage',
    'fixtures',
  ],
})
```

Replace the default ignore patterns:

```ts
export default defineConfig({
  ignore: {
    patterns: ['dist'],
    replaceDefault: true,
  },
})
```

### Stylistic

```ts
export default defineConfig({
  stylistic: {
    semi: false,
    quotes: 'single',
    indent: 2,
    commaDangle: 'always-multiline',
    jsxPascalCaseIgnore: ['my-component'],
  },
})
```

Set `stylistic: false` to disable stylistic rules.

### TypeScript

```ts
export default defineConfig({
  typescript: {
    enableTypeAwareRules: true,
    ruleOptions: {
      onlyThrowError: {
        allowThrowingUnknown: false,
      },
    },
  },
})
```

Type-aware rules are enabled by default when TypeScript support is enabled.

### Perfectionist

```ts
export default defineConfig({
  perfectionist: {
    sortImports: {
      typeImportFirst: true,
      internalPatternSymbols: ['~'],
      partitionByNewLine: true,
      environment: 'node',
    },
  },
})
```

### Overrides

Use Oxlint overrides for file-specific rule changes:

```ts
export default defineConfig({
  overrides: [
    {
      files: ['scripts/**/*.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
})
```

### Oxlint Options

Pass through Oxlint's `options` field with `oxlintOptions`:

```ts
export default defineConfig({
  oxlintOptions: {
    reportUnusedDisableDirectives: 'warn',
    respectEslintDisableDirectives: true,
  },
})
```

## Default Rule Categories

Oxlint enables some categories by default, especially `correctness`. This config turns every category off:

```ts
categories: {
  correctness: 'off',
  nursery: 'off',
  pedantic: 'off',
  perf: 'off',
  restriction: 'off',
  style: 'off',
  suspicious: 'off',
}
```

Individual rules configured by this package still work because Oxlint lets `rules` override `categories`.

This avoids accidental defaults from enabled plugins, while keeping plugin rules available for explicit use.

## Exported Utilities

The package also exports common glob constants:

```ts
import {
  GLOB_SRC,
  GLOB_TS,
  GLOB_TSX,
  GLOB_TESTS,
} from '@aelita-dev/oxlint-config'
```

## Development

```sh
pnpm install
pnpm run typecheck
pnpm run lint
pnpm run build
```

Before packaging, `prepack` runs the build so the published package contains `dist`.

## License

MIT
