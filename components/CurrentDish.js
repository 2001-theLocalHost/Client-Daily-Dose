import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import PieChart from './Pie';

export default class CurrentDish extends React.Component {
  constructor() {
    super();
    this.state = {};
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
      return (
        <ScrollView>
          {console.log(totalDaily)}
          <View>
            <Text style={styles.name}>DISH NAME</Text>
            <Text>Breakfast/Lunch/Dinner here</Text>
            <Text style={styles.ingredients}>
              ingredients and portion size here
            </Text>
            <View>
              <Text>Image here</Text>
              {/* <Image source={{ uri: 'x' }} style={styles.image} /> */}
            </View>
          </View>

          <View>
            <Text>Calories: {calories}</Text>
            {/* {healthLabels
            ? healthLabels.map(el => {
                <Text key={el}>{el}</Text>;
              })
            : null}
          {dietLabels
            ? dietLabels.map(el => {
                <Text key={el}>{el}</Text>;
              })
            : null}
          {cautions
            ? cautions.map(el => {
                <Text key={el}>{el}</Text>;
              })
            : null} */}
          </View>

          <View style={styles.donutGraph}>
            <Text>FOR DONUT GRAPH</Text>

            <View>{/* <PieChart /> */}</View>
            <Text>
              Calories from Carb: {totalNutrientsKCal.CHOCDF_KCAL.quantity} kCal
            </Text>
            <Text>
              Calories from Fat: {totalNutrientsKCal.FAT_KCAL.quantity} kCal
            </Text>
            <Text>
              Calories from Protein: {totalNutrientsKCal.PROCNT_KCAL.quantity}{' '}
              kCal
            </Text>
          </View>

          <View style={styles.barGraph}>
            <Text>TOTAL DAILY PERCENTAGE BASED ON 2000 CALORIE</Text>
            <Text>Calcium: {Math.round(totalDaily.CA.quantity)}%</Text>
            <Text>Carbs: {Math.round(totalDaily.CHOCDF.quantity)}%</Text>
            <Text>Energy: {Math.round(totalDaily.ENERC_KCAL.quantity)}%</Text>
            <Text>Saturated Fat: {Math.round(totalDaily.FASAT.quantity)}%</Text>
            <Text>Fat: {Math.round(totalDaily.FAT.quantity)}%</Text>
            <Text>Iron: {Math.round(totalDaily.FE.quantity)}%</Text>
            <Text>
              Folate Equivalent: {Math.round(totalDaily.FOLDFE.quantity)}%
            </Text>
            <Text>Potassium: {Math.round(totalDaily.K.quantity)}%</Text>
            <Text>Magnesium: {Math.round(totalDaily.MG.quantity)}%</Text>
            <Text>Sodium: {Math.round(totalDaily.NA.quantity)}%</Text>
            <Text>Niacin (B3): {Math.round(totalDaily.NIA.quantity)}%</Text>
            <Text>Phosphorus: {Math.round(totalDaily.P.quantity)}%</Text>
            <Text>Protein: {Math.round(totalDaily.PROCNT.quantity)}%</Text>
            <Text>
              Riboflavin (B2): {Math.round(totalDaily.RIBF.quantity)}%
            </Text>
            <Text>Thiamin (B1): {Math.round(totalDaily.THIA.quantity)}%</Text>
            <Text>Vitamin B6: {Math.round(totalDaily.VITB6A.quantity)}%</Text>
            <Text>Zinc: {Math.round(totalDaily.ZN.quantity)}%</Text>
          </View>

          <View style={styles.barGraph}>
            <Text>TOTAL NUTRIENTS</Text>
            <Text>
              Calcium: {Math.round(totalNutrients.CA.quantity)}
              {totalNutrients.CA.unit}
            </Text>
            <Text>
              Carbs: {Math.round(totalNutrients.CHOCDF.quantity)}
              {totalNutrients.CHOCDF.unit}
            </Text>
            <Text>
              Energy: {Math.round(totalNutrients.ENERC_KCAL.quantity)}
              {totalNutrients.ENERC_KCAL.unit}
            </Text>
            <Text>
              Monounsaturated Fat: {Math.round(totalNutrients.FAMS.quantity)}
              {totalNutrients.FAMS.unit}
            </Text>
            <Text>
              Polyunsaturated Fat: {Math.round(totalNutrients.FAPU.quantity)}
              {totalNutrients.FAPU.unit}
            </Text>
            <Text>
              Saturated Fat: {Math.round(totalNutrients.FASAT.quantity)}
              {totalNutrients.FASAT.unit}
            </Text>
            <Text>
              Fat: {Math.round(totalNutrients.FAT.quantity)}
              {totalNutrients.FAT.unit}
            </Text>
            <Text>
              Iron: {Math.round(totalNutrients.FE.quantity)}
              {totalNutrients.FE.unit}
            </Text>
            <Text>
              Folate Equivalent: {Math.round(totalNutrients.FOLDFE.quantity)}
              {totalNutrients.FOLDFE.unit}
            </Text>
            <Text>
              Folate Food: {Math.round(totalNutrients.FOLFD.quantity)}
              {totalNutrients.FOLFD.unit}
            </Text>
            <Text>
              Potassium: {Math.round(totalNutrients.K.quantity)}
              {totalNutrients.K.unit}
            </Text>
            <Text>
              Magnesium: {Math.round(totalNutrients.MG.quantity)}
              {totalNutrients.MG.unit}
            </Text>
            <Text>
              Sodium: {Math.round(totalNutrients.NA.quantity)}
              {totalNutrients.NA.unit}
            </Text>
            <Text>
              Niacin: {Math.round(totalNutrients.NIA.quantity)}
              {totalNutrients.NIA.unit}
            </Text>
            <Text>
              Phosphorus: {Math.round(totalNutrients.P.quantity)}
              {totalNutrients.P.unit}
            </Text>
            <Text>
              Protein: {Math.round(totalNutrients.PROCNT.quantity)}
              {totalNutrients.PROCNT.unit}
            </Text>
            <Text>
              Riboflavin (B2): {Math.round(totalNutrients.RIBF.quantity)}
              {totalNutrients.RIBF.unit}
            </Text>
            <Text>
              Thiamin (B2): {Math.round(totalNutrients.THIA.quantity)}
              {totalNutrients.THIA.unit}
            </Text>
            <Text>
              Vitamin B6: {Math.round(totalNutrients.VITB6A.quantity)}
              {totalNutrients.VITB6A.unit}
            </Text>
            <Text>
              Water:{Math.round(totalNutrients.WATER.quantity)}
              {totalNutrients.WATER.unit}
            </Text>
            <Text>
              Zinc: {Math.round(totalNutrients.FAT.quantity)}
              {totalNutrients.FAT.unit}
            </Text>
          </View>
        </ScrollView>
      );
    }
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
    marginTop: 15,
    marginBottom: 15,
    width: 200,
  },
  barGraph: {
    marginTop: 15,
    marginBottom: 15,
    width: 200,
  },
});
