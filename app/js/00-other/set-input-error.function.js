//todo header


function setInputError(element,message){


    element.setCustomValidity(message);


    /*setTimeout(function () {
        element.setCustomValidity(message);
    },100);

    setTimeout(function () {
        element.setCustomValidity(message);
    },500);*/



}



function unsetInputError(element){


    element.setCustomValidity('');
    /*setTimeout(function () {
        element.setCustomValidity('');
    },100);*/

}