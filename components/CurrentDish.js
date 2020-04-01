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
import { female25to35inMG } from '../goals';
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
      let finalDataForStackGraph = finalData(dishNut, female25to35inMG);
      let startDataForStackGraph = startData(dishNut, female25to35inMG);

      return (
        <ScrollView>
          <View>
            <Button title="Save Meal" onPress={this.props.onPress} />
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
                carbs={dishNut.CHOCDF_KCAL}
                fat={dishNut.FAT_KCAL}
                protein={dishNut.PROCNT_KCAL}
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

          {console.log('this is final data', finalDataForStackGraph)}

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
