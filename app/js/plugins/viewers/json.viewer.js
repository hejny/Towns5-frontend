/**
 * @author ©Towns.cz
 * @fileOverview Profile viewer
 */
//======================================================================================================================


T.Plugins.install(new T.Viewer(
    'json-viewer'
    ,{}
    ,'object JSON'
    ,`
    <code id="viewer-json" class="full"></code>
    `
    ,function(object){


        $('#viewer-json').text(JSON.stringify(object,null,2));

        selectText('viewer-json');


    }


));