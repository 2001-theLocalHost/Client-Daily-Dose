import React, { Component } from 'react';
import { Path } from 'react-native-svg';
import * as shape from 'd3-shape';
const d3 = { shape };

export default class Slice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.arcGenerator = d3.shape
      .arc()
      .outerRadius(100)
      .innerRadius(50)
      .padAngle(0.02);
  }

  createPieArc = (index, endAngle, data) => {
    const arcs = d3.shape
      .pie()
      .value(item => item.number)
      .startAngle(0)
      .endAngle(endAngle)(data);

    let arcData = arcs[index];

    return this.arcGenerator(arcData);
  };

  render() {
    const { endAngle, color, index, data } = this.props;
    let val = data[index].number;

    if (data.length === 1) {
      val = 0;
    }

    return (
      <Path
        onPress={() => alert(`${Math.round(val * 100)}%`)}
        d={this.createPieArc(index, endAngle, data)}
        fill={color}
      />
    );
  }
}
