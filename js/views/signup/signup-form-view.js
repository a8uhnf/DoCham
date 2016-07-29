const Backbone = require('backbone');

module.exports = Backbone.View.extend({
  el: '.main',
  SignupFormNunj: 'signup-form-nunj.html',
  events: {
    'click .post-call': 'postCall',
    'click .get-call': 'getCall'
  },
  getCall(e) {
    console.log('hello post', e);

  },
  postCall(e) {
    console.log('hello get', e);
  },
  initialize(options) {
    console.log('hello iniitalize fucntion', options);
    this.$el.html(global.nunjucksEnv.render(this.SignupFormNunj));
  },
  render() {
    console.log('hello renderfunction');
  }
});
