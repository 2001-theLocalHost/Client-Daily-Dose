import axios from 'axios';
import { ED_APIKEY, ED_APIID } from '../secret';
import {cleanStr, convertData} from '../utilityFunctions';

const GOT_NUTRITION = 'GOT_NUTRITION';

export const gotNutrition = nutrition => ({
  type: GOT_NUTRITION,
  nutrition,
});

const url = 'https://api.edamam.com/api/nutrition-data';

const urlEncoded = arr => {
  arr.splice(-1, 1);
  let stringify = arr
    .join(',')
    .split(' ')
    .join('%20');
  return stringify;
};

export const fetchNutrition = (dishName, dishUrl, userDish) => {
  return async dispatch => {
    try {
      let copy = [...userDish];
      let stringify = urlEncoded(copy);
      let { data } = await axios.get(url, {
        params: {
          app_id: ED_APIID,
          app_key: ED_APIKEY,
          ingr: stringify,
        },
      });
      let newData = convertData(dishName, dishUrl, data)
      console.log('THIS IS NEWDATA AGAIN', newData)
      dispatch(gotNutrition(newData));
    } catch (err) {
      console.log('not able to load nutrition details', err);
    }
  };
};

const initialState = {
  dishNut: {},
  // ingredientsNut: [],
};

const nutritionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_NUTRITION:
      return {
        ...state,
        dishNut: action.nutrition,
        // ingredientsNut: action.nutrition.ingredients,
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
