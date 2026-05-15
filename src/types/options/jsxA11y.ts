import type { OptionsFiles } from '~/types'


export interface JsxA11yOptions extends OptionsFiles {
  ruleOptions?: {
    /**
     * For `jsx-a11y/alt-text` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/alt-text
     */
    altText?: {
      area?: string[]
      img?: string[]
      'input[type="image"]'?: string[]
      object?: string[]
    }

    /**
     * For `jsx-a11y/anchor-is-valid` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-is-valid
     */
    anchorIsValid?: {
      validHrefs?: string[]
    }

    /**
     * For `jsx-a11y/aria-role` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-role
     */
    ariaRole?: {
      allowedInvalidRoles?: string[]
      ignoreNonDOM?: boolean
    }

    /**
     * For `jsx-a11y/autocomplete-valid` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/autocomplete-valid
     */
    autocompleteValid?: {
      extraInputComponents?: string[]
    }

    /**
     * For `jsx-a11y/control-has-associated-label` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/control-has-associated-label
     */
    // TODO: not implemented yet - https://github.com/oxc-project/oxc/issues/1141
    /*
    controlHasAssociatedLabel?: {
      labelAttributes?: string[]
      controlComponents?: string[]
      ignoreElements?: string[]
      ignoreRoles?: string[]
      depth?: number
    }
    */

    /**
     * For `jsx-a11y/heading-has-content` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/heading-has-content
     */
    headingHasContent?: {
      extraComponents?: string[]
    }

    /**
     * For `jsx-a11y/img-redundant-alt` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/img-redundant-alt
     */
    imgRedundantAlt?: {
      extraComponents?: string[]
      extraCheckedWords?: string[]
    }

    /**
     * For `jsx-a11y/interactive-supports-focus` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/interactive-supports-focus
     * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/interactive-supports-focus.md
     */
    interactiveSupportsFocus?: {
      extraTabbableElements?: (
        | 'columnheader'
        | 'combobox'
        | 'grid'
        | 'gridcell'
        | 'listbox'
        | 'menu'
        | 'menubar'
        | 'menuitem'
        | 'menuitemcheckbox'
        | 'menuitemradio'
        | 'option'
        | 'progressbar'
        | 'radio'
        | 'radiogroup'
        | 'row'
        | 'rowheader'
        | 'scrollbar'
        | 'slider'
        | 'tab'
        | 'tablist'
        | 'tree'
        | 'treegrid'
        | 'treeitem'
        | 'doc-backlink'
        | 'doc-biblioref'
        | 'doc-glossref'
        | 'doc-noteref'
      )[]
    }

    /**
     * For `jsx-a11y/label-has-associated-control` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/label-has-associated-control
     */
    labelHasAssociatedControl?: {
      assert?: 'htmlFor' | 'nesting' | 'both' | 'either'
      controlComponents?: string[]
      depth?: number
      extraLabelAttributes?: string[]
      extraLabelComponents?: string[]
    }

    /**
     * For `jsx-a11y/media-has-caption` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/media-has-caption
     */
    mediaHasCaption?: {
      extraAudioComponents?: string[]
      extraTrackComponents?: string[]
      extraVideoComponents?: string[]
    }

    /**
     * For `jsx-a11y/no-autofocus` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-autofocus
     */
    noAutofocus?: {
      enabled?: boolean
      ignoreNonDOM?: boolean
    }

    /**
     * For `jsx-a11y/no-distracting-elements` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-distracting-elements
     */
    noDistractingElements?: {
      extraDistractingElements?: ('blink' | 'marquee')[]
    }

    /**
     * For `jsx-a11y/no-interactive-element-to-noninteractive-role` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-interactive-element-to-noninteractive-role
     */
    // TODO: not implemented yet - https://github.com/oxc-project/oxc/issues/1141
    /*
    noInteractiveElementToNoninteractiveRole?: Record<string, string[]>
    */

    /**
     * For `jsx-a11y/no-noninteractive-element-interactions` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-element-interactions
     */
    // TODO: not implemented yet - https://github.com/oxc-project/oxc/issues/1141
    /*
    noNoninteractiveElementInteractions?: {
      extraHandlers?: string[]
    }
    */

    /**
     * For `jsx-a11y/no-noninteractive-element-to-interactive-role` rule.
     *
     * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-to-interactive-role.md
     */
    noNoninteractiveElementToInteractiveRole?: Record<string, string[]>

    /**
     * For `jsx-a11y/no-noninteractive-tabindex` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-tabindex
     */
    noNoninteractiveTabindex?: {
      allowExpressionValues?: boolean
      extraRoles?: string[]
      tags?: string[]
    }

    /**
     * For `jsx-a11y/no-static-element-interactions` rule.
     *
     * @see https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-static-element-interactions
     */
    noStaticElementInteractions?: {
      extraHandlers?: string[]
      allowExpressionValues?: boolean
    }
  }
}
