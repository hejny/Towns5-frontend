
/*
  █████╗ ██████╗ ██████╗  █████╗ ██╗   ██╗
 ██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝
 ███████║██████╔╝██████╔╝███████║ ╚████╔╝
 ██╔══██║██╔══██╗██╔══██╗██╔══██║  ╚██╔╝
 ██║  ██║██║  ██║██║  ██║██║  ██║   ██║
 ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 */

//======================================================================================================================

//Doing this as Array.prototype causes for in loop issues
var ArrayFunctions={};


/**
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



ArrayFunctions.iterate2D = function(array,callback){

    //r(array);

    for(var y= 0,yLen=array.length;y<yLen;y++) {
        for (var x = 0,xLen=array[y].length; x<xLen; x++) {

            callback(y,x);/*todo refactor to x,y*/

        }
    }

};

//======================================================================================================================


ArrayFunctions.removeItems = function(array,from, to) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};