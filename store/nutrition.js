import axios from 'axios';
import qs from 'qs';
import { ED_APIKEY, ED_APIID } from '../secret';
import { ActionSheetIOS } from 'react-native';

const GOT_NUTRITION = 'GOT_NUTRITION';
// const GOT_DISH = 'GOT_DISH';

export const gotNutrition = nutrition => ({
  type: GOT_NUTRITION,
  nutrition,
});

// export const gotDish = dish => ({
//   type: GOT_DISH,
//   dish,
// });

const url = 'https://api.edamam.com/api/nutrition-data';

const urlEncoded = arr => {
  let stringify = arr
    .join(',')
    .split(' ')
    .join('%20');
  return stringify;
};

export const fetchNutrition = () => {
  return async dispatch => {
    try {
      // let stringify = urlEncoded(X)
      let { data } = await axios.get(url, {
        params: {
          app_id: ED_APIID,
          app_key: ED_APIKEY,
          ingr: '1%20cup%20rice', // pass stringify here
        },
      });
      dispatch(gotNutrition(data));
    } catch (err) {
      console.log('not able to load nutrition details', err);
    }
  };
};

// export const fetchNutrition = () => {
//   return async dispatch => {
//     try {
//       // let stringify = urlEncoded(X)
//       let { data } = await axios.post(url, {
//         params: {
//           app_id: ED_APIID,
//           app_key: ED_APIKEY,
//           // ingr: '1%20cup%20rice', // pass stringify here
//         },
//         recipe,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//        console.log('!!!!!!!!!!!!!!!!!!!! post request', data);
//       dispatch(gotNutrition(data));
//     } catch (err) {
//       console.log('not able to load nutrition details', err);
//     }
//   };
// };

// export const fetchDish = () => {
//   return async dispatch => {
//     try {
//       let { data } = await axios.get();
//       dispatch(gotDish(data));
//     } catch (err) {
//       console.log('not able to load dish details', err);
//     }
//   };
// };

const initialState = {
  dishNut: {},
  // ingredientsNut: [],
  // dish: {},
};

const nutritionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_NUTRITION:
      return {
        ...state,
        dishNut: action.nutrition,
        // ingredientsNut: action.nutrition.ingredients,
      };
    // case GOT_DISH:
    //   return {
    //     ...state,
    //     dish: action.dish,
    //   };
    default:
      return state;
  }
};

export default nutritionReducer;
