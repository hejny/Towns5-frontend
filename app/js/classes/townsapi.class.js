/**
 * @author ©Towns.cz
 * @fileOverview Towns API Wrapper
 */
//======================================================================================================================token

TownsAPI=function(url=''){

    this.url=url;

};

//======================================================================================================================

/**
 * @private
 * @param uri
 * @param method
 * @param data
 * @param callback_success
 * @param callback_error
 * @returns {object} jQuery $.ajax
 */
TownsAPI.prototype.query = function(uri,method,data,callback_success=false,callback_error=false){

    r(this.url+uri);
    r(data);

    var request = $.ajax({
        type: method,
        url: this.url+uri,
        //crossDomain: true,
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(data),
        dataType: 'json',
        timeout: 7000
    });

    r('sended');

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
TownsAPI.prototype.get = function(uri,data,callback_success,callback_error){return this.query(uri,'GET',data,callback_success,callback_error);};

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

            r('Updating object prototype id after server response from '+object.id+' to '+response.objectId);


            var i=ArrayFunctions.id2i(object_prototypes,object.id);
            object_prototypes[i].id=response.objectId;

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


    return this.query(uri,'POST',object,callback_success_wrapped,callback_error);


};

/**
 *
 * @param uri
 * @param callback_success
 * @param callback_error
 * @returns {Object}
 */
TownsAPI.prototype.delete = function(uri,callback_success,callback_error){

    return this.query(uri,'DELETE',{},callback_success,callback_error);

};


