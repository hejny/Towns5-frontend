/**
 * @author ©Towns.cz
 * @fileOverview Creates User interface functions
 */
//======================================================================================================================
TOWNS.setNamespace('UI');



TOWNS.UI.popupWindow = class {


    /**
     * Changes title of opened popup window
     * @param title
     */
    static setTitle(title) {

        if(title && title.substr(0,1)!='<'){
            document.title = title+' | '+TOWNS.Locale.get('page','title');
        }else{
            document.title = TOWNS.Locale.get('page','title');
        }

        $('.popup-window .header').html(title);//todo refactor html class header to title

    }


    /**
     * Changes content of opened popup window
     * @param content
     */
    static setContent(content) {

        $('.popup-window .content').html(content);

        setTimeout(
            function () {
                $('.popup-window .content').find("[autofocus]").focus();
            }, IMMEDIATELY_MS
        );

        uiScript();

    }


    /**
     * Changes format of opened popup window
     * @param format NORMAL, SMALL
     */
    static setFormat(format = 'NORMAL') {

        $('.popup-window').removeClass('popup-window-small');
        $('.popup-window').removeClass('popup-window-vertical');

        if (format == "SMALL") {

            $('.popup-window').addClass('popup-window-small');

        }else
        if (format == "VERTICAL") {

            $('.popup-window').addClass('popup-window-vertical');

        }

    }


    /**
     * Open popup window
     * @param title
     * @param content
     * @param close_callback
     */
    static open(title, content, close_callback = false, format = 'NORMAL') {

        if (window_opened) {
            TOWNS.UI.popupWindow.close();
        }


        if (close_callback) {
            TOWNS.UI.popupWindow.closeCallback = close_callback;
        }


        TOWNS.UI.popupWindow.setFormat(format);

        TOWNS.UI.popupWindow.setTitle(title);
        TOWNS.UI.popupWindow.setContent(content);


        r(TOWNS.URI.writed);
        if(TOWNS.URI.writed>1){

            $('.js-popup-window-back').show();

        }


        $('.overlay').show();
        $('.popup-window').show();


        $('.popup-window .content').unbind('mousedown').mousedown(function () {

            $('body').enableSelection();
        });
        $('body').enableSelection();

        window_opened = true;

    }


    /**
     * Close popup window and run close callback
     * @param {boolean} dont_run_close_callback
     */
    static close(dont_run_close_callback = false) {

        //-------------------------------------------Play sound
        //todo sounds ion.sound.play("door_bump");
        //-------------------------------------------

        //-------------------------------------------Hide popup window
        document.title = TOWNS.Locale.get('page','title');

        $('.overlay').hide();
        $('.popup-window').hide();

        $('body').disableSelection();

        window_opened = false;
        //-------------------------------------------


        //-------------------------------------------Run close callback
        if (TOWNS.UI.popupWindow.closeCallback) {

            if (dont_run_close_callback === false) {
                TOWNS.UI.popupWindow.closeCallback();
            }

            delete TOWNS.UI.popupWindow.closeCallback;
        }
        //-------------------------------------------


    }


};