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
            var newState = state.set('list', fromJS(action.json.map(vehicle => {
                return {
                    vehicleId: vehicle.vehicleId,
                    name: vehicle.name
                };
            })));
            return newState.set('stored', true);

        default:
            return state;
    }
}

export default vehicles;
