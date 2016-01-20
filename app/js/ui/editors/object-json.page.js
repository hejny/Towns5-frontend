/**
 * @author Towns.cz
 * @fileOverview Page shows objects_external as raw JSON
 */
//======================================================================================================================



Pages.object_json={};


Pages.object_json.header='JSON object';

Pages.object_json.content= `

        <style>
         #object_json_textarea{
            width: 100%;
            height: 100%;
         }
        </style>
        <textarea id="object_json_textarea"></textarea>
`;



Pages.object_json.openJS = function(){


    var object=objects_external[ArrayFunctions.id2i(objects_external,map_selected_ids[0])];//todo loadObject

    UI.popupWindowTitle(object.name);

    var json;

    //r(objects_external);
    json=JSON.stringify(object,false,4);

    //alert(json);

    $('#object_json_textarea').val(json);

};

Pages.object_json.closeJS = function() {


    saveObject(deepCopyObject(JSON.parse($('#object_json_textarea').val())));

};


