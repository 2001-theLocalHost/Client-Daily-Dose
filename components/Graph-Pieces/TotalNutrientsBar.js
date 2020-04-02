import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackedBarChart, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';

export default class TotalNutrientsBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // data: this.props.data,
    };
    // this.changeData();
  }

  // changeData() {
  //   let newData = this.props.data;

  //   setTimeout(() => {
  //     this.setState({ data: newData });
  //   }, 3000);
  // }

  render() {
    const data = this.props.data;
    const colors = ['#FF7F4B', '#E8E8E8'];
    const keys = ['current', 'diff'];
    return (
      <View style={styles.stackedGraph}>
        <YAxis
          data={data}
          yAccessor={({ index }) => index}
          formatLabel={(_, index) =>
            `${data[index].label} ${'  -  '} ${Math.round(
              100 - data[index].diff * 100
            )}%`
          }
          scale={scale.scaleBand}
          contentInset={{ right: 50, left: 10 }}
          spacingInner={0.5}
          spacingOuter={0.3}
          svg={{ fontSize: 10, fill: 'black' }}
        />
        <StackedBarChart
          style={{ height: 900, width: 300, marginRight: 50 }}
          keys={keys}
          colors={colors}
          data={data}
          showGrid={false}
          contentInset={{ right: 50, left: 10 }}
          horizontal={true}
          spacingInner={0.5}
          spacingOuter={0.3}
          animate
        >
          {/* <Labels /> */}
        </StackedBarChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stackedGraph: {
    marginLeft: 10,
    width: '100%',
    flexDirection: 'row',
    height: 900,
  },
});
