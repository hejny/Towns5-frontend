/**
 * @author ©Towns.cz
 * @fileOverview Towns API Wrapper
 */
//======================================================================================================================token

TownsAPI=function(url=''){

    this.url=url;

};

//======================================================================================================================

TownsAPI.prototype.query = function(uri,method,data,callback){

    r(this.url+uri);
    r(data);

    var request = $.ajax({
        type: method,
        url: this.url+uri,
        crossDomain: true,
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(data),
        dataType: 'json',
        timeout: 1000
    });

    r('sended');



    request.done(function( response ){
        r('success');
        callback(response);
    });


    request.fail(function( jqXHR, textStatus ) {
        r('error');
        throw new Error(textStatus);

    });


    r('sended');
    //----------------------

    return(request);


};


//=================================================

TownsAPI.prototype.get = function(uri,data,callback){this.query(uri,'GET',data,callback);};
TownsAPI.prototype.post = function(uri,data,callback){this.query(uri,'POST',data,callback);};



