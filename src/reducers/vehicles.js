import { fromJS, List } from 'immutable';

const initialState = fromJS({
    loading: false,
    stored: false,
    list: []
});

function vehicles(state = initialState, action) {
    switch (action.type) {
        case 'VEHICLES_LOADING':
            return state.set('loading', action.loading);

        case 'STORE_VEHICLES':
            var newState = state.set('list', fromJS(action.json));
            return newState.set('stored', true);

        case 'SET_SELECTED_VEHICLE':
            return state.set('selectedVehicle', state.get('list').find(vehicle => {
                return vehicle.get('vehicleId') === action.vehicleId;
            }));

        default:
            return state;
    }
}

export default vehicles;
