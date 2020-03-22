import React from 'react';
import { BarChart, Grid } from 'react-native-svg-charts';

export default class TotalDailyBar extends React.PureComponent {
  render() {
    const fill = 'rgb(134, 65, 244)';
    const data = this.props.data.map(el => {
      return Math.round(el);
    });

    return (
      <BarChart
        style={{ height: 200 }}
        data={data}
        svg={{ fill }}
        contentInset={{ top: 30, bottom: 30 }}
      >
        <Grid />
      </BarChart>
    );
  }
}
