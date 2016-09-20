module.exports = {
    path: 'vehicleDeviceInfo',

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./VehicleDeviceInfo'));
        });
    }
};
