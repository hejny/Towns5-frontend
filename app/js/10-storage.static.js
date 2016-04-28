/**
 * @author ©Towns.cz
 * @fileOverview Creates object T.Storage with static methods
 */
//======================================================================================================================



/**
 * Wrapper for LocalT.Storage
 */
T.Storage=class {


    /**
     * @static
     * @param {string} key
     * @param {*} def
     * @return {*}
     */
    static load(key, def = false) {

        var value = localT.Storage.getItem(key) || def;
        return (value);

    };

    /**
     * @static
     * Check if the value is defined
     * @param {string} key
     * @return {boolean}
     */
    static is(key) {

        var value = localT.Storage.getItem(key) || false;
        return (is(value));

    };


    /**
     * @static
     * @param {string} key
     * @param {*} value
     */
    static save(key, value) {

        localT.Storage.setItem(key, value)

    };


    /**
     * @static
     * @param {string} key
     */
    static delete(key) {

        localT.Storage.removeItem(key)

    };


    /**
     * @static
     * Clean whole storage
     */
    static restart() {

        localT.Storage.clear();

    };


};