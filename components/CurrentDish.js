import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  TextInput,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { createDish } from '../store/savedDishIngredients';
import SaveDish from './SaveDish';
import AnimatedPie from './Graph-Pieces/AnimatedPie';
import AnimatedPieLabel from './Graph-Pieces/AnimatedPieLabel';
import TotalDailyBar from './Graph-Pieces/TotalDailyBar';
import TotalNutrientsBar from './Graph-Pieces/TotalNutrientsBar';

class CurrentDish extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
    };
    this.onSave = this.onSave.bind(this);
  }

  onSave(values) {
    this.setState({
      modalOpen: false,
    });
    this.props.createDish(this.props.dishNut, values);
  }

  /* given goalsArr and mealsArr - get the difference in Array */
  // difference(goalsArr, currentArr) {
  //   let diffArr = [];
  //   for (let i = 0; i < currentArr.length; i++) {
  //     let difference = goalsArr[i] - currentArr[i];
  //     diffArr.push(difference);
  //   }
  //   return diffArr;
  // }

  /* creating finalData format to pass to StackedGraph */
  // finalData(label, quant, diff) {
  //   let final = [];
  //   let temp = [];
  //   let innerObj = {};

  //   innerObj[label[0]] = quant[0];
  //   innerObj['current'] = quant[0];
  //   innerObj['diff'] = diff[0];
  //   temp.push(innerObj);

  //   if (label.length === 1) {
  //     return temp;
  //   } else {
  //     let result = this.finalData(
  //       label.slice(1),
  //       quant.slice(1),
  //       diff.slice(1)
  //     );
  //     final = [...temp, ...result];
  //   }
  //   return final;
  // }

  /* making startData for StackedGraph for animation purposes;
can delete later if we find better way */
  // startData(label, quant, diff) {
  //   let final = [];
  //   let temp = [];
  //   let innerObj = {};

  //   innerObj[label[0]] = 0;
  //   innerObj['current'] = 0;
  //   innerObj['diff'] = 0;
  //   temp.push(innerObj);

  //   if (label.length === 1) {
  //     return temp;
  //   } else {
  //     let result = this.startData(
  //       label.slice(1),
  //       quant.slice(1),
  //       diff.slice(1)
  //     );
  //     final = [...temp, ...result];
  //   }
  //   return final;
  // }

  render() {
    const { dishNut } = this.props;

    if (!this.props.dishNut) {
      return (
        <View>
          <Text>Loading....</Text>
        </View>
      );
    } else {
      // /* Fake NutrientGoals in Array */
      // let nutrientGoals = Array(21).fill(100);

      // /* Difference of Goal & Nutrient Quantities in Array */
      // let difference = this.difference(nutrientGoals, totalNutrientsQuantities);

      // /* Final data for TotalNutrients StackBarGraph */
      // let finalDataForTotalNutrients = this.finalData(
      //   totalNutrientsLabels,
      //   totalNutrientsQuantities,
      //   difference
      // );

      // /* Start data for TotalNutrients StackBarGraph */
      // let startDataForTotalNutrients = this.startData(
      //   totalNutrientsLabels,
      //   totalNutrientsQuantities,
      //   difference
      // );

      // let justIngredients = this.props.userDish.slice(
      //   0,
      //   this.props.userDish.length - 1
      // );

      // let justDishName = this.dishName(this.props.userDish);

      return (
        <ScrollView>
          <SaveDish
            modalOpen={this.state.modalOpen}
            onSave={values => {
              this.onSave(values);
            }}
            dishNut={dishNut}
          />
          <View>
            <Button
              title="Save Meal"
              onPress={() => {
                this.setState({ modalOpen: true });
              }}
            />
          </View>
          <View>
            <Text style={styles.head}>{dishNut.name}</Text>
            {this.props.finalIngrStr.map((el, index) => {
              return (
                <Text key={index} style={styles.subhead}>
                  - {el}
                </Text>
              );
            })}
            <View>
              <Image source={{ uri: dishNut.imgUrl }} style={styles.image} />
            </View>
            {dishNut.healthLabels ? (
              <View>
                <Text style={styles.title}>Health Labels:</Text>
                <Text>{dishNut.healthLabels}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.graph}>
            <Text style={styles.title}>TOTAL CALORIES BREAKDOWN:</Text>
            <Text style={styles.title}>{dishNut.calories}KCAL</Text>
            <View>
              <AnimatedPie
                carbs={dishNut.CHOCDF_KCAL > 0 ? dishNut.CHOCDF_KCAL : 0.1}
                fat={dishNut.FAT_KCAL > 0 ? dishNut.FAT_KCAL : 0.1}
                protein={dishNut.PROCNT_KCAL > 0 ? dishNut.PROCNT_KCAL : 0.11}
              />
              <AnimatedPieLabel
                carbs={dishNut.CHOCDF_KCAL}
                fat={dishNut.FAT_KCAL}
                protein={dishNut.PROCNT_KCAL}
              />
            </View>
          </View>

          {/* <View style={styles.barGraph}>
              <Text style={styles.title}>TOTAL DAILY %:</Text>
              <TotalDailyBar
                label={totalDailyLabels}
                quantity={totalDailyQuantities}
                unit={totalDailyUnits}
              />
            </View> */}

          {/* <View style={styles.barGraph}>
              <Text style={styles.title}>TOTAL NUTRIENTS:</Text>
              <TotalNutrientsBar
                data={finalDataForTotalNutrients}
                startData={startDataForTotalNutrients}
                quantity={totalNutrientsQuantities}
                label={totalNutrientsLabels}
                unit={totalNutrientsUnits}
              />
            </View> */}
        </ScrollView>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  createDish: (dishNut, formValues) => {
    dispatch(createDish(dishNut, formValues));
  },
});

export default connect(null, mapDispatchToProps)(CurrentDish);

const styles = StyleSheet.create({
  head: {
    fontSize: 30,
  },
  title: {
    fontSize: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  graph: {
    marginTop: 40,
    marginBottom: 0,
    width: 400,
    height: 400,
  },
  barGraph: {
    marginTop: 60,
    marginBottom: 15,
    width: 500,
  },
});
