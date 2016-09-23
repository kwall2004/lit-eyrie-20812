module.exports = {
  path: 'devices',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Devices'));
    });
  },
};
