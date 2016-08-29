import { fromJS, List } from 'immutable';
import Cookies from 'js-cookie';

const initialState = fromJS({
    loading: false,
    list: [],
    selectedVehicle: null,
});

function vehicles(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_VEHICLES':
            return state.set('loading', action.loading);

        case 'STORE_VEHICLES':
            return state.set('list', fromJS(action.json));

        case 'SELECT_VEHICLE':
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
