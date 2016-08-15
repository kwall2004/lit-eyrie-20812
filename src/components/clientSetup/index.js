const route = {
    path: 'clientSetup',

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./ClientSetup'));
        });
    },
    
    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./oneA')
            ]);
        });
    }
};

module.exports = route;