const Backbone = require('backbone');

module.exports = Backbone.View.extend({
  el: '.main',
  SignupFormNunj: 'signup-form-nunj.html',
  initialize(options) {
    console.log('hello iniitalize fucntion', options);
    this.$el.html(global.nunjucksEnv.render(this.SignupFormNunj));
  },
  render() {
    console.log('hello renderfunction');
  }
});
