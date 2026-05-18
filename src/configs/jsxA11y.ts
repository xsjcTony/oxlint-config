import type { JsxA11yOptions } from '~types'
import type { OxlintConfig } from 'oxlint'
import { GLOB_JSX, GLOB_TSX } from '~/globs'


export function composeJsxA11yConfig(options: JsxA11yOptions): OxlintConfig {

  const { files = [GLOB_JSX, GLOB_TSX] } = options


  return {
    overrides: [
      {
        files,
        rules: jsxA11yRules(options),
      },
    ],
  }
}


function jsxA11yRules(options: JsxA11yOptions): OxlintConfig['rules'] {

  const { ruleOptions = {} } = options


  const {
    altText,
    anchorIsValid,
    ariaRole,
    autocompleteValid,
    controlHasAssociatedLabel,
    headingHasContent,
    imgRedundantAlt,
    interactiveSupportsFocus,
    labelHasAssociatedControl,
    mediaHasCaption,
    noAutofocus,
    noDistractingElements,
    noInteractiveElementToNoninteractiveRole,
    noNoninteractiveElementInteractions,
    noNoninteractiveElementToInteractiveRole,
    noNoninteractiveTabindex,
    noStaticElementInteractions,
  } = ruleOptions


  return {
    'jsx-a11y/alt-text': [
      'error',
      {
        area: altText?.area ?? [],
        img: altText?.img ?? [],
        'input[type="image"]': altText?.['input[type="image"]'] ?? [],
        object: altText?.object ?? [],
      },
    ],
    'jsx-a11y/anchor-is-valid': ['error', { validHrefs: anchorIsValid?.validHrefs ?? [] }],
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': [
      'error',
      {
        allowedInvalidRoles: ariaRole?.allowedInvalidRoles ?? [],
        ignoreNonDOM: ariaRole?.ignoreNonDOM ?? false,
      },
    ],
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/autocomplete-valid': [
      'error',
      { inputComponents: ['input', ...autocompleteValid?.extraInputComponents ?? []] },
    ],
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/control-has-associated-label': [
      'error',
      {
        controlComponents: controlHasAssociatedLabel?.controlComponents ?? [],
        depth: controlHasAssociatedLabel?.depth ?? 2,
        ignoreElements: controlHasAssociatedLabel?.ignoreElements ?? [],
        ignoreRoles: controlHasAssociatedLabel?.ignoreRoles ?? [],
        labelAttributes: controlHasAssociatedLabel?.labelAttributes ?? [],
      },
    ],
    'jsx-a11y/heading-has-content': [
      'error',
      { components: headingHasContent?.extraComponents ?? null },
    ],
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': [
      'error',
      {
        components: ['img', ...imgRedundantAlt?.extraComponents ?? []],
        words: ['image', 'photo', 'picture', ...imgRedundantAlt?.extraCheckedWords ?? []],
      },
    ],
    'jsx-a11y/interactive-supports-focus': [
      'error',
      {
        tabbable: [
          'button',
          'checkbox',
          'link',
          'searchbox',
          'spinbutton',
          'switch',
          'textbox',
          ...interactiveSupportsFocus?.extraTabbableElements ?? [],
        ],
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: labelHasAssociatedControl?.assert ?? 'either',
        controlComponents: labelHasAssociatedControl?.controlComponents ?? [],
        depth: labelHasAssociatedControl?.depth ?? 2,
        labelAttributes: [
          'alt',
          'aria-label',
          'aria-labelledby',
          ...labelHasAssociatedControl?.extraLabelAttributes ?? [],
        ],
        labelComponents: ['label', ...labelHasAssociatedControl?.extraLabelComponents ?? []],
      },
    ],
    'jsx-a11y/lang': 'error',
    'jsx-a11y/media-has-caption': [
      'error',
      {
        audio: ['audio', ...mediaHasCaption?.extraAudioComponents ?? []],
        track: ['track', ...mediaHasCaption?.extraTrackComponents ?? []],
        video: ['video', ...mediaHasCaption?.extraVideoComponents ?? []],
      },
    ],
    'jsx-a11y/mouse-events-have-key-events': [
      'error',
      {
        hoverInHandlers: [
          'onMouseOver',
          'onMouseEnter',
          'onPointerOver',
          'onPointerEnter',
        ],
        hoverOutHandlers: [
          'onMouseOut',
          'onMouseLeave',
          'onPointerOut',
          'onPointerLeave',
        ],
      },
    ],
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-aria-hidden-on-focusable': 'error',
    ...(noAutofocus?.enabled ?? false) && {
      'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: noAutofocus?.ignoreNonDOM ?? false }],
    },
    'jsx-a11y/no-distracting-elements': [
      'error',
      {
        elements: [
          'marquee',
          'blink',
          ...noDistractingElements?.extraDistractingElements ?? [],
        ],
      },
    ],
    'jsx-a11y/no-interactive-element-to-noninteractive-role': [
      'error',
      {
        tr: ['none', 'presentation'],
        ...noInteractiveElementToNoninteractiveRole,
      },
    ],
    // TODO: not implemented yet - https://github.com/oxc-project/oxc/issues/1141
    'jsx-a11y/no-noninteractive-element-interactions': [
      'error',
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
          ...noNoninteractiveElementInteractions?.extraHandlers ?? [],
        ],
      },
    ],
    'jsx-a11y/no-noninteractive-element-to-interactive-role': [
      'error',
      {
        ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
        table: ['grid'],
        td: ['gridcell'],
        ...noNoninteractiveElementToInteractiveRole,
      },
    ],
    'jsx-a11y/no-noninteractive-tabindex': [
      'error',
      {
        allowExpressionValues: noNoninteractiveTabindex?.allowExpressionValues ?? true,
        roles: ['tabpanel', ...noNoninteractiveTabindex?.extraRoles ?? []],
        tags: noNoninteractiveTabindex?.tags ?? [],
      },
    ],
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/no-static-element-interactions': [
      'error',
      {
        allowExpressionValues: noStaticElementInteractions?.allowExpressionValues ?? false,
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
          ...noStaticElementInteractions?.extraHandlers ?? [],
        ],
      },
    ],
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
  }
}
