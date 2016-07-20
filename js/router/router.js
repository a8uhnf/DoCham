const Backbone = require('backbone');

module.exports = Backbone.Router.extend({
  constructor(options) {
    console.log('hello world', options);
    Backbone.Router.prototype.constructor.call(this, options);
  },
  routes: {
    '': 'dashboardRoute'
  },
  dashboardRoute() {
    console.log('hello world, this is dashborad route');
  }
});
