/**
 * @author ©Towns.cz
 * @fileOverview  Towns JS Initialization file
 */
//======================================================================================================================

r('Starting Towns...');


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~location on map


T.URI.read();


r('Starting Towns on '+T.UI.Map.map_center.x+','+T.UI.Map.map_center.y+'.');
r('Starting Towns with opened object '+T.URI.object+'.');
r('Starting Towns with opened plugin '+T.URI.plugin+'.');




if ("onhashchange" in window) { // event supported?
    window.onhashchange = function () {

        T.URI.readAndUpdate();

    };
}
else { // event not supported:

    var storedHash = window.location.hash;
    window.setInterval(function () {
        if (window.location.hash != storedHash) {
            storedHash = window.location.hash;


            T.URI.readAndUpdate();


        }
    }, 100);
}