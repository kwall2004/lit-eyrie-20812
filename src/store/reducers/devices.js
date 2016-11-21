import { fromJS, List } from 'immutable';
import * as types from '../actionTypes/devices';

const initialState = fromJS({
  loading: false,
  list: [],
  selectedDevice: null,
});

function devices(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_DEVICES:
      return state.set('loading', action.loading);

    case types.STORE_DEVICES:
      return state.set('list', fromJS(action.json));

    case types.STORE_SELECTED_DEVICE:
      if (state.get('list').size == 0) return state;

      if (action.deviceId) {
        return state.set('selectedDevice', state.get('list').find(device => {
          return device.get('id') == action.deviceId;
        }));
      }
      else {
        return state.set('selectedDevice', state.getIn(['list', 0]));
      }

    default:
      return state;
  }
}

export default devices;
