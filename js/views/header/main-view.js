const Backbone = require('backbone');

module.exports = Backbone.View.extend({
  el: '.navbar',
  DashboardNunj: 'header-nunj.html',
  events: {
    'click #login-register': 'logInRegister'
  },
  initialize() {
    this.url = 'http://127.0.0.1:3000/hello';
    this.$el.html(global.nunjucksEnv.render(this.DashboardNunj));
  },
  logInRegister(e) {
    e.preventDefault();
    console.log('he;;p login/register');
  },
  render() {
    // console.log('hello renderfunction');
  }
});
