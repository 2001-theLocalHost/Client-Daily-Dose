import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

import CurrentDish from '../components/CurrentDish';
import CurrentIngredient from '../components/CurrentIngredient';
import { fetchNutrition, fetchIngredient } from '../store/nutrition';
import { createDish } from '../store/savedDishIngredients';
import { ingrNameFunc, portionQuantFunc } from '../utilityFunctions';

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
    this.props.fetchNutritionDispatch(
      this.props.dishName,
      'imageUrl',
      this.props.finalIngrStr
    );

    console.log('lollipop', this.props.finalIngrObj);
    let ingrNameArr = ingrNameFunc(this.props.finalIngrObj);

    let portionQuantArr = portionQuantFunc(this.props.finalIngrObj);

    this.props.fetchIngredientDispatch(
      ingrNameArr,
      portionQuantArr,
      this.props.finalIngrStr
    );
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'Dish':
        return (
          <CurrentDish
            dishNut={this.props.dishNut}
            finalIngrStr={this.props.finalIngrStr}
          />
        );
      case 'Kale':
        return <CurrentIngredient ingrNut={this.props.ingrNut} />;
    }
  };

  renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#E2CA2B' }}
      style={{ backgroundColor: '#659B0E' }}
      scrollEnabled={true}
    />
  );

  handleIndexChange = newIndex => {
    this.setState({ index: newIndex });
  };

  render() {
    console.log('INSIDE DISHSCREEN', this.props.ingrNut);

    return (
      <TabView
        navigationState={{
          index: this.state.index,
          routes: this.state.routes,
        }}
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
  dishNut: state.nutrition.dishNut, // API data formatted for DB
  ingrNut: state.nutrition.ingrNut,
  dishName: state.dishes.dishName, // 'Kale Salad'
  finalIngrObj: state.dishes.finalIngredients,
  finalIngrStr: state.dishes.consolidatedData, // ['1 oz rice', '2 oz rice cake']
});

const mapDispatchToProps = dispatch => ({
  // fetchNutritionDispatch: () => dispatch(fetchNutrition()),
  // fetchDishDispatch: () => dispatch(fetchDish())
  createDish: (nutritionInfo, dish) =>
    dispatch(createDish(nutritionInfo, dish)),
  fetchNutritionDispatch: (dishName, dishUrl, finalIngrStr) =>
    dispatch(fetchNutrition(dishName, dishUrl, finalIngrStr)),
  fetchIngredientDispatch: (ingrNameArr, portionQuantArr, finalIngrStr) =>
    dispatch(fetchIngredient(ingrNameArr, portionQuantArr, finalIngrStr)),
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
