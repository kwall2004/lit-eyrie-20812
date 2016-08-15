const route = {
    path: 'settings',
    
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./Settings'));
        });
    }
};

module.exports = route;