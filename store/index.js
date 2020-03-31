import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import dishes from './dishes'; //added
import mealdiary from './mealdiary';
import user from './user';
import nutrition from './nutrition';

const reducer = combineReducers({
  nutrition,
  dishes,
  mealdiary,
  user,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, 
    // createLogger({ collapsed: true })
  )
);
const store = createStore(reducer, middleware);

export default store;
