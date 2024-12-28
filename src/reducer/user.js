import {
  USER_LOGIN_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_LOAD_SUCCESS,
  ALL_USER_SUCCESS,
} from '../constant/user';

// store user detail in redux
export const userReducer = (state = {user: {}}, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
    case USER_LOAD_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

// store all user list in redux
export const AllUsersReducer = (state = {users: {}}, action) => {
  switch (action.type) {
    case ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
