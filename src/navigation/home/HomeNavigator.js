import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { default as navigatorData } from './homeNavigatorData';
import ContactScreen from '../screens/ContactScreen';
import { navigation } from '../../styles';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';

enableScreens();
const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        stackPresentation: 'push',
        headerShown: true,
      }}>
      {navigatorData.screens.map(data => (
        <Stack.Screen
          name={data.name}
          component={data.component}
          options={{
            title: data.headerTitle || data.name,
            ...navigation.headerStyles,
            ...data.options,
          }}
          key={data.name}
        />
      ))}
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          headerShown: true,
          title: 'Contact',
          stackPresentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}
