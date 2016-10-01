import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  data: null,
});

function tripJsonData(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_TRIP_JSON_DATA':
      return state.set('loading', action.loading);

    case 'STORE_TRIP_JSON_DATA':
      return state.set('data', action.data);

    default:
      return state;
  }
}

export default tripJsonData;
