module.exports = {
  path: 'trips',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Trips'));
    });
  }
};
