const Backbone = require('backbone');
// Backbone.$ = $;
const Router = require('./router/router');
global.router = new Router({name: 'hello world'});
global.nunjucksEnv = new global.nunjucks.Environment(new global.nunjucks.PrecompiledLoader());
Backbone.history.start();
