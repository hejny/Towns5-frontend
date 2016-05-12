/**
 * @author ©Towns.cz
 * @fileOverview Creates User interface functions
 */
//======================================================================================================================
T.setNamespace('UI');



T.UI.Message=class {


    constructor(text, type = 'info'){

        //todo [PH] play sound here
        //ion.sound.play("bell_ring");

        this.$element = $('<div class="message"></div>')
            .addClass(type)
            .text(text);

        $('#message-zone').append(this.$element);

    }


    hide(s){

        var self=this;

        setTimeout(function(){

            self.$element.remove();
            //self.$element.fadeOut(MESSAGE_FADEOUT, function() {$( this ).remove();});

        },s*1000);
    }





    /**
     *
     * @param text
     * @returns {T.UI.Message} message
     */
    static error(text) {
        var message = new T.UI.Message(text, 'error');
        message.hide(MESSAGE_DURATION);
        return message;
    }


    /**
     * @param text
     */
    static success(text) {
        var message = new T.UI.Message(text, 'success');
        message.hide(MESSAGE_DURATION);
        return message;
    }


    /**
     * @param text
     */
    static info(text) {
        var message = new T.UI.Message(text, 'info');
        message.hide(MESSAGE_DURATION);
        return message;
    }



};



setInterval(function(){

    var error = T.UI.Message.error('hláška'+Math.random());

    error.hide(Math.random()*10);
    r(error);

},1000);
