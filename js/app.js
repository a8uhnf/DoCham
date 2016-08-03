const Backbone = require('backbone');
// Backbone.$ = $;
// Router
const Router = require('./router/router');
// commonJS section
const AjaxCall = require('./commonjs/ajaxCall');
global.router = new Router({name: 'hello world'});
console.log('hello global', global);
global.nunjucksEnv = new global.nunjucks.Environment(new global.nunjucks.PrecompiledLoader());
const ajaxCall = new AjaxCall();
global.ajaxCall = (options)=> {
  ajaxCall.render(options);
  if (options.request === 'GET') {
    return ajaxCall.getRequest();
  } else if (options.request === 'POST') {
    return ajaxCall.postRequest();
  }
};
Backbone.history.start();
