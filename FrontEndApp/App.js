import CameraPage from './Pages/CameraPage.js';
import GpsPage from './Pages/GpsPage';
import Mainpage from './Pages/MainPage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();

export default function  App(){

return(
  
  <NavigationContainer>
 
    <Stack.Screen
      name="App"
      component={App}

    /> 

  <Stack.Navigator>

     <Stack.Screen
      name="Main"
      component={Mainpage}

    /> 
    <Stack.Screen
      name="GPS"
      component={GpsPage}
    /> 
     <Stack.Screen
      name="Camera"
      component={CameraPage}
    />
  </Stack.Navigator>
</NavigationContainer>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
