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
      console.log('this is dishNut3', this.props.dishNut);

      let fakeNutrientGoals = {
        CHOCDF_KCAL: 50000,
        FAT_KCAL: 50000,
        PROCNT_KCAL: 50000,
        ENERC_KCAL: 50000,
        CA: 50000,
        CHOCDF: 50000,
        FAMS: 50000,
        FAPU: 50000,
        FASAT: 50000,
        FAT: 50000,
        FE: 50000,
        FOLDFE: 50000,
        FOLFD: 50000,
        K: 50000,
        MG: 50000,
        NA: 50000,
        NIA: 50000,
        P: 50000,
        PROCNT: 50000,
        RIBF: 50000,
        THIA: 50000,
        VITB6A: 50000,
        WATER: 50000,
        ZN: 50000,
        CHOLE: 50000,
        FATRN: 50000,
        FIBTG: 50000,
        FOLAC: 50000,
        SUGAR: 50000,
        TOCPHA: 50000,
        VITA_RAE: 50000,
        VITB12: 50000,
        VITC: 50000,
        VITD: 50000,
        VITK1: 50000,
      };

      let dataInArrays = arraysOfData(this.props.dishNut, fakeNutrientGoals);
      console.log('this is dataInArrays3', dataInArrays);

      let finalDataForStackedGraph = finalData(
        dataInArrays[0],
        dataInArrays[1],
        dataInArrays[2]
      );

      let startDataForStackedGraph = startData(
        dataInArrays[0],
        dataInArrays[1],
        dataInArrays[2]
      );

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
