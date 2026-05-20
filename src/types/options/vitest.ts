import type { OxlintConfig } from 'oxlint'
import type { OptionsFiles, OptionsIsInEditor } from '~types'


export interface VitestOptions extends OptionsFiles, OptionsIsInEditor {
  settings?: NonNullable<OxlintConfig['settings']>['vitest']
}
