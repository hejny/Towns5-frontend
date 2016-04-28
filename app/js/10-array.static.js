/**
 * @author ©Towns.cz
 * @fileOverview Creates object T.ArrayFunctions with static methods
 */
//======================================================================================================================


/**
 * Additional functions to manipulate with array
 */
T.ArrayFunctions=class {


    /**
     * @static
     * Searches an item with ID in array
     * @param {object} array Array of objects with ID
     * @param {*} id Searched ID
     * @returns {number} Key of object with this ID, -1 if not exist
     */
    static id2i(array, id) {

        for (var i in array) {
            if (array[i].id == id)return i;
        }
        return -1;

    }


//======================================================================================================================

    /**
     * @static
     * Searches an item with ID in array
     * @param {object} array Array of objects with ID
     * @param {*} id Searched ID
     * @param {string} error_message when iten not exists
     * @returns {object} Object with this ID, null if not exist
     */
    static id2item(array, id, error_message = false) {

        for (var i in array) {
            if (array[i].id == id)return array[i];
        }

        if (error_message) {
            throw new Error(error_message);
        } else {
            return null;
        }

    }


    //======================================================================================================================

    /**
     * @static
     * Delete an item with ID in array
     * @param {object} array Array of objects with ID
     * @param {*} id Searched ID
     * @returns {boolean}
     */
    static idRemove(array, id) {//todo refactor use this not splice

        for (var i in array) {
            if (array[i].id == id) {
                array.splice(i, 1);
                return true;
            }
        }
        return false;

    }


    //======================================================================================================================


    /**
     * Iterate through 2D array
     * @static
     * @param array
     * @param {function} callback
     */
    static iterate2D(array, callback) {

        //r(array);

        for (var y = 0, yLen = array.length; y < yLen; y++) {
            for (var x = 0, xLen = array[y].length; x < xLen; x++) {

                callback(y, x);
                /*todo refactor to x,y*/

            }
        }

    }

    //======================================================================================================================

    /**
     * @static
     * @param array
     * @param from
     * @param to
     * @return {array} Removed items
     */
    static removeItems(array, from, to) {
        var rest = array.slice((to || from) + 1 || array.length);
        array.length = from < 0 ? array.length + from : from;
        return array.push.apply(array, rest);
    }


    //======================================================================================================================


    /** todo should it be under T.ArrayFunctions
     *
     * @param {object} obect
     * @param {array} path
     */
    static filterT.Path(object, path, setValue) {


        if (!is(object)) {//todo should it be here?
            throw new Error('filterT.Path: Object is undefined.');
        }

        if (!is(path.forEach)) {
            r(path);
            throw new Error('filterT.Path: T.Path is not correct array.');
        }


        for (path_i in path) {

            var object_key = path[path_i];

            if (path_i < path.length - 1 || typeof setValue == 'undefined') {

                if (typeof object[object_key] == 'undefined') {

                    return (undefined);
                    //throw new Error('filterT.Path: Key \''+object_key+'\' in path in object is undefined');
                }

                object = object[object_key];

            } else {

                object[object_key] = setValue;

                return (true);


            }

        }

        return (object);


    }


    //======================================================================================================================


    /**
     *
     * @param {Array} array
     * @returns {Array} Array containing only unique values
     */
    static unique(array) {
        var n = {}, r = [];
        for (var i = 0; i < array.length; i++) {
            if (!n[array[i]]) {
                n[array[i]] = array;
                r.push(array[i]);
            }
        }
        return r;
    }


    //======================================================================================================================


    /**
     * Creates html table from JS array
     * @param {Array} array array
     * @param {string} additional_class
     * @returns {string} html
     */
    static array2table(array, additional_class = '') {
        //todo check

        var html = '';

        var rows = array.length;
        var cols_table = array[0].length;//todo is is best solution?


        html += '<table class="' + additional_class + '">';
        for (var row = 0; row < rows; row++) {


            html += '<tr>';

            var cols = array[row].length;
            var cols_span = cols_table - cols;

            for (var col = 0; col < cols; col++) {

                if (col == cols - 1 && cols_span !== 0) {

                    html += '<td colspan="' + (cols_span + 1) + '">';

                } else {

                    html += '<td>';

                }


                html += array[row][col];
                html += '</td>';


            }

            html += '</tr>';


        }
        html += '</table>';

        return (html);

    }


};