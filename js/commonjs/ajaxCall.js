const Backbone = require('backbone');
const $ = require('jquery');
const RSVP = require('rsvp');

module.exports = Backbone.View.extend({
  el: '',
  initialize() {
    console.log('hello iniitalize fucntion', options);
    // this.$el.html(global.nunjucksEnv.render(this.SignupFormNunj));
  },
  render(options) {
    this.url = options.url;
    this.data = options.data;
  },
  getRequest() {
    const that = this;
    return new RSVP.Promise((resolve, reject)=> {
      $.ajax({
        url: that.url,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        type: 'GET',
        dataType: 'json',
        success(result) {
          resolve(result);
        },
        error(response) {
          reject(response);
        }
      });
    });
  },
  postRequest() {
    const that = this;
    return new RSVP.Promise((resolve, reject)=> {
      $.ajax({
        url: that.url,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        data: JSON.stringify(data),
        type: 'POST',
        dataType: 'json',
        success(result) {
          resolve(result);
        },
        error(response) {
          reject(response);
        }
      });
    });
  }
});
