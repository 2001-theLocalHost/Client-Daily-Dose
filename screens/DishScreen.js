import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import CurrentDish from '../components/CurrentDish';
import CurrentIngredient from '../components/CurrentIngredient';
import { fetchNutrition, fetchIngredient } from '../store/nutrition';
import { ingrNameFunc, portionQuantFunc, routes } from '../utilityFunctions';
import SaveDish from '../components/SaveDish';
import { createDish } from '../store/dishes';

const initialLayout = { width: Dimensions.get('window').width };

class DishScreen extends React.Component {
  constructor({navigation}) {
    super();
    this.navigation = navigation;
    this.state = {
      index: 0,
      routes: [{ key: 'Dish', title: 'Dish' }],
      modalOpen: false
    };
    this.renderScene = this.renderScene.bind(this);
    this.renderTabBar = this.renderTabBar.bind(this);
    this.handleIndexChange = this.handleIndexChange.bind(this);
    this.createRoutes = this.createRoutes.bind(this);
    this.onSave = this.onSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onPress = this.onPress.bind(this)
  }

  async fetchDataFromDbOrEdamam(){
    if (!this.props.dishNut.name && this.props.ingrNut.length < 1) {
      let ingrNameArr = ingrNameFunc(this.props.finalIngrObj);
      let portionQuantArr = portionQuantFunc(this.props.finalIngrObj);

      this.createRoutes(ingrNameArr);

      await this.props.fetchNutritionDispatch(
        this.props.name,
        this.props.imgUrl,
        this.props.finalIngrStr
      );

      await this.props.fetchIngredientDispatch(
        ingrNameArr,
        portionQuantArr,
        this.props.finalIngrStr
      );
    } else {
      this.createRoutes(this.props.ingredientNames)
    }
  }

  onPress() {
    this.setState({
      modalOpen: true
    })
  }

  onSave(values) {
    this.setState({
      modalOpen: false,
    });
    this.props.createDish(this.props.dishNut, values, this.props.ingrNut);
    return this.navigation.navigate("Meal Diary")
  }

  handleCancel() {
    this.setState({
      modalOpen: false,
    });
  }

  componentDidMount() {
    this.navigation.addListener('focus', () => {
      this.setState({routes: [{ key: 'Dish', title: 'Dish' }]})
      this.fetchDataFromDbOrEdamam()
    });
  }


  renderScene = ({ route }) => {
    if (route.key === 'Dish') {
      return (
        <View>
          <SaveDish
          modalOpen={this.state.modalOpen}
          onSave={values => {
            this.onSave(values);
          }}
          handleCancel={() => {this.handleCancel()}}
          dishNut={this.props.dishNut}
        />
          <CurrentDish
            dishNut={this.props.dishNut}
            finalIngrStr={this.props.finalIngrStr}
            ingrNut={this.props.ingrNut}
            onPress={this.onPress}
          />
        </View>
      );
    }
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
      routes: [...[{ key: 'Dish', title: 'Dish' }], ...routesObj],
    });
  };

  render() {
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
  name: state.dishes.name,
  imgUrl: state.dishes.imgUrl,
  finalIngrObj: state.dishes.finalIngredients,
  finalIngrStr: state.dishes.consolidatedData,
  dishNut: state.nutrition.dishNut,
  ingrNut: state.nutrition.ingrNut,
  ingredientNames: state.nutrition.ingredientNames
});

const mapDispatchToProps = dispatch => ({
  fetchNutritionDispatch: (name, dishUrl, finalIngrStr) =>
    dispatch(fetchNutrition(name, dishUrl, finalIngrStr)),
  fetchIngredientDispatch: (ingrNameArr, portionQuantArr, finalIngrStr) =>
    dispatch(fetchIngredient(ingrNameArr, portionQuantArr, finalIngrStr)),
  createDish: (dishNut, formValues, ingredientArray) => {
      dispatch(createDish(dishNut, formValues, ingredientArray));
    }
});

const ConnectedDishScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(DishScreen);
export default ConnectedDishScreen;
