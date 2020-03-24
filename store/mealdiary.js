import Axios from "axios"

//ACTION TYPE
const GET_DISHESBYDATE = 'GET_DISHESBYDATE'

//ACTION CREATOR
const getDishesByDate = (dishes) => {
    return {
        type: GET_DISHESBYDATE,
        dishes,
    }
}

//THUNK
export const fetchDishes = (date) => {
    return async dispatch => {
      try {
        const {data} = await Axios.get(`/api/dishes/${date}`) 
        dispatch(getDishesByDate(data))
      } catch (error) {
        console.error(error)
      }
    }
  }

//INITIAL STATE
const initialState = {
    dishByDate: [], 
    breakfast: [
       {
        dishName: 'soup',
       }
    ],
    lunch: [
        {
            dishName: 'pizza',
        }
    ],
    dinner:[
        {
            dishName: 'salad',
        }
    ]
}

//REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DISHESBYDATE:
            let clonedState = {...state}
            let dishes = action.dishes
            let breakfastcloned = dishes.filter((obj) => {
                if (obj.mealType === 'breakfast') {
                    return true 
                } else {
                    return false 
                }
            })
            let lunchcloned = dishes.filter((obj) => {
                if (obj.mealType === 'lunch') {
                    return true 
                } else {
                    return false 
                }
            })
            let dinnercloned = dishes.filter((obj) => {
                if (obj.mealType === 'dinner') {
                    return true 
                } else {
                    return false 
                }
            })        
            clonedState.breakfast = breakfastcloned
            clonedState.lunch = lunchcloned
            clonedState.dinner = dinnercloned
            clonedState.dishByDate = action.dishes 
            return clonedState
        default:
            return state;
    }
}
export default reducer; 