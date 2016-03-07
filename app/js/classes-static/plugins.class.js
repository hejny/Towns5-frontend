/**
 * @author Towns.cz
 * @fileOverview Creates static object Plugins - controller of Pages, Editors, Viewers and Buttons
 */
//======================================================================================================================


Towns.Plugins={
    plugins: []
};


Towns.Plugins.install = function(plugin){
    r('Installing plugin '+plugin.uri);


    if(
        plugin instanceof Towns.Page ||
        plugin instanceof Towns.Viewer ||
        plugin instanceof Towns.Editor
    ){


        if(!is(plugin.uri)){

            throw new Error('Plugin must contain uri!');
        }


        this.plugins.push(plugin);

    }else
    {
        throw new Error('Unknown plugin type.');
    }


};



Towns.Plugins.uninstall = function(id){
    //todo
};





Towns.Plugins.open = function(uri){

    var args = [].slice.call(arguments).splice(1);
    //r(args);

    for(i in this.plugins){

        //r(this.plugins[i].uri,uri);

        if(this.plugins[i].uri==uri){


            this.plugins[i].open.apply(this.plugins[i],args);
            return(true);

        }
    }


    throw new Error('Plugin '+uri+' do not exists.');

};




Towns.Plugins.search = function(action,object){

    var possible=[];

    for(i in this.plugins){

        if(
            (action=='edit' && this.plugins[i] instanceof Towns.Editor) ||
            (action=='view' && this.plugins[i] instanceof Towns.Viewer)
        ){

            var is_possible=true;
            for(key in this.plugins[i].conditions){

                if(object[key] != this.plugins[i].conditions[key]){
                    var is_possible=false;
                    break;
                }

            }

            if(is_possible)
                possible.push(this.plugins[i].uri);
        }


    }

    return(possible);

};
