import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Linking,
  TextInput,
  Picker,
} from 'react-native';
import {Button} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import {
  fetchDishes,
  fetchIngreInfo,
  depositDishInfo,
  removeDish
} from '../store/mealdiary';
import {
  updateIngrNut,
  updateDishNut,
  ingredientNamesFromMealDiary,
} from '../store/nutrition';
import { consolidatingDataFromMealDiary } from '../store/dishes';
import { connect } from 'react-redux';
import CalendarView from '../components/CalendarView';

class MealDiary extends React.Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {
      date: '',
      formattedDate: '',
    };
    this.addDate = this.addDate.bind(this);
    this.getDishes = this.getDishes.bind(this);
    this.seeDishInfo = this.seeDishInfo.bind(this);
    this.removeDish = this.removeDish.bind(this)
    this.formattedCalendarDate = this.formattedCalendarDate.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = this.navigation.addListener('focus', () => {
      const newDate = new Date()
      this.props.fetchDishes(newDate)
      this.formattedCalendarDate(newDate)
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  // Updates date on local state based on date selected
  addDate(date) {
    this.setState({
      date: date,
    });
  }

  // Dispatches fetchDishes to query dishes by specified date
  async getDishes() {
   await this.props.fetchDishes(this.state.date);
   this.formattedCalendarDate(this.state.date)
  }

  async seeDishInfo(dishObj) {
    //Dispatch a thunk to retrieve the Dish Data Object from backend - once Dish Data Object state is updated, navigate to DishScreen.js
    let dishId = dishObj.dishId;
    console.log('GOT TO SEEDISHINFO, ', dishId)
    await this.props.fetchIngreInfo(dishId); //goes to thunk in mealdiary

    await this.props.updateIngrNut(this.props.ingreArrayInfo); //goes to action creator in nutrition with the ingredientarray info
    await this.props.updateDishNut(dishObj.dish); //goes to action creator in nutrition with the dish info

    //creating finalIngrString
    let consolidatedStringOfIngredients = this.props.ingrNut.map(element => {
      let stringified = `${element.portionSize} ${element.ingredientName}`;
      return stringified;
    });

    //create array of ingredient names
    let arrayOfIngrNames = this.props.ingrNut.map(obj => {
      return obj.ingredientName;
    });
    await this.props.ingredientNamesFromMealDiary(arrayOfIngrNames);
    await this.props.consolidatingDataFromMealDiary(
      consolidatedStringOfIngredients
    );

    return this.navigation.navigate('Your Dish');
  }

  async removeDish (dishObj) {
    let id = dishObj.id
    await this.props.removeDish(id)
  }

  formattedCalendarDate(providedDate) {
    const date = providedDate
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const string = month + '-' +  day+ '-' + year;
    this.setState({
      formattedDate: string
    })
  }

  render() {
    return (
      <ScrollView>
        <View>
          
          {/* CALENDAR, SUBMIT DATE  */}
          <View>
            <CalendarView addDate={this.addDate} />
          </View>
          {this.state.date !== '' &&
            <View >
            <Button
              onPress={this.getDishes}
              title="Submit"
              color="green"
              titleStyle={{
                color: "white",
                fontSize: 15,
                lineHeight: 15  
              }}
              buttonStyle={{
                backgroundColor: "#659B0E",
                borderRadius: 20,
                height: 35,
                width: 100,
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 25,
                marginBottom: 10
              }}
            />
            </View>}
            <Text style={styles.mainHeader}>MEALS FOR {this.state.formattedDate}</Text>
          {/* BREAKFAST VIEW */}
          <Text style={styles.BreakfastHeaderText}>Breakfast</Text>
          {this.props.breakfast.map((dish, index) => {
            return (
              <View key={index} style={styles.dishView}>
                <Text
                  style={styles.dishName}
                  onPress={() => {
                    this.seeDishInfo(dish);
                  }}
                >
                  {dish.dish.name}
                </Text>
                <View style={styles.removeButton}>
                <Button
                  onPress={() => {
                    this.removeDish(dish);
                  }}
                  title="X"
                  titleStyle={{
                      color: "white",
                      fontSize: 15,
                      lineHeight: 15  
                    }}
                  buttonStyle={{
                    backgroundColor: "gray",
                    borderRadius: 60,
                    height: 30,
                    width: 30,
                    marginTop:-10
                  }}
                />
              </View>
              </View>
            );
          })}

          {/* LUNCH VIEW */}
          <Text style={styles.headerText}>Lunch</Text>
          {this.props.lunch.map((dish, index) => {
            return (
              <View key={index} style={styles.dishView}>
                <Text
                  style={styles.dishName}
                  onPress={() => {
                    this.seeDishInfo(dish);
                  }}
                >
                  {dish.dish.name}
                </Text>
                <View style={styles.removeButton}>
                <Button
                  onPress={() => {
                    this.removeDish(dish);
                  }}
                  title="X"
                  titleStyle={{
                      color: "white",
                      fontSize: 15,
                      lineHeight: 15  
                    }}
                  buttonStyle={{
                    backgroundColor: "gray",
                    borderRadius: 60,
                    height: 30,
                    width: 30,
                    marginTop:-10
                  }}
                />
              </View>
              </View>
            );
          })}

          {/* DINNER VIEW */}
          <Text style={styles.headerText}>Dinner</Text>
          {this.props.dinner.map((dish, index) => {
            return (
              <View key={index} style={styles.dishView}>
                <Text
                  style={styles.dishName}
                  onPress={() => {
                    this.seeDishInfo(dish);
                  }}
                >
                  {dish.dish.name}
                </Text>
                <View style={styles.removeButton}>
                <Button
                  onPress={() => {
                    this.removeDish(dish);
                  }}
                  title="X"
                  titleStyle={{
                      color: "white",
                      fontSize: 15,
                      lineHeight: 15  
                    }}
                  buttonStyle={{
                    backgroundColor: "gray",
                    borderRadius: 60,
                    height: 30,
                    width: 30,
                    marginTop:-10
                  }}
                />
              </View>
              </View>
            );
          })}

          {/* SNACK VIEW */}
          <Text style={styles.headerText}>Snack</Text>
          {this.props.snack.map((dish, index) => {
            return (
              <View key={index} style={styles.dishView}>
                <Text
                  style={styles.dishName}
                  onPress={() => {
                    this.seeDishInfo(dish);
                  }}
                >
                  {dish.dish.name}
                </Text>
                <View style={styles.removeButton}>
                <Button
                  onPress={() => {
                    this.removeDish(dish);
                  }}
                  title="X"
                  titleStyle={{
                      color: "white",
                      fontSize: 15,
                      lineHeight: 15  
                    }}
                  buttonStyle={{
                    backgroundColor: "gray",
                    borderRadius: 60,
                    height: 30,
                    width: 30,
                    marginTop:-10
                  }}
                />
              </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    breakfast: state.mealdiary.breakfast,
    lunch: state.mealdiary.lunch,
    dinner: state.mealdiary.dinner,
    snack: state.mealdiary.snack,
    ingreArrayInfo: state.mealdiary.ingreArrayInfo,
    dishInfo: state.mealdiary.dishInfo,
    dishNut: state.nutrition.dishNut,
    ingrNut: state.nutrition.ingrNut,
    ingredientNames: state.nutrition.ingredientNames,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchDishes: date => dispatch(fetchDishes(date)),
    fetchIngreInfo: dishId => dispatch(fetchIngreInfo(dishId)),
    depositDishInfo: dish => dispatch(depositDishInfo(dish)),
    updateIngrNut: ingrNutritionMealDiary =>
      dispatch(updateIngrNut(ingrNutritionMealDiary)),
    updateDishNut: dishNutritionMealDiary =>
      dispatch(updateDishNut(dishNutritionMealDiary)),
    consolidatingDataFromMealDiary: strings =>
      dispatch(consolidatingDataFromMealDiary(strings)),
    ingredientNamesFromMealDiary: ingredientNames =>
      dispatch(ingredientNamesFromMealDiary(ingredientNames)),
    removeDish: id =>
      dispatch(removeDish(id))
  };
};

export default connect(mapState, mapDispatch)(MealDiary);

const styles = StyleSheet.create({
  dishView: {
    flexDirection: 'row',
    height: 25,
    marginTop: 15,
    padding: 5,
  },
  ingredientName: {
    width: 180,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    paddingTop: 12,
    paddingLeft: 20
  },
  dishName: {
    width: 300,
    color:'blue',
    fontFamily: 'Avenir-Book',
    paddingBottom: 30
  },
  addDishField: {
    marginTop: 15,
    height: 25,
  },
  dropdowns: {
    width: 150,
  },
  headerText: {
    fontWeight: 'bold',
    backgroundColor: '#659B0E',
    padding: 10,
    marginTop: 25,
    color: 'white',
    fontFamily: 'Avenir-Book'
  },
  BreakfastHeaderText: {
    fontWeight: 'bold',
    backgroundColor: '#659B0E',
    padding: 10,
    color: 'white',
    fontFamily: 'Avenir-Book'
  },
  mainHeader: {
    fontWeight: 'bold',
    padding: 10,
    marginTop: 25,
    color: 'black',
    fontSize: 15,
    fontFamily: 'Avenir-Book',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  removeButton:{
    fontSize:10,
    marginTop:5,
    marginLeft: 20
  },
});
