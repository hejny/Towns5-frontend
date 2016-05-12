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


    close(s=MESSAGE_DURATION){

        var self=this;

        return setTimeout(function(){

            self.$element.remove();
            //self.$element.fadeOut(MESSAGE_FADEOUT, function() {$( this ).remove();});

        },s*1000);


    }


    text(text,type){

        if(text) {
            this.$element.text(text);
        }

        if(type){
            this.$element.removeClass('error');
            this.$element.removeClass('success');
            this.$element.removeClass('info');

            this.$element.addClass(type);
        }

        return this;
    }



    /**
     *
     * @param {string} text
     * @returns {T.UI.Message} message
     */
    static error(text) {
        var message = new T.UI.Message(text, 'error');
        if(text)message.close();
        return message;
    }


    /**
     * @param {string} text
     * @returns {T.UI.Message} message
     */
    static success(text) {
        var message = new T.UI.Message(text, 'success');
        if(text)message.close();
        return message;
    }


    /**
     * @param {string} text
     * @returns {T.UI.Message} message
     */
    static info(text) {
        var message = new T.UI.Message(text, 'info');
        if(text)message.close();
        return message;
    }



};



/*setInterval(function(){

    var error = T.UI.Message.error('hláška'+Math.random());

    error.hide(Math.random()*10);
    r(error);

},1000);/**/
