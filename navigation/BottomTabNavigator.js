import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import UploadImg from '../components/UploadImg'
import LinksScreen from '../screens/LinksScreen';
import IngredientConfirmation from '../screens/IngredientConfirmation';
import ConnectedDishScreen from '../screens/DishScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Get Started',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon="ionicons"
              focused={focused}
              name="md-code-working"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="UploadImg"
        component={UploadImg}
        options={{
          title: 'Photos',
          tabBarIcon: ({ focused }) => <TabBarIcon icon="ionicons" focused={focused} name="md-camera" />
        }}
      />
      <BottomTab.Screen
        name="Dishes"
        component={ConnectedDishScreen}
        options={{
          title: 'Dish',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon="materialCommunityIcons"
              focused={focused}
              name="silverware-fork-knife"
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="ConfirmIngredients"
        component={IngredientConfirmation}
        options={{
          title: 'ConfirmIngredients',
          tabBarIcon: ({ focused }) => <TabBarIcon icon="ionicons" focused={focused} name="md-book" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
    case 'Dishes':
      return 'Your Dish';
  }
}
