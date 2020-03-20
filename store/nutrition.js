import axios from 'axios';

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

export const fetchNutrition = () => {
  return async dispatch => {
    try {
      let { data } = await axios.get();
      dispatch(gotNutrition(data));
    } catch (err) {
      console.log('not able to load nutrition details', err);
    }
  };
};

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
  ingredientsNut: [],
  // dish: {},
};

const nutritionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_NUTRITION:
      return {
        ...state,
        dishNut: action.nutrition,
        ingredientsNut: action.nutrition.ingredients,
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
