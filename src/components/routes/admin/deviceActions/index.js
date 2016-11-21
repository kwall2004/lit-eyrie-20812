module.exports = {
  path: 'deviceactions',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./DeviceActions'));
    });
  },
};
