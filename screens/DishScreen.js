import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

import CurrentDish from '../components/CurrentDish';
import CurrentIngredient from '../components/CurrentIngredient';
import { fetchNutrition } from '../store/nutrition'; //fetchDish

const initialLayout = { width: Dimensions.get('window').width };

class DishScreen extends React.Component {
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

  componentDidMount() {
    console.log('firsttime userDish', this.props.userDish);
    this.props.fetchNutritionDispatch(this.props.userDish);
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'Dish':
        return (
          <CurrentDish
            dishNut={this.props.dishNut}
            userDish={this.props.userDish}
          />
        );
      case 'Kale':
        return <CurrentIngredient ingredientsNut={this.props.ingredientsNut} />;
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

const mapStateToProps = state => ({
  dishNut: state.nutrition.dishNut,
  userDish: state.dishes.consolidatedData,
});

const mapDispatchToProps = dispatch => ({
  fetchNutritionDispatch: userDish => dispatch(fetchNutrition(userDish)),
});

const ConnectedDishScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(DishScreen);
export default ConnectedDishScreen;
