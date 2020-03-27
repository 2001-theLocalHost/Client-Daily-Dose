import axios from 'axios';
import { ED_APIKEY, ED_APIID } from '../secret';
import {
  combine,
  urlEncoded,
  convertData,
  convertIngrData,
} from '../utilityFunctions';

const GOT_NUTRITION = 'GOT_NUTRITION';
const GOT_INGR_NUTRITION = 'GOT_INGR_NUTRITION';

export const gotNutrition = nutrition => ({
  type: GOT_NUTRITION,
  nutrition,
});

export const gotIngrNutrition = ingrNutrition => ({
  type: GOT_INGR_NUTRITION,
  ingrNutrition,
});

export const fetchNutrition = (name, dishUrl, userDish) => {
  //userDish = consolidatedData => ['1 cup rice', '1 oz rice cake']
  return async dispatch => {
    try {
      let stringify = urlEncoded(userDish); //4%20oz%20rice%20and%201%20oz%20Kale
      let { data } = await axios.get(
        `https://api.edamam.com/api/nutrition-data?app_id=${ED_APIID}&app_key=${ED_APIKEY}&ingr=${stringify}`
      );
      let newData = convertData(name, dishUrl, data);
      dispatch(gotNutrition(newData));
    } catch (err) {
      console.log('not able to load nutrition details', err);
    }
  };
};

export const fetchIngredient = (ingrNameArr, portionQuantArr, userDish) => {
  //ingrNameArr => ['rice', 'rice cake']
  //portionQuant => ['1 cup', '1 oz']
  //userDish => consolidatedData => ['1 cup rice', '1 oz rice cake']
  return async dispatch => {
    try {
      let ingredients = [];
      for (let i = 0; i < userDish.length; i++) {
        let stringify = urlEncoded(userDish[i]);
        let { data } = await axios.get(
          `https://api.edamam.com/api/nutrition-data?app_id=${ED_APIID}&app_key=${ED_APIKEY}&ingr=${stringify}`
        );
        let newData = convertIngrData(ingrNameArr[i], portionQuantArr[i], data);
        ingredients.push(newData);
      }
      dispatch(gotIngrNutrition(ingredients));
    } catch (err) {
      console.log('not able to load ingredient nutrition details', err);
    }
  };
};

const initialState = {
  dishNut: {},
  ingrNut: [],
};

const nutritionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_NUTRITION:
      return {
        ...state,
        dishNut: action.nutrition,
      };
    case GOT_INGR_NUTRITION:
      return {
        ...state,
        ingrNut: action.ingrNutrition,
      };
    default:
      return state;
  }
};

export default nutritionReducer;

/* POST REQUEST (NEED JSON FILE AS REQ BODY & NEED HEADER)
const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const fetchNutrition = recipe => {
  return async dispatch => {
    try {
      let { data } = await axios.post(
        `https://api.edamam.com/api/nutrition-details?app_id=${ED_APIID}&app_key=${ED_APIKEY}`,
        recipe.default,
        options
      );
      dispatch(gotNutrition(data));
    } catch (err) {
      console.log('not able to load nutrition details', err);
    }
  };
};
*/
