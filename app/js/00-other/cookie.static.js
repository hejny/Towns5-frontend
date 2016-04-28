/**
 * @author Towns.cz
 * @fileOverview Creates object T.ArrayFunctions with static methods
 */
//======================================================================================================================


//todo where this functions should be?

function changelanguage(language){
    setCookie('language',language);
    location.reload();
}
//======================================================================================================================

function setCookie(cname, cvalue, exdays=(356*5)) {

    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


//======================================================================================================================




