/**
 * @author ©Towns.cz
 * @fileOverview Building viewer
 */
//======================================================================================================================


T.Plugins.install(new T.Viewer(
    'building-viewer'
    ,'Prohlížeč budov'
    ,/*todo better solution*/`
    <style>
        .popup-window .content {
            padding: 4px !important;
        }
    </style>
    <div id="model-canvas"></div>
    `
    ,function(object){


        new ModelCanvas('model-canvas',object.design.data,'100%','100%',null,1);


    }


));