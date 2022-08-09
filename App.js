import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import RouteNavigator from './Navigation/RouteNavigator';

export default function App() {
  return (
      <NavigationContainer >
        <StatusBar style={{backgroundColor: '#d6ecf2'}} />
        <RouteNavigator />
      </NavigationContainer>
  );
}