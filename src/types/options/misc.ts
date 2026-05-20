import type { OxlintOverride } from 'oxlint'
import type { StylisticBaseOptions } from '~types'


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
