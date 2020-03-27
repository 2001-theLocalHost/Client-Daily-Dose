import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { capitalize, finalData, startData } from '../utilityFunctions';
import AnimatedPie from './Graph-Pieces/AnimatedPie';
import AnimatedPieLabel from './Graph-Pieces/AnimatedPieLabel';
import TotalNutrientsBar from './Graph-Pieces/TotalNutrientsBar';

export default class CurrentIngredient extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { ingrNut } = this.props;

    if (!this.props.ingrNut || !this.props.ingrNut.ingredientName) {
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

      let finalDataForStackGraph = finalData(ingrNut, fakeNutrientGoals);
      let startDataForStackGraph = startData(ingrNut, fakeNutrientGoals);

      return (
        <ScrollView>
          <View>
            <Text style={styles.head}>
              {capitalize(ingrNut.ingredientName)}
            </Text>
            <Text style={styles.ingredients}>
              Portion Size: {ingrNut.portionSize}
            </Text>
            {ingrNut.healthLabels ? (
              <View>
                <Text style={styles.title}>Health Labels:</Text>
                {ingrNut.healthLabels.map((el, index) => {
                  return <Text key={index}>- {el}</Text>;
                })}
              </View>
            ) : null}
          </View>

          <View style={styles.graph}>
            <Text style={styles.title}>TOTAL CALORIES BREAKDOWN:</Text>
            <Text style={styles.title}>{ingrNut.calories}KCAL</Text>
            <View>
              <AnimatedPie
                carbs={ingrNut.CHOCDF_KCAL > 0 ? ingrNut.CHOCDF_KCAL : 1}
                fat={ingrNut.FAT_KCAL > 0 ? ingrNut.FAT_KCAL : 1}
                protein={ingrNut.PROCNT_KCAL > 0 ? ingrNut.PROCNT_KCAL : 1}
              />
              <AnimatedPieLabel
                carbs={ingrNut.CHOCDF_KCAL}
                fat={ingrNut.FAT_KCAL}
                protein={ingrNut.PROCNT_KCAL}
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
        </ScrollView>
      );
    }
  }
}

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
