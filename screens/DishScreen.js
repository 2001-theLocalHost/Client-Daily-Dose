import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

import CurrentDish from '../components/CurrentDish';
import CurrentIngredient from '../components/CurrentIngredient';
import { fetchNutrition, fetchIngredient } from '../store/nutrition';
import { createDish } from '../store/savedDishIngredients';
import { ingrNameFunc, portionQuantFunc, routes } from '../utilityFunctions';

const initialLayout = { width: Dimensions.get('window').width };

class DishScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [{ key: 'Dish', title: 'Dish' }],
    };
    this.renderScene = this.renderScene.bind(this);
    this.renderTabBar = this.renderTabBar.bind(this);
    this.handleIndexChange = this.handleIndexChange.bind(this);
    this.createRoutes = this.createRoutes.bind(this);
  }

  componentDidMount() {
    let ingrNameArr = ingrNameFunc(this.props.finalIngrObj);
    let portionQuantArr = portionQuantFunc(this.props.finalIngrObj);

    this.createRoutes(ingrNameArr);

    this.props.fetchNutritionDispatch(
      this.props.name,
      this.props.imgUrl,
      this.props.finalIngrStr
    );

    this.props.fetchIngredientDispatch(
      ingrNameArr,
      portionQuantArr,
      this.props.finalIngrStr
    );
  }

  renderScene = ({ route }) => {
    if (route.key === 'Dish') {
      return (
        <CurrentDish
          dishNut={this.props.dishNut}
          finalIngrStr={this.props.finalIngrStr}
          ingrNut={this.props.ingrNut}
        />
      );
    }
    console.log('inside renderscene', this.props.ingrNut)
    for (let i = 0; i < this.props.ingrNut.length; i++) {
      if (route.key === this.props.ingrNut[i].ingredientName) {
        return <CurrentIngredient ingrNut={this.props.ingrNut[i]} />;
      }
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

  createRoutes = arr => {
    let routesObj = routes(arr);
    this.setState({
      routes: [...this.state.routes, ...routesObj],
    });
  };

  render() {
    console.log('inside dishscreen', this.props.ingrNut)
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
  name: state.dishes.name, // 'Kale Salad'
  imgUrl: state.dishes.imgUrl,
  finalIngrObj: state.dishes.finalIngredients, // [{name: 'rice', quantity: '1', measurement: 'cup'}, {name: 'rice cake', quantity: '2', measurement: 'oz'}]
  finalIngrStr: state.dishes.consolidatedData, // ['1 oz rice', '2 oz rice cake']
  dishNut: state.nutrition.dishNut, // API data formatted for DB {}
  ingrNut: state.nutrition.ingrNut, // API data formatted for DB [{}, {}, {}]
});

const mapDispatchToProps = dispatch => ({
  fetchNutritionDispatch: (name, dishUrl, finalIngrStr) =>
    dispatch(fetchNutrition(name, dishUrl, finalIngrStr)),
  fetchIngredientDispatch: (ingrNameArr, portionQuantArr, finalIngrStr) =>
    dispatch(fetchIngredient(ingrNameArr, portionQuantArr, finalIngrStr)),
  createDish: (nutritionInfo, dish) =>
    dispatch(createDish(nutritionInfo, dish)),
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
