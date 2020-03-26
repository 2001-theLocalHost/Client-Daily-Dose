import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import dishes from './dishes' //added
import mealdiary from './mealdiary'

import nutritionReducer from './nutrition';

const reducer = combineReducers({
  nutrition: nutritionReducer, dishes, 
  mealdiary
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
