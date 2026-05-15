import type { GlobalOptions } from '~/types'


export interface PerfectionistOptions extends Pick<GlobalOptions, 'projectType'> {
  sortImports?: {
    /**
     * Whether to put type imports before value imports
     *
     * @default true
     */
    typeImportFirst?: boolean

    /**
     * Used for constructing the `internalPattern` regex
     *
     * For example, `~` will result in the regex /^~(?:[^/]+(?:\/[^/]+)?|\/[^/]+)$/
     *
     * @see https://perfectionist.dev/rules/sort-imports#internalpattern
     *
     * @default ['~']
     */
    internalPatternSymbols?: string[]

    /**
     * @see https://perfectionist.dev/rules/sort-imports#partitionbynewline
     *
     * @default true
     */
    partitionByNewLine?: boolean

    /**
     * @see https://perfectionist.dev/rules/sort-imports#environment
     *
     * @default 'node'
     */
    environment?: 'node' | 'bun'
  }
}
