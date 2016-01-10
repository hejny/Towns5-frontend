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
 * @param callback
 * @returns {object} jQuery $.ajax
 */
TownsAPI.prototype.query = function(uri,method,data,callback){

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



    request.done(function( response ){
        callback(response);
    });


    request.fail(function( jqXHR, textStatus ) {
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
 * @param callback
 * @returns {object} jQuery $.ajax
 */
TownsAPI.prototype.get = function(uri,data,callback){return this.query(uri,'GET',data,callback);};

/**
 *
 * @param uri
 * @param data
 * @param callback
 * @returns {object} jQuery $.ajax
 */
TownsAPI.prototype.post = function(uri,data,callback){return this.query(uri,'POST',data,callback);};

/**
 *
 * @param uri
 * @param callback
 * @returns {Object}
 */
TownsAPI.prototype.delete = function(uri,callback){return this.query(uri,'DELETE',{},callback);};


