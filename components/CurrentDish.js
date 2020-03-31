import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import {
  arraysOfData,
  finalData,
  startData,
  capitalize,
} from '../utilityFunctions';
import AnimatedPie from './Graph-Pieces/AnimatedPie';
import AnimatedPieLabel from './Graph-Pieces/AnimatedPieLabel';
import TotalDailyBar from './Graph-Pieces/TotalDailyBar';
import TotalNutrientsBar from './Graph-Pieces/TotalNutrientsBar';

class CurrentDish extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { dishNut } = this.props;

    if (!this.props.dishNut || !this.props.dishNut.name) {
      return (
        <View>
          <Text>Loading....</Text>
        </View>
      );
    } else {
      let fakeNutrientGoals = {
        CHOCDF_KCAL: 5000,
        FAT_KCAL: 5000,
        PROCNT_KCAL: 5000,
        ENERC_KCAL: 5000,
        CA: 5000,
        CHOCDF: 5000,
        FAMS: 5000,
        FAPU: 5000,
        FASAT: 5000,
        FAT: 5000,
        FE: 5000,
        FOLDFE: 5000,
        FOLFD: 5000,
        K: 5000,
        MG: 5000,
        NA: 5000,
        NIA: 5000,
        P: 5000,
        PROCNT: 5000,
        RIBF: 5000,
        THIA: 5000,
        VITB6A: 5000,
        WATER: 5000,
        ZN: 5000,
        CHOLE: 5000,
        FATRN: 5000,
        FIBTG: 5000,
        FOLAC: 5000,
        SUGAR: 5000,
        TOCPHA: 5000,
        VITA_RAE: 5000,
        VITB12: 5000,
        VITC: 5000,
        VITD: 5000,
        VITK1: 5000,
      };

      let finalDataForStackGraph = finalData(dishNut, fakeNutrientGoals);
      let startDataForStackGraph = startData(dishNut, fakeNutrientGoals);

      return (
        <ScrollView>
          <View>
            <Button
              title="Save Meal"
              onPress={this.props.onPress}
            />
          </View>
          <View>
            <Text style={styles.head}>{capitalize(dishNut.name)}</Text>
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
                {dishNut.healthLabels.map((el, index) => {
                  return <Text key={index}>- {el}</Text>;
                })}
              </View>
            ) : null}
          </View>

          <View style={styles.graph}>
            <Text style={styles.title}>TOTAL CALORIES BREAKDOWN:</Text>
            <Text style={styles.title}>{dishNut.calories}KCAL</Text>
            <View>
              <AnimatedPie
                carbs={dishNut.CHOCDF_KCAL > 0 ? dishNut.CHOCDF_KCAL : 1}
                fat={dishNut.FAT_KCAL > 0 ? dishNut.FAT_KCAL : 1}
                protein={dishNut.PROCNT_KCAL > 0 ? dishNut.PROCNT_KCAL : 1}
              />
              <AnimatedPieLabel
                carbs={dishNut.CHOCDF_KCAL}
                fat={dishNut.FAT_KCAL}
                protein={dishNut.PROCNT_KCAL}
              />
            </View>
          </View>

          <View style={styles.barGraph}>
            <Text style={styles.title}>TOTAL NUTRIENTS:</Text>
            <TotalNutrientsBar
              data={finalDataForStackGraph}
              startData={startDataForStackGraph}
            />
          </View>

          {/* <View style={styles.barGraph}>
              <Text style={styles.title}>TOTAL DAILY %:</Text>
              <TotalDailyBar
                label={totalDailyLabels}
                quantity={totalDailyQuantities}
                unit={totalDailyUnits}
              />
            </View> */}
        </ScrollView>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  createDish: (dishNut, formValues, ingredientArray) => {
    dispatch(createDish(dishNut, formValues, ingredientArray));
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
