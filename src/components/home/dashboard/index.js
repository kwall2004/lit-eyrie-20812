const route = {
    path: 'dashboard',
    
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./Dashboard'));
        });
    }
};

module.exports = route;