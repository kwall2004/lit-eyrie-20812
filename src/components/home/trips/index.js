const route = {
    path: 'trips',
    
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./Trips'));
        });
    }
};

module.exports = route;