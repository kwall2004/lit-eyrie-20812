export function getVehicles() {
    return function (dispatch, getState) {
        dispatch(loadingVehiclesChanged(true));
        fetch(
            'http://localhost:65027/api/Dashboard/GetVehicles',
            {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        ).then(response => {
            response.json().then(json => {
                dispatch(loadingVehiclesChanged(false));
                dispatch(storeVehicles(json));
                if (getState().vehicles.get('list').size > 0) {
                    dispatch(setSelectedVehicle(getState().vehicles.getIn(['list', 0, 'vehicleId'])));
                }
            });
        });
    }
}

function loadingVehiclesChanged(loading) {
    return {
        type: 'VEHICLES_LOADING',
        loading
    }
}

function storeVehicles(json) {
    return {
        type: 'STORE_VEHICLES',
        json
    }
}

export function setSelectedVehicle(vehicleId) {
    return {
        type: 'SET_SELECTED_VEHICLE',
        vehicleId
    }
}
