import React from 'react';
import { Animated, View, Easing } from 'react-native';
import SVG, { G } from 'react-native-svg';

import Slice from './AnimatedPieSlice';

const AnimatedSlice = Animated.createAnimatedComponent(Slice);

export default class AnimatedPie extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      animValue: new Animated.Value(0.1),
    };
  }

  componentDidMount() {
    let tempData = this.donutGraphData(
      this.props.carbs,
      this.props.fat,
      this.props.protein
    );
    this.setState({ data: tempData });
    this.animate();
  }

  donutGraphData(carb, fat, protein) {
    let sum = carb + fat + protein;
    let data = [
      { number: Math.round((carb / sum) * 100), color: '#0d2f51' },
      { number: Math.round((fat / sum) * 100), color: '#28BD8B' },
      { number: Math.round((protein / sum) * 100), color: '#F66A6A' },
    ];
    return data;
  }

  animate = () => {
    Animated.timing(this.state.animValue, {
      toValue: 2,
      duration: 500,
      easing: Easing.inOut(Easing.quad),
    }).start();
    // can pass this in the start(() => {setTimeout(this.resetPie, 2000}) to reset
  };

  /* can reset with this:
   resetPie = () => {
     this.state.animValue.setValue(0.1);
   };
*/

  render() {
    let endAngle = Animated.multiply(this.state.animValue, Math.PI);

    return (
      <View>
        <SVG width={270} height={300} viewBox={`-100 -100 150 150`}>
          {/* viewBox prop indicates placement of the vector art */}
          <G>
            {/*G is a container used to group other SVG elements.*/}
            {this.state.data.map((item, index) => {
              return (
                <AnimatedSlice
                  index={index}
                  endAngle={endAngle}
                  color={item.color}
                  data={this.state.data}
                  key={'pie' + index}
                />
              );
            })}
          </G>
        </SVG>
        <View style={{ marginTop: 20 }}></View>
      </View>
    );
  }
}
