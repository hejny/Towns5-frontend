/**
 * @author ©Towns.cz
 * @fileOverview Creates object Interval with static methods
 */
//======================================================================================================================


var Interval={};


Interval.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

//======================================================================================================================

Interval.maxRunPerMs = function(func, maxwait) {
    var timeout,time_started=0;

    return function() {
        var context = this, args = arguments;

        var wait = maxwait - (Date.now()-time_started);
        if(wait<1)wait=1;

        var later = function() {
            timeout = null;
            func.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        time_started=Date.now();


    };
};