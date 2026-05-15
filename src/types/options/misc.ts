import type { StylisticBaseOptions } from '~types'
import type { OxlintOverride } from 'oxlint'


export interface OptionsComponentExtensions {
  componentExtensions?: string[]
}


export interface OptionsFiles {
  files?: OxlintOverride['files']
}


export interface OptionsIsInEditor {
  isInEditor?: boolean
}


export interface OptionsHasTypeScript {
  typescript?: boolean
}


export interface OptionsEnableStylistic {
  stylistic?: boolean | StylisticBaseOptions
}


export interface OptionsHasVue {
  vue?: boolean
}
