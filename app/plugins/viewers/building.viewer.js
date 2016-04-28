/**
 * @author ©Towns.cz
 * @fileOverview Building viewer
 */
//======================================================================================================================


T.Plugins.install(new T.Plugins.Viewer(
    'building-viewer'
    ,{
        type: 'building'
    }
    ,'Vzhled budovy'
    ,/*todo better solution*/`
    <style>
        .popup-window .content {
            padding: 4px !important;
        }
    </style>
    <div id="model-canvas"></div>
    `
    ,function(object){


        new T.ModelCanvas('model-canvas',object.design.data,'100%','100%',null,1);


    }


));