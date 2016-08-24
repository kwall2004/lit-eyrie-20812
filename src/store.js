import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import vehicles from './reducers/vehicles';

const store = createStore(
    combineReducers({
        vehicles
    }),
    applyMiddleware(thunk)
);

export default store;
