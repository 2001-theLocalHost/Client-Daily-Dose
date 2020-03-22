import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimatedPieLabel(props) {
  return (
    <View style={styles.topLabelContainer}>
      <View style={styles.innerLabelContainer}>
        <View style={styles.square1} />
        <Text>Carb: {props.carbs} KCal</Text>
      </View>

      <View style={styles.innerLabelContainer}>
        <View style={styles.square2} />
        <Text>Fat: {props.fat} KCal</Text>
      </View>

      <View style={styles.innerLabelContainer}>
        <View style={styles.square3} />
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
  square1: {
    width: 10,
    height: 10,
    backgroundColor: '#0d2f51',
  },
  square2: {
    width: 10,
    height: 10,
    backgroundColor: '#28BD8B',
  },
  square3: {
    width: 10,
    height: 10,
    backgroundColor: '#F66A6A',
  },
});
