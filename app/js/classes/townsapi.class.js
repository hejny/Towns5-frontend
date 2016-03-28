/**
 * @author ©Towns.cz
 * @fileOverview Towns API Wrapper
 */
//======================================================================================================================token

//todo headers
TownsAPI=function(url='',token=false){

    this.online=true;
    this.url=url;
    this.token=token;

};

//======================================================================================================================


TownsAPI.prototype.isLogged = function(callback){
    return this.query('auth',{},'GET',{},{},
    function(response){
        if(isDefined(response.status)){
            callback(true)
        }else{
            callback(false)
        }
    },
    function(response){
        //r(response);
        callback(false);
    }
    );
};


//======================================================================================================================

/**
 * @private
 * @param uri //todo this param should be with /
 * @param method
 * @param data
 * @param headers
 * @param callback_success
 * @param callback_error
 * @returns {object} jQuery $.ajax
 */
TownsAPI.prototype.query = function(uri,query_data,method,data,headers,callback_success=false,callback_error=false){

    //r(this.url+uri);
    //r(data);

    if(this.token)headers['x-auth']=this.token;


    var query_data_string='';
    var query_separator='?';

    for(var key in query_data){

        var value=query_data[key];

        if(value instanceof Array){
            value = value.join(',');
        }

        value = encodeURIComponent(value);

        query_data_string+=query_separator+key+'='+value;

        query_separator='&';

    }

    //r(headers);

    var request = $.ajax({
        type: method,
        url: this.url+uri+query_data_string,
        //crossDomain: true,
        headers: headers,
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(data),
        dataType: 'json',
        timeout: 7000
    });

    //r(request);

    //r('sended');

    $('#server-loading').show();
    $('#server-ok').hide();
    $('#server-error').hide();


    request.done(function( response ){

        $('#server-loading').hide();
        $('#server-ok').show();
        $('#server-error').hide();

        if(callback_success)
            callback_success(response);
    });


    request.fail(function( jqXHR, textStatus ) {

        $('#server-loading').hide();
        $('#server-ok').hide();
        $('#server-error').show();


        if(callback_error)
            callback_error(jqXHR.responseJSON);
        //r('error');
        //throw new Error(textStatus);

    });


    r('sended');
    //----------------------

    return(request);


};


//=================================================

/**
 *
 * @param uri
 * @param data
 * @param callback_success
 * @param callback_error
 * @returns {object} jQuery $.ajax
 */
TownsAPI.prototype.get = function(uri,query_data,callback_success,callback_error){

    return this.query(uri,query_data,'GET',{},{},callback_success,callback_error);

};

/**
 *
 * @param uri
 * @param data
 * @param callback_success
 * @param callback_error
 * @returns {object} jQuery $.ajax
 */
TownsAPI.prototype.post = function(uri,object,callback_success,callback_error){

    var callback_success_wrapped;

    //----------------------------------------
    if(uri=='objects/prototypes'){
        //--------------------
        callback_success_wrapped = function(response){

            r('Updating object prototype id after server response from '+object.id+' to '+response.prototypeId);


            var i=ArrayFunctions.id2i(object_prototypes,object.id);
            object_prototypes[i].id=response.prototypeId;

            if(callback_success)
                callback_success(response);

        };
        //--------------------
    }else{
        //--------------------
        callback_success_wrapped = function(response){

            if(callback_success)
                callback_success(response);

        };
        //--------------------
    }
    //----------------------------------------


    //r('API',JSON.stringify(object));
    return this.query(uri,{},'POST',object,{},callback_success_wrapped,callback_error);


};

/**
 *
 * @param uri
 * @param callback_success
 * @param callback_error
 * @returns {Object}
 */
TownsAPI.prototype.delete = function(uri,callback_success,callback_error){

    return this.query(uri,{},'DELETE',{},{},callback_success,callback_error);

};


