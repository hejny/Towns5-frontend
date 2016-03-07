/**
 * @author ©Towns.cz
 * @fileOverview  Towns JS Initialization file
 */
//======================================================================================================================

r('Starting Towns...');


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~location on map


URI.init();

r('Starting Towns with opened object '+URI.object+'.');
r('Starting Towns with opened plugin '+URI.plugin+'.');


if(is(URI.position)){


    map_x=URI.position.x;
    map_y=URI.position.y;



}else{

    var map_x=(Math.random()-0.5)*1000000;
    var map_y=(Math.random()-0.5)*1000000;

}

if(isNaN(map_x) || isNaN(map_y)){
    throw new Error('Map x or y is NaN.');
}



console.log('Starting Towns on '+map_x+','+map_y+'.');

