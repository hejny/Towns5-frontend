/**
 * @author ©Towns.cz
 * @fileOverview Creates User interface functions
 */
//======================================================================================================================

T.UI = class {


    /**
     * Changes title of opened popup window
     * @param title
     */
    static popupWindowTitle(title) {

        $('.popup-window .header').html(title);//todo refactor html class header to title

    };


    /**
     * Changes content of opened popup window
     * @param content
     */
    static popupWindowContent(content) {

        $('.popup-window .content').html(content);

        setTimeout(
            function () {
                $('.popup-window .content').find("[autofocus]").focus();
            }, IMMEDIATELY_MS
        );

        uiScript();

    };


    /**
     * Changes format of opened popup window
     * @param format NORMAL, SMALL
     */
    static popupWindowSetFormat(format = 'NORMAL') {

        $('.popup-window').removeClass('popup-window-small');

        if (format == "SMALL") {

            $('.popup-window').addClass('popup-window-small');

        }

    };


    /**
     * Open popup window
     * @param title
     * @param content
     * @param close_callback
     */
    static popupWindowOpen(title, content, close_callback = false, format = 'NORMAL') {

        if (window_opened) {
            T.UI.popupWindowClose(false);
        }


        if (close_callback) {
            T.UI.popupWindowCloseCallback = close_callback;
        }


        T.UI.popupWindowSetFormat(format);

        T.UI.popupWindowTitle(title);
        T.UI.popupWindowContent(content);

        $('.overlay').show();
        $('.popup-window').show();


        $('.popup-window .content').unbind('mousedown').mousedown(function () {

            $('body').enableSelection();
        });
        $('body').enableSelection();

        window_opened = true;

    };


    /**
     * Close popup window and run close callback
     * @param {boolean} dont_run_close_callback
     */
    static popupWindowClose(dont_run_close_callback = false) {

        //-------------------------------------------Play sound
        //todo sounds ion.sound.play("door_bump");
        //-------------------------------------------

        //-------------------------------------------Hide popup window
        $('.overlay').hide();
        $('.popup-window').hide();

        $('body').disableSelection();

        window_opened = false;
        //-------------------------------------------


        //-------------------------------------------Run close callback
        if (T.UI.popupWindowCloseCallback) {

            if (dont_run_close_callback === false) {
                T.UI.popupWindowCloseCallback();
            }

            delete T.UI.popupWindowCloseCallback;
        }
        //-------------------------------------------


    };


};