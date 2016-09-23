import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import vehicles from './reducers/vehicles';
import trips from './reducers/trips';
import tripJsonData from './reducers/tripJsonData';

const store = createStore(
  combineReducers({
    vehicles,
    trips,
    tripJsonData,
  }),
  applyMiddleware(thunk)
);

export default store;
