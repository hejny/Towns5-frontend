/**
 * @author ©Towns.cz
 * @fileOverview Creates object ArrayFunctions with static methods
 */
//======================================================================================================================


//Doing this as Array.prototype causes for in loop issues
var ArrayFunctions={};


//======================================================================================================================

/**
 * @static
 * Searches an item with ID in array
 * @param {object} array Array of objects with ID
 * @param {*} id Searched ID
 * @returns {number} Key of object with this ID, -1 if not exist
 */
ArrayFunctions.id2i = function(array,id){

    for(var i in array){
        if(array[i].id==id)return i;
    }
    return -1;

};


//======================================================================================================================

/**
 * @static
 * Searches an item with ID in array
 * @param {object} array Array of objects with ID
 * @param {*} id Searched ID
 * @param {string} error_message when iten not exists
 * @returns {object} Object with this ID, null if not exist
 */
ArrayFunctions.id2item = function(array,id,error_message=false){

    for(var i in array){
        if(array[i].id==id)return array[i];
    }

    if(error_message){
        throw new Error(error_message);
    }else{
        return null;
    }

};


//======================================================================================================================

/**
 * @static
 * Delete an item with ID in array
 * @param {object} array Array of objects with ID
 * @param {*} id Searched ID
 * @returns {boolean}
 */
ArrayFunctions.idRemove = function(array,id){//todo refactor use this not splice

    for(var i in array){
        if(array[i].id==id){
            array.splice(i,1);
            return true;
        }
    }
    return false;

};



//======================================================================================================================


/**
 * Iterate through 2D array
 * @static
 * @param array
 * @param {function} callback
 */
ArrayFunctions.iterate2D = function(array,callback){

    //r(array);

    for(var y= 0,yLen=array.length;y<yLen;y++) {
        for (var x = 0,xLen=array[y].length; x<xLen; x++) {

            callback(y,x);/*todo refactor to x,y*/

        }
    }

};

//======================================================================================================================

/**
 * @static
 * @param array
 * @param from
 * @param to
 * @return {array} Removed items
 */
ArrayFunctions.removeItems = function(array,from, to) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};


//======================================================================================================================


/** todo should it be under ArrayFunctions
 *
 * @param {object} obect
 * @param {array} path
 */
ArrayFunctions.filterPath = function(object,path,setValue){


    if(!is(object)){//todo should it be here?
        throw new Error('filterPath: Object is undefined.');
    }

    if(!is(path.forEach)){
        r(path);
        throw new Error('filterPath: Path is not correct array.');
    }


    for(path_i in path){

        var object_key = path[path_i];

        if(path_i<path.length-1 || typeof setValue == 'undefined'){

            if(typeof object[object_key] == 'undefined'){

                return(undefined);
                //throw new Error('filterPath: Key \''+object_key+'\' in path in object is undefined');
            }

            object = object[object_key];

        }else{

            object[object_key]=setValue;

            return(true);



        }

    }

    return(object);


};


//======================================================================================================================


/**
 *
 * @param {Array} array
 * @returns {Array} Array containing only unique values
 */
ArrayFunctions.unique = function(array) {
    var n = {},r=[];
    for(var i = 0; i < array.length; i++)
    {
        if (!n[array[i]])
        {
            n[array[i]] = array;
            r.push(array[i]);
        }
    }
    return r;
}