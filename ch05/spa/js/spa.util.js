/*
 * spa.utils.js
 * general javascript utilities
 */

'use strict';
/* global $, spa */

spa.util = (function(){
  var makeError, setConfigMap;

  makeError = function(name_text, msg_text, data){
    var error = new Error();
    error.name = name_text;
    error.messag = msg_text;
    if(data){
      error.data = data;
    }
    return error;
  };

  setConfigMap = function(arg_map){
    var input_map = arg_map.input_map;
    var settable_map = arg_map.settable_map;
    var config_map = arg_map.config_map;
    var key_name, error;

    for(key_name in input_map){
      if(input_map.hasOwnProperty(key_name)){
        if(settable_map.hasOwnProperty(key_name)){
          config_map[key_name] = input_map[key_name]
        }else{
          error = makeError("Bad Input", "Setting config key |" + key_name + "| is not supported");
          throw error;
        }
      }
    }
  };

  return {
    makeError: makeError,
    setConfigMap: setConfigMap,
  }
}());
