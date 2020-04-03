import React from 'react';
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
      <AuthStack.Screen name="FirstScreen" component={FirstScreen} />
      <AuthStack.Screen name="Login" component={ConnectedLogin} />
      <AuthStack.Screen name="Signup" component={ConnectedSignup} />
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
