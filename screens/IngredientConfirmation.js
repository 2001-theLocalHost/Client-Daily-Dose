import React from 'react'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Picker } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { addIngredientByUser, finalizeIngredients, fetchNutrition, removeIngredient, removeUserAddedItem } from '../redux/dishes'
//import { Redirect } from 'react-router';

class IngredientConfirmation extends React.Component {
    constructor() {
        super()
        this.state = {value: '', dishName: "", ingredients: [{name: "", quantity: "0", measurement: "oz"}], userAddedIngredients: [{name: "", quantity: "0", measurement: "oz"}]}
        this.handleChangeText = this.handleChangeText.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fetchNutrition = this.fetchNutrition.bind(this)
        this.removeIngredient = this.removeIngredient.bind(this)
        this.removeUserAddedItem = this.removeUserAddedItem.bind(this)
    }

    componentDidMount () {
        this.setState({...this.state, ingredients: this.props.ingredients, userAddedIngredients: this.props.userAddedIngredients}, () => { console.log('TEST', this.state.ingredients, 'FROM REDUX: ', this.props.ingredients); return true})

    }

    handleChangeText(newText) {
        this.setState({value: newText})
    }

    handleSubmit() {
        let addingIngredientClone = {...this.state}
        addingIngredientClone.userAddedIngredients.push({name: this.state.value, quantity: "0", measurement: "oz"})
        this.setState(addingIngredientClone)
    }

     async fetchNutrition () {
        await this.props.finalizeIngredients(this.state.ingredients, this.state.userAddedIngredients, this.state.dishName)
        console.log('API INGREDIENTS: ', this.props.ingredients, 'USER INGREDIENTS: ', this.props.userAddedIngredients, 'Final Ingredients look like this: ', this.props.finalIngredients)
        // if(this.props.nutritionData === true){
        //     return (<Redirect to="/your/redirect/page" />);
        // }
    }

    async removeIngredient (index) {
        let ingredientsClone = {...this.state}
        ingredientsClone.ingredients.splice(index, 1)
        this.setState(ingredientsClone)
    }

    async removeUserAddedItem (index) {
        let userIngredientsClone = {...this.state}
        userIngredientsClone.userAddedIngredients.splice(index, 1)
        this.setState(userIngredientsClone)
    }

    render() {
        const ingredients = this.props.ingredients
        const userAddedIngredients = this.props.userAddedIngredients
        const quantTypes = [{value: 'oz'}, {value: 'g'}, {value: 'c'}]
        return (
            <View>
                <View style={styles.renderIngredients}>
                <Text style={styles.headerText}>Confirm Your Ingredients:</Text>
                {
                 this.state.ingredients.map((item, index) => {
                         return (
                             <Text key={index}>
                             <Text >
                                 {item.name} 
                             </Text>
                             <Button onPress={() => {this.removeIngredient(index)}} title="Remove" color="red" />
                             <TextInput 
                                placeholder="Enter A Numerical Value"
                                value={item.quantity}
                                onChangeText={(text) => {
                                    let localStateClone = {...this.state}
                                    localStateClone.ingredients[index].quantity = text;
                                    this.setState(localStateClone)
                                    }} 
                            />
                            <Text></Text>
                            <Picker
                            selectedValue={item.measurement}
                            onValueChange={(value) => { 
                                let localState = {...this.state }
                                localState.ingredients[index].measurement = value;
                                this.setState(localState) }}
                                >
                                {
                                    quantTypes.map((cateogry, index) => {
                                        return (<Picker.Item key={index} label={cateogry.value} value={cateogry.value}/>)
                                    })
                                }
                            </Picker>
                             </Text>
                         )
                     })
                }
                </View>

                <View style={styles.renderIngredients}>
                <Text style={styles.headerText}>Added By User:</Text>
                {
                    this.state.userAddedIngredients.map((item, index) => {
                         return (
                             <Text key={index}>
                             <Text>
                                 {item.name} 
                             </Text> 
                             <Button onPress={() => {this.removeUserAddedItem(index)}} title="Remove" color="red" /> 
                             <TextInput 
                                placeholder="Enter A Numerical Value"
                                value={item.quantity}
                                onChangeText={(text) => {
                                    let localUserAddedStateClone = {...this.state}
                                    localUserAddedStateClone.userAddedIngredients[index].quantity = text;
                                    this.setState(localUserAddedStateClone)
                                    }} 
                            />
                            <Picker
                                selectedValue={item.measurement}
                                onValueChange={(value) => { 
                                let localState = {...this.state }
                                localState.userAddedIngredients[index].measurement = value;
                                this.setState(localState) }}
                            >
                                {
                                    quantTypes.map((cateogry, index) => {
                                        return (<Picker.Item key={index} label={cateogry.value} value={cateogry.value} />)
                                    })
                                }
                            </Picker>  
                             </Text>
                         )
                     })
                }
                </View>
            
                <View style={styles.addItem}>
                <Text style={styles.headerText}>Add An Additional Ingredient:</Text>
                <TextInput 
                    placeholder='Your Ingredient' 
                    defaultValue={this.state.value}
                    onChangeText={this.handleChangeText} 
                />
                <Button onPress={this.handleSubmit} title="Add" color="#00B0FF" />
                </View>

                <View style={styles.addItem}>
                <Text style={styles.headerText}>Confirm Name Of Dish</Text>
                <TextInput 
                    placeholder="i.e. Vegan Pasta Salad"
                    value={this.state.dishName}
                    onChangeText={(text) => {
                        let localStateDish = {...this.state}
                        localStateDish.dishName = text
                        this.setState(localStateDish)
                    }}
                />
                </View>

                <View style={styles.addItem}>
                <Button onPress={this.fetchNutrition} title="All Set! Get Me Nutritional Information" color="green" />
                </View>
         
            </View>
        )
    }
}

const mapState = (state) => {
    return {
        ingredients: state.dishes.ingredients,
        userAddedIngredients: state.dishes.userAddedIngredients,
        finalIngredients: state.dishes.finalIngredients,
        nutritionData: state.dishes.nutritionData
    }
}

const mapDispatch = (dispatch) => {
    return {
        addIngredientByUser: (newIngredient) => dispatch(addIngredientByUser(newIngredient)),
        finalizeIngredients: (ingredients, userIngredients, dishName) => dispatch(finalizeIngredients(ingredients, userIngredients, dishName)),
        fetchNutrition: (finalIngredients) => dispatch(fetchNutrition(finalIngredients)),
        removeIngredient: (index) => dispatch(removeIngredient(index)),
        removeUserAddedItem: (index) => dispatch(removeUserAddedItem(index))
    }
}

export default connect(mapState, mapDispatch)(IngredientConfirmation)


const styles = StyleSheet.create({
    addItem: {
        padding: 10
    },
    renderIngredients: {
        padding: 10
    },
    headerText: {
        fontWeight: 'bold'
    }
})