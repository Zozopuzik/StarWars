import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen/MainScreen';
import CharacterScreen from '../screens/CharacterScreen/CharacterScreen';

export default function Stacks() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#000'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{title: 'Star Wars'}}
      />
      <Stack.Screen
        name="CharacterScreen"
        component={CharacterScreen}
        options={{title: 'Hero'}}
      />
    </Stack.Navigator>
  );
}
