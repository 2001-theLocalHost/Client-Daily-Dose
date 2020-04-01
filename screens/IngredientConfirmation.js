import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
} from 'react-native';
import {Button, Icon} from 'react-native-elements'
import { Feather } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { consolidateData, formatIngredients } from '../utilityFunctions';
import { finalizeIngredients, consolidatingData } from '../store/dishes';
import { resetDishnutFromConfirmation, resetIngrnutFromConfirmation } from '../store/nutrition'

class IngredientConfirmation extends React.Component {
  constructor({ navigation, route }) {
    super();
    this.navigation = navigation;
    this.data = formatIngredients(route.params.data)
    this.state = {
      value: '',
      qty:'1',
      measurement:'oz',
      name: '',
      ingredients: [{ name: 'Vegetables', quantity: '1', measurement: 'oz' }],
      userAddedIngredients: [],
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.fetchNutrition = this.fetchNutrition.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.removeUserAddedItem = this.removeUserAddedItem.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.navigation.addListener('focus', () => {
      this.setState({
        ...this.state,
        ingredients: this.data,
      });

      this.props.resetDishnutFromConfirmation({})
      this.props.resetIngrnutFromConfirmation([])
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  handleChangeText(newText) {
    this.setState({ value: newText });
  }

  addIngredient() {
    let addingIngredientClone = { ...this.state };
    addingIngredientClone.userAddedIngredients.push({
      name: this.state.value,
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
    let emptyfields = ingredientsArr.filter(obj => {
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
    await this.props.finalizeIngredients(
      this.state.ingredients,
      this.state.userAddedIngredients,
      this.state.name
    );

    const consolidated = await consolidateData(this.props.finalIngredients);
    await this.props.consolidatingData(consolidated);
    let resetLocalState = {
      value: '',
      name: '',
      ingredients: [{ name: '', quantity: '1', measurement: 'oz' }],
      userAddedIngredients: [],
    }
    this.setState(resetLocalState)
    return this.navigation.navigate('Dishes');
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

  render() {
    const quantTypes = [{ value: 'oz' }, { value: 'g' }, { value: 'cup' }, { value: 'tbsp' }, { value: 'mL' }, { value: 'cans' }];
    return (
      <ScrollView>
        <View>
        {/* API INGREDIENTS ARRAY + USER-ADDED INGREDIENTS ARRAY - BOTH SHOW UNDER "CONFIRM YOUR INGREDIENTS" */}
          <Text style={styles.headerText}>Confirm Your Ingredients:</Text>
          {this.state.ingredients.map((item, index) => {
            return (
              <View key={index} style={styles.ingredientView}>
                <Text style={styles.ingredientName}>{item.name}</Text>
                <TextInput
                  style={styles.quantityField}
                  placeholder="Enter A Numerical Value"
                  value={item.quantity}
                  onChangeText={text => {
                    let localStateClone = { ...this.state };
                    localStateClone.ingredients[index].quantity = text;
                    this.setState(localStateClone);
                  }}
                />
                <View>
                <Picker
                  style={styles.dropdowns}
                  itemStyle={{ height: 45 }}
                  selectedValue={item.measurement}
                  onValueChange={value => {
                    let localState = { ...this.state };
                    localState.ingredients[index].measurement = value;
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
                <View style={styles.icon}><Feather name="chevrons-down" size={15} color="black" /></View>
                </View>
                <View style={styles.removeButton}>
                <Button
                  onPress={() => {
                    this.removeIngredient(index);
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
                    width: 30
                  }}
                />
              </View>
              </View>
            );
          })}

          {this.state.userAddedIngredients.map((item, index) => {
            return (
              <View key={index} style={styles.ingredientView}>
                <Text style={styles.ingredientName}>{item.name}</Text>
                <TextInput
                  style={styles.quantityField}
                  placeholder="Enter A Numerical Value"
                  value={item.quantity}
                  onChangeText={text => {
                    let localUserAddedStateClone = { ...this.state };
                    localUserAddedStateClone.userAddedIngredients[
                      index
                    ].quantity = text;
                    this.setState(localUserAddedStateClone);
                  }}
                />
                <View>
                <Picker
                  style={styles.dropdowns}
                  itemStyle={{ height: 45 }}
                  selectedValue={item.measurement}
                  onValueChange={value => {
                    let localState = { ...this.state };
                    localState.userAddedIngredients[index].measurement = value;
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
                <View style={styles.icon}><Feather name="chevrons-down" size={15} color="black" /></View>
                </View>
                <View style={styles.removeButton}>
                <Button
                  onPress={() => {
                    this.removeIngredient(index);
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
                    width: 30
                  }}
                />
              </View>
              </View>
            );
          })}
        </View>

        {/* USER CAN ADD ADDITIONAL INGREDIENT WITH QTY + MEASUREMENT */}
        <View style={styles.addItem}>
          <Text style={styles.headerText}>Missing Any Ingredients?</Text>
          <View style={styles.ingredientView}>
          <TextInput
            style={styles.ingredientInput}
            placeholder="Your Ingredient"
            defaultValue={this.state.value}
            onChangeText={this.handleChangeText}
          />
                <TextInput
                  style={styles.quantityField}
                  placeholder="Enter A Numerical Value"
                  value={this.state.qty}
                  onChangeText={text => {
                    let localStateClone = { ...this.state };
                    localStateClone.qty = text;
                    this.setState(localStateClone);
                  }}
                />
                <View>
                <Picker
                  style={styles.dropdowns}
                  itemStyle={{ height: 45 }}
                  selectedValue={this.state.measurement}
                  onValueChange={value => {
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
                <View style={styles.icon}><Feather name="chevrons-down" size={15} color="black" /></View>
                </View>
              </View>

              <Button onPress={this.addIngredient} title="Add To Ingredients" color="#659B0E" 
                titleStyle={{
                  color: "white",
                  fontSize: 15,
                  lineHeight: 15  
                }}
                buttonStyle={{
                  backgroundColor: "#659B0E",
                  borderRadius: 20,
                  height: 35,
                  width: 150,
                  justifyContent: "center",
                  alignSelf: "center",
                  marginTop: 25
                }}
                disabled={this.state.value.length < 1}
              />
        </View>

         {/* ADD DISH NAME + SUBMIT/CONFIRM INGREDIENTS TO REDIRECT TO DISH SCREEN*/}
        <View style={styles.addItem}>
          <Text style={styles.headerText}>Confirm Name Of Dish (Required):</Text>
          <TextInput
            style={styles.ingredientView}
            placeholder="i.e. Vegan Pasta Salad"
            value={this.state.name}
            onChangeText={text => {
              let localStateDish = { ...this.state };
              localStateDish.name = text;
              this.setState(localStateDish);
            }}
          />
        </View>

        <View style={styles.addItem}>
          <Button
            onPress={this.fetchNutrition}
            title="All Set! Get Me Nutritional Information"
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
              width: 350,
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 25,
              marginBottom: 500
            }}
            disabled={this.state.name.length < 1}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    finalIngredients: state.dishes.finalIngredients,
    consolidatedData: state.dishes.consolidatedData,
    name: state.dishes.name
  };
};

const mapDispatch = dispatch => {
  return {
    finalizeIngredients: (ingredients, userIngredients, name) =>
      dispatch(finalizeIngredients(ingredients, userIngredients, name)),
    consolidatingData: consolidated =>
      dispatch(consolidatingData(consolidated)),
    resetDishnutFromConfirmation: obj =>
      dispatch(resetDishnutFromConfirmation(obj)),
    resetIngrnutFromConfirmation: arr =>
      dispatch(resetIngrnutFromConfirmation(arr))
  };
};


export default connect(mapState, mapDispatch)(IngredientConfirmation);


const styles = StyleSheet.create({
  ingredientView: {
    flexDirection: 'row',
    marginTop: 25,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  ingredientName: {
    width: 185,
    // borderWidth: 0.5,
    // borderColor: '#d6d7da',
    paddingTop: 12,
    fontSize: 15
  },
  ingredientInput: {
    width: 185,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    paddingTop: 12,
    fontSize: 15
  },
  icon:{
    position: 'absolute',
    right:0,
    top:15
  },
  removeButton:{
    fontSize:10,
    marginTop:5,
    marginLeft:10
  },
  quantityField: {
    width: 30,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  dropdowns: {
    width: 100,
  },
  headerText: {
    // fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#659B0E',
    padding: 10,
    marginTop: 25,
    fontFamily: 'Arial'
  },
});

