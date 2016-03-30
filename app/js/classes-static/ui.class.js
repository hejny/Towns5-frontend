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

    setTimeout(
        function(){
            $('.popup-window .content').find("[autofocus]").focus();
        },IMMEDIATELY_MS
    );

    uiScript();

};


/**
 * Changes format of opened popup window
 * @param format NORMAL, SMALL
 */
UI.popupWindowSetFormat = function(format='NORMAL'){

    $('.popup-window').removeClass('popup-window-small');

    if(format=="SMALL"){

        $('.popup-window').addClass('popup-window-small');

    }

};



/**
 * Open popup window
 * @param title
 * @param content
 * @param close_callback
 */
UI.popupWindowOpen = function(title,content,close_callback=false,format){

    if(window_opened){
        UI.popupWindowClose(false);
    }


    if(close_callback){
        UI.popupWindowCloseCallback=close_callback;
    }


    UI.popupWindowSetFormat(format);

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


/**
 * Change UI after login / logout / register
 */
UI.logged = function(){

    townsAPI.isLogged(function(is){

        //alert(is);
        if(is){


            var decoded_token = jwt_decode(townsAPI.token);
            //r(decoded_token);

            UI.message(Locale.get('logged in as')+' '+decoded_token.username,'success');


            var user_html=`
            <div id="user-profile"></div>
            <button onclick="if(confirm(Locale.get('logout','confirm'))){townsAPI.token=false;Storage.delete('token');UI.logged();}">
                `+Locale.get('ui user logout')+`
            </button>`;

            $('#user').html(user_html);


            townsAPI.get(
                'users/'+decoded_token.id
                ,{}
                ,function(response){


                    var email_md5=md5(response.profile.email);
                    var user_profile_html = `

                    <h1>`+response.profile.username+`</h1>
                    <img src="https://1.gravatar.com/avatar/`+email_md5+`?s=200&r=pg&d=mm">

                    `;

                    $('#user-profile').html(user_profile_html);

                }
                ,function(){

                    throw new Error('Cant get user info after login.');

                }
            );







            $('.logged-in').stop().fadeIn();
            $('.logged-out').stop().fadeOut();

        }else{

            UI.message(Locale.get('logged out'),'info');

            $('.logged-in').stop().fadeOut();
            $('.logged-out').stop().fadeIn();

        }

    });

};





