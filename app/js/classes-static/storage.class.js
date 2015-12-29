/**
 * @author ©Towns.cz
 * @fileOverview Creates object Storage with static methods
 */
//======================================================================================================================



/**
 * Wrapper for LocalStorage
 */
var Storage={};

/**
 * @static
 * @param {string} key
 * @param {*} def
 * @return {*}
 */
Storage.load = function(key,def=false){

    var value=localStorage.getItem(key) || def;
    return(value);

};

/**
 * @static
 * Check if the value is defined
 * @param {string} key
 * @return {boolean}
 */
Storage.is = function(key){

    var value=localStorage.getItem(key) || false;
    return(is(value));

};


/**
 * @static
 * @param {string} key
 * @param {*} value
 */
Storage.save = function(key,value){

    localStorage.setItem(key,value)

};

/**
 * @static
 * Clean whole storage
 */
Storage.restart = function(){

    localStorage.clear();

};


