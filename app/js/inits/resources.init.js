/**
 * @author ©Towns.cz
 * @fileOverview Load my resources
 * todo (static) object of me
 */
//======================================================================================================================


var resources = new Resources({
    'wood':   10000,
    'clay':   10000,
    'stone':  10000,
    'iron':   10000
});

$(function(){


    $('#resources').html(resources.toHTML());//todo maybe sync resources with callback


});

