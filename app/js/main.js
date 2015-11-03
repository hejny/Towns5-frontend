/**

     ███╗   ███╗ █████╗ ██╗███╗   ██╗
     ████╗ ████║██╔══██╗██║████╗  ██║
     ██╔████╔██║███████║██║██╔██╗ ██║
     ██║╚██╔╝██║██╔══██║██║██║╚██╗██║
     ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║
     ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝
     © Towns.cz

 * @fileOverview Towns JS Initialization file

 */


//======================================================================================================================


console.log('Starting Towns 5...');


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~location on map



var hash=location.hash;
hash=hash.substring(1);
hash=hash.split(',');

var x,y;
if(is(hash[0]) && is(hash[1])){

    map_x=parseFloat(hash[0]);
    map_y=parseFloat(hash[1]);

    if(isNaN(map_x))map_x=0;
    if(isNaN(map_y))map_y=0;


}else
if(is(localStorage.getItem('map_x')) && is(localStorage.getItem('map_y'))){

    var map_x=parseFloat(localStorage.getItem('map_x'));
    var map_y=parseFloat(localStorage.getItem('map_y'));

}else{

    var map_x=(Math.random()-0.5)*1000000;
    var map_y=(Math.random()-0.5)*1000000;

}


r(map_x,map_y);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~updateMapLocationHash

function updateMapLocationHash(){


    location.hash='#'+(Math.round(map_x))+','+(Math.round(map_y));
    localStorage.setItem('map_x',map_x);
    localStorage.setItem('map_y',map_y);


}


