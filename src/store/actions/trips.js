import moment from 'moment';
import elementProcessor from './helpers/elementProcessor';
import $ from 'jquery';
import * as types from '../actionTypes/trips';

export function getLastTripDate(vehicleId) {
  return function (dispatch, getState) {
    $.ajax({
      type: 'GET',
      url: process.env.apiBaseUrl + '/messages/last-trip-start/' + vehicleId,
      success: (response) => {
        dispatch(storeLastTripDate(response.d));
      }
    });
  }
}

export function getTrips(vehicleId, date) {
  return function (dispatch, getState) {
    dispatch(storeTripJson(null));
    dispatch(storeSelectedTrip(null));
    dispatch(loadTrips(true));
    $.ajax({
      type: 'GET',
      url: process.env.apiBaseUrl + '/messages/trips/' + vehicleId + '/' + new moment(date).format('YYYY-MM-DD'),
      success: (response) => {
        var trips = [];

        response.forEach(message => {
          if (message.m240) {
            trips.push({
              rowNumber: trips.length + 1,
              tripId: message.tripId,
              startTime: message.d
            });
          }
        });

        response.forEach(message => {
          if (message.m241) {
            var trip = trips.find(trip => {
              return trip.tripId === message.tripId;
            });

            if (trip) {
              trip.endTime = message.d;
            }
          }
        });

        dispatch(loadTrips(false));
        dispatch(storeTrips(trips));
      }
    });
  }
}

export function storeSelectedTripDate(date) {
  return function (dispatch, getState) {
    dispatch(storeSelectedTripDate1(date));

    var selectedVehicleIdId = getState().devices.getIn(['selectedDevice', 'vehicleId']);
    var selectedTripDate = getState().trips.get('selectedTripDate');

    if (selectedVehicleIdId && selectedTripDate) {
      dispatch(getTrips(selectedVehicleIdId, selectedTripDate));
    }
  }
}

export function storeSelectedTrip(trip) {
  return function (dispatch, getState) {
    dispatch(storeSelectedTrip1(trip));

    var selectedTripId = getState().trips.getIn(['selectedTrip', 'tripId']);

    if (selectedTripId) {
      dispatch(getTripJson(selectedTripId));
    }
  }
}

function storeLastTripDate(date) {
  return {
    type: types.STORE_LAST_TRIP_DATE,
    date
  }
}

function storeSelectedTripDate1(date) {
  return {
    type: types.STORE_SELECTED_TRIP_DATE,
    date
  }
}

function loadTrips(loading) {
  return {
    type: types.LOAD_TRIPS,
    loading
  }
}

function storeTrips(json) {
  return {
    type: types.STORE_TRIPS,
    json
  }
}

function storeSelectedTrip1(trip) {
  return {
    type: types.STORE_SELECTED_TRIP,
    trip
  }
}

function getTripJson(tripId) {
  return function (dispatch, getState) {
    dispatch(loadTripJson(true));
    $.ajax({
      type: 'GET',
      url: process.env.apiBaseUrl + '/messages/trip/' + tripId,
      success: (response) => {
        elementProcessor.jsonProcessor.processData(response).then(data => {
          dispatch(loadTripJson(false));
          dispatch(storeTripJson(data));
        });
      }
    });
  }
}

function loadTripJson(loading) {
  return {
    type: types.LOAD_TRIP_JSON,
    loading
  }
}

function storeTripJson(data) {
  return {
    type: types.STORE_TRIP_JSON,
    data
  }
}
