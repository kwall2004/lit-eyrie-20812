const route = {
    path: 'home',

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('../components/home'));
        });
    },

    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./dashboard'),
                require('./trips'),
                require('./vehicleDeviceInfo'),
                require('./data')
            ]);
        });
    }
};

module.exports = route;
