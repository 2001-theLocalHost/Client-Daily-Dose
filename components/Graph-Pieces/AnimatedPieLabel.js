import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimatedPieLabel(props) {
  return (
    <View style={styles.topLabelContainer}>
      <View style={styles.innerLabelContainer}>
        <View style={styles.squareCarbs} />
        <Text>Carbs: {props.carbs} KCal</Text>
      </View>

      <View style={styles.innerLabelContainer}>
        <View style={styles.squareFat} />
        <Text>Fat: {props.fat} KCal</Text>
      </View>

      <View style={styles.innerLabelContainer}>
        <View style={styles.squareProtein} />
        <Text>Protein: {props.protein} KCal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topLabelContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  innerLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  squareCarbs: {
    width: 10,
    height: 10,
    backgroundColor: '#FF7F4B',
  },
  squareFat: {
    width: 10,
    height: 10,
    backgroundColor: '#E2CA2B',
  },
  squareProtein: {
    width: 10,
    height: 10,
    backgroundColor: '#E35052',
  },
});
