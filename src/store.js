import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import vehicles from './reducers/vehicles';
import trips from './reducers/trips';

const store = createStore(
    combineReducers({
        vehicles,
        trips
    }),
    applyMiddleware(thunk)
);

export default store;
