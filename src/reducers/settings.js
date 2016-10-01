import { fromJS } from 'immutable';

const initialState = fromJS({
  selectedTimeZone: null,
});

function settings(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_TIME_ZONE':
      return state.set('selectedTimeZone', action.timeZone);

    default:
      return state;
  }
}

export default settings;
