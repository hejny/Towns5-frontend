/**
 * @author Towns.cz
 * @fileOverview Creates object T.Locale with static methods
 */
//======================================================================================================================


T.Locale=class {//create instances with en, cs here
    


    /**
     * @param {string} key
     * @param {string} key2
     * ...
     * @return {string} message
     */
    static get() {//todo refactor useges use more params not ' '

        var key = [].slice.call(arguments).join(' ');

        if (!is(key))return 'MESSAGE';

        key = key.split(' ').join('_');
        key = key.split('-').join('_');


        var message;

        try {
            eval('message=MESSAGES.' + key + ';');
        }
        catch (err) {
        }

        if (!is(message)) {

            if (environment == 'develop') {

                MESSAGES[key] = key;
                T.Locale.keys_write.push(key);

                var count = T.Math.toInt($('#locale-write-count').html()) + 1;
                $('#locale-write-count').html(count);


                clearTimeout(T.Locale.keys_write_interval);
                T.Locale.keys_write_interval = setTimeout(function () {

                    $('#menu-list-item-data').effect('shake');

                }, 400);


            }

            message = key;
        }

        return (message);

    }

};

T.Locale.keys_write = [];//todo better