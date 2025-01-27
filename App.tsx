/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {SafeAreaView, StatusBar, Text} from 'react-native';
import Stacks from './navigators/Stacks';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle={'dark-content'} />
        <Stacks />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
