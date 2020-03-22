import axios from 'axios'

//ACTION TYPE
const GET_INGREDIENTS = 'GET_INGREDIENTS';

const FINALIZE_INGREDIENT = "FINALIZE_INGREDIENT"

const CONSOLIDATE_DATA = "CONSOLIDATE_DATA"

//ACTION CREATOR
const getIngredients = ingredients => {
    return {
       type: GET_INGREDIENTS,
       ingredients
    };
 };

const finalizingIngredients = (ingredients, userIngredients, dishName) => {
    return {
        type: FINALIZE_INGREDIENT,
        ingredients,
        userIngredients,
        dishName
    }
}

const consolidatingDataForAPI = (consolidated) => {
    return {
        type: CONSOLIDATE_DATA,
        consolidated
    }
}


//THUNK
export const getIngredientsThunk = foodImageUrl => {
    return async dispatch => {
       try {
          
       } catch (error) {
          console.error(error);
       }
    };
 };

export const finalizeIngredients = (ingredients, userIngredients, dishName) => {
    return dispatch => {
        try {
            dispatch(finalizingIngredients (ingredients, userIngredients, dishName))
        } catch (error) {
            console.error(error)
        }
    }
}

export const consolidatingData = (consolidated) => {
    return dispatch => {
        try {
            dispatch(consolidatingDataForAPI (consolidated))
        } catch (error) {
            console.error(error)
        }
    }
}

//INITIAL STATE
const initialState = {
    ingredients: [
        // {
        //   name: "sauce",
        //   quantity: "4",
        //   measurement: "c"
        // },
        // {
        //   name: "pasta",
        //   quantity: "0",
        //   measurement: "oz"
        // },
        ],
    userAddedIngredients: [{name: "Truffles", quantity: "0", measurement: "oz"}],
    finalIngredients: [], // [{name: 'rice', quantity: '1', measurement: 'cup'}, {name: 'chickpeas', quantity: '10', measurement: 'oz'}, 'chickpeas rice']
    consolidatedData: [] //use for API call ['1 cup rice', '10 oz chickpeas', 'chickpeas rice']
}


//REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FINALIZE_INGREDIENT:
            return {...state, finalIngredients: [...action.ingredients, ...action.userIngredients, action.dishName]}
        case CONSOLIDATE_DATA:
            return {...state, consolidatedData: action.consolidated }
        default:
            return state
    }
}

export default reducer
