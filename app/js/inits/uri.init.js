/**
 * @author ©Towns.cz
 * @fileOverview  Towns JS Initialization file
 */
//======================================================================================================================

r('Starting Towns...');


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~location on map


URI.read();


r('Starting Towns on '+map_x+','+map_y+'.');
r('Starting Towns with opened object '+URI.object+'.');
r('Starting Towns with opened plugin '+URI.plugin+'.');




if ("onhashchange" in window) { // event supported?
    window.onhashchange = function () {

        URI.readAndUpdate();

    }
}
else { // event not supported:

    var storedHash = window.location.hash;
    window.setInterval(function () {
        if (window.location.hash != storedHash) {
            storedHash = window.location.hash;


            URI.readAndUpdate();


        }
    }, 100);
}