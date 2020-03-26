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
import { arraysOfData, finalData, startData } from '../utilityFunctions';
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
    console.log('HELLO I SUBMITTED', values);
    this.props.createDish(this.props.dishNut, values);
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
      console.log('this is dishNut', this.props.dishNut);
      console.log('this is dataInArrays', dataInArrays);

      let fakeNutrientGoals = {
        CHOCDF_KCAL: 5000000,
        FAT_KCAL: 5000000,
        PROCNT_KCAL: 5000000,
        ENERC_KCAL: 5000000,
        CA: 5000000,
        CHOCDF: 5000000,
        FAMS: 5000000,
        FAPU: 5000000,
        FASAT: 5000000,
        FAT: 5000000,
        FE: 5000000,
        FOLDFE: 5000000,
        FOLFD: 5000000,
        K: 5000000,
        MG: 5000000,
        NA: 5000000,
        NIA: 5000000,
        P: 5000000,
        PROCNT: 5000000,
        RIBF: 5000000,
        THIA: 5000000,
        VITB6A: 5000000,
        WATER: 5000000,
        ZN: 5000000,
        CHOLE: 5000000,
        FATRN: 5000000,
        FIBTG: 5000000,
        FOLAC: 5000000,
        SUGAR: 5000000,
        TOCPHA: 5000000,
        VITA_RAE: 5000000,
        VITB12: 5000000,
        VITC: 5000000,
        VITD: 5000000,
        VITK1: 5000000,
      };

      let dataInArrays = arraysOfData(this.props.dishNut, fakeNutrientGoals);

      let finalDataForStackedGraph = finalData(
        dataInArrays[0],
        dataInArrays[1],
        datatInArrays[2]
      );

      let startDataForStackedGraph = startData(
        dataInArrays[0],
        dataInArrays[1],
        datatInArrays[2]
      );

      return (
        <ScrollView>
          <SaveDish
            modalOpen={this.state.modalOpen}
            onSave={values => {
              this.onSave(values);
            }}
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
              data={finalDataForStackedGraph}
              startData={startDataForStackedGraph}
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
  createDish: (nutritionInfo, dishInfo) => {
    dispatch(createDish(nutritionInfo, dishInfo));
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
