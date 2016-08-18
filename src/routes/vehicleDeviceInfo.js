const route = {
    path: 'vehicleDeviceInfo',

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('../components/vehicleDeviceInfo'));
        });
    }
};

module.exports = route;
