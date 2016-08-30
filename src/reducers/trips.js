import { fromJS, List } from 'immutable';

const initialState = fromJS({
    lastTripDate: null,
    lastTripInfo: null,
    selectedTripDate: new Date(),
    selectedTrip: null,
    loading: false,
    list: [],
});

function trips(state = initialState, action) {
    switch (action.type) {
        case 'STORE_LAST_TRIP_DATE':
            return state.set('lastTripDate', fromJS(action.json));

        case 'STORE_LAST_TRIP_INFO':
            return state.set('lastTripInfo', fromJS(action.json));

        case 'SELECT_TRIP_DATE':
            return state.set('selectedTripDate', action.date);

        case 'LOAD_TRIPS':
            return state.set('loading', action.loading);

        case 'STORE_TRIPS':
            return state.set('list', fromJS(action.json));

        case 'SELECT_TRIP':
            return state.set('selectedTrip', action.trip);

        default:
            return state;
    }
}

export default trips;
