import type { OxlintConfig } from 'oxlint'
import type { PerfectionistOptions } from '~types'


export function composePerfectionistConfig(options: PerfectionistOptions): OxlintConfig {
  return {
    rules: perfectionistRules(options),
  }
}


function perfectionistRules(options: PerfectionistOptions): OxlintConfig['rules'] {

  const {
    projectType = 'app',
    sortImports = {},
  } = options


  sortImports.typeImportFirst ??= true
  sortImports.internalPatternSymbols ??= ['~']
  sortImports.partitionByNewLine ??= true
  sortImports.environment ??= 'node'


  return {
    'perfectionist#js/sort-imports': [
      'error',
      {
        type: 'alphabetical',
        order: 'asc',
        fallbackSort: { type: 'line-length', order: 'asc' },
        ignoreCase: true,
        specialCharacters: 'keep',
        locales: 'en-AU',
        sortBy: 'path',
        internalPattern: sortImports.internalPatternSymbols
          .map(symbol => `^${symbol}/?[^/]+(?:/[^/]+)*$`),
        partitionByComment: false,
        partitionByNewLine: sortImports.partitionByNewLine,
        newlinesBetween: 'ignore',
        newlinesInside: 'ignore',
        groups: sortImports.typeImportFirst
          ? ['side-effect', 'side-effect-style', 'style', 'type-builtin', 'type-external', 'type-internal', 'type-parent', 'type-sibling', 'type-index', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index']
          : ['side-effect', 'side-effect-style', 'style', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type-builtin', 'type-external', 'type-internal', 'type-parent', 'type-sibling', 'type-index'],
        customGroups: [],
        environment: sortImports.environment,
        useExperimentalDependencyDetection: true,
      },
    ],

    'perfectionist#js/sort-jsx-props': [
      'error',
      {
        type: 'alphabetical',
        order: 'asc',
        fallbackSort: { type: 'line-length', order: 'asc' },
        ignoreCase: true,
        specialCharacters: 'keep',
        locales: 'en-AU',
        partitionByNewLine: false,
        newlinesBetween: 'ignore',
        newlinesInside: 0,
        groups: [
          'reserved',
          'shorthand-prop',
          'unknown',
          'callback',
        ],
        customGroups: [
          {
            groupName: 'reserved',
            selector: 'prop',
            elementNamePattern: '^(children|dangerouslySetInnerHTML|key|ref)$',
          },
          {
            groupName: 'callback',
            selector: 'prop',
            elementNamePattern: '^on[A-Z].*',
          },
        ],
      },
    ],

    'perfectionist#js/sort-intersection-types': projectType === 'lib'
      ? 'off'
      : ['error', sortTypeConstituentOptions],
    'perfectionist#js/sort-union-types': projectType === 'lib'
      ? 'off'
      : ['error', sortTypeConstituentOptions],
  }
}


const sortTypeConstituentOptions = {
  type: 'natural',
  order: 'asc',
  fallbackSort: { type: 'alphabetical', order: 'asc' },
  ignoreCase: false,
  specialCharacters: 'keep',
  locales: 'en-AU',
  partitionByComment: true,
  partitionByNewLine: false,
  newlinesBetween: 'ignore',
  newlinesInside: 0,
  groups: [
    'named',
    'keyword',
    'operator',
    'literal',
    'function',
    'import',
    'conditional',
    'object',
    'tuple',
    'intersection',
    'union',
    'nullish',
    'unknown',
  ],
}
