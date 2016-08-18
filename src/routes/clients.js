const route = {
    path: 'clients',

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('../components/clients'));
        });
    },
};

module.exports = route;
