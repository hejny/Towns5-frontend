/**
 * @author ©Towns.cz
 * @fileOverview  Towns JS Initialization file
 */
//======================================================================================================================

console.log('Starting Towns 5...');


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~location on map



var hash=location.hash;
hash=hash.substring(1);
hash=hash.split(',');

var x,y;
if(is(hash[0]) && is(hash[1])){

    map_x=Math.toFloat(hash[0]);
    map_y=Math.toFloat(hash[1]);



}else
if(Storage.is('map_x') && Storage.is('map_y')){

    var map_x=Math.toFloat(Storage.load('map_x'));
    var map_y=Math.toFloat(Storage.load('map_y'));

}else{

    var map_x=(Math.random()-0.5)*1000000;
    var map_y=(Math.random()-0.5)*1000000;

}

if(isNaN(map_x))map_x=0;
if(isNaN(map_y))map_y=0;
r(map_x,map_y);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~updateMapLocationHash

function updateMapLocationHash(){


    location.hash='#'+(Math.round(map_x))+','+(Math.round(map_y));
    Storage.save('map_x',map_x);
    Storage.save('map_y',map_y);


}


