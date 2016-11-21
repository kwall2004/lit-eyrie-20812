import Cookies from 'js-cookie';
import $ from 'jquery';
import { getLastTripDate, getTrips } from './trips';
import { storeSelectedSettingVehicle } from './settings';
import * as types from '../actionTypes/devices';

export function getDevices() {
  return function (dispatch, getState) {
    dispatch(loadDevices(true));
    $.ajax({
      type: 'GET',
      url: process.env.apiBaseUrl + '/devices',
      data: { match: { clientId: localStorage.getItem('clientId') }, sort: { vehicleAliasSort: 1 } },
      success: (response) => {
        dispatch(loadDevices(false));
        dispatch(storeDevices(response.data));
        dispatch(storeSelectedDevice());
      }
    });
  }
}

export function storeSelectedDevice(deviceId) {
  return function (dispatch, getState) {
    if (!deviceId) {
      var cookie = Cookies.get('selectedDeviceId');
      if (cookie && getState().devices.get('list').find(v => {
        return v.get('id') == cookie;
      })) {
        deviceId = cookie;
      }
    }

    dispatch(storeSelectedDevice1(deviceId));

    var selectedDevice = getState().devices.get('selectedDevice');
    var selectedTripDate = getState().trips.get('selectedTripDate');

    dispatch(storeSelectedSettingVehicle(selectedDevice.get('vehicleId')));

    if (selectedDevice.get('id')) {
      Cookies.set('selectedDeviceId', selectedDevice.get('id'), { expires: 30 });

      dispatch(getLastTripDate(selectedDevice.get('vehicleId')));

      if (selectedTripDate) {
        dispatch(getTrips(selectedDevice.get('vehicleId'), selectedTripDate));
      }
    }
  }
}

function loadDevices(loading) {
  return {
    type: types.LOAD_DEVICES,
    loading
  }
}

function storeDevices(json) {
  return {
    type: types.STORE_DEVICES,
    json
  }
}

function storeSelectedDevice1(deviceId) {
  return {
    type: types.STORE_SELECTED_DEVICE,
    deviceId
  }
}
