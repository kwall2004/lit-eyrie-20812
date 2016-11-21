import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import devices from './reducers/devices';
import trips from './reducers/trips';
import settings from './reducers/settings';

const store = createStore(
  combineReducers({
    devices,
    trips,
    settings,
  }),
  applyMiddleware(thunk)
);

export default store;
