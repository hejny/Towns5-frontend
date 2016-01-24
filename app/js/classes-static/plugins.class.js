/**
 * @author Towns.cz
 * @fileOverview Creates static object Plugins - controller of Pages, Editors, Viewers and Buttons
 */
//======================================================================================================================


var Plugins={};


Plugins.plugins=[];


Plugins.install = function(plugin){

    this.plugins.push(plugin);

};



Plugins.uninstall = function(id){

    return ArrayFunctions.idRemove(this.plugins,id);

};