/**
 * @author ©Towns.cz
 * @fileOverview Creates User interface functions
 */
//======================================================================================================================
T.setNamespace('UI');



T.UI.Messages=class {




    /**
     * @param text
     * @param type error,success,info
     */
    static message(text, type = 'info') {

        //todo [PH] play sound here

        ion.sound.play("bell_ring");

        $('#message_inner')
            .removeClass()//.error, .success, .info, .loading
            .addClass(type)
            .text(text);


        $('#message').stop().show();
        $('#message').delay(4).fadeOut(MESSAGE_MS);//todo what effect use

    }

    
    //todo refactor use this below
    /**
     * @param text
     */
    static error(text) {
        T.UI.Messages.message(text, 'error');
    }


    /**
     * @param text
     */
    static success(text) {
        T.UI.Messages.message(text, 'success');
    }


    /**
     * @param text
     */
    static info(text) {
        T.UI.Messages.message(text, 'info');
    }



};