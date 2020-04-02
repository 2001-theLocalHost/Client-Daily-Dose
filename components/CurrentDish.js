import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import {
  arraysOfData,
  finalData,
  startData,
  capitalize,
} from '../utilityFunctions';
import { female25to35inMG } from '../goals';
import AnimatedPie from './Graph-Pieces/AnimatedPie';
import AnimatedPieLabel from './Graph-Pieces/AnimatedPieLabel';
import TotalDailyBar from './Graph-Pieces/TotalDailyBar';
import TotalNutrientsBar from './Graph-Pieces/TotalNutrientsBar';
import TabBarIcon from './TabBarIcon';

class CurrentDish extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { dishNut } = this.props;

    if (!this.props.dishNut || !this.props.dishNut.name) {
      return (
        <View>
          <Text>Loading....</Text>
        </View>
      );
    } else {
      let finalDataForStackGraph = finalData(dishNut, female25to35inMG);
      let startDataForStackGraph = startData(dishNut, female25to35inMG);

      return (
        <ScrollView>
          <View>
            <Button title="Save Meal" onPress={this.props.onPress} />
          </View>

          <View>
            <View>
              <Text style={styles.head}>{capitalize(dishNut.name)}</Text>
              {this.props.finalIngrStr.map((el, index) => {
                return (
                  <View style={styles.iconContainer}>
                    <View style={styles.squareIcon}>
                      <TabBarIcon icon="ionicons" name="ios-square" />
                    </View>
                    <Text key={index} style={styles.ingrlist}>
                      {el}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View>
              <Image source={{ uri: dishNut.imgUrl }} style={styles.image} />
            </View>

            <View>
              {dishNut.healthLabels ? (
                <View style={styles.healthLabels}>
                  <Text style={styles.title}>Health Labels:</Text>
                  <View style={styles.listContainer}>
                    {dishNut.healthLabels.map((el, index) => {
                      return (
                        <View style={styles.listInnerContainer}>
                          <Text style={styles.list} key={index}>
                            {capitalize(el.toLowerCase())}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.graph}>
            <View style={styles.pieGraphContainer}>
              <Text style={styles.totalTitle}>Total Calories:</Text>
              <View style={styles.iconContainer}>
                <View style={styles.squareIcon}>
                  <TabBarIcon icon="ionicons" name="ios-square" />
                </View>
                <Text style={styles.ingrlist}>{dishNut.calories} kCal</Text>
              </View>

              <View style={styles.pieGraph}>
                <AnimatedPie
                  carbs={dishNut.CHOCDF_KCAL}
                  fat={dishNut.FAT_KCAL}
                  protein={dishNut.PROCNT_KCAL}
                />
                <AnimatedPieLabel
                  carbs={dishNut.CHOCDF_KCAL}
                  fat={dishNut.FAT_KCAL}
                  protein={dishNut.PROCNT_KCAL}
                />
              </View>
            </View>
          </View>

          <View style={styles.barGraph}>
            <Text style={styles.totalTitle}>Total Nutrients:</Text>
            <TotalNutrientsBar
              data={finalDataForStackGraph}
              startData={startDataForStackGraph}
            />
          </View>

          {console.log('this is final data', finalDataForStackGraph)}

          {/* <View style={styles.barGraph}>
              <Text style={styles.title}>TOTAL DAILY %:</Text>
              <TotalDailyBar
                label={totalDailyLabels}
                quantity={totalDailyQuantities}
                unit={totalDailyUnits}
              />
            </View> */}
        </ScrollView>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  createDish: (dishNut, formValues, ingredientArray) => {
    dispatch(createDish(dishNut, formValues, ingredientArray));
  },
});

export default connect(null, mapDispatchToProps)(CurrentDish);

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  head: {
    fontSize: 30,
    fontFamily: 'avenir-book',
    fontWeight: 'bold',
    width: width,
    marginLeft: 7,
    marginTop: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'avenir-book',
    marginLeft: 5,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  squareIcon: {
    width: 6,
    height: 8,
    marginLeft: 10,
  },
  ingrlist: {
    marginLeft: 5,
    fontFamily: 'avenir-book',
  },
  image: {
    marginTop: 17,
    width: width,
    height: 300,
  },
  healthLabels: {
    marginTop: 20,
    marginLeft: 4,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  list: {
    fontSize: 13,
    fontFamily: 'avenir-book',
    backgroundColor: '#659B0E',
    color: 'white',
    margin: 5,
    padding: 8,
    paddingLeft: 9,
    width: 110,
    height: 35,
  },
  totalTitle: {
    fontSize: 20,
    fontFamily: 'avenir-book',
    marginLeft: 8,
  },
  pieGraphContainer: {
    marginTop: 40,
  },
  pieGraph: {
    flexDirection: 'row',
  },
  barGraph: {
    marginBottom: 15,
    width: 500,
  },
});
