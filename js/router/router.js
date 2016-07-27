const Backbone = require('backbone');
const SignupFormView = require('../views/signup/signup-form-view');

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
    if (typeof this.firstView !== 'undefined') {
      this.firstView.close();
    }
    this.firstView = new SignupFormView();
    this.firstView.render();
  }
});
