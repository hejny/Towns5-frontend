/**
 * @author Towns.cz
 * @fileOverview Page shows map_object_changes as raw JSON
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


    var object=map_object_changes[ArrayFunctions.id2i(map_object_changes,map_selected_ids[0])];

    window_write_header(object.name);

    var json;

    //r(map_object_changes);
    json=JSON.stringify(object,false,4);

    //alert(json);

    $('#object_json_textarea').val(json);

};

Pages.object_json.closeJS = function() {

    map_object_changes[ArrayFunctions.id2i(map_object_changes,map_selected_ids[0])]
        =
        deepCopyObject(JSON.parse($('#object_json_textarea').val()));

};


