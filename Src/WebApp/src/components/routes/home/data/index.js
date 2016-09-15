module.exports = {
    path: 'data',

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./Data'));
        });
    }
};
