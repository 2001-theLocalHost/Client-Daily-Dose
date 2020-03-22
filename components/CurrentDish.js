import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import AnimatedPie from './Graph-Pieces/AnimatedPie';
import AnimatedPieLabel from './Graph-Pieces/AnimatedPieLabel';
import TotalDailyBar from './Graph-Pieces/TotalDailyBar';
import TotalNutrientsBar from './Graph-Pieces/TotalNutrientsBar';

export default class CurrentDish extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  cleanStr(dietLabelArr, healthLabelsArr) {
    let newArr = [...dietLabelArr, ...healthLabelsArr];

    let tempArr = newArr.map(el => {
      return el.split('_').join(' ');
    });
    return tempArr.join(', ');
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
          <View>
            <Text style={styles.head}>DISH NAME</Text>
            <Text>Breakfast/Lunch/Dinner here</Text>
            <Text style={styles.subhead}>
              ingredients and portion size here
            </Text>
            <View>
              <Text style={styles.subhead}>Image here</Text>
              {/* <Image source={{ uri: 'x' }} style={styles.image} /> */}
            </View>
            <Text>Health Labels:</Text>
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
            <Text style={styles.title}>TOTAL DAILY:</Text>
            <TotalDailyBar
              data={[
                totalDaily.CA.quantity,
                totalDaily.CHOCDF.quantity,
                totalDaily.ENERC_KCAL.quantity,
                totalDaily.FASAT.quantity,
                totalDaily.FAT.quantity,
                totalDaily.FE.quantity,
                totalDaily.FOLDFE.quantity,
                totalDaily.K.quantity,
                totalDaily.MG.quantity,
                totalDaily.NA.quantity,
                totalDaily.NIA.quantity,
                totalDaily.P.quantity,
                totalDaily.PROCNT.quantity,
                totalDaily.RIBF.quantity,
                totalDaily.THIA.quantity,
                totalDaily.VITB6A.quantity,
                totalDaily.ZN.quantity,
              ]}
            />
          </View>

          <View style={styles.barGraph}>
            <Text>TOTAL NUTRIENTS</Text>
            <TotalNutrientsBar />
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
  head: {
    fontSize: 30,
  },
  subHead: {
    fontSize: 20,
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
