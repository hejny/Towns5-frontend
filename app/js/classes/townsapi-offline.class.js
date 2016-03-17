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

    r(uri,method);

    //================================================
    //------------------------------------------------
    if(uri=='objects/prototypes' && method=='GET'){



        $.ajax( appDir+"/php/townsapi-offline-prototypes-aggregate.php" )
            .done(function(data) {

                eval(data);
                //r(objects);

                objects.map(function(item){
                    item._id=generateID();
                    return(item);
                });

                if(callback_success)
                    callback_success(objects);


            });


        return false;
        /**/

    }else
    //------------------------------------------------
    //------------------------------------------------
    if(true){
        var response = [];
    }
    //------------------------------------------------
    //================================================


    if(callback_success)
        callback_success(response);


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
TownsAPIOffline.prototype.get = function(uri,query_data,callback_success,callback_error){
    return this.query(uri,query_data,'GET',{},callback_success,callback_error);


};

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


