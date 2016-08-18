const route = {
    path: 'trips',

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('../components/trips'));
        });
    }
};

module.exports = route;
