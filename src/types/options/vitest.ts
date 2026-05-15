import type { OptionsFiles, OptionsIsInEditor } from '~types'
import type { OxlintConfig } from 'oxlint'


export interface VitestOptions extends OptionsFiles, OptionsIsInEditor {
  settings?: NonNullable<OxlintConfig['settings']>['vitest']
}
