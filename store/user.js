import axios from 'axios';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

const getUser = (user, error) => ({
  type: GET_USER,
  user,
  error,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const me = () => async dispatch => {
  try {
    console.log('now i am here');
    const { data } = await axios.get(
      'https://daily-dose-server.herokuapp.com/auth/me'
    );
    dispatch(getUser(data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const login = (email, password) => {
  return async dispatch => {
    let res;
    try {
      res = await axios.post(
        'https://daily-dose-server.herokuapp.com/auth/login',
        {
          email,
          password,
        }
      );
    } catch (authError) {
      return dispatch(getUser(null, authError));
    }
    try {
      dispatch(getUser(res.data));
    } catch (dispatchOrHistoryErr) {
      console.error(dispatchOrHistoryErr);
    }
  };
};

export const signup = userInfo => {
  return async dispatch => {
    let res;
    try {
      res = await axios.post(
        `https://daily-dose-server.herokuapp.com/auth/signup`,
        userInfo
      );
      console.log('3', res.data);
    } catch (authError) {
      return dispatch(getUser(null, authError));
    }

    try {
      console.log('4', res.data);
      dispatch(getUser(res.data));
    } catch (dispatchOrHistoryErr) {
      console.error(dispatchOrHistoryErr);
    }
  };
};

export const editProfile = userInfo => {
  return async dispatch => {
    let res;
    try {
      res = await axios.put(
        `https://daily-dose-server.herokuapp.com/auth/editProfile`,
        userInfo
      );
    } catch (authError) {
      return dispatch(getUser(null, authError));
    }
    try {
      dispatch(getUser(res.data));
    } catch (dispatchOrHistoryErr) {
      console.error(dispatchOrHistoryErr);
    }
  };
};

export const logout = () => async dispatch => {
  try {
    await axios.post('https://daily-dose-server.herokuapp.com/auth/logout');
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

const defaultUser = {};

const user = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      if (!action.error) {
        return action.user;
      } else {
        return { ...state, error: action.error };
      }
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
};

export default user;
