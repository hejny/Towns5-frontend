

//todo headers

var Locale={};//set en, cs here





Locale.get = function(key){

    var message;

    try {
        eval('message=MESSAGES.'+key+';');
    }
    catch(err) {
        message=key;
    }

    return(message);

};

