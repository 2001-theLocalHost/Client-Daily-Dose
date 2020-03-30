import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from '../screens/FirstScreen';
import ConnectedLogin from '../screens/Login';
import ConnectedSignup from '../screens/Signup';

const AuthStack = createStackNavigator();

export default AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="FirstScreen">
    <AuthStack.Screen name="FirstScreen" component={FirstScreen} />
    <AuthStack.Screen name="Login" component={ConnectedLogin} />
    <AuthStack.Screen name="Signup" component={ConnectedSignup} />
  </AuthStack.Navigator>
);
