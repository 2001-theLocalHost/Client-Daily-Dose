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

export const createDish =  (dishNut, formvalues, ingredientArray) => {
  return async dispatch => {
    try {
      saveDishValues(dishNut, formvalues)
      // const newDish = await axios.post('https://daily-dose-server.herokuapp.com/api/dishes', updatedDish)

      // create dish, deconstruct the data, set it to newDish variable
      const {data} = await axios.post('http://localhost:8080/api/dishes', dishNut)
      const newDish = data

      // create empty array, loop through ingredientArray, create ingredient
      // deconstruct the data, set it to newIngredient variable
      await ingredientArray.forEach(async (ingredient) => {
        let {data} = await axios.post('http://localhost:8080/api/ingredients', ingredient)
        let newIngredient = data

        // await newDish.addIngredient(newIngredient)

        // checking for magic methods and nothing appears but they do appear in post route console.log
        console.log('HI IM MAGIC IN THE DISH THUNK', Object.keys(newDish.__proto__));
        console.log(newDish)
        console.log('HI IM MAGIC IN THE INGREDIENT THUNK', Object.keys(newIngredient.__proto__))
        console.log(newIngredient)
      })

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
