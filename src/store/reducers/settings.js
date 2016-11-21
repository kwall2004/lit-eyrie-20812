import { fromJS } from 'immutable';
import * as types from '../actionTypes/settings';

const initialState = fromJS({
  loading: false,
  list: [],
  selectedVehicleId: null,
  selectedTimeZone: null,
  showModal: false,
});

function settings(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_SETTINGS:
      return state.set('loading', action.loading);

    case types.STORE_SETTINGS:
      return state.set('list', fromJS(action.data));

    case types.STORE_SELECTED_SETTING_VEHICLE:
      return state.set('selectedVehicleId', action.vehicleId);

    case types.STORE_SELECTED_SETTING_TIME_ZONE:
      return state.set('selectedTimeZone', action.timeZone);

    case types.STORE_SETTING:
      var setting = state.get('list').find(s => {
        return s.get('key') == action.key && ((!action.vehicleId && !s.get('vehicleId')) || (action.vehicleId && s.get('vehicleId') == action.vehicleId));
      });
      if (!setting) {
        setting = fromJS({
          state: 'added',
          userId: action.userId,
          key: action.key,
          value: action.value,
        });
        if (action.vehicleId) {
          setting = setting.set('vehicleId', action.vehicleId);
        }
        return state.set('list', state.get('list').push(setting));
      }
      else {
        return state.set('list', state.get('list').map(s => {
          if (s.get('id') == setting.get('id')) {
            if (s.get('state')) {
              return s.set('value', action.value);
            }
            else {
              return s.set('value', action.value).set('state', 'changed');
            }
          }
          else {
            return s;
          }
        }));
      }

    case types.ADD_SETTING_ID:
      return state.set('list', state.get('list').map(s => {
        if (s === action.setting) {
          return s.set('id', action.id).delete('state');
        }
        else {
          return s;
        }
      }));

    case types.REMOVE_SETTING_STATE:
      return state.set('list', state.get('list').map(s => {
        if (s === action.setting) {
          return s.delete('state');
        }
        else {
          return s;
        }
      }));

    case types.REMOVE_SETTINGS:
      return state.set('list', state.get('list').filter(s => {
        return !action.settingIds.includes(s.get('id'));
      }))

    case types.SHOW_SETTINGS_MODAL:
      return state.set('showModal', action.show);

    default:
      return state;
  }
}

export default settings;
