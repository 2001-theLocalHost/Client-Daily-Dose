import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';

export default class TotalDailyBar extends React.PureComponent {
  render() {
    const fill = 'rgb(226,202,43)';
    const data = this.props.data.map(el => {
      return Math.round(el);
    });

    return (
      <View>
        <BarChart
          style={{ height: 800, width: 300, marginLeft: 10 }}
          data={data}
          svg={{ fill }}
          //   contentInset={{ top: 30, bottom: 30 }}
          horizontal={true}
          spacingInner={0.3}
        >
          {/* <Grid /> */}
        </BarChart>
      </View>
    );
  }
}
