import moment from 'moment';

export function getVehicles() {
    return function(dispatch, getState) {
        dispatch(loadVehicles(true));
        fetch(
            'http://localhost:65027/api/Dashboard/GetVehicles',
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
        dispatch({
            type: 'SELECT_VEHICLE',
            vehicleId
        });

        var selectedVehicleId = getState().vehicles.getIn(['selectedVehicle', 'vehicleId']);
        var selectedTripDate = getState().trips.get('selectedTripDate');

        if (selectedVehicleId) {
            dispatch(getLastTripDate(selectedVehicleId));
            dispatch(getLastTripInfo(selectedVehicleId));

            if (selectedTripDate) {
                dispatch(getTrips(selectedVehicleId, selectedTripDate));
            }
        }
    }
}

export function getLastTripDate(vehicleId) {
    return function(dispatch, getState) {
        fetch(
            'http://localhost:65027/api/Dashboard/GetLastTripDate?VehicleId=' + vehicleId,
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

        if (selectedVehicleId) {
            dispatch(getLastTripDate(selectedVehicleId));
            dispatch(getLastTripInfo(selectedVehicleId));

            if (selectedTripDate) {
                dispatch(getTrips(selectedVehicleId, selectedTripDate));
            }
        }
    }
}

export function getLastTripInfo(vehicleId) {
    return function(dispatch, getState) {
        fetch(
            'http://localhost:65027/api/Dashboard/GetLastTripInfo?VehicleId=' + vehicleId,
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

export function getTrips(vehicleId, date) {
    return function(dispatch, getState) {
        dispatch(loadTrips(true));
        fetch(
            'http://localhost:65027/api/Trips/GetTrips?VehicleId=' + vehicleId + '&SelectedDate=' + new moment(date).format('YYYY-MM-DD'),
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
    return {
        type: 'SELECT_TRIP',
        trip
    }
}
