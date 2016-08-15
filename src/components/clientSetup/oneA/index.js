const route = {
    path: 'a',
    
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./OneA'));
        });
    }
};

module.exports = route;