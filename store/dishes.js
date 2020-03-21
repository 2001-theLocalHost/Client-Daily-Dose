import axios from 'axios'

//ACTION TYPE
const ADD_INGREDIENT = "ADD_INGREDIENT"

const REMOVING_INGREDIENT = "REMOVING_INGREDIENT"

const REMOVING_USER_ADDED_ITEM = "REMOVING_USER_ADDED_ITEM"

const FINALIZE_INGREDIENT = "FINALIZE_INGREDIENT"


//ACTION CREATOR
const addIngredient = (newIngredient) => {
    return {
        type: ADD_INGREDIENT,
        newIngredient
    }
}

const removingIngredient = (index) => {
    return {
        type: REMOVING_INGREDIENT,
        index
    }
}

const removingUserAddedItem = (index) => {
    return {
        type: REMOVING_USER_ADDED_ITEM,
        index
    }
}

const finalizingIngredients = (ingredients, userIngredients, dishName) => {
    return {
        type: FINALIZE_INGREDIENT,
        ingredients,
        userIngredients,
        dishName
    }
}


//THUNK
export const addIngredientByUser = newIngredient => {
    return dispatch => {
        try {
            dispatch(addIngredient(newIngredient))
        } catch (error) {
            console.error(error)
        }
    }
}

export const removeIngredient = index => {
    return dispatch => {
        try {
            dispatch(removingIngredient(index))
        } catch (error) {
            console.error(error)
        }
    }
}

export const removeUserAddedItem = index => {
    return dispatch => {
        try {
            dispatch(removingUserAddedItem(index))
        } catch (error) {
            console.error(error)
        }
    }
}

export const finalizeIngredients = (ingredients, userIngredients, dishName) => {
    return dispatch => {
        try {
            dispatch(finalizingIngredients (ingredients, userIngredients, dishName))
        } catch (error) {
            console.error(error)
        }
    }
}


//INITIAL STATE
const initialState = {
    ingredients: [
        {
          "name": "sauce",
          "quantity": "4",
          "measurement": "c"
        },
        {
          "name": "pasta",
          "quantity": "0",
          "measurement": "oz"
        },
        ],
    userAddedIngredients: [{name: "Truffles", quantity: "0", measurement: "oz"}],
    finalIngredients: [], // [{name: 'sauce', quantity: '4', measurement: 'c'}, {name: 'pasta', quantity: '1', measurement: 'c'}, "pasta salad"]
    nutritionData: [] //['1 cup rice', '10 oz chickpeas', '5 grams chocolate']
}


//REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {...state, userAddedIngredients: [...state.userAddedIngredients, action.newIngredient]}
        case REMOVING_INGREDIENT:
            let ingredientsClone = [...state.ingredients]
            ingredientsClone.splice(action.index, 1)
            return {...state, ingredients: [...ingredientsClone]}
        case REMOVING_USER_ADDED_ITEM:
            let userAddedIngredientsClone = [...state.userAddedIngredients]
            userAddedIngredientsClone.splice(action.index, 1)
            return {...state, userAddedIngredients: [...userAddedIngredientsClone]}
        case FINALIZE_INGREDIENT:
            return {...state, finalIngredients: [...action.ingredients, ...action.userIngredients, action.dishName]}
        default:
            return state
    }
}

export default reducer