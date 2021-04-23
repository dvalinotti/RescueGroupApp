import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrgNavigatorData from './orgNavigatorData';
import { navigation } from '../../styles';

const Stack = createStackNavigator();

export default function OrgNavigator() {
  return (
    <Stack.Navigator>
      {OrgNavigatorData.screens.map(data => (
        <Stack.Screen
          name={data.name}
          component={data.component}
          options={{
            title: data.headerTitle || data.name,
            ...navigation.headerStyles,
          }}
          key={data.name}
        />
      ))}
    </Stack.Navigator>
  );
}
