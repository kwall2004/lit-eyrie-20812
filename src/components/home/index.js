const route = {
    path: 'home',
    
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./Home'));
        });
    },
    
    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./dashboard'),
                require('./trips')
            ]);
        });
    }
};

module.exports = route;