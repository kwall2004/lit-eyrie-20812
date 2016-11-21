module.exports = {
  path: 'config-files',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./ConfigFiles'));
    });
  },
};
