import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  TextInput,
} from 'react-native';
import { createDish } from '../store/savedDishIngredients';
import SaveDish from './SaveDish';
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
    this.onSave = this.onSave.bind(this);
  }

  onSave(values) {
    this.setState({
      modalOpen: false,
    });
    console.log('HELLO I SUBMITTED', values);
    this.props.createDish(this.props.dishNut, values);
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
    console.log('HELLO I AM YOUR DISHNUT', this.props.dishNut)
    let name
          let imgUrl
          let mealTypes
          let healthLabels
          let CHOCDF_KCAL
          let FAT_KCAL
          let PROCNT_KCAL
          let calories
          let CA
          let CHOCDF
          let FAMS
          let FAPU
          let FASAT
          let FAT
          let FE
          let FOLDFE
          let FOLFD
          let K
          let MG
          let NA
          let NIA
          let P
          let PROCNT
          let RIBF
          let THIA
          let VITB6A
          let WATER
          let ZN
          let CHOLE
          let FATRN
          let FIBTG
          let FOLAC
          let SUGAR
          let TOCPHA
          let VITA_RAE
          let VITB12
          let VITC
          let VITD
          let VITK1
    if (this.props.dishNut) {
      const {
        dishNut: {
          name,
          imgUrl,
          mealTypes,
          healthLabels,
          CHOCDF_KCAL,
          FAT_KCAL,
          PROCNT_KCAL,
          calories,
          CA,
          CHOCDF,
          FAMS,
          FAPU,
          FASAT,
          FAT,
          FE,
          FOLDFE,
          FOLFD,
          K,
          MG,
          NA,
          NIA,
          P,
          PROCNT,
          RIBF,
          THIA,
          VITB6A,
          WATER,
          ZN,
          CHOLE,
          FATRN,
          FIBTG,
          FOLAC,
          SUGAR,
          TOCPHA,
          VITA_RAE,
          VITB12,
          VITC,
          VITD,
          VITK1
        }
      } = this.props
    }
    console.log('i am name', name)
    if (
      !name ||
      !imgUrl ||
      !mealTypes ||
      !healthLabels ||
      !CHOCDF_KCAL ||
      !FAT_KCAL ||
      !PROCNT_KCAL ||
      !calories ||
      !CA ||
      !CHOCDF ||
      !FAMS ||
      !FAPU ||
      !FASAT ||
      !FAT ||
      !FE ||
      !FOLDFE ||
      !FOLFD ||
      !K ||
      !MG ||
      !NA ||
      !NIA ||
      !P ||
      !PROCNT ||
      !RIBF ||
      !THIA ||
      !VITB6A ||
      !WATER ||
      !ZN ||
      !CHOLE ||
      !FATRN ||
      !FIBTG ||
      !FOLAC ||
      !SUGAR ||
      !TOCPHA ||
      !VITA_RAE ||
      !VITB12 ||
      !VITC ||
      !VITD ||
      !VITK1
    ) {
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
          />
          <View>
          <Text style={styles.name}>{name}</Text>
            <Button
              title="Save Meal"
              onPress={() => {
                this.setState({ modalOpen: true });
              }}
            />
            <View>
              <Text style={styles.head}>{name}</Text>
              {this.props.finalIngrStr.map((el, index) => {
                return (
                  <Text key={index} style={styles.subhead}>
                    - {el}
                  </Text>
                );
              })}
              <View>
                {/* <Image source={{ uri: 'x' }} style={styles.image} /> */}
              </View>
              {healthLabels ?
              <View>
              <Text style={styles.title}>Health Labels:</Text>
              <Text>{healthLabels}</Text>
              </View> : null}
            </View>

            <View style={styles.graph}>
              <Text style={styles.title}>TOTAL CALORIES BREAKDOWN:</Text>
              <Text style={styles.title}>{calories}KCAL</Text>
              <View>
                <AnimatedPie
                  carbs={CHOCDF_KCAL}
                  fat={FAT_KCAL}
                  protein={PROCNT_KCAL}
                />
                <AnimatedPieLabel
                  carbs={CHOCDF_KCAL}
                  fat={FAT_KCAL}
                  protein={PROCNT_KCAL}
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
          </View>
        </ScrollView>
      );
    }
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  createDish: (nutritionInfo, dishInfo) => {
    dispatch(createDish(nutritionInfo, dishInfo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentDish);

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
