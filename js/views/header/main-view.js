const Backbone = require('backbone');

module.exports = Backbone.View.extend({
  el: '.navbar',
  DashboardNunj: 'header-nunj.html',
  events: {

  },
  initialize() {
    this.url = 'http://127.0.0.1:3000/hello';
    this.$el.html(global.nunjucksEnv.render(this.DashboardNunj));
  },
  getCall(e) {
    e.preventDefault();
    global.ajaxCall({url: this.url, request: 'GET'})
        .then((res)=> {
          console.log('hello hanifa', res);
        });
  },
  postCall(e) {
    e.preventDefault();
    console.log('hello get', this.url);
    global.ajaxCall({url: this.url, request: 'POST', data: {hello: 'hello'}})
        .then((res)=> {
          console.log('hello hanifa', res);
        });
  },
  render() {
    // console.log('hello renderfunction');
  }
});
