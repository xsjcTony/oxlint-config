/**
 * @see https://github.com/antfu/eslint-config/blob/main/src/globs.ts
 */

export const GLOB_SRC_EXT = '{js,cjs,mjs,jsx,cjsx,mjsx,ts,cts,mts,tsx,ctsx,mtsx}'
export const GLOB_SRC = `**/*.${GLOB_SRC_EXT}`

export const GLOB_JS = '**/*.{js,cjs,mjs}'
export const GLOB_JSX = '**/*.{jsx,cjsx,mjsx}'

export const GLOB_TS = '**/*.{ts,cts,mts}'
export const GLOB_TSX = '**/*.{tsx,ctsx,mtsx}'
export const GLOB_DTS = '**/*.d.{ts,cts,mts}'

export const GLOB_STYLE = '**/*.{c,le,sc}ss'
export const GLOB_CSS = '**/*.css'
export const GLOB_POSTCSS = '**/*.{p,post}css'
export const GLOB_LESS = '**/*.less'
export const GLOB_SCSS = '**/*.scss'

export const GLOB_JSON = '**/*.json'
export const GLOB_JSON5 = '**/*.json5'
export const GLOB_JSONC = '**/*.jsonc'

export const GLOB_MARKDOWN = '**/*.md'
export const GLOB_MARKDOWN_IN_MARKDOWN = '**/*.md/*.md'
export const GLOB_SVELTE = '**/*.svelte{,.js,.ts}'
export const GLOB_VUE = '**/*.vue'
export const GLOB_YAML = '**/*.{yml,yaml}'
export const GLOB_TOML = '**/*.toml'
export const GLOB_XML = '**/*.xml'
export const GLOB_SVG = '**/*.svg'
export const GLOB_HTML = '**/*.{htm,html}'
export const GLOB_ASTRO = '**/*.astro'
export const GLOB_ASTRO_TS = '**/*.astro/*.ts'
export const GLOB_GRAPHQL = '**/*.{g,graph}ql'

export const GLOB_MARKDOWN_CODE = `${GLOB_MARKDOWN}/${GLOB_SRC}`

export const GLOB_UNIT_TESTS = [
  `**/__tests__/**/*.${GLOB_SRC_EXT}`,
  `**/*.test.${GLOB_SRC_EXT}`,
]

export const GLOB_E2E_TESTS = `**/*.spec.${GLOB_SRC_EXT}`

export const GLOB_TESTS = [
  ...GLOB_UNIT_TESTS,
  GLOB_E2E_TESTS,
  `**/*.bench.${GLOB_SRC_EXT}`,
  `**/*.benchmark.${GLOB_SRC_EXT}`,
]

export const GLOB_ALL_SRC = [
  GLOB_SRC,
  GLOB_STYLE,
  GLOB_JSON,
  GLOB_JSON5,
  GLOB_MARKDOWN,
  GLOB_SVELTE,
  GLOB_VUE,
  GLOB_YAML,
  GLOB_XML,
  GLOB_HTML,
]

export const GLOB_EXCLUDE = [
  '**/node_modules',
  '**/dist',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',

  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.next',
  '**/.svelte-kit',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.cache',
  '**/.output',
  '**/.vite-inspect',
  '**/.yarn',

  '**/CHANGELOG*.md',
  '**/LICENSE*',
  '**/*.min.*',
  '**/__snapshots__',

  // Tools temp files
  '**/vite.config.*.timestamp-*',
  '**/auto-import{,s}.d.ts',
  '**/components.d.ts',

  // AI related
  '**/.context',
  '**/.claude',
  '**/.agents',
  '**/.*/skills',
]
