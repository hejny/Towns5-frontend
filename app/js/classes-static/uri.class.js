/**
 * @author ©Towns.cz
 * @fileOverview Creates URI
 */
//======================================================================================================================

var URI={
    'object':'',
    'plugin':'',
    //'position': false
};


/**
 * Initialize URI pathname from location
 */
URI.read = function(){

    //-------------------
    var pathname=window.location.pathname;

    pathname=pathname.split('/').join(' ');
    pathname=$.trim(pathname);

    pathname=pathname.split(' ');

    /*pathname.map(function(item){
        return item.split('/').join('');

    });*/

    if(pathname.length==1){
        this.object=pathname[0];
    }else
    if(pathname.length==2){
        this.plugin=pathname[0];
        this.object=pathname[1];
    }else
    {
        throw new Error('URI Pathname can contain max 2 strings.');
    }

    //-------------------
    var hash=window.location.hash;

    hash=hash.substring(1);
    hash=hash.split(',');

    if(hash.length==2){

        var position=new Position(Math.toFloat(hash[0]),Math.toFloat(hash[1]));
    }

    //-------------------


    if(is(position)){

        map_x=position.x;//todo Static object Map
        map_y=position.y;

    }else{

        map_x=(Math.random()-0.5)*1000000;
        map_y=(Math.random()-0.5)*1000000;

    }

    if(isNaN(map_x) || isNaN(map_y)){
        throw new Error('Map x or y is NaN.');
    }

    //-------------------

};


//todo jsdoc
URI.readAndUpdate = function(){

    r('Reading And Updating URI');
    this.read();
    Map.loadMapAsync();

};


/**
 * Updates window.location after updating object, plugin or position
 */
URI.write = function(){

    var pathname = '';
    if(this.plugin) pathname += '/'+this.plugin;
    if(this.object) pathname += '/'+this.object;

    if(pathname=='') pathname='/';


    if(isDefined(map_x)){
        //var hash = '#'+Math.round(URI.position.x)+','+Math.round(URI.position.y);
        var hash = '#'+Math.round(map_x)+','+Math.round(map_y);
    }else{
        var hash = '';
    }



    window.history.pushState('', "Towns", window.location.origin+pathname+hash);

};




