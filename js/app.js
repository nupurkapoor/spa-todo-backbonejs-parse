/*global $ */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function () {
  // kick things off by creating the `App`
  console.log("----------------------- App File -----------------------");
  console.log(app);
  new app.AppView();
});