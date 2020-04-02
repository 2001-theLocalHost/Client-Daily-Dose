import axios from 'axios';
import { saveDishValues } from '../utilityFunctions';

//ACTION TYPE
const ADDING_IMAGE_URI = 'ADDING_IMAGE_URI';

const FINALIZE_INGREDIENT = 'FINALIZE_INGREDIENT';

const CONSOLIDATE_DATA = 'CONSOLIDATE_DATA';

const CONSOLIDATE_DATA_FROM_MEALDIARY = 'CONSOLIDATE_DATA_FROM_MEALDIARY';

//ACTION CREATOR
const addingImageUri = (uri) => {
  return {
    type: ADDING_IMAGE_URI,
    uri,
  };
};

const finalizingIngredients = (ingredients, userIngredients, name) => {
  return {
    type: FINALIZE_INGREDIENT,
    ingredients,
    userIngredients,
    name,
  };
};

const consolidatingDataForAPI = consolidated => {
  return {
    type: CONSOLIDATE_DATA,
    consolidated,
  };
};

export const consolidatingDataFromMealDiary = strings => {
  return {
    type: CONSOLIDATE_DATA_FROM_MEALDIARY,
    strings,
  };
};

//THUNKS
export const depositClarifaiData = (uri) => {
  return dispatch => {
    try {
      dispatch(addingImageUri(uri));
    } catch (error) {
      console.error(error);
    }
  };
};

export const finalizeIngredients = (ingredients, userIngredients, name) => {
  return dispatch => {
    try {
      dispatch(finalizingIngredients(ingredients, userIngredients, name));
    } catch (error) {
      console.error(error);
    }
  };
};

export const consolidatingData = consolidated => {
  return dispatch => {
    try {
      dispatch(consolidatingDataForAPI(consolidated));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createDish = (dishNut, formvalues, ingredientArray) => {
  return async dispatch => {
    try {
      saveDishValues(dishNut, formvalues);
      let dataForPost = {
        dish: dishNut,
        ingredients: ingredientArray,
      };
      const { data } = await axios.post(
        'https://daily-dose-server.herokuapp.com/api/dishes',
        dataForPost
      );
    } catch (error) {
      console.error(error);
    }
  };
};

//INITIAL STATE
const initialState = {
  imgUrl: '',
  name: '',
  finalIngredients: [],
  consolidatedData: [],
};

//REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDING_IMAGE_URI:
      let clonedIngredients = { ...state };
      clonedIngredients.imgUrl = action.uri;
      return clonedIngredients;
    case FINALIZE_INGREDIENT:
      let clonedState = { ...state };
      clonedState.finalIngredients = [
        ...action.ingredients,
        ...action.userIngredients,
      ];
      clonedState.name = action.name;
      return clonedState;
    case CONSOLIDATE_DATA:
      return { ...state, consolidatedData: action.consolidated };
    case CONSOLIDATE_DATA_FROM_MEALDIARY:
      return { ...state, consolidatedData: action.strings };
    default:
      return state;
  }
};

export default reducer;
