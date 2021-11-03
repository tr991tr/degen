import {
  ConditionalValue,
  RequiredConditionalValue,
  createMapValueFn,
  createNormalizeValueFn,
  createSprinkles,
  defineProperties,
} from '@vanilla-extract/sprinkles'
import { calc } from '@vanilla-extract/css-utils'
import { createVar } from '@vanilla-extract/css'

import { vars } from './vars.css'

// Ensure reset has lowest specificity
/* DO NOT MOVE THIS LINE */
import './reset.css'
/* DO NOT MOVE THIS LINE */

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const
export type Breakpoint = keyof typeof breakpoints
export const breakpointNames = Object.keys(breakpoints) as Breakpoint[]

const flexAlignment = ['flex-start', 'center', 'flex-end', 'stretch'] as const

const space = vars.space
const negativeSpace = {
  ['-px']: `${calc(space.px).negate()}`,
  ['-0.5']: `${calc(space['0.5']).negate()}`,
  ['-1']: `${calc(space['0.5']).negate()}`,
  ['-1.5']: `${calc(space['1.5']).negate()}`,
  ['-2']: `${calc(space['2']).negate()}`,
  ['-2.5']: `${calc(space['2.5']).negate()}`,
  ['-3']: `${calc(space['3']).negate()}`,
  ['-3.5']: `${calc(space['3.5']).negate()}`,
  ['-4']: `${calc(space['4']).negate()}`,
}

const margins = {
  ...space,
  ...negativeSpace,
}

const extendedSpace = {
  '112': '28rem',
  '128': '32rem',
  '144': '36rem',
  '168': '42rem',
  '192': '48rem',
  '224': '56rem',
  '256': '64rem',
  '288': '72rem',
  '320': '80rem',
}

const responsiveStyles = defineProperties({
  defaultCondition: 'xs',
  conditions: {
    xs: {},
    sm: { '@media': `(min-width: ${breakpoints.sm}px)` },
    md: { '@media': `(min-width: ${breakpoints.md}px)` },
    lg: { '@media': `(min-width: ${breakpoints.lg}px)` },
    xl: { '@media': `(min-width: ${breakpoints.xl}px)` },
  },
  properties: {
    alignItems: [...flexAlignment, 'baseline'],
    alignSelf: [...flexAlignment, 'baseline'],
    borderWidth: vars.borderWidths,
    borderBottomWidth: vars.borderWidths,
    borderTopWidth: vars.borderWidths,
    borderRadius: vars.radii,
    borderBottomLeftRadius: vars.radii,
    borderBottomRightRadius: vars.radii,
    borderTopLeftRadius: vars.radii,
    borderTopRightRadius: vars.radii,
    bottom: vars.space,
    display: ['block', 'flex', 'grid', 'inline-block', 'none'],
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },
    flexDirection: ['column', 'row'],
    flexWrap: ['wrap', 'nowrap'],
    fontSize: {
      ...vars.fontSizes,
      inherit: 'inherit',
    },
    fontWeight: vars.fontWeights,
    gap: vars.space,
    height: vars.space,
    inset: vars.space,
    justifyContent: [...flexAlignment, 'space-around', 'space-between'],
    justifySelf: flexAlignment,
    left: vars.space,
    letterSpacing: vars.letterSpacings,
    lineHeight: vars.lineHeights,
    marginBottom: margins,
    marginLeft: margins,
    marginRight: margins,
    marginTop: margins,
    maxHeight: vars.space,
    maxWidth: {
      ...vars.space,
      ...extendedSpace,
      none: 'none',
    },
    minHeight: vars.space,
    minWidth: vars.space,
    overflow: ['hidden', 'scroll', 'unset'],
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    paddingTop: vars.space,
    position: ['absolute', 'fixed', 'relative', 'sticky'],
    right: vars.space,
    textAlign: ['center', 'left', 'right'],
    top: vars.space,
    width: vars.space,
  },
  shorthands: {
    insetX: ['left', 'right'],
    insetY: ['bottom', 'top'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    radiusLeft: ['borderBottomLeftRadius', 'borderTopLeftRadius'],
    radiusRight: ['borderBottomRightRadius', 'borderTopRightRadius'],
    radiusTop: ['borderTopLeftRadius', 'borderTopRightRadius'],
    radiusBottom: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
    size: ['height', 'width'],
  },
})

