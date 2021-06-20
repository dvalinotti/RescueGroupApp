/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import RootNavigatorData from './rootNavigatorData';
import { colors } from '../styles';

const Tab = createBottomTabNavigator();

function getNavigationTabIcon(name, focused) {
  return RootNavigatorData.icons[name];
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    secondary: colors.secondary,
    background: 'rgb(236, 236, 236)',
  },
};

export const RootNavigator = () => {
  const [theme, setTheme] = useState('light');
  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : MyTheme}>
      <StatusBar barStyle={'light-content'} backgroundColor="#6a51ae" />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = getNavigationTabIcon(route.name, focused);
            // You can return any component that you like here!
            console.log('iconName:', iconName);
            return <Icon name="home" size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.veryLightGray,
          tabBarStyle: {
            paddingTop: 5,
            backgroundColor: colors.primary,
            borderTopWidth: 2,
            borderTopColor: colors.primary,
          },
          headerShown: false,
          tabBarLabelStyle: {
            paddingBottom: 5,
          },
        })}>
        {RootNavigatorData.screens.map(screen => (
          <Tab.Screen
            name={screen.name}
            component={screen.component}
            key={screen.name}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
