import { fromJS, List } from 'immutable';
import * as types from '../actionTypes/trips';

const initialState = fromJS({
  lastTripDate: null,
  lastTripInfo: null,
  selectedTripDate: new Date(),
  loading: false,
  list: [],
  selectedTrip: null,
  loadingJson: false,
  json: null
});

function trips(state = initialState, action) {
  switch (action.type) {
    case types.STORE_LAST_TRIP_DATE:
      return state.set('lastTripDate', action.date);

    case types.STORE_SELECTED_TRIP_DATE:
      return state.set('selectedTripDate', action.date);

    case types.LOAD_TRIPS:
      return state.set('loading', action.loading);

    case types.STORE_TRIPS:
      return state.set('list', fromJS(action.json));

    case types.STORE_SELECTED_TRIP:
      return state.set('selectedTrip', action.trip);

    case types.LOAD_TRIP_JSON:
      return state.set('loadingJson', action.loading);

    case types.STORE_TRIP_JSON:
      return state.set('json', action.data);

    default:
      return state;
  }
}

export default trips;
