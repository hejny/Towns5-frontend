/**
 * @author ©Towns.cz
 * @fileOverview Towns API Wrapper
 */
//======================================================================================================================token

TownsAPIOffline=function(){

    this.online=false;
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
TownsAPIOffline.prototype.query = function(uri,query_data,method,data,callback_success=false,callback_error=false){


    if(callback_success)
        callback_success([]);


    return(false);


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
TownsAPIOffline.prototype.get = function(uri,query_data,callback_success,callback_error){return this.query(uri,query_data,'GET',{},callback_success,callback_error);};

/**
 *
 * @param uri
 * @param data
 * @param callback_success
 * @param callback_error
 * @returns {object} jQuery $.ajax
 */
TownsAPIOffline.prototype.post = function(uri,object,callback_success,callback_error){

    return this.query(uri,{},'POST',object,callback_success,callback_error);


};

/**
 *
 * @param uri
 * @param callback_success
 * @param callback_error
 * @returns {Object}
 */
TownsAPIOffline.prototype.delete = function(uri,callback_success,callback_error){

    return this.query(uri,{},'DELETE',{},callback_success,callback_error);

};


