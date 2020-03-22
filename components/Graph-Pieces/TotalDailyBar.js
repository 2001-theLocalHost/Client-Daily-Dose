import React from 'react';
import { Animated, View } from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';

export default class TotalDailyBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: Array(17).fill(0),
    };
    this.changeData();
  }

  changeData() {
    let newData = this.props.quantity.map(el => {
      return Math.round(el);
    });

    setTimeout(() => {
      this.setState({ data: newData });
    }, 1000);
  }

  render() {
    const fill = 'rgb(226,202,43)';

    return (
      <View>
        <BarChart
          style={{ height: 800, width: 300, marginLeft: 10 }}
          data={this.state.data}
          svg={{ fill }}
          // contentInset={{ top: 30, bottom: 30 }}
          horizontal={true}
          spacingInner={0.3}
          animate
        >
          {/* <Grid /> */}
        </BarChart>
      </View>
    );
  }
}
