const route = {
    path: 'dashboard',

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('../components/dashboard'));
        });
    }
};

module.exports = route;
