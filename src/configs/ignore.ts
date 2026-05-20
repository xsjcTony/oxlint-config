import type { OxlintConfig } from 'oxlint'


/**
 * This file is for configuring the files and directories that should be ignored by Oxlint
 */
import type { IgnoreOptions } from '~/types'
import { GLOB_EXCLUDE } from '~/globs'


function mergeWithDefaultPatterns(patterns: string[]): string[] {
  return [...GLOB_EXCLUDE, ...patterns]
}


export function composeIgnorePatterns(
  options: IgnoreOptions,
): OxlintConfig['ignorePatterns'] {

  if (Array.isArray(options))
    return mergeWithDefaultPatterns(options)


  const { patterns, replaceDefault = false } = options


  return replaceDefault ? patterns : mergeWithDefaultPatterns(patterns)
}
