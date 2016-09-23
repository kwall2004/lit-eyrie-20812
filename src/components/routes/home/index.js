module.exports = {
  path: 'home',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Home'));
    });
  },

  getIndexRoute(location, cb) {
    require.ensure([], (require) => {
      cb(null, {
        onEnter: (nextState, replace) => replace('/home/dashboard')
      });
    });
  },

  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./dashboard'),
        require('./trips'),
        require('./vehicleDeviceInfo'),
        require('./data')
      ]);
    });
  }
};
