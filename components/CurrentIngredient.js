import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class CurrentIngredient extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text style={styles.name}>DISH NAME</Text>
        <Text style={styles.ingredients}>ingredients listed here</Text>
      </View>
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
    width: 90,
    height: 90,
  },
  barGraph: {
    width: 100,
    height: 200,
  },
});
