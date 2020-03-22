import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackedBarChart, XAxis } from 'react-native-svg-charts';

export default class TotalNutrientsBar extends React.PureComponent {
  render() {
    const data = [
      {
        // month: new Date(2015, 0, 1),
        apples: 3840,
        bananas: 1920,
      },
      {
        // month: new Date(2015, 1, 1),
        apples: 1600,
        bananas: 1440,
      },
      {
        // month: new Date(2015, 2, 1),
        apples: 640,
        bananas: 960,
      },
      {
        // month: new Date(2015, 3, 1),
        apples: 3320,
        bananas: 480,
      },
    ];

    const colors = ['#7b4173', '#a55194', '#ce6dbd', '#de9ed6'];
    const keys = ['apples', 'bananas'];

    return (
      <View style={styles.stackedGraph}>
        <StackedBarChart
          style={{ height: 200 }}
          keys={keys}
          colors={colors}
          data={data}
          showGrid={false}
          contentInset={{ top: 30, bottom: 30 }}
          horizontal={true}
        />
        <XAxis
          style={{ marginHorizontal: 0 }}
          data={data}
          formatLabel={(value, index) => index}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: 'black' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stackedGraph: {
    marginLeft: 70,
    width: 300,
  },
});
