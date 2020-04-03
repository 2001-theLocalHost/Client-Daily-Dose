import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { finalData, startData, capitalize } from '../utilityFunctions';
import { female25to35inMG } from '../goals';
import AnimatedPie from './Graph-Pieces/AnimatedPie';
import AnimatedPieLabel from './Graph-Pieces/AnimatedPieLabel';
import TotalNutrientsBar from './Graph-Pieces/TotalNutrientsBar';
import TabBarIcon from './TabBarIcon';

export default class CurrentIngredient extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { ingrNut } = this.props;

    if (!this.props.ingrNut || !this.props.ingrNut.ingredientName) {
      return (
        <View>
          <Text>Loading....</Text>
        </View>
      );
    } else {
      let finalDataForStackGraph = finalData(ingrNut, female25to35inMG);
      let startDataForStackGraph = startData(ingrNut, female25to35inMG);

      return (
        <ScrollView>
          <Button
            title="Go Back To Main Dish"
            onPress={() => this.props.jumpTo('Dish')}
            color="#659B0E"
            titleStyle={{
              color: 'white',
              fontSize: 15,
              lineHeight: 15,
            }}
            buttonStyle={{
              backgroundColor: '#FF7F4B',
              opacity: 0.7,
              borderRadius: 20,
              height: 35,
              width: 190,
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 10,
            }}
          />
          <View>
            <Text style={styles.head}>
              {ingrNut.ingredientName}
            </Text>

            <View style={styles.iconContainer}>
              <View style={styles.squareIcon}>
                <TabBarIcon icon="ionicons" name="ios-square" />
              </View>
              <Text style={styles.ingrlist}>
                Portion Size: {ingrNut.portionSize}
              </Text>
            </View>

            <View>
              {ingrNut.healthLabels ? (
                <View style={styles.healthLabels}>
                  <Text style={styles.title}>Health Labels:</Text>
                  <View style={styles.listContainer}>
                    {ingrNut.healthLabels.map((el, ind) => {
                      return (
                        <View
                          key={ind.toString() + Math.random().toString()}
                          style={styles.listInnerContainer}
                        >
                          <Text
                            style={styles.list}
                            key={ind.toString() + Math.random().toString()}
                          >
                            {el ? capitalize(el.toLowerCase()) : ''}
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
                <Text style={styles.ingrlist}>{ingrNut.calories} kCal</Text>
              </View>

              <View style={styles.pieGraph}>
                <AnimatedPie
                  carbs={ingrNut.CHOCDF_KCAL}
                  fat={ingrNut.FAT_KCAL}
                  protein={ingrNut.PROCNT_KCAL}
                />
                <AnimatedPieLabel
                  carbs={ingrNut.CHOCDF_KCAL}
                  fat={ingrNut.FAT_KCAL}
                  protein={ingrNut.PROCNT_KCAL}
                />
              </View>
            </View>
          </View>

          <View style={styles.barGraph}>
            <Text style={styles.totalTitle}>Total Nutrients:</Text>
            <Text style={styles.description}>
              Below % represents the nutritional intake reached by the dish
              based on daily recommendation
            </Text>
            <TotalNutrientsBar
              data={finalDataForStackGraph}
              startData={startDataForStackGraph}
            />
          </View>
        </ScrollView>
      );
    }
  }
}

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
  description: {
    fontSize: 12,
    marginLeft: 9,
    marginRight: 11,
    marginBottom: 10,
    width: 350,
    color: '#696969',
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
