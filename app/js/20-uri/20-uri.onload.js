/**
 * @author ©Towns.cz
 * @fileOverview  Towns JS Initialization file
 */
//======================================================================================================================

r('Starting Towns...');


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~location on map


T.URI.read();


r('Starting Towns on '+T.UI.Map.map_center.x+','+T.UI.Map.map_center.y+'.');





$(function(){

    T.URI.plugin=false;
    T.URI.object=false;
    T.URI.readAndUpdate();
    r('Starting Towns with opened object '+T.URI.object+'.');
    r('Starting Towns with opened plugin '+T.URI.plugin+'.');

    if(environment!='develop' && !T.URI.plugin){
        T.Plugins.open('home');
    }




});



$(window).on('popstate', function() {

    T.URI.readAndUpdate();

});



