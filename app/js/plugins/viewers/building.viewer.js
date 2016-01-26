/**
 * @author ©Towns.cz
 * @fileOverview Building viewer
 */
//======================================================================================================================


T.Plugins.install(new T.Viewer(
    'building'
    ,'Prohlížeč budov'
    ,` <div id="model-canvas"></div>`
    ,function(object){


        new ModelCanvas('model-canvas',object.design.data,380,600);


    }


));