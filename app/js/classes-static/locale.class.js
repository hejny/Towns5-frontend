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

            clearTimeout(Locale.keys_write_interval);
            Locale.keys_write_interval=setTimeout(function(){
                window.open(appDir+'/php/locale-write.php?language='+language+'&keys='+Locale.keys_write.join(','), "_blank", "width=800,height=500,top=100,left=100,resizable=yes,scrollbars=yes");
                Locale.keys_write=[];
            },400);




        }

        message=key;
    }

    return(message);

};

