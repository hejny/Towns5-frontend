/**
 * @author Towns.cz
 * @fileOverview Creates object Interval with static methods
 */
//======================================================================================================================


var Interval={};

/**
 * Creates the function that runs callback only after last call and wait ms
 * @static
 * @param {function} callback
 * @param {number} wait ms
 * @param {bool} immediate call
 * @return {Function}
 */
Interval.debounce = function(callback, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) callback.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) callback.apply(context, args);
    };
};

//======================================================================================================================

/**
 * Calls callback maximum 1/minwait times per ms
 * @static
 * @param {function} callback
 * @param {number} minwait
 * @return {Function}
 */
Interval.maxRunPerMs = function(callback, minwait) {
    var timeout,time_started=0;

    return function() {
        var context = this, args = arguments;

        var wait = minwait - (Date.now()-time_started);
        if(wait<1)wait=1;

        var later = function() {
            timeout = null;
            callback.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        time_started=Date.now();


    };
};