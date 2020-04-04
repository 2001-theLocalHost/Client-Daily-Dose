import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import {
  fetchDishes,
  fetchIngreInfo,
  depositDishInfo,
  removeDish,
} from "../store/mealdiary";
import {
  updateIngrNut,
  updateDishNut,
  ingredientNamesFromMealDiary,
} from "../store/nutrition";
import { consolidatingDataFromMealDiary } from "../store/dishes";
import { connect } from "react-redux";
import CalendarModal from "../components/CalendarModal";
import Icon from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Moment from 'moment';



class MealDiary extends React.Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {
      date: new Date(),
      formattedDate: "",
      momentDate: '',
      dateModalOpen: false,
    };
    this.addDate = this.addDate.bind(this);
    this.showDateModal = this.showDateModal.bind(this);
    this.closeDateModal = this.closeDateModal.bind(this);
    this.getDishes = this.getDishes.bind(this);
    this.seeDishInfo = this.seeDishInfo.bind(this);
    this.removeDish = this.removeDish.bind(this);
    this.formattedCalendarDate = this.formattedCalendarDate.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.navigation.addListener("focus", () => {
      const newDate = new Date();
      this.props.fetchDishes(newDate);
      this.formattedCalendarDate(newDate);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // Updates date on local state based on date selected
  addDate(date) {
    this.setState({
      date: date,
    });
  }

  showDateModal() {
    this.setState({
      dateModalOpen: true,
    });
  }

  closeDateModal() {
    this.setState({
      dateModalOpen: false,
    });

    this.formattedCalendarDate(this.state.date);
    this.getDishes();
  }

  // Dispatches fetchDishes to query dishes by specified date
  async getDishes() {
    await this.props.fetchDishes(this.state.date);
    this.formattedCalendarDate(this.state.date);
  }

  handlePrice = () => {
    if (!this.pressed) {
      this.pressed = true;
      this.setState({ price: this.state.price - 2000 });
    }
  };

  async seeDishInfo(dishObj) {
    //Dispatch a thunk to retrieve the Dish Data Object from backend - once Dish Data Object state is updated, navigate to DishScreen.js
    let dishId = dishObj.dishId;
    console.log("GOT TO SEEDISHINFO, ", dishId);
    await this.props.fetchIngreInfo(dishId); //goes to thunk in mealdiary

    await this.props.updateIngrNut(this.props.ingreArrayInfo); //goes to action creator in nutrition with the ingredientarray info
    await this.props.updateDishNut(dishObj.dish); //goes to action creator in nutrition with the dish info

    //creating finalIngrString
    let consolidatedStringOfIngredients = this.props.ingrNut.map((element) => {
      let stringified = `${element.portionSize} ${element.ingredientName}`;
      return stringified;
    });

    //create array of ingredient names
    let arrayOfIngrNames = this.props.ingrNut.map((obj) => {
      return obj.ingredientName;
    });
    await this.props.ingredientNamesFromMealDiary(arrayOfIngrNames);
    await this.props.consolidatingDataFromMealDiary(
      consolidatedStringOfIngredients
    );

    return this.navigation.navigate("Your Dish");
  }

  async removeDish(dishObj) {
    let id = dishObj.id;
    await this.props.removeDish(id);
  }

  formattedCalendarDate(providedDate) {
    let newDate = Moment(providedDate).format('MMMM Do, YYYY')
    this.setState({
      formattedDate: newDate,
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.outerContainer}>
          {/* CALENDAR, SUBMIT DATE  */}
          <CalendarModal
            addDate={this.addDate}
            closeDateModal={this.closeDateModal}
            isVisible={this.state.dateModalOpen}
            date={this.state.date}
          />
          <View style={styles.calendarButton}>
            <Button
              icon={<Icon name="calendar" size={50} color="gray" />}
              buttonStyle={{
                backgroundColor: "transparent",
                marginTop: 60,
                flexDirection: "column",
              }}
              title="Select Date"
              titleStyle={{
                color: "black",
                fontSize: 11,
                lineHeight: 15,
              }}
              onPress={this.showDateModal}
            />
          </View>
          <View style={styles.date}>
            <Text style={styles.mainHeader}>
              Meals for {this.state.formattedDate}
            </Text>
          </View>
          {/* BREAKFAST VIEW */}
          <View style={styles.mealContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Breakfast</Text>
            </View>
            <View style={styles.wholeDishView}>
            {this.props.breakfast.length < 1 ? <Text style={styles.noFoodText}>No Breakfast</Text> : <View>{this.props.breakfast.map((dish, index) => {
                return (
                  <View key={index} style={styles.individualDishView}>
                    <View style={styles.dishNameContainer}>
                    <Text
                      style={styles.dishName}
                      onPress={() => {
                        this.seeDishInfo(dish);
                      }}
                    >
                      {dish.dish.name}
                    </Text>
                    </View>
                    <View style={styles.removeButton}>
                    <Button
                        onPress={() => {
                          this.removeDish(dish);
                        }}
                        icon={<Feather name='x-circle'size='18' color='gray'/>}
                        buttonStyle={styles.buttonStyle}
                        />
                    </View>
                  </View>
                );
              })}</View>}
            </View>
          </View>

          {/* LUNCH VIEW */}
          <View style={styles.mealContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Lunch</Text>
            </View>
            <View style={styles.wholeDishView}>
            {this.props.lunch.length < 1 ? <Text style={styles.noFoodText}>No Lunch</Text> : <View>{this.props.lunch.map((dish, index) => {
                return (
                  <View key={index} style={styles.individualDishView}>
                    <View style={styles.dishNameContainer}>
                    <Text
                      style={styles.dishName}
                      onPress={() => {
                        this.seeDishInfo(dish);
                      }}
                    >
                      {dish.dish.name}
                    </Text>
                    </View>
                    <View style={styles.removeButton}>
                    <Button
                        onPress={() => {
                          this.removeDish(dish);
                        }}
                        icon={<Feather name='x-circle'size='18' color='gray'/>}
                        buttonStyle={styles.buttonStyle}
                        />
                    </View>
                  </View>
                );
              })}</View>}
            </View>
          </View>

          {/* DINNER VIEW */}
          <View style={styles.mealContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Dinner</Text>
            </View>
            <View style={styles.wholeDishView}>
            {this.props.dinner.length < 1 ? <Text style={styles.noFoodText}>No Dinner</Text> : <View>{this.props.dinner.map((dish, index) => {
                return (
                  <View key={index} style={styles.individualDishView}>
                    <View style={styles.dishNameContainer}>
                    <Text
                      style={styles.dishName}
                      onPress={() => {
                        this.seeDishInfo(dish);
                      }}
                    >
                      {dish.dish.name}
                    </Text>
                    </View>
                    <View style={styles.removeButton}>
                    <Button
                        onPress={() => {
                          this.removeDish(dish);
                        }}
                        icon={<Feather name='x-circle'size='18' color='gray'/>}
                        buttonStyle={styles.buttonStyle}
                        />
                    </View>
                  </View>
                );
              })}</View>}
            </View>
          </View>

          {/* SNACK VIEW */}
          <View style={styles.mealContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Snack</Text>
            </View>
            <View style={styles.wholeDishView}>
              {this.props.snack.length < 1 ? <Text style={styles.noFoodText}>No Snacks</Text> : <View>{this.props.snack.map((dish, index) => {
                return (
                  <View key={index} style={styles.individualDishView}>
                    <View style={styles.dishNameContainer}>
                    <Text
                      style={styles.dishName}
                      onPress={() => {
                        this.seeDishInfo(dish);
                      }}
                    >
                      {dish.dish.name}
                    </Text>
                    </View>
                    <View style={styles.removeButton}>
                      <Button
                        onPress={() => {
                          this.removeDish(dish);
                        }}
                        icon={<Feather name='x-circle'size='18' color='gray'/>}
                        buttonStyle={styles.buttonStyle}
                        />
                    </View>
                  </View>
                );
              })}</View>}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapState = (state) => {
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

const mapDispatch = (dispatch) => {
  return {
    fetchDishes: (date) => dispatch(fetchDishes(date)),
    fetchIngreInfo: (dishId) => dispatch(fetchIngreInfo(dishId)),
    depositDishInfo: (dish) => dispatch(depositDishInfo(dish)),
    updateIngrNut: (ingrNutritionMealDiary) =>
      dispatch(updateIngrNut(ingrNutritionMealDiary)),
    updateDishNut: (dishNutritionMealDiary) =>
      dispatch(updateDishNut(dishNutritionMealDiary)),
    consolidatingDataFromMealDiary: (strings) =>
      dispatch(consolidatingDataFromMealDiary(strings)),
    ingredientNamesFromMealDiary: (ingredientNames) =>
      dispatch(ingredientNamesFromMealDiary(ingredientNames)),
    removeDish: (id) => dispatch(removeDish(id)),
  };
};

export default connect(mapState, mapDispatch)(MealDiary);

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#ECECEC',
    height: height,
    width: width,
    alignItems: 'center',
  },
  calendarButton: {

  },
  date: {

  },
  mealContainer: {
    borderRadius: 10,
    width: 350,
    backgroundColor: '#ffffff90',
    margin: 7
  },
  headerContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontWeight: "bold",
    backgroundColor: "#659B0E",
    padding: 5,
    color: "white",
    fontFamily: "Avenir-Book",
  },
  headerText: {
    backgroundColor: "#659B0E",
    padding: 5,
    color: "white",
    fontFamily: "Avenir-Roman",
    fontSize: 20
  },
  wholeDishView: {
    padding: 10
  },
  individualDishView: {
    flexDirection: "row",
    height: 35,
    marginTop: 7,
    alignItems: 'center'
  },
  dishNameContainer: {
    width: 295
  },
  dishName: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    color: "#ff7f4b",
    fontFamily: "Avenir-Book",
    fontSize: 17,
  },
  mainHeader: {
    padding: 15,
    marginTop: 0,
    color: "black",
    fontSize: 24,
    fontFamily: "Avenir-Book",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonStyle: {
    backgroundColor: "#ffffff00",
    borderRadius: 30,
    height: 40,
    width: 40,
  },
  noFoodText: {
    width: 300,
    color: "black",
    fontFamily: "Avenir-Book",
    fontSize: 15
  }
});
