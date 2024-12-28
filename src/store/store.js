import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {combineReducers, applyMiddleware} from 'redux';

import {userReducer, AllUsersReducer} from '../reducer/user';

// making a common state for redux
const rootReducer = combineReducers({
  user: userReducer,
  users: AllUsersReducer,
});

const middleWare = [thunk];

const store = configureStore(
  {
    reducer: rootReducer,
  },
  composeWithDevTools(applyMiddleware(...middleWare)),
);

export default store;
