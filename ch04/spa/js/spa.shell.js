/*
 * spa.shell.js
 * shell module for spa
 */

spa.shell = (function(){

  var configMap = {
    anchor_schema_map: {
      chat: { opened: true, closed: true }
    },
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
      + '<div class="spa-shell-modal"></div>',

    chat_extend_time: 1000,
    chat_retract_time: 300,
    chat_extend_height: 450,
    chat_retract_height: 15,
    chat_extended_title: 'Click to retract',
    chat_retract_title: 'Click to extend',
  };

  var stateMap = {
    anchor_map: {},
  };

  var jqueryMap = {};

  var copyAnchorMap, setJqueryMap, changeAnchorPart, onHashchange, onClickChat, initModule;

  copyAnchorMap = function(){
    return $.extend(true, {}, stateMap.anchor_map);
  };

  changeAnchorPart = function(arg_map){
    var anchor_map_revise, bool_return, key_name, key_name_dep;
    anchor_map_revise = copyAnchorMap();
    bool_return = true;
    KEYVAL:
    for(key_name in arg_map){
      if(arg_map.hasOwnProperty(key_name)){
        if(key_name.indexOf('_') === 0){ continue KEYVAL; }

        anchor_map_revise[key_name] = arg_map[key_name];
        key_name_dep = '_' + key_name;
        if(arg_map[key_name_dep]){
          anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
        }else{
          delete anchor_map_revise[key_name_dep];
          delete anchor_map_revise['_s' + key_name_dep];
        }
      }
    }

    try {
      $.uriAnchor.setAnchor(anchor_map_revise);
    }catch(error){
      $.uriAnchor.setAnchor(stateMap.anchor_map, null, true);
      bool_return = false;
    }
    return bool_return;
  };

  onHashchange = function(event){
    var anchor_map_previous, anchor_map_proposed, _s_chat_previous, _s_chat_proposed, s_chat_proposed;
    anchor_map_previous = copyAnchorMap();

    try{
      anchor_map_proposed = $.uriAnchor.makeAnchorMap();
    }catch(error){
      $.uriAnchor.setAnchor(anchor_map_previous, null, true);
      return false;
    }
    stateMap.anchor_map = anchor_map_proposed;

    _s_chat_previous = anchor_map_previous._s_chat;
    _s_chat_proposed = anchor_map_proposed._s_chat;

    if(!anchor_map_previous || _s_chat_previous !== _s_chat_proposed){
      s_chat_proposed = anchor_map_proposed.chat;
      switch(s_chat_proposed){
        case 'open':
          is_ok = spa.chat.setSliderPosition('opened');
          break;
        case 'closed':
          is_ok = spa.chat.setSliderPosition('closed');
          break;
        default:
          spa.chat.setSliderPosition('closed');
          delete anchro_map_proposed.chat;
          $.uriAnchor.setAnchor(anchor_map_proposed, null, true);
      }
    }
    if(!is_ok){
      if(anchor_map_previous){
        $.uriAnchor.setAnchor(anchor_map_previous, null, true);
        stateMap.anchor_map = anchor_map_previous;
      }else{
        delete anchor_map_proposed.chat;
        $.uriAnchor.setAnchor(anchor_map_proposed, null, true);
      }
    }
    return false;
  }

  setChatAnchor = function(position_type){
    return changeAnchorPart({chat: position_type});
  }

  setJqueryMap = function(){
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
    };
  };

  onClickChat = function(event){
    if(toggleChat(stateMap.is_chat_retracted)){
      $.uriAnchor.setAnchor({
        chat: (stateMap.is_chat_retracted ? 'open': 'closed')
      });
    }
    return false;
  };
  initModule = function($container){
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();

    // config uriAnchor to use our schema
    $.uriAnchor.configModule({
      schema_map: configMap.anchor_schema_map
    });

    spa.chat.configModule({
      set_chat_anchor: setChatAnchor,
      chat_model: spa.model.chat,
      people_model: spa.model.people,
    });
    spa.chat.initModule(jqueryMap.$container);

    $(window).bind('hashchange', onHashchange).trigger('hashchange');
  };

  return {initModule: initModule};
}());
