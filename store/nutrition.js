import axios from 'axios';
// import { ED_APIKEY, ED_APIID } from '../secret';
import { Constants } from 'expo';
import {
  combine,
  urlEncoded,
  convertData,
  convertIngrData,
} from '../utilityFunctions';

//ACTION TYPES
const GOT_NUTRITION = 'GOT_NUTRITION';
const GOT_INGR_NUTRITION = 'GOT_INGR_NUTRITION';

const UPDATE_INGR_NUT_FROM_MEALDIARY = 'UPDATE_INGR_NUT_FROM_MEALDIARY'; // FROM MEAL DIARY
const UPDATE_DISH_NUT_FROM_MEALDIARY = 'UPDATE_DISH_NUT_FROM_MEALDIARY'; // FROM MEAL DIARY
const INGREDIENT_NAMES_FROM_MEALDIARY = 'INGREDIENT_NAMES_FROM_MEALDIARY'; //FROM MEAL DIARY

const RESET_DISHNUT_FROM_INGR_CONFIRMATION =
  'RESET_DISHNUT_FROM_INGR_CONFIRMATION'; //FROM INGR CONFIRMATION
const RESET_INGRNUT_FROM_INGR_CONFIRMATION =
  'RESET_INGRNUT_FROM_INGR_CONFIRMATION'; //FROM INGR CONFIRMATION

//ACTION CREATORS
export const gotNutrition = (nutrition) => ({
  type: GOT_NUTRITION,
  nutrition,
});

export const gotIngrNutrition = (ingrNutrition) => ({
  type: GOT_INGR_NUTRITION,
  ingrNutrition,
});

export const updateIngrNut = (ingrNutritionMealDiary) => ({
  type: UPDATE_INGR_NUT_FROM_MEALDIARY,
  ingrNutritionMealDiary,
});

export const updateDishNut = (dishNutritionMealDiary) => ({
  type: UPDATE_DISH_NUT_FROM_MEALDIARY,
  dishNutritionMealDiary,
});

export const ingredientNamesFromMealDiary = (ingredientNames) => ({
  type: INGREDIENT_NAMES_FROM_MEALDIARY,
  ingredientNames,
});

export const resetDishnutFromConfirmation = (obj) => ({
  type: RESET_DISHNUT_FROM_INGR_CONFIRMATION,
  obj,
});

export const resetIngrnutFromConfirmation = (arr) => ({
  type: RESET_INGRNUT_FROM_INGR_CONFIRMATION,
  arr,
});

//THUNKS
export const fetchNutrition = (name, dishUrl, userDish) => {
  //userDish = consolidatedData => ['1 cup rice', '1 oz rice cake']
  return async (dispatch) => {
    try {
      let stringify = urlEncoded(userDish); //4%20oz%20rice%20and%201%20oz%20Kale
      let { data } = await axios.get(
        `https://api.edamam.com/api/nutrition-data?app_id=${Constants.manifest.extra.edamamID}&app_key=${Constants.manifest.extra.edamamKey}&ingr=${stringify}`
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
  return async (dispatch) => {
    try {
      let ingredients = [];
      for (let i = 0; i < userDish.length; i++) {
        let stringify = urlEncoded(userDish[i]);
        let { data } = await axios.get(
          `https://api.edamam.com/api/nutrition-data?app_id=${Constants.manifest.extra.edamamID}&app_key=${Constants.manifest.extra.edamamKey}&ingr=${stringify}`
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
  ingredientNames: [], // ['rice', 'oil', 'ricecakes']
};

const nutrition = (state = initialState, action) => {
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
    case UPDATE_INGR_NUT_FROM_MEALDIARY:
      return {
        ...state,
        ingrNut: action.ingrNutritionMealDiary,
      };
    case UPDATE_DISH_NUT_FROM_MEALDIARY:
      return {
        ...state,
        dishNut: action.dishNutritionMealDiary,
      };
    case INGREDIENT_NAMES_FROM_MEALDIARY:
      return {
        ...state,
        ingredientNames: action.ingredientNames,
      };
    case RESET_DISHNUT_FROM_INGR_CONFIRMATION:
      return {
        ...state,
        dishNut: action.obj,
      };
    case RESET_INGRNUT_FROM_INGR_CONFIRMATION:
      return {
        ...state,
        ingrNut: action.arr,
      };
    default:
      return state;
  }
};

export default nutrition;
