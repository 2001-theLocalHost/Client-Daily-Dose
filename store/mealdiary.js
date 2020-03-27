import Axios from "axios"

//ACTION TYPE
const GET_DISHESBYDATE = 'GET_DISHESBYDATE'

const GET_NUTRITION_INFO= 'GET_NUTRITION_INFO'

const DEPOSIT_DISH_INFO = 'DEPOSIT_DISH_INFO'

//ACTION CREATOR
const getDishesByDate = (dishes) => {
    return {
        type: GET_DISHESBYDATE,
        dishes,
    }
}

const getNutritionInfo = (dishObj) => {
    // console.log('SEE DISHOBJ', dishObj)
    return {
        type: GET_NUTRITION_INFO,
        dishObj

    }
}

export const depositDishInfo = (dish) => {
    return {
        type: DEPOSIT_DISH_INFO,
        dish
    }
}

//THUNK
export const fetchDishes = (date) => {
    return async dispatch => {
      try {
        //   console.log('TRYING TO MAKE AXIOS CALL', date)
        //const {data} = await Axios.get(`https://daily-dose-server.herokuapp.com/api/userDish/${date}`)
        const {data} = await Axios.get(`http://localhost:8080/api/userDish/${date}`)
        // console.log('ALL DISHES BY DAY FROM SERVER: ', data)  
        dispatch(getDishesByDate(data))
      } catch (error) {
        console.error(error)
      }
    }
  }

export const fetchIngreInfo = (dishId) => {
    return async dispatch => {
        try {
        //    console.log('PREPARING TO fetchDishInfo: ', dishId)
           //const {data} = await Axios.get(`https://daily-dose-server.herokuapp.com/api/userDish/${dishId}`)
           const {data} = await Axios.get(`http://localhost:8080/api/userDish/dishIngredient/${dishId}`)
        //    console.log('DISH WITH INGREDIENTS BY DAY FROM SERVER: ', data)  

           const ingreArr = data[0].dish.ingredients
           dispatch(getNutritionInfo(ingreArr)) 

        } catch (error) {
            console.error(error)
        }
    }
} 

//INITIAL STATE
const initialState = {
    ingreArrayInfo: {}, //this will be used to load nutritional data on Dish Screen
    dishInfo: {}, 
    dishByDate: [], 
    breakfast: [
       {
        id: 2,
        mealType: 'breakfast',
        date: '2020-09-21',
        createdAt: '2020-03-25T21:03:34.998Z',
        updatedAt: '2020-03-25T21:03:34.998Z',
        userId: 1,
        dishId: 1,   
        dish: {name: 'soup'},
       },
       {
        id: 3,
        mealType: 'breakfast',
        date: '2020-09-21',
        createdAt: '2020-03-25T21:03:34.998Z',
        updatedAt: '2020-03-25T21:03:34.998Z',
        userId: 1,
        dishId: 2,  
        dish: {name: 'kale'},
       },
       {
        id: 4,
        mealType: 'breakfast',
        date: '2020-09-21',
        createdAt: '2020-03-25T21:03:34.998Z',
        updatedAt: '2020-03-25T21:03:34.998Z',
        userId: 1,
        dishId: 3,     
        dish: {name: 'cheerios'},
       },
    ],
    lunch: [
        {
        id: 5,
        mealType: 'lunch',
        date: '2020-09-21',
        createdAt: '2020-03-25T21:03:34.998Z',
        updatedAt: '2020-03-25T21:03:34.998Z',
        userId: 1,
        dishId: 4,            
        dish: {name: 'pizza'},
        }
    ],
    dinner:[
        {
        id: 6,
        mealType: 'dinner',
        date: '2020-09-21',
        createdAt: '2020-03-25T21:03:34.998Z',
        updatedAt: '2020-03-25T21:03:34.998Z',
        userId: 1,
        dishId: 6,       
        dish: {name: 'salad'},
        }
    ],
    snack:[
        {
        id: 6,
        mealType: 'snack',
        date: '2020-09-21',
        createdAt: '2020-03-25T21:03:34.998Z',
        updatedAt: '2020-03-25T21:03:34.998Z',
        userId: 1,
        dishId: 6,       
        dish: {name: 'apple'},
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
                if (obj.mealType === 'Breakfast') {
                    return true 
                } else {
                    return false 
                }
            })
            let lunchcloned = dishes.filter((obj) => {
                if (obj.mealType === 'Lunch') {
                    return true 
                } else {
                    return false 
                }
            })
            let dinnercloned = dishes.filter((obj) => {
                if (obj.mealType === 'Dinner') {
                    return true 
                } else {
                    return false 
                }
            })  
            let snackcloned = dishes.filter((obj) => {
                if (obj.mealType === 'Snack') {
                    return true 
                } else {
                    return false 
                }
            })        
            clonedState.breakfast = breakfastcloned
            clonedState.lunch = lunchcloned
            clonedState.dinner = dinnercloned
            clonedState.snack = snackcloned
            clonedState.dishByDate = action.dishes 
            return clonedState
        case GET_NUTRITION_INFO:
            let stateClone = {...state}
            stateClone.ingreArrayInfo = action.dishObj
            return stateClone
        case DEPOSIT_DISH_INFO:
            let copystateClone = {...state}
            copystateClone.dishInfo = action.dish
            return copystateClone
        default:
            return state;
    }
}
export default reducer; 