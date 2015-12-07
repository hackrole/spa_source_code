/*
 * spa.shell.js
 * shell module for spa
 */

spa.shell = (function(){

  var configMap = {
    main_html: String() +
      + '<div class="spa-shell-head">'
        + '<div class="spa-shell-head-logo"></div>'
        + '<div class="spa-shell-head-acct"></div>'
        + '<div class="spa-shell-head-search"></div>'
      + '</div>'
      + '<div class="spa-shell-main">'
        + '<div class="spa-shell-main-nav"></div>'
        + '<div class="spa-shell-main-content"></div>'
      + '</div>'
      + '<div class="spa-shell-foot"></div>'
      + '<div class="spa-shell-chat"></div>'
      + '<div class="spa-shell-modal"></div>'
  };

  var stateMap = {
    $container: null
  };

  var jqueryMap = {};

  var setJqueryMap, initModule;

  setJqueryMap = function(){
    var $container = stateMap.$container;
    jqueryMap = {$container: $container};
  };
  initModule = function($container){
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();
  }

  return {initModule: initModule};
}());
