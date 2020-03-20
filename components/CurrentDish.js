import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

export default class CurrentDish extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let totalNutrientsFAT;
    if (this.props.totalNutrientsFAT) {
      totalNutrientsFAT = Math.round(this.props.totalNutrientsFAT.quantity);
    }

    let totalNutrientsCHOCDF;
    if (this.props.totalNutrientsCHOCDF) {
      totalNutrientsCHOCDF = Math.round(
        this.props.totalNutrientsCHOCDF.quantity
      );
    }

    let totalNutrientsPROCNT;
    if (this.props.totalNutrientsPROCNT) {
      totalNutrientsPROCNT = Math.round(
        this.props.totalNutrientsPROCNT.quantity
      );
    }

    let totalDailyENERGY;
    if (this.props.totalDailyENERGY) {
      totalDailyENERGY = Math.round(this.props.totalDailyENERGY.quantity);
    }

    let totalDailyFAT;
    if (this.props.totalDailyFAT) {
      totalDailyFAT = Math.round(this.props.totalDailyFAT.quantity);
    }

    let totalDailyFASAT;
    if (this.props.totalDailyFASAT) {
      totalDailyFASAT = Math.round(this.props.totalDailyFASAT.quantity);
    }

    let totalDailyCHOCDF;
    if (this.props.totalDailyCHOCDF) {
      totalDailyCHOCDF = Math.round(this.props.totalDailyCHOCDF.quantity);
    }

    let totalDailyPROCNT;
    if (this.props.totalDailyPROCNT) {
      totalDailyPROCNT = Math.round(this.props.totalDailyPROCNT.quantity);
    }

    let totalDailyNA;
    if (this.props.totalDailyNA) {
      totalDailyNA = Math.round(this.props.totalDailyNA.quantity);
    }

    let totalDailyCA;
    if (this.props.totalDailyCA) {
      totalDailyCA = Math.round(this.props.totalDailyCA.quantity);
    }

    let totalDailyMG;
    if (this.props.totalDailyMG) {
      totalDailyMG = Math.round(this.props.totalDailyMG.quantity);
    }

    let totalDailyK;
    if (this.props.totalDailyK) {
      totalDailyK = Math.round(this.props.totalDailyK.quantity);
    }

    let totalDailyFE;
    if (this.props.totalDailyFE) {
      totalDailyFE = Math.round(this.props.totalDailyFE.quantity);
    }

    let totalDailyZN;
    if (this.props.totalDailyZN) {
      totalDailyZN = Math.round(this.props.totalDailyZN.quantity);
    }

    let totalDailyP;
    if (this.props.totalDailyP) {
      totalDailyP = Math.round(this.props.totalDailyP.quantity);
    }

    let totalDailyTHIA;
    if (this.props.totalDailyTHIA) {
      totalDailyTHIA = Math.round(this.props.totalDailyTHIA.quantity);
    }

    let totalDailyRIBF;
    if (this.props.totalDailyRIBF) {
      totalDailyRIBF = Math.round(this.props.totalDailyRIBF.quantity);
    }

    let totalDailyNIA;
    if (this.props.totalDailyNIA) {
      totalDailyNIA = Math.round(this.props.totalDailyNIA.quantity);
    }

    let totalDailyVITB6A;
    if (this.props.totalDailyVITB6A) {
      totalDailyVITB6A = Math.round(this.props.totalDailyVITB6A.quantity);
    }

    let totalDailyFOLDFE;
    if (this.props.totalDailyFOLDFE) {
      totalDailyFOLDFE = Math.round(this.props.totalDailyFOLDFE.quantity);
    }

    return (
      <ScrollView>
        <View>
          <Text style={styles.name}>DISH NAME</Text>
          <Text style={styles.ingredients}>ingredients listed here</Text>
        </View>
        <View>{/* <Image source={{uri: "x"}} style={styles.image} /> */}</View>
        <Text>Calories: {this.props.dishNut.calories}</Text>
        {/* <Text>Categories:</Text>
        {this.props.dishNut.dietLabels.map(el => (
          <Text>{el}</Text>
        ))} */}
        <View style={styles.donutGraph}>
          <Text>Total Nutrients:</Text>
          <Text>Fat: {totalNutrientsFAT}</Text>
          <Text>Protein: {totalNutrientsPROCNT}</Text>
          <Text>Carbs: {totalNutrientsCHOCDF}</Text>
        </View>
        <View style={styles.barGraph}>
          <Text>Total Daily:</Text>
          <Text>Energy: {totalDailyENERGY}% </Text>
          <Text>Fat: {totalDailyFAT}%</Text>
          <Text>
            Saturated Fat:
            {totalDailyFASAT}%
          </Text>
          <Text>Carbs: {totalDailyCHOCDF}% </Text>
          <Text>Protein: {totalDailyPROCNT}%</Text>
          <Text>Sodium: {totalDailyNA}%</Text>
          <Text>Calcium: {totalDailyCA}%</Text>
          <Text>Magnesium: {totalDailyMG}%</Text>
          <Text>Potassium: {totalDailyK}%</Text>
          <Text>Iron: {totalDailyFE}%</Text>
          <Text>Zinc: {totalDailyZN}%</Text>
          <Text>Phosphorus: {totalDailyP}%</Text>
          <Text>Thiamin (B1): {totalDailyTHIA}%</Text>
          {/* <Text>Riboflavin (B2): {totalDailyRIBF.quantity}%</Text> */}
          <Text>Niacin (B3): {totalDailyNIA}%</Text>
          <Text>Vitamin (B6): {totalDailyVITB6A}%</Text>
          <Text>Folate (B9): {totalDailyFOLDFE}%</Text>
        </View>
      </ScrollView>
    );
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
    width: 200,
    height: 90,
  },
  barGraph: {
    width: 200,
    height: 200,
  },
});
