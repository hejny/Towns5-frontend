/**

 ███████╗████████╗ ██████╗ ██████╗  █████╗  ██████╗ ███████╗
 ██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗██╔══██╗██╔════╝ ██╔════╝
 ███████╗   ██║   ██║   ██║██████╔╝███████║██║  ███╗█████╗
 ╚════██║   ██║   ██║   ██║██╔══██╗██╔══██║██║   ██║██╔══╝
 ███████║   ██║   ╚██████╔╝██║  ██║██║  ██║╚██████╔╝███████╗
 ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝

 © Towns.cz

 * @fileOverview Left tool menu for terrain changing

 */

//======================================================================================================================
var Storage={};


Storage.load = function(key,def){

    var value=localStorage.getItem(key) || def;
    return(value);

};


Storage.is = function(key){

    var value=localStorage.getItem(key) || false;
    return(is(value));

};




Storage.save = function(key,value){

    localStorage.setItem(key,value)

};


Storage.restart = function(){

    localStorage.clear();

};


