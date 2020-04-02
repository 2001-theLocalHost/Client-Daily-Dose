import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import ConnectedHomeScreen from '../screens/HomeScreen';
import MealDiary from '../screens/MealDiary';
import ConnectedDishScreen from '../screens/DishScreen';
import UploadImg from '../components/UploadImg';
// import IngredientConfirmation from '../screens/IngredientConfirmation';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={ConnectedHomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="ionicons" focused={focused} name="md-home" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Photos"
        component={UploadImg}
        options={{
          title: 'Add Dish',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="ionicons" focused={focused} name="md-camera" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Meal Diary"
        component={MealDiary}
        options={{
          title: 'Meal Diary',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="ionicons" focused={focused} name="md-journal" />
          ),
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
      return 'Welcome!';
    case 'Dishes':
      return 'Your Dishes';
    case 'Photos':
      return 'Take a pic!';
    case 'Meal Diary':
      return 'Your Meal Diary';
  }
}
