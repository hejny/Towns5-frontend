/**
 * @author ©Towns.cz
 * @fileOverview Page shows map_object_changes as raw JSON
 */
//======================================================================================================================



Pages.data_json={};


Pages.data_json.header='Export to JSON';

Pages.data_json.content= `

        <style>
         #data_json_textarea{
            width: 100%;
            height: 100%;
         }
        </style>
        <textarea id="data_json_textarea"></textarea>
`;



Pages.data_json.openJS = function(){


    var json;

    //r(map_object_changes);
    json=JSON.stringify(map_object_changes,false,4);

    //alert(json);

    $('#data_json_textarea').val(json);

};

Pages.data_json.closeJS = function() {

    loadMapObjectChanges($('#data_json_textarea').val());
    saveMapObjectChangesToStorage();

};


