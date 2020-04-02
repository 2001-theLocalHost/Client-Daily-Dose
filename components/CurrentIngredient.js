import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { capitalize, finalData, startData } from '../utilityFunctions';
import { female25to35inMG } from '../goals';
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
    console.log('this is my ingrNut', ingrNut);

    if (!this.props.ingrNut || !this.props.ingrNut.ingredientName) {
      return (
        <View>
          <Text>Loading....</Text>
        </View>
      );
    } else {
      let finalDataForStackGraph = finalData(ingrNut, female25to35inMG);
      let startDataForStackGraph = startData(ingrNut, female25to35inMG);

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
                carbs={ingrNut.CHOCDF_KCAL}
                fat={ingrNut.FAT_KCAL}
                protein={ingrNut.PROCNT_KCAL}
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
    fontFamily: 'gotham-book',
  },
  title: {
    fontSize: 20,
    fontFamily: 'gotham-book',
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
