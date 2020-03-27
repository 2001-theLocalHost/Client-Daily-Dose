import axios from 'axios';

const GET_USER = 'GET_USER';

const getUser = (user, error) => ({
  type: GET_USER,
  user,
  error,
});

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const login = (email, password) => {
  return async dispatch => {
    let res;
    try {
      res = await axios.post(`/auth/login`, { email, password });
    } catch (authError) {
      return dispatch(getUser(null, authError));
    }
    try {
      dispatch(getUser(res.data));
      // if (redirect) {
      //   history.push(redirect)
      // }
    } catch (dispatchOrHistoryErr) {
      console.error(dispatchOrHistoryErr);
    }
  };
};

// export const signup = (name, email, password) => {
//   return async dispatch => {
//     let res;
//     try {
//       res = await axios.post(`/auth/signup`, { name, email, password });
//     } catch (authError) {
//       return dispatch(getUser(null, authError));
//     }

//     try {
//       dispatch(getUser(res.data));
//       // if (redirect) {
//       //   history.push(redirect)
//       // }
//     } catch (dispatchOrHistoryErr) {
//       console.error(dispatchOrHistoryErr);
//     }
//   };
// };

// export const logout = () => async dispatch => {
//   try {
//     await axios.post('/auth/logout');
//     dispatch(removeUser());
//     //   history.push('/login')
//   } catch (err) {
//     console.error(err);
//   }
// };

const defaultUser = {};

const user = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      if (!action.error) {
        return action.user;
      } else {
        return { ...state, error: action.error };
      }
    //   case REMOVE_USER:
    //     return defaultUser
    default:
      return state;
  }
};

export default user;
