import React from 'react';
import { StyleSheet, Text, ScrollView, View, Button, TextInput } from 'react-native';
import { createDish } from '../store/savedDishIngredients'
import SaveDish from './SaveDish'
import { connect } from 'react-redux';
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
    this.onSave = this.onSave.bind(this)
  }
  onSave(values) {
    this.setState({
      modalOpen: false
    })
    console.log('HELLO I SUBMITTED', values)
    this.props.createDish(this.props.dishNut, values)
    // redirect to mealDiary)
  }

export default class CurrentDish extends React.Component {
  /* capitalizing just dish name */
  dishName(userData) {
    let name = userData
      .slice(-1)
      .join(' ')
      .split(' ');

    let capitalizedName = name.map(el => {
      return el[0].toUpperCase() + el.slice(1);
    });
    return capitalizedName.join(' ');
  }

  /* combining health and diet labels with underscores */
  cleanStr(dietLabelArr, healthLabelsArr) {
    let newArr = [...dietLabelArr, ...healthLabelsArr];
    let tempArr = newArr.map(el => {
      return el.split('_').join(' ');
    });
    return tempArr.join(', ');
  }

  /* given goalsArr and mealsArr - get the difference in Array */
  difference(goalsArr, currentArr) {
    let diffArr = [];
    for (let i = 0; i < currentArr.length; i++) {
      let difference = goalsArr[i] - currentArr[i];
      diffArr.push(difference);
    }
    return diffArr;
  }

  /* creating finalData format to pass to StackedGraph */
  finalData(label, quant, diff) {
    let final = [];
    let temp = [];
    let innerObj = {};

    innerObj[label[0]] = quant[0];
    innerObj['current'] = quant[0];
    innerObj['diff'] = diff[0];
    temp.push(innerObj);

    if (label.length === 1) {
      return temp;
    } else {
      let result = this.finalData(
        label.slice(1),
        quant.slice(1),
        diff.slice(1)
      );
      final = [...temp, ...result];
    }
    return final;
  }

  /* making startData for StackedGraph for animation purposes;
can delete later if we find better way */
  startData(label, quant, diff) {
    let final = [];
    let temp = [];
    let innerObj = {};

    innerObj[label[0]] = 0;
    innerObj['current'] = 0;
    innerObj['diff'] = 0;
    temp.push(innerObj);

    if (label.length === 1) {
      return temp;
    } else {
      let result = this.startData(
        label.slice(1),
        quant.slice(1),
        diff.slice(1)
      );
      final = [...temp, ...result];
    }
    return final;
  }

  render() {
    const {
      dishNut: {
        calories,
        healthLabels,
        dietLabels,
        cautions,
        totalDaily,
        totalNutrients,
        totalNutrientsKCal,
      },
    } = this.props;

    if (
      !calories ||
      !healthLabels ||
      !dietLabels ||
      !cautions ||
      !totalDaily ||
      !totalNutrients ||
      !totalNutrientsKCal
    ) {
      return (
        <View>
          <Text>Loading....</Text>
        </View>
      );
    } else {
      /* Total Daily Quantities/Units/Labels in arrays */
      let totalDailyKeys = Object.keys(totalDaily);
      let totalDailyQuantities = totalDailyKeys.map(el => {
        return totalDaily[el].quantity;
      });
      let totalDailyUnits = totalDailyKeys.map(el => {
        return totalDaily[el].unit;
      });
      let totalDailyLabels = totalDailyKeys.map(el => {
        return totalDaily[el].label;
      });

      /* Total Nutrients Quantities/Units/Labels in arrays */
      let totalNutrientsKeys = Object.keys(totalNutrients);
      let totalNutrientsQuantities = totalNutrientsKeys.map(el => {
        return totalNutrients[el].quantity;
      });
      let totalNutrientsUnits = totalNutrientsKeys.map(el => {
        return totalNutrients[el].unit;
      });
      let totalNutrientsLabels = totalNutrientsKeys.map(el => {
        return totalNutrients[el].label;
      });

      /* Fake NutrientGoals in Array */
      let nutrientGoals = Array(21).fill(100);

      /* Difference of Goal & Nutrient Quantities in Array */
      let difference = this.difference(nutrientGoals, totalNutrientsQuantities);

      /* Final data for TotalNutrients StackBarGraph */
      let finalDataForTotalNutrients = this.finalData(
        totalNutrientsLabels,
        totalNutrientsQuantities,
        difference
      );

      /* Start data for TotalNutrients StackBarGraph */
      let startDataForTotalNutrients = this.startData(
        totalNutrientsLabels,
        totalNutrientsQuantities,
        difference
      );

      let justIngredients = this.props.userDish.slice(
        0,
        this.props.userDish.length - 1
      );

      let justDishName = this.dishName(this.props.userDish);

      return (
        <ScrollView>
          <SaveDish modalOpen={this.state.modalOpen} onSave={(values) => {this.onSave(values)}}/>
          <View>
            <Text style={styles.name}>DISH NAME</Text>
            <Button title='Save Meal' onPress={() => {this.setState({modalOpen: true})}}/>
          <View>
            <Text style={styles.head}>{justDishName}</Text>
            {justIngredients.map((el, index) => {
              return (
                <Text key={index} style={styles.subhead}>
                  - {el}
                </Text>
              );
            })}
            <View>
              {/* <Image source={{ uri: 'x' }} style={styles.image} /> */}
            </View>
            <Text style={styles.title}>Health Labels:</Text>
            <Text>{this.cleanStr(healthLabels, dietLabels)}</Text>
          </View>

          <View style={styles.graph}>
            <Text style={styles.title}>TOTAL CALORIES BREAKDOWN:</Text>
            <Text style={styles.title}>{calories}KCAL</Text>
            <View>
              <AnimatedPie
                carbs={totalNutrientsKCal.CHOCDF_KCAL.quantity}
                fat={totalNutrientsKCal.FAT_KCAL.quantity}
                protein={totalNutrientsKCal.PROCNT_KCAL.quantity}
              />
              <AnimatedPieLabel
                carbs={totalNutrientsKCal.CHOCDF_KCAL.quantity}
                fat={totalNutrientsKCal.FAT_KCAL.quantity}
                protein={totalNutrientsKCal.PROCNT_KCAL.quantity}
              />
            </View>
          </View>

          <View style={styles.barGraph}>
            <Text style={styles.title}>TOTAL DAILY %:</Text>
            <TotalDailyBar
              label={totalDailyLabels}
              quantity={totalDailyQuantities}
              unit={totalDailyUnits}
            />
          </View>

          <View style={styles.barGraph}>
            <Text style={styles.title}>TOTAL NUTRIENTS:</Text>
            <TotalNutrientsBar
              data={finalDataForTotalNutrients}
              startData={startDataForTotalNutrients}
              quantity={totalNutrientsQuantities}
              label={totalNutrientsLabels}
              unit={totalNutrientsUnits}
            />
          </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  createDish: (nutritionInfo, dishInfo) => {dispatch(createDish(nutritionInfo, dishInfo))}
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentDish)

const styles = StyleSheet.create({
  head: {
    fontSize: 30,
  },
  title: {
    fontSize: 20,
  },
  image: {
    width: 50,
    height: 50,
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
