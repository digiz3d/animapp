import { AntDesign as DefaultAntDesign } from '@expo/vector-icons'
import { SafeAreaViewProps, SafeAreaView as SafeAreaViewSAC } from 'react-native-safe-area-context'
import {
  SafeAreaView as DefaultSafeAreaView,
  Text as DefaultText,
  View as DefaultView,
} from 'react-native'
import React from 'react'

import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
): string {
  const theme = useColorScheme()
  const colorFromProps = props[theme]

  if (colorFromProps) {
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}

type ThemeProps = {
  lightColor?: string
  darkColor?: string
}
export type TextProps = ThemeProps & DefaultText['props'] & { secondary?: boolean }
type ViewProps = ThemeProps & DefaultView['props']
type SafeAreaPageProps = ThemeProps & SafeAreaViewProps & { noContext?: boolean }

export function Text(props: TextProps): JSX.Element {
  const { darkColor, lightColor, style, ...otherProps } = props
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    props.secondary ? 'secondaryText' : 'text',
  )

  return <DefaultText style={[{ color }, style]} {...otherProps} />
}

export function Card(props: ViewProps): JSX.Element {
  const { darkColor, lightColor, style, ...otherProps } = props
  const backgroundColorCard = useThemeColor({ light: lightColor, dark: darkColor }, 'card')
  const cardShadowColor = useThemeColor({ light: lightColor, dark: darkColor }, 'shadowColor')

  return (
    <DefaultView
      style={[
        {
          backgroundColor: backgroundColorCard,
          borderRadius: 5,
          elevation: 1,
          justifyContent: 'space-between',
          margin: 10,
          shadowColor: cardShadowColor,
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 0.3,
        },
        style,
      ]}
      {...otherProps}
    />
  )
}

export function SafeAreaPage(props: SafeAreaPageProps): JSX.Element {
  const { darkColor, lightColor, style, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

  if (props.noContext)
    return <DefaultSafeAreaView style={[{ flex: 1, backgroundColor }, style]} {...otherProps} />

  return <SafeAreaViewSAC style={[{ flex: 1, backgroundColor }, style]} {...otherProps} />
}

export function Title(props: JSX.Element['props']): JSX.Element {
  const { darkColor, lightColor, style, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return <DefaultText style={[{ color, fontSize: 20, margin: 10 }, style]} {...otherProps} />
}

export function ContentView(props: ViewProps): JSX.Element {
  const { darkColor, lightColor, style, ...otherProps } = props
  const backgroundColorCard = useThemeColor({ light: lightColor, dark: darkColor }, 'card')

  return <DefaultView style={[{ backgroundColor: backgroundColorCard }, style]} {...otherProps} />
}

type AntDesignProps = ThemeProps & typeof DefaultAntDesign['defaultProps']
export function AntDesign(props: AntDesignProps): JSX.Element {
  const { darkColor, lightColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return <DefaultAntDesign color={color} {...otherProps} />
}
