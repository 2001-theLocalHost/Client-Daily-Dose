import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

import ConnectedCurrentDish from '../components/CurrentDish';
import { fetchNutrition } from '../store/nutrition'; //fetchDish

const initialLayout = { width: Dimensions.get('window').width };

export default class TabViewExample extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: 'Dish', title: 'Dish' },
        { key: 'Kale', title: 'Kale' },
      ],
    };
    this.renderScene = this.renderScene.bind(this);
    this.renderTabBar = this.renderTabBar.bind(this);
    this.handleIndexChange = this.handleIndexChange.bind(this);
  }

  //   const [index, setIndex] = React.useState(0);
  //   const [routes] = React.useState([
  //     { key: 'Dish', title: 'Dish' },
  //     { key: 'Kale', title: 'Kale' },
  //   ]);

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'Dish':
        return <ConnectedCurrentDish />;
      case 'Kale':
        return null;
    }
  };

  renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#E2CA2B' }}
      style={{ backgroundColor: '#659B0E' }}
    />
  );

  handleIndexChange = newIndex => {
    this.setState({ index: newIndex });
  };

  render() {
    return (
      <TabView
        navigationState={{ index: this.state.index, routes: this.state.routes }}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
        onIndexChange={this.handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
