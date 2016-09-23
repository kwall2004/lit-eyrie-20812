module.exports = {
  path: 'clients',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Clients'));
    });
  },
};
