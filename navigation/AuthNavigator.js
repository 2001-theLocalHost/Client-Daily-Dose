import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from '../screens/FirstScreen';
import ConnectedLogin from '../screens/Login';
import ConnectedSignup from '../screens/Signup';

const AuthStack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'FirstScreen';

export default AuthStackScreen = ({ navigation, route }) => {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  return (
    <AuthStack.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={{ title: null }}
      />
      <AuthStack.Screen
        name="Login"
        component={ConnectedLogin}
        options={{ title: 'Login' }}
      />
      <AuthStack.Screen
        name="Signup"
        component={ConnectedSignup}
        options={{ title: 'Sign Up' }}
      />
    </AuthStack.Navigator>
  );
};

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'FirstScreen':
      return null;
    case 'Login':
      return 'Login';
    case 'Signup':
      return 'Sign Up';
  }
}
