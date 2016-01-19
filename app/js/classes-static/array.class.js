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
 * @returns {object} Object with this ID, null if not exist
 */
ArrayFunctions.id2item = function(array,id){

    for(var i in array){
        if(array[i].id==id)return array[i];
    }
    return null;

};


//======================================================================================================================

/**
 * @static
 * Delete an item with ID in array
 * @param {object} array Array of objects with ID
 * @param {*} id Searched ID
 * @returns {boolean}
 */
ArrayFunctions.idRemove = function(array,id){

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