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

        var value = getCookie(key);
        if(value==='')value=def;
        return (value);

    }

    /**
     * @static
     * Check if the value is defined
     * @param {string} key
     * @return {boolean}
     */
    static is(key) {

        var value=getCookie(key);
        return (value!=='');

    }


    /**
     * @static
     * @param {string} key
     * @param {*} value
     */
    static save(key, value) {

        setCookie(key, value);

    }


    /**
     * @static
     * @param {string} key
     */
    static delete(key) {

        setCookie(key, '');

    }


    /**
     * @static
     * Clean whole storage
     */
    static restart() {

        document.cookie = '';

    }


};