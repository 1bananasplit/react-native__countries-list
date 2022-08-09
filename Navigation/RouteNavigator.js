import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../Screens/Home';
import { Details } from '../Screens/Details';

const Stack = createNativeStackNavigator()

export default RouteNavigator = () => {
  return (
   <Stack.Navigator>
    <Stack.Group>
        <Stack.Screen name="Home" component={Home} 
            options={{
                headerShown: false
            }}/>
        <Stack.Screen name="Details" component={Details} 
            options={{
                animation: 'slide_from_bottom',
                headerStyle: {backgroundColor:'#add8e6'},
                headerTintColor: '#4e4d4d',
                headerShadowVisible: false
            }} />
    </Stack.Group>
   </Stack.Navigator>
  )
}