import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { consolidateData, formatIngredients } from '../utilityFunctions';
import { finalizeIngredients, consolidatingData } from '../store/dishes';
import {
  resetDishnutFromConfirmation,
  resetIngrnutFromConfirmation,
} from '../store/nutrition';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class IngredientConfirmation extends React.Component {
  constructor({ navigation, route }) {
    super();
    this.navigation = navigation;
    this.data = formatIngredients(route.params.data);
    this.resetLocalState = {
      value: '',
      qty: '1',
      measurement: 'oz',
      name: '',
      ingredients: [],
      userAddedIngredients: [],
    };
    this.state = { ...this.resetLocalState };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.fetchNutrition = this.fetchNutrition.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.removeUserAddedItem = this.removeUserAddedItem.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.navigation.addListener('focus', () => {
      this.setState({
        ...this.state,
        ingredients: [...this.data],
      });

      this.props.resetDishnutFromConfirmation({});
      this.props.resetIngrnutFromConfirmation([]);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChangeText(newText) {
    this.setState({ value: newText });
  }

  addIngredient() {
    let addingIngredientClone = { ...this.state };
    const trimmedName = this.state.value.trim();
    addingIngredientClone.userAddedIngredients.push({
      name: trimmedName,
      quantity: this.state.qty,
      measurement: this.state.measurement,
    });
    addingIngredientClone.value = '';
    addingIngredientClone.qty = '1';
    addingIngredientClone.measurement = 'oz';
    this.setState(addingIngredientClone);
  }

  validateInformation() {
    let ingredientsArr = this.state.ingredients;
    let emptyfields = ingredientsArr.filter((obj) => {
      if (obj.quantity === '0' || obj.quantity.length < 1) {
        return true;
      } else {
        return false;
      }
    });

    if (this.state.name === '') {
      alert('Please Enter a Dish Name');
      return false;
    }
    if (emptyfields.length > 0) {
      alert('Please Enter a Quantity for Every Ingredient');
      return false;
    }
    return true;
  }

  async fetchNutrition() {
    if (!this.validateInformation()) {
      return;
    }

    const trimmedDishName = this.state.name.trim();
    await this.props.finalizeIngredients(
      this.state.ingredients,
      this.state.userAddedIngredients,
      trimmedDishName
    );

    const consolidated = await consolidateData(this.props.finalIngredients);
    await this.props.consolidatingData(consolidated);
    this.setState(this.resetLocalState);
    console.log(
      ' navigating away: final ingredients ',
      this.props.finalIngredients
    );
    console.log(
      ' navigating away: consolidated data ',
      this.props.consolidatedData
    );
    console.log(' navigating away: dish-name ', this.props.name);
    return this.navigation.navigate('Your Dish');
  }

  async removeIngredient(index) {
    let ingredientsClone = { ...this.state };
    ingredientsClone.ingredients.splice(index, 1);
    this.setState(ingredientsClone);
  }

  async removeUserAddedItem(index) {
    let userIngredientsClone = { ...this.state };
    userIngredientsClone.userAddedIngredients.splice(index, 1);
    this.setState(userIngredientsClone);
  }

  clearAll() {
    this.setState({ ingredients: [], userAddedIngredients: [] });
  }

  render() {
    const quantTypes = [
      { value: 'oz' },
      { value: 'g' },
      { value: 'cup' },
      { value: 'tbsp' },
      { value: 'mL' },
      { value: 'cans' },
    ];
    return (
      <ScrollView>
        <View>
          <View style={styles.outerContainer}>
            <ImageBackground
              source={require('../assets/images/fruits-yellowred.png')}
              style={styles.image}
            >
              <View style={styles.container}>
                {/* ADD DISH NAME + SUBMIT/CONFIRM INGREDIENTS TO REDIRECT TO DISH SCREEN*/}
                <View style={styles.confirmContainer}>
                  <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>
                      Enter Dish Name (required)
                    </Text>
                  </View>
                  <TextInput
                    style={styles.dishView}
                    placeholder="i.e. Vegan Pasta Salad"
                    value={this.state.name}
                    onChangeText={(text) => {
                      let localStateDish = { ...this.state };
                      localStateDish.name = text;
                      this.setState(localStateDish);
                    }}
                  />
                </View>
                <View style={styles.ingredientsContainer}>
                  {/* API INGREDIENTS ARRAY + USER-ADDED INGREDIENTS ARRAY - BOTH SHOW UNDER "CONFIRM YOUR INGREDIENTS" */}
                  <ScrollView>
                    <View style={styles.headerTextContainer}>
                      <Text style={styles.headerText}>Confirm Ingredients</Text>
                    </View>
                    <View style={styles.innerIngredientContainer}>
                      <Button
                        onPress={this.clearAll}
                        title="Clear All"
                        titleStyle={{
                          color: 'black',
                          fontSize: 11,
                          lineHeight: 15,
                          fontFamily: 'Avenir-Book',
                        }}
                        buttonStyle={{
                          backgroundColor: '#d6d7da',
                          borderRadius: 5,
                          width: 60,
                          padding: -5,
                        }}
                      />
                      <View style={styles.allIngredientContainer}>
                        {this.state.ingredients.map((item, index) => {
                          return (
                            <View
                              key={index}
                              style={styles.individualIngredientView}
                            >
                              <Text style={styles.ingredientName}>
                                {item.name}
                              </Text>
                              <TextInput
                                style={styles.quantityField}
                                placeholder="Enter A Numerical Value"
                                value={item.quantity}
                                onChangeText={(text) => {
                                  let localStateClone = { ...this.state };
                                  localStateClone.ingredients[
                                    index
                                  ].quantity = text;
                                  this.setState(localStateClone);
                                }}
                              />
                              <View>
                                <Picker
                                  itemStyle={styles.dropdowns}
                                  selectedValue={item.measurement}
                                  onValueChange={(value) => {
                                    let localState = { ...this.state };
                                    localState.ingredients[
                                      index
                                    ].measurement = value;
                                    this.setState(localState);
                                  }}
                                >
                                  {quantTypes.map((cateogry, index) => {
                                    return (
                                      <Picker.Item
                                        key={index}
                                        label={cateogry.value}
                                        value={cateogry.value}
                                      />
                                    );
                                  })}
                                </Picker>
                                <View style={styles.icon}>
                                  <Feather
                                    name="chevrons-down"
                                    size={15}
                                    color="black"
                                  />
                                </View>
                              </View>
                              <View style={styles.removeButton}>
                                <Button
                                  onPress={() => {
                                    this.removeIngredient(index);
                                  }}
                                  title="X"
                                  titleStyle={{
                                    color: 'white',
                                    fontSize: 13,
                                    lineHeight: 13,
                                  }}
                                  buttonStyle={{
                                    backgroundColor: 'gray',
                                    borderRadius: 60,
                                    height: 30,
                                    width: 30,
                                    marginLeft: 8,
                                  }}
                                />
                              </View>
                            </View>
                          );
                        })}

                        {this.state.userAddedIngredients.map((item, index) => {
                          return (
                            <View
                              key={index}
                              style={styles.individualIngredientView}
                            >
                              <Text style={styles.ingredientName}>
                                {item.name}
                              </Text>
                              <TextInput
                                style={styles.quantityField}
                                placeholder="Enter A Numerical Value"
                                value={item.quantity}
                                onChangeText={(text) => {
                                  let localUserAddedStateClone = {
                                    ...this.state,
                                  };
                                  localUserAddedStateClone.userAddedIngredients[
                                    index
                                  ].quantity = text;
                                  this.setState(localUserAddedStateClone);
                                }}
                              />
                              <View>
                                <Picker
                                  itemStyle={styles.dropdowns}
                                  selectedValue={item.measurement}
                                  onValueChange={(value) => {
                                    let localState = { ...this.state };
                                    localState.userAddedIngredients[
                                      index
                                    ].measurement = value;
                                    this.setState(localState);
                                  }}
                                >
                                  {quantTypes.map((cateogry, index) => {
                                    return (
                                      <Picker.Item
                                        key={index}
                                        label={cateogry.value}
                                        value={cateogry.value}
                                      />
                                    );
                                  })}
                                </Picker>
                                <View style={styles.icon}>
                                  <Feather
                                    name="chevrons-down"
                                    size={15}
                                    color="black"
                                  />
                                </View>
                              </View>
                              <View style={styles.removeButton}>
                                <Button
                                  onPress={() => {
                                    this.removeUserAddedItem(index);
                                  }}
                                  title="X"
                                  titleStyle={{
                                    color: 'white',
                                    fontSize: 13,
                                    lineHeight: 13,
                                  }}
                                  buttonStyle={{
                                    backgroundColor: 'gray',
                                    borderRadius: 60,
                                    height: 30,
                                    width: 30,
                                    marginLeft: 8,
                                  }}
                                />
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </ScrollView>
                </View>

                {/* USER CAN ADD ADDITIONAL INGREDIENT WITH QTY + MEASUREMENT */}
                <View style={styles.missingContainer}>
                  <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>
                      Missing Any Ingredients?
                    </Text>
                  </View>
                  <View style={styles.ingredientView}>
                    <TextInput
                      style={styles.ingredientInput}
                      placeholder="Your Ingredient"
                      defaultValue={this.state.value}
                      onChangeText={this.handleChangeText}
                    />
                    <TextInput
                      style={styles.quantityField}
                      placeholder="Qty"
                      value={this.state.qty}
                      onChangeText={(text) => {
                        let localStateClone = { ...this.state };
                        localStateClone.qty = text;
                        this.setState(localStateClone);
                      }}
                    />
                    <View>
                      <Picker
                        itemStyle={styles.dropdowns}
                        selectedValue={this.state.measurement}
                        onValueChange={(value) => {
                          let localState = { ...this.state };
                          localState.measurement = value;
                          this.setState(localState);
                        }}
                      >
                        {quantTypes.map((cateogry, index) => {
                          return (
                            <Picker.Item
                              key={index}
                              label={cateogry.value}
                              value={cateogry.value}
                            />
                          );
                        })}
                      </Picker>
                      <View style={styles.icon}>
                        <Feather name="chevrons-down" size={15} color="black" />
                      </View>
                    </View>
                  </View>

                  <Button
                    onPress={this.addIngredient}
                    title="Add to Ingredients"
                    color="#659B0E"
                    titleStyle={{
                      color: 'white',
                      fontSize: 15,
                      lineHeight: 15,
                      fontFamily: 'Avenir-Book',
                    }}
                    buttonStyle={{
                      backgroundColor: '#659B0E',
                      borderRadius: 20,
                      height: 35,
                      width: 150,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      margin: 10,
                    }}
                    disabled={this.state.value.length < 1}
                  />
                </View>
                <View>
                  <Button
                    onPress={this.fetchNutrition}
                    title="All Set! Get Me Nutritional Information"
                    color="green"
                    titleStyle={{
                      color: 'white',
                      fontSize: 15,
                      lineHeight: 15,
                      fontFamily: 'Avenir-Book',
                    }}
                    buttonStyle={{
                      backgroundColor: '#659B0E',
                      borderRadius: 20,
                      height: 35,
                      width: 330,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: 10,
                    }}
                    disabled={this.state.name.length < 1}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapState = (state) => {
  return {
    finalIngredients: state.dishes.finalIngredients,
    consolidatedData: state.dishes.consolidatedData,
    name: state.dishes.name,
  };
};

const mapDispatch = (dispatch) => {
  return {
    finalizeIngredients: (ingredients, userIngredients, name) =>
      dispatch(finalizeIngredients(ingredients, userIngredients, name)),
    consolidatingData: (consolidated) =>
      dispatch(consolidatingData(consolidated)),
    resetDishnutFromConfirmation: (obj) =>
      dispatch(resetDishnutFromConfirmation(obj)),
    resetIngrnutFromConfirmation: (arr) =>
      dispatch(resetIngrnutFromConfirmation(arr)),
  };
};

export default connect(mapState, mapDispatch)(IngredientConfirmation);

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#FFF81490',
    height: height,
    width: width,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'flex-start',
    alignItems: 'center',
    opacity: 0.9,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF80',
    opacity: 1,
    height: 750,
    width: 370,
    borderRadius: 10,
    marginTop: 25,
  },
  confirmContainer: {
    borderRadius: 10,
    width: 350,
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 10,
  },
  ingredientsContainer: {
    borderRadius: 10,
    width: 350,
    height: 380,
    backgroundColor: 'white',
    margin: 10,
  },
  innerIngredientContainer: {
    flexDirection: 'column',
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: 'Avenir-Book',
    backgroundColor: 'white',
  },
  allIngredientContainer: {
    flexDirection: 'column',
  },
  individualIngredientView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  missingContainer: {
    borderRadius: 10,
    width: 350,
    backgroundColor: 'white',
    margin: 10,
  },
  ingredientView: {
    flexDirection: 'row',
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: 'Avenir-Book',
  },
  dishView: {
    flexDirection: 'row',
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: 'Avenir-Book',
  },
  ingredientName: {
    width: 165,
    padding: 3,
    fontSize: 15,
    fontFamily: 'Avenir-Book',
  },
  ingredientInput: {
    width: 185,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 3,
    fontSize: 15,
    fontFamily: 'Avenir-Book',
    height: 38.2,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 15,
  },
  removeButton: {
    fontSize: 10,
    // marginTop: 5,
    // marginLeft: 10,
  },
  headerText: {
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 18,
  },
  headerTextContainer: {
    backgroundColor: '#659B0E',
    opacity: 0.8,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  quantityField: {
    width: 50,
    height: 38.2,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    padding: 5,
  },
  dropdowns: {
    height: 39,
    width: 80,
    fontSize: 16,
    color: 'black',
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
  },
});
