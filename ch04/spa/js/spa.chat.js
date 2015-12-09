/*
 * spa.chat.js
 * chat feature module for SPA
 */

'use strict';

/* global $, spa */

spa.chat = (function(){
  var configMap = {
    main_html: String()
      + '<div style="padding:1em; color:#fff;">'
        + 'Say hello to chat'
      + '</div>',
    settable_map: {},
  };
  var stateMap = {$container: null};
  var jqueryMap = {};
  var setJqueryMap, configModule, initModule;

  setJqueryMap = function(){
    var $container = stateMap.$container;
    jqueryMap = {$container: $container};
  };

  configModule = function(input_map){
    spa.util.setConfigMap({
      input_map: input_map,
      settable_map: configMap.settable_map,
      config_map: configMap,
    });
    return true;
  };

  initModule = function($container){
    $container.html(configMap.main_html);
    statMap.$container = $container;
    setJqueryMap();
    return true;
  };

  return {
    configModule: configModule,
    initModule: initModule,
  };
}());
