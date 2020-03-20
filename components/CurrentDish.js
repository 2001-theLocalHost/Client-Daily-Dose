import React from 'react';
import { connect } from 'react-redux';
import { fetchNutrition } from '../store/nutrition'; // fetchDish
import { StyleSheet, Text, View } from 'react-native';

class CurrentDish extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let { dishNut, ingredientsNut } = this.props;
    let total = dishNut.totalNutrients;
    let totalDaily = dishNut.totalDaily;

    return (
      <View>
        <View>
          <Text style={styles.name}>DISH NAME</Text>
          <Text style={styles.ingredients}>ingredients listed here</Text>
        </View>
        <View>{/* <Image source={{uri: "x"}} style={styles.image} /> */}</View>
        {/* <Text>Calories: {dishNut.calories}</Text>
        <Text>Categories:</Text>
        {dishNut.dietLabels.map(el => (
          <Text>{el}</Text>
        ))}
        <View style={styles.donutGraph}>
          <Text>
            Fat: {total.FAT.quantity} {total.FAT.unit}
            Protein: {total.PROCNT.quantity} {total.PROCNT.unit}
            Carbs: {total.CHOCDF.quantity} {total.CHOCDDF.unit}
          </Text>
        </View>
        <View style={styles.barGraph}>
          <Text>Total Daily:</Text>
          <Text>
            Energy: {totalDaily.ENERC_KCAL.quantity}% Saturated Fat:{' '}
            {totalDaily.FASAT.quantity}% Fat: {totalDaily.FAT.quantity}%
            Protein: {totalDaily.PROCNT.quantity}% Carbs:{' '}
            {totalDaily.CHOCDF.quantity}% Fiber: {totalDaily.FIBTG.quantity}%
          </Text>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
  },
  ingredients: {
    fontSize: 15,
  },
  image: {
    width: 100,
    height: 100,
  },
  donutGraph: {
    width: 90,
    height: 90,
  },
  barGraph: {
    width: 100,
    height: 200,
  },
});

const mapStateToProps = state => ({
  dishNut: state.nutrition.dishNut,
  ingredientsNut: state.nutrition.ingredientsNut,
  // dish: state.nutrition.dish
});

const mapDispatchToProps = dispatch => ({
  fetchNutritionDispatch: () => dispatch(fetchNutrition()),
  // fetchDishDispatch: () => dispatch(fetchDish())
});

const ConnectedCurrentDish = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentDish);
export default ConnectedCurrentDish;
