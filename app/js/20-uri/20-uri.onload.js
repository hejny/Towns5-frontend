/**
 * @author ©Towns.cz
 * @fileOverview  Towns JS Initialization file
 */
//======================================================================================================================

r('Starting Towns...');


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~location on map


TOWNS.URI.read();


r('Starting Towns on '+map_center.x+','+map_center.y+'.');





$(function(){

    TOWNS.URI.plugin=false;
    TOWNS.URI.object=false;
    TOWNS.URI.readAndUpdate();
    r('Starting Towns with opened object '+TOWNS.URI.object+'.');
    r('Starting Towns with opened plugin '+TOWNS.URI.plugin+'.');

    if(environment!='develop' && !TOWNS.URI.plugin){
        TOWNS.Plugins.open('home');
    }




});



$(window).on('popstate', function() {

    TOWNS.URI.readAndUpdate();

});



