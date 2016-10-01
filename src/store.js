import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import vehicles from './reducers/vehicles';
import trips from './reducers/trips';
import tripJsonData from './reducers/tripJsonData';
import settings from './reducers/settings';

const store = createStore(
  combineReducers({
    vehicles,
    trips,
    tripJsonData,
    settings,
  }),
  applyMiddleware(thunk)
);

export default store;
