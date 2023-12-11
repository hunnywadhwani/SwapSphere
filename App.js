import * as React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';

import GetStartedScreen from './screens/GetStartedScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen'; 
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import AddDealsScreen from './screens/AddDealsScreen';

import TabNavigator from "./components/navigate" 
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
  
const AuthStack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return ( 
      <NavigationContainer> 
        <AuthStack.Navigator screenOptions={{ headerShown: false }}> 
          <AuthStack.Screen name="GetStarted" component={GetStartedScreen} />

          <AuthStack.Screen name="LoginScreen" component={LoginScreen} />

          <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
          <AuthStack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <AuthStack.Screen name="HomeScreen" component={TabNavigator} />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
