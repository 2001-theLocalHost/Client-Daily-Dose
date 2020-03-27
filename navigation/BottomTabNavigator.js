import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import UploadImg from '../components/UploadImg';
import IngredientConfirmation from '../screens/IngredientConfirmation';
import ConnectedDishScreen from '../screens/DishScreen';
import MealDiary from '../screens/MealDiary';

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
          title: 'Home',
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
        name="UploadImg"
        component={UploadImg}
        options={{
          title: 'Photos',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="ionicons" focused={focused} name="md-camera" />
          ),
        }}
      />

      <BottomTab.Screen
        name="ConfirmIngredients"
        component={IngredientConfirmation}
        options={{
          title: 'Confirm Ingredients',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="ionicons" focused={focused} name="md-book" />
          ),
        }}
      />

      <BottomTab.Screen
        name="MealDiary"
        component={MealDiary}
        options={{
          title: 'MealDiary',
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
      return 'Your Dish';
    case 'Photos':
      return 'Take a pic!';
    case 'Meal Diary':
      return 'Your Meal Diary';
  }
}
