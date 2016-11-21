import $ from 'jquery';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';
import * as types from '../actionTypes/settings';

toastr.options.positionClass = 'toast-bottom-right';
toastr.options.backgroundpositionClass = 'toast-bottom-right';

const TIME_ZONE_KEY = 'TimeZone';

export function getSettings(success) {
  return function (dispatch, getState) {
    dispatch(loadSettings(true));
    $.ajax({
      type: 'GET',
      url: process.env.apiBaseUrl + '/usersettings?where={"userId":"' + localStorage.getItem('userId') + '"}',
      success: (response) => {
        dispatch(loadSettings(false));
        dispatch(storeSettings(response.data));
        var selectedVehicleId = getState().settings.get('selectedVehicleId');
        if (selectedVehicleId) {
          dispatch(storeSelectedSettingVehicle(selectedVehicleId));
        }
        if (success) {
          success();
        }
      }
    });
  }
}

export function saveSettings() {
  return function (dispatch, getState) {
    getState().settings.get('list').forEach(s => {
      if (s.get('state') == 'added') {
        $.ajax({
          type: 'POST',
          url: process.env.apiBaseUrl + '/',
          data: s.delete('state').toJS(),
          success: (data, status, xhr) => {
            dispatch(addSettingId(s, data.data.id));
            toastr.success('changes saved');
          }
        });
      }
      else if (s.get('state') == 'changed') {
        $.ajax({
          type: 'PUT',
          url: process.env.apiBaseUrl + '/usersettings/' + s.get('id'),
          data: s.delete('id').delete('state').toJS(),
          success: (data, status, xhr) => {
            dispatch(removeSettingState(s));
            toastr.success('changes saved');
          }
        });
      }
    })
  }
}

export function cancelSettings() {
  return function (dispatch, getState) {
    dispatch(getSettings(() => {
      toastr.info('changes canceled');
    }));
  }
}

export function showSettingsModal(show) {
  return {
    type: types.SHOW_SETTINGS_MODAL,
    show
  }
}

export function deleteSettings() {
  return function (dispatch, getState) {
    dispatch(showSettingsModal(false));

    var settingIds = getState().settings.get('list').filter(s => {
      return s.get('VehicleId') != undefined;
    }).map(s => {
      return s.get('id');
    });

    $.ajax({
      type: 'DELETE',
      url: process.env.apiBaseUrl + '/usersettings?where={"id":["' + settingIds.join('","') + '"]}',
      success: (data, status, xhr) => {
        dispatch(removeSettings(settingIds));
        dispatch(storeSelectedSettingTimeZone(getState().settings.get('selectedVehicleId')));
        toastr.success('settings cleared');
      },
      error: (xhr, status, err) => {
        toastr.error(xhr.responseJSON.message, err);
      }
    });
  }
}

export function storeSelectedSettingVehicle(vehicleId) {
  return function (dispatch, getState) {
    dispatch(storeSelectedSettingVehicle1(vehicleId));
    dispatch(storeSelectedSettingTimeZone(vehicleId));
  }
}

export function storeSelectedSettingTimeZone(vehicleId) {
  return function (dispatch, getState) {
    var timeZone;
    var setting = getState().settings.get('list').find(s => {
      return s.get('key') == TIME_ZONE_KEY && s.get('vehicleId') == vehicleId;
    });
    if (!setting) {
      setting = getState().settings.get('list').find(s => {
        return s.get('key') == TIME_ZONE_KEY && !s.get('vehicleId');
      });
    }
    if (setting) {
      timeZone = setting.get('value');
    }

    dispatch(storeSelectedSettingTimeZone1(timeZone));
  }
}

export function storeSettingTimeZone(timeZone, vehicleId) {
  return function (dispatch, getState) {
    dispatch(storeSetting(TIME_ZONE_KEY, timeZone, localStorage.getItem('userId'), vehicleId));
    dispatch(storeSelectedSettingTimeZone1(timeZone));
    toastr.info('Time Zone changed to ' + timeZone);
  }
}

function loadSettings(loading) {
  return {
    type: types.LOAD_SETTINGS,
    loading
  }
}

function storeSettings(data) {
  return {
    type: types.STORE_SETTINGS,
    data
  }
}

function addSettingId(setting, id) {
  return {
    type: types.ADD_SETTING_ID,
    setting,
    id
  }
}

function removeSettingState(setting) {
  return {
    type: types.REMOVE_SETTING_STATE,
    setting
  }
}

function removeSettings(settingIds) {
  return {
    type: types.REMOVE_SETTINGS,
    settingIds
  }
}

function storeSetting(key, value, userId, vehicleId) {
  return {
    type: types.STORE_SETTING,
    key,
    value,
    userId,
    vehicleId
  }
}

function storeSelectedSettingVehicle1(vehicleId) {
  return {
    type: types.STORE_SELECTED_SETTING_VEHICLE,
    vehicleId
  }
}

function storeSelectedSettingTimeZone1(timeZone) {
  return {
    type: types.STORE_SELECTED_SETTING_TIME_ZONE,
    timeZone
  }
}
