/**
 * @author Towns.cz
 * @fileOverview Creates object Locale with static methods
 */
//======================================================================================================================


//todo ?? maybe rename to Messages or Locale.Messages???
var Locale={};//set en, cs here


Locale.keys_write=[];


/**
 * @param {string} key
 * @return {string} message
 */
Locale.get = function(key){

    if(!is(key))return 'MESSAGE';

    key=key.split(' ').join('_');


    var message;

    try {
        eval('message=MESSAGES.'+key+';');
    }
    catch(err) {
    }

    if(!is(message)){

        if(environment=='develop'){

            MESSAGES[key]=key;
            Locale.keys_write.push(key);

            var count=Math.toInt($('#locale-write-count').html())+1;
            $('#locale-write-count').html(count);


            clearTimeout(Locale.keys_write_interval);
            Locale.keys_write_interval=setTimeout(function(){

                $('#menu-list-item-data').effect('shake');

            },400);




        }

        message=key;
    }

    return(message);

};

