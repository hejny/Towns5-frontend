/**
 * @author ©Towns.cz
 * @fileOverview Profile viewer
 */
//======================================================================================================================


T.Plugins.install(new T.Plugins.Viewer(
    'json-viewer'
    ,{}
    ,'object JSON'
    ,`
    <code id="viewer-json" class="full"></code>
    `
    ,function(object){


        $('#viewer-json').text(JSON.stringify(object.design.data,null,2));

        selectText('viewer-json');


    }


));