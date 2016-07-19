var Backbone = require('backbone');
Backbone.$ = $;
var Router = require('./router/router');

global.router = new Router({});
Backbone.history.start();

// var $ = require('jquery');