module.exports = {
    path: 'vehicles',

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./Vehicles'));
        });
    },
};
