import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

import CurrentDish from '../components/CurrentDish';
import CurrentIngredient from '../components/CurrentIngredient';

const initialLayout = { width: Dimensions.get('window').width };

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Dish', title: 'Dish' },
    { key: 'Kale', title: 'Kale' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'Dish':
        return <CurrentDish />;
      case 'Kale':
        return <CurrentIngredient />;
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#E2CA2B' }}
      style={{ backgroundColor: '#659B0E' }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