const unresponsiveStyles = defineProperties({
  properties: {
    cursor: ['default', 'pointer', 'not-allowed'],
    fontFamily: vars.fonts,
    pointerEvents: ['none'],
    strokeWidth: vars.borderWidths,
    textTransform: ['capitalize', 'lowercase', 'uppercase'],
    transitionProperty: {
      none: 'none',
      all: 'all',
      default:
        'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      colors: 'background-color, border-color, color, fill, stroke',
      opacity: 'opacity',
      shadow: 'box-shadow',
      transform: 'transform',
    },
    transitionTimingFunction: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
    },
    visibility: ['hidden', 'visible'],
    whiteSpace: [
      'normal',
      'nowrap',
      'pre',
      'pre-line',
      'pre-wrap',
      'initial',
      'inherit',
    ],
    wordWrap: ['normal', 'break-word', 'initial', 'inherit'],
  },
})

const boxShadowColorVar = createVar()

const selectorStyles = defineProperties({
  conditions: {
    base: {},
    active: { selector: '&:active' },
    focus: { selector: '&:focus' },
    hover: { selector: '&:hover' },
  },
  defaultCondition: 'base',
  properties: {
    backgroundColor: vars.colors,
    borderColor: vars.colors,
    boxShadow: {
      '1': {
        vars: { [boxShadowColorVar]: vars.colors.foregroundSecondary },
        boxShadow: `${vars.shadows['1']} ${boxShadowColorVar}`,
      },
      '0.5': {
        vars: { [boxShadowColorVar]: vars.colors.foregroundSecondary },
        boxShadow: `${vars.shadows['0.5']} ${boxShadowColorVar}`,
      },
      '0': {
        vars: { [boxShadowColorVar]: vars.colors.foregroundSecondary },
        boxShadow: `${vars.shadows['0']} ${boxShadowColorVar}`,
      },
    },
    boxShadowColor: {
      foregroundSecondary: {
        vars: { [boxShadowColorVar]: vars.colors.foregroundSecondary },
      },
      transparent: {
        vars: { [boxShadowColorVar]: vars.colors.transparent },
      },
    },
    color: vars.colors,
    outlineColor: vars.colors,
  },
})

const motionSafeStyles = defineProperties({
  conditions: {
    base: { '@media': '(prefers-reduced-motion: no-preference)' },
  },
  defaultCondition: 'base',
  properties: {
    transitionDuration: {
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '300': '300ms',
      '500': '500ms',
      '700': '700ms',
      '1000': '1000ms',
    },
  },
})

export const sprinkles = createSprinkles(
  responsiveStyles,
  unresponsiveStyles,
  selectorStyles,
  motionSafeStyles,
)
export type Sprinkles = Parameters<typeof sprinkles>[0]

export type OptionalResponsiveValue<Value extends string | number> =
  ConditionalValue<typeof responsiveStyles, Value>
export type RequiredResponsiveValue<Value extends string | number> =
  RequiredConditionalValue<typeof responsiveStyles, Value>

export type OptionalResponsiveObject<Value> =
  | Value
  | Partial<Record<Breakpoint, Value>>
export type RequiredResponsiveObject<Value> = Partial<
  Record<Breakpoint, Value>
> &
  Record<typeof breakpointNames[0], Value>

export const normalizeResponsiveValue = createNormalizeValueFn(responsiveStyles)
export const mapResponsiveValue = createMapValueFn(responsiveStyles)