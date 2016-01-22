/**
 * @author ©Towns.cz
 * @fileOverview Creates User interface functions
 */
//======================================================================================================================


var UI={};


/**
 * @returns {boolean} is user focused on map
 */
UI.focusOnMap = function(){
    return(!(window_opened || ['INPUT','TEXTAREA'].indexOf(document.activeElement.tagName)!=-1));
};


/**
 * Changes title of opened popup window
 * @param title
 */
UI.popupWindowTitle = function(title){

    $('.popup-window .header').text(title);//todo refactor html class header to title

};


/**
 * Changes content of opened popup window
 * @param content
 */
UI.popupWindowContent = function(content){

    $('.popup-window .content').html(content);
    uiScript();

};


/**
 * Open popup window
 * @param title
 * @param content
 * @param close close callback
 */
UI.popupWindowOpen = function(title,content,close=false){

    if(close){
        UI.popupCloseCallback=close;
    }

    UI.popupWindowTitle(title);
    UI.popupWindowContent(content);

    $('.overlay').show();
    $('.popup-window').show();


    $('.popup-window .content').mousedown(function(){

        $('body').enableSelection();
    });
    $('body').enableSelection();

    window_opened=true;

};


/**
 * Close popup window and run close callback
 */
UI.popupWindowClose = function(){

    //todo sounds ion.sound.play("door_bump");

    $('.overlay').hide();
    $('.popup-window').hide();

    $('body').disableSelection();

    if(UI.popupWindowCloseCallback){


        UI.popupWindowCloseCallback();
        delete UI.popupWindowCloseCallback;
    }

    window_opened=false;
};


/**
 * @param text
 * @param type error,success,info
 */
UI.message = function(text,type){

    //todo [PH] types of message - error, notice,...?
    //todo [PH] play sound here

    ion.sound.play("bell_ring");

    $('#message_inner').text(text);
    $('#message').show();
    $('#message').fadeOut(MESSAGE_MS);//todo UX?

};