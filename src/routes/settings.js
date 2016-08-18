const route = {
    path: 'settings',

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('../components/settings'));
        });
    }
};

module.exports = route;
