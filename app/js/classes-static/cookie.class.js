/**
 * @author ©Towns.cz
 * @fileOverview Creates object ArrayFunctions with static methods
 */
//======================================================================================================================


//todo where this functions should be?

function changeLanguage(LANGUAGE){
    setCookie('LANGUAGE',LANGUAGE);
    location.reload();
}
//======================================================================================================================

function setCookie(cname, cvalue, exdays) {
    exdays=cParam(exdays,356*5);

    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


//======================================================================================================================




