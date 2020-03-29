import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackedBarChart, XAxis } from 'react-native-svg-charts';

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
    const colors = ['#FF7F4B', '#E35052'];
    const keys = ['current', 'diff'];
    return (
      <View style={styles.stackedGraph}>
        <StackedBarChart
          style={{ height: 800 }}
          keys={keys}
          colors={colors}
          data={this.state.data}
          showGrid={false}
          contentInset={{ top: 30, bottom: 30 }}
          horizontal={true}
          spacingInner={0.3}
          animate
        />
        {/* <XAxis
          style={{ marginHorizontal: 0 }}
          data={this.props.data}
          formatLabel={(value, index) => index}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: 'black' }}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stackedGraph: {
    marginLeft: 10,
    width: '70%',
  },
});
