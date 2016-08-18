const route = {
    path: 'data',

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('../components/data'));
        });
    }
};

module.exports = route;
