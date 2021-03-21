import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'

import { SearchStackParamList } from '../types'
import SearchProductsIngredients from '../screens/SeachProductsIngredients'
import Product from '../screens/Product'

const Stack = createStackNavigator<SearchStackParamList>()

export default function SearchStackNavigator(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={SearchProductsIngredients} name="Search" />
        <Stack.Screen component={Product} name="Product" />
      </Stack.Navigator>
    </SafeAreaProvider>
  )
}
