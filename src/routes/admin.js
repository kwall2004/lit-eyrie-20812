const route = {
    path: 'admin',

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('../components/admin'));
        });
    },

    getIndexRoute(location, cb) {
        require.ensure([], (require) => {
            cb(null, {
                onEnter: (nextState, replace) => replace('/admin/clients')
            });
        });
    },

    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./clients')
            ]);
        });
    }
};

module.exports = route;
