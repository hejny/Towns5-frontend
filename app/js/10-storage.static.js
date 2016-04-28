/**
 * @author ©Towns.cz
 * @fileOverview Creates object Storage with static methods
 */
//======================================================================================================================



/**
 * Wrapper for LocalStorage
 */
var Storage=class {


    /**
     * @static
     * @param {string} key
     * @param {*} def
     * @return {*}
     */
    static load(key, def = false) {

        var value = localStorage.getItem(key) || def;
        return (value);

    };

    /**
     * @static
     * Check if the value is defined
     * @param {string} key
     * @return {boolean}
     */
    static is(key) {

        var value = localStorage.getItem(key) || false;
        return (is(value));

    };


    /**
     * @static
     * @param {string} key
     * @param {*} value
     */
    static save(key, value) {

        localStorage.setItem(key, value)

    };


    /**
     * @static
     * @param {string} key
     */
    static delete(key) {

        localStorage.removeItem(key)

    };


    /**
     * @static
     * Clean whole storage
     */
    static restart() {

        localStorage.clear();

    };


};