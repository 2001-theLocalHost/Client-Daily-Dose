import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimatedPieLabel(props) {
  return (
    <View style={styles.topLabelContainer}>
      <View style={styles.innerLabelContainer}>
        <View style={styles.squareCarbs} />
        <Text style={styles.label}>Carbs: {props.carbs} kCal</Text>
      </View>

      <View style={styles.innerLabelContainer}>
        <View style={styles.squareFat} />
        <Text style={styles.label}>Fat: {props.fat} kCal</Text>
      </View>

      <View style={styles.innerLabelContainer}>
        <View style={styles.squareProtein} />
        <Text style={styles.label}>Protein: {props.protein} kCal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topLabelContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 3,
    marginBottom: 40,
  },
  innerLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  squareCarbs: {
    width: 10,
    height: 10,
    margin: 5,
    backgroundColor: '#FF7F4B',
  },
  squareFat: {
    width: 10,
    height: 10,
    margin: 5,
    backgroundColor: '#E2CA2B',
  },
  squareProtein: {
    width: 10,
    height: 10,
    margin: 5,
    backgroundColor: '#E35052',
  },
  label: {
    fontFamily: 'avenir-book',
  },
});
