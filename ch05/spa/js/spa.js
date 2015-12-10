/*
 * spa.js
 * root namespaces module
 */

var spa = (function() {
  'use strict';
  var initModule = function($container){
    spa.model.initModule();
    spa.shell.initModule($container);
  };

  return {initModule: initModule};
}());
