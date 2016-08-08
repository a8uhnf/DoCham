const Backbone = require('backbone');
// VIEWS
const HeaderMainView = require('./views/header/main-view');
// Router
const Router = require('./router/router');
// commonJS section
const AjaxCall = require('./commonjs/ajaxCall');
global.router = new Router({name: 'hello world'});
global.nunjucksEnv = new global.nunjucks.Environment(new global.nunjucks.PrecompiledLoader());
const ajaxCall = new AjaxCall();
global.headerMainView = new HeaderMainView();
global.headerView = ()=> {
  global.headerMainView.render();
};

global.ajaxCall = (options)=> {
  ajaxCall.render(options);
  if (options.request === 'GET') {
    return ajaxCall.getRequest();
  } else if (options.request === 'POST') {
    return ajaxCall.postRequest();
  }
};

Backbone.history.start();
