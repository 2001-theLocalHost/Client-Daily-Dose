import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackedBarChart, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';

// const Labels = props => {
//   const { x, y, data } = props;
//   return data.map((value, index) => {
//     const sum = value.travel + value.food + value.utility;
//     const pX = x(index) + x.bandwidth() / 2;
//     const pY = y(sum) - 10;
//     return (
//       <Text
//         key={index}
//         x={pX}
//         y={pY}
//         fontSize={13}
//         fill="red"
//         alignmentBaseline={'middle'}
//         textAnchor={'middle'}
//       >
//         {sum}
//       </Text>
//     );
//   });
// };

export default class TotalNutrientsBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.startData,
    };
    this.changeData();
  }

  changeData() {
    let newData = this.props.data;

    setTimeout(() => {
      this.setState({ data: newData });
    }, 3000);
  }

  render() {
    const colors = ['#FF7F4B', '#E8E8E8'];
    const keys = ['current', 'diff'];
    return (
      <View style={styles.stackedGraph}>
        <StackedBarChart
          style={{ height: 900, width: 300, marginRight: 50 }}
          keys={keys}
          colors={colors}
          data={this.state.data}
          showGrid={false}
          contentInset={{ right: 10 }}
          horizontal={true}
          spacingInner={0.5}
          spacingOuter={0.3}
          animate
        >
          {/* <Labels /> */}
        </StackedBarChart>
        <YAxis
          data={this.props.data}
          yAccessor={({ index }) => index}
          // formatLabel={index => this.state.data[index].current}
          scale={scale.scaleBand}
          contentInset={{ right: 10 }}
          spacingInner={0.5}
          spacingOuter={0.3}
          svg={{ fontSize: 10, fill: 'black', rotation: 30 }}
        />
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
