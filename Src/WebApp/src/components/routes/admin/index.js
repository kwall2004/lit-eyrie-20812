module.exports = {
    path: 'admin',

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./Admin'));
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
                require('./clients'),
                require('./vehicles'),
                require('./devices'),
                require('./users'),
            ]);
        });
    }
};
