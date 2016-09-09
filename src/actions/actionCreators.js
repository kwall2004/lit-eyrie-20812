import Cookies from 'js-cookie';
import moment from 'moment';
import elementProcessor from './helpers/elementProcessor';

export function getVehicles() {
    return function(dispatch, getState) {
        dispatch(loadVehicles(true));
        fetch(
            process.env.apiBaseUrl + '/api/Dashboard/GetVehicles',
            {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            }
        ).then(response => {
            response.json().then(json => {
                dispatch(loadVehicles(false));
                dispatch(storeVehicles(json));
                dispatch(selectVehicle());
            });
        });
    }
}

function loadVehicles(loading) {
    return {
        type: 'LOAD_VEHICLES',
        loading
    }
}

function storeVehicles(json) {
    return {
        type: 'STORE_VEHICLES',
        json
    }
}

export function selectVehicle(vehicleId) {
    return function(dispatch, getState) {
        if (!vehicleId) {
            var cookie = Cookies.get('selectedVehicleId');
            if (cookie) {
                vehicleId = cookie;
            }
        }

        dispatch({
            type: 'SELECT_VEHICLE',
            vehicleId
        });

        var selectedVehicleId = getState().vehicles.getIn(['selectedVehicle', 'vehicleId']);
        var selectedTripDate = getState().trips.get('selectedTripDate');

        if (selectedVehicleId) {
            Cookies.set('selectedVehicleId', selectedVehicleId, { expires: 30 });

            dispatch(getLastTripDate(selectedVehicleId));
            dispatch(getLastTripInfo(selectedVehicleId));

            if (selectedTripDate) {
                dispatch(getTrips(selectedVehicleId, selectedTripDate));
            }
        }
    }
}

function getLastTripDate(vehicleId) {
    return function(dispatch, getState) {
        fetch(
            process.env.apiBaseUrl + '/api/Dashboard/GetLastTripDate?VehicleId=' + vehicleId,
            {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            }
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    dispatch(storeLastTripDate(json));
                });
            }
        });
    }
}

function storeLastTripDate(json) {
    return {
        type: 'STORE_LAST_TRIP_DATE',
        json
    }
}

export function selectTripDate(date) {
    return function(dispatch, getState) {
        dispatch({
            type: 'SELECT_TRIP_DATE',
            date
        });

        var selectedVehicleId = getState().vehicles.getIn(['selectedVehicle', 'vehicleId']);
        var selectedTripDate = getState().trips.get('selectedTripDate');

        if (selectedVehicleId && selectedTripDate) {
            dispatch(getTrips(selectedVehicleId, selectedTripDate));
        }
    }
}

function getLastTripInfo(vehicleId) {
    return function(dispatch, getState) {
        fetch(
            process.env.apiBaseUrl + '/api/Dashboard/GetLastTripInfo?VehicleId=' + vehicleId,
            {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            }
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    dispatch(storeLastTripInfo(json));
                });
            }
        });
    }
}

function storeLastTripInfo(json) {
    return {
        type: 'STORE_LAST_TRIP_INFO',
        json
    }
}

function getTrips(vehicleId, date) {
    return function(dispatch, getState) {
        dispatch(storeTripJsonData(null));
        dispatch(selectTrip(null));
        dispatch(loadTrips(true));
        fetch(
            process.env.apiBaseUrl + '/api/Trips/GetTrips?VehicleId=' + vehicleId + '&SelectedDate=' + new moment(date).format('YYYY-MM-DD'),
            {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            }
        ).then(response => {
            response.json().then(json => {
                dispatch(loadTrips(false));
                dispatch(storeTrips(json));
            });
        });
    }
}

function loadTrips(loading) {
    return {
        type: 'LOAD_TRIPS',
        loading
    }
}

function storeTrips(json) {
    return {
        type: 'STORE_TRIPS',
        json
    }
}

export function selectTrip(trip) {
    return function(dispatch, getState) {
        dispatch({
            type: 'SELECT_TRIP',
            trip
        });

        var selectedTripId = getState().trips.getIn(['selectedTrip', 'trip', 'tripId']);

        if (selectedTripId) {
            dispatch(getTripJsonData(selectedTripId));
        }
    }
}

function getTripJsonData(tripId) {
    return function(dispatch, getState) {
        dispatch(loadTripJsonData(true));
        fetch(
            process.env.apiBaseUrl + '/api/Trips/GetTripJsonData?TripId=' + tripId,
            {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            }
        ).then(response => {
            response.json().then(json => {
                elementProcessor.jsonProcessor.processData(json).then(data => {
                    dispatch(loadTripJsonData(false));
                    dispatch(storeTripJsonData(data));
                })
            });
        });
    }
}

function loadTripJsonData(loading) {
    return {
        type: 'LOAD_TRIP_JSON_DATA',
        loading
    }
}

function storeTripJsonData(data) {
    return {
        type: 'STORE_TRIP_JSON_DATA',
        data
    }
}
