import { fromJS, List } from 'immutable';
import Cookies from 'js-cookie';

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
            return state.set('list', fromJS(action.json)).set('stored', true);

        case 'SET_SELECTED_VEHICLE':
            if (state.get('list').size > 0) {
                var vehicleId;

                if (action.vehicleId) {
                    vehicleId = action.vehicleId;
                }
                else {
                    var cookie = Cookies.get('selectedVehicleId');
                    if (cookie) {
                        vehicleId = cookie;
                    }
                    else {
                        vehicleId = state.getIn(['list', 0, 'vehicleId']);
                    }
                }

                Cookies.set('selectedVehicleId', vehicleId, { expires: 30 });
                return state.set('selectedVehicle', state.get('list').find(vehicle => {
                    return vehicle.get('vehicleId') == vehicleId;
                }));
            }
            else {
                return state;
            }

        default:
            return state;
    }
}

export default vehicles;
