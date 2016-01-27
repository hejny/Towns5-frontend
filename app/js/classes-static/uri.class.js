/**
 * @author ©Towns.cz
 * @fileOverview Creates URI
 */
//======================================================================================================================

var URI={
    'object':'',
    'plugin':'',
    'position': false
};


/**
 * Initialize URI pathname from location
 */
URI.init = function(){

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

        this.position=new Position(Math.toFloat(hash[0]),Math.toFloat(hash[1]));
    }

    //-------------------
};



/**
 * Updates window.location after updating object, plugin or position
 */
URI.update = function(){

    var pathname = '';
    if(this.plugin) pathname += '/'+this.plugin;
    if(this.object) pathname += '/'+this.object;

    if(pathname=='') pathname='/';



    var hash = '#'+Math.round(URI.position.x)+','+Math.round(URI.position.y);


    window.history.pushState('', "Towns", window.location.origin+pathname+hash);

};




