

//todo headers

//todo ?? maybe rename to Messages or Locale.Messages???
var Locale={};//set en, cs here





Locale.get = function(key){

    if(!is(key))return 'MESSAGE';

    var message;

    try {
        eval('message=MESSAGES.'+key+';');
    }
    catch(err) {
        message=key;
    }

    return(message);

};

