import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, View } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

import CurrentDish from '../components/CurrentDish';
import CurrentIngredient from '../components/CurrentIngredient';
import { fetchNutrition } from '../store/nutrition'; //fetchDish
import { Modal } from 'react-native-paper';
import { createDish } from '../store/savedDishIngredients'
import { Formik } from 'formik';

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
    this.props.fetchNutritionDispatch();
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'Dish':
        return <CurrentDish dishNut={this.props.dishNut} />;
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
  // dish: state.nutrition.dish
});

const mapDispatchToProps = dispatch => ({
  fetchNutritionDispatch: () => dispatch(fetchNutrition()),
  // fetchDishDispatch: () => dispatch(fetchDish())
  createDish: (nutritionInfo, dish) => dispatch(createDish(nutritionInfo, dish))
});

const ConnectedDishScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(DishScreen);
export default ConnectedDishScreen;


// Insert button that brings you to Save Meal Modal.
// Add modalOpen: false to state.
// On click of button setState --> modalOpen: true.

// No SaveDish component. Instead add all form info from SaveDish directly onto this page inside the Modal. So the form button can use this state and reset state to false, and redirect to MealDiary.
