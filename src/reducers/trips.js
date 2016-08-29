import { fromJS, List } from 'immutable';

const initialState = fromJS({
    lastTripDate: null,
    selectedTripDate: new Date(),
    loading: false,
    list: [],
});

function trips(state = initialState, action) {
    switch (action.type) {
        case 'STORE_LAST_TRIP_DATE':
            return state.set('lastTripDate', fromJS(action.json));

        case 'SELECT_TRIP_DATE':
            return state.set('selectedTripDate', action.date);

        case 'LOAD_TRIPS':
            return state.set('loading', action.loading);

        case 'STORE_TRIPS':
            return state.set('list', fromJS(action.json));

        default:
            return state;
    }
}

export default trips;
