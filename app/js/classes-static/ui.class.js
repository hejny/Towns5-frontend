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
 * @param close_callback
 */
UI.popupWindowOpen = function(title,content,close_callback=false){

    if(window_opened){
        UI.popupWindowClose(false);
    }


    if(close_callback){
        UI.popupWindowCloseCallback=close_callback;
    }

    UI.popupWindowTitle(title);
    UI.popupWindowContent(content);

    $('.overlay').show();
    $('.popup-window').show();


    $('.popup-window .content').unbind('mousedown').mousedown(function(){

        $('body').enableSelection();
    });
    $('body').enableSelection();

    window_opened=true;

};


/**
 * Close popup window and run close callback
 * @param {boolean} dont_run_close_callback
 */
UI.popupWindowClose = function(dont_run_close_callback=false){

    //-------------------------------------------Play sound
    //todo sounds ion.sound.play("door_bump");
    //-------------------------------------------

    //-------------------------------------------Hide popup window
    $('.overlay').hide();
    $('.popup-window').hide();

    $('body').disableSelection();

    window_opened=false;
    //-------------------------------------------


    //-------------------------------------------Run close callback
    if(UI.popupWindowCloseCallback){

        if(dont_run_close_callback===false){
            UI.popupWindowCloseCallback();
        }

        delete UI.popupWindowCloseCallback;
    }
    //-------------------------------------------


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