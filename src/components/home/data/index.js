const route = {
    path: 'data',
    
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./Data'));
        });
    }
};

module.exports = route;