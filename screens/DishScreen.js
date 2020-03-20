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
    this.props.fetchNutritionDispatch();
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'Dish':
        return (
          <CurrentDish
            dishNut={this.props.dishNut}
            totalNutrientsFAT={this.props.totalNutrientsFAT}
            totalNutrientsCHOCDF={this.props.totalNutrientsCHOCDF}
            totalNutrientsPROCNT={this.props.totalNutrientsPROCNT}
            totalDailyENERGY={this.props.totalDailyENERGY}
            totalDailyFAT={this.props.totalDailyFAT}
            totalDailyFASAT={this.props.totalDailyFASAT}
            totalDailyCHOCDF={this.props.totalDailyCHOCDF}
            totalDailyPROCNT={this.props.totalDailyPROCNT}
            totalDailyNA={this.props.totalDailyNA}
            totalDailyCA={this.props.totalDailyCA}
            totalDailyMG={this.props.totalDailyMG}
            totalDailyK={this.props.totalDailyK}
            totalDailyFE={this.props.totalDailyFE}
            totalDailyZN={this.props.totalDailyZN}
            totalDailyP={this.props.totalDailyP}
            totalDailyTHIA={this.props.totalDailyTHIA}
            totalDailyRIBF={this.props.totalDailyRIBD}
            totalDailyNIA={this.props.totalDailyNIA}
            totalDailyVITB6A={this.props.totalDailyVITB6A}
            totalDailyFOLDFE={this.props.totalDailyFOLDFE}
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
    console.log('dish screen:', this.props.dishNut);
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
  totalNutrientsFAT: state.nutrition.totalNutrientsFAT,
  totalNutrientsCHOCDF: state.nutrition.totalNutrientsCHOCDF,
  totalNutrientsPROCNT: state.nutrition.totalNutrientsPROCNT,
  totalDailyENERGY: state.nutrition.totalDailyENERGY,
  totalDailyFAT: state.nutrition.totalDailyFAT,
  totalDailyFASAT: state.nutrition.totalDailyFASAT,
  totalDailyCHOCDF: state.nutrition.totalDailyCHOCDF,
  totalDailyPROCNT: state.nutrition.totalDailyPROCNT,
  totalDailyNA: state.nutrition.totalDailyNA,
  totalDailyCA: state.nutrition.totalDailyCA,
  totalDailyMG: state.nutrition.totalDailyMG,
  totalDailyK: state.nutrition.totalDailyK,
  totalDailyFE: state.nutrition.totalDailyFE,
  totalDailyZN: state.nutrition.totalDailyZN,
  totalDailyP: state.nutrition.totalDailyP,
  totalDailyTHIA: state.nutrition.totalDailyTHIA,
  totalDailyRIBF: state.nutrition.totalDailyRIBD,
  totalDailyNIA: state.nutrition.totalDailyNIA,
  totalDailyVITB6A: state.nutrition.totalDailyVITB6A,
  totalDailyFOLDFE: state.nutrition.totalDailyFOLDFE,
  // ingredientsNut: state.nutrition.ingredientsNut,
  // dish: state.nutrition.dish
});

const mapDispatchToProps = dispatch => ({
  fetchNutritionDispatch: () => dispatch(fetchNutrition()),
  // fetchDishDispatch: () => dispatch(fetchDish())
});

const ConnectedDishScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(DishScreen);
export default ConnectedDishScreen;
