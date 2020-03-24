import axios from 'axios';

//ACTION TYPE
const ADDING_INGREDIENTS = 'ADDING_INGREDIENTS';

const FINALIZE_INGREDIENT = "FINALIZE_INGREDIENT"

const CONSOLIDATE_DATA = 'CONSOLIDATE_DATA';

//ACTION CREATOR
const addingIngredients = (ingredients, uri) => {
    return {
       type: ADDING_INGREDIENTS,
       ingredients,
       uri
    };
 };

const finalizingIngredients = (ingredients, userIngredients, dishName) => {
  return {
    type: FINALIZE_INGREDIENT,
    ingredients,
    userIngredients,
    dishName,
  };
};

const consolidatingDataForAPI = consolidated => {
  return {
    type: CONSOLIDATE_DATA,
    consolidated,
  };
};

//THUNK
export const depositClarifaiData = (data, uri) => {
  return dispatch => {
    try {
      console.log("THUNK DATA: ", uri)
      dispatch(addingIngredients(data, uri))
    } catch (error) {
      console.error(error)
    }
  }
}

export const finalizeIngredients = (ingredients, userIngredients, dishName) => {
  return dispatch => {
    try {
      dispatch(finalizingIngredients(ingredients, userIngredients, dishName));
    } catch (error) {
      console.error(error);
    }
  };
};

export const consolidatingData = consolidated => {
  return dispatch => {
    try {
      dispatch(consolidatingDataForAPI(consolidated));
      //console.log('secondtime userDish', consolidated);
    } catch (error) {
      console.error(error);
    }
  };
};

//INITIAL STATE
const initialState = {
  imageUrl: '',
  dishName: '', 
  ingredients: [
    // {
    //   name: 'sauce',
    //   quantity: '4',
    //   measurement: 'cup',
    // },
    // {
    //   name: 'pasta',
    //   quantity: '0',
    //   measurement: 'oz',
    // },
  ],
  userAddedIngredients: [
    // { name: 'Truffles', quantity: '1', measurement: 'oz' },
  ],
  finalIngredients: [], // [{name: 'rice', quantity: '1', measurement: 'cup'}, {name: 'chickpeas', quantity: '10', measurement: 'oz'}, 'chickpeas rice']
  consolidatedData: [], //use for API call ['1 cup rice', '10 oz chickpeas']
};

//REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDING_INGREDIENTS:
      const arr = action.ingredients
      let newArr = arr.map((obj) => {
        return {
          name: obj.name,
          quantity: "1",
          measurement: "oz"
        }
      })
      let clonedIngredients = {...state}
      clonedIngredients.ingredients = newArr
      clonedIngredients.imageUrl = action.uri
      return clonedIngredients
    case FINALIZE_INGREDIENT:
      let clonedState = {...state}
      clonedState.finalIngredients = [...action.ingredients, ...action.userIngredients]
      clonedState.dishName = action.dishName
      return clonedState
    case CONSOLIDATE_DATA:
      return { ...state, consolidatedData: action.consolidated };
    default:
      return state;
  }
};

export default reducer;