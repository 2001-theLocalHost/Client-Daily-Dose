import axios from 'axios'
import {saveDishValues} from '../utilityFunctions'

// ACTION TYPES

const SAVE_DISH = "SAVE_DISH"
const SAVE_INGREDIENT = "SAVE_INGREDIENT"

// ACTION CREATORS

const saveDish = (dish) => {
  return {
    type: SAVE_DISH,
    dish
  }
}

const saveIngredient = (ingredient) => {
  return {
    type: SAVE_INGREDIENT,
    ingredient
  }
}

// THUNKS

// thunk createDish takes in nutrition info plus form info
// and creates newDish

export const createDish =  (dishNut, formvalues) => {
  return async dispatch => {
    try {
      console.log('BEFORE', dishNut)
      saveDishValues(dishNut, formvalues)
      console.log('AFTER', dishNut)
      // const newDish = await axios.post('https://daily-dose-server.herokuapp.com/api/dishes', updatedDish)
      const newDish = await axios.post('http://localhost:8080/api/dishes', dishNut)
      console.log('I AM THE NEWDISH NOW HEY HEY HEY', newDish)
    } catch (error) {
        console.error(error)
    }
  }
}

export const createIngredient =  (nutritionInfo, ingredientInfo) => {
  return async dispatch => {
    try {
      // const ingredient; // combine nutritionInfo and dishInfo into object
      // const newIngredient = await axios.post('**insert heroku route**', ingredient)
      dispatch(saveDish(newIngredient))
    } catch (error) {
        console.error(error)
    }
  }
}

// INITIAL STATE

const initialState = {
  dish: {},
  ingredients: []
}

// REDUCER

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_DISH:
          return {...state, dish: action.dish}
        case SAVE_INGREDIENT:
          return {...state, ingredients: [...state.ingredients, action.ingredient]}
        default:
            return state
    }
}

export default reducer
