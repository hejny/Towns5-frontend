
//todo header

Pages.storyread={"header": 'Příběh'};


//======================================================================================================================

Pages.storyread.openJS = function(){


    var i = ArrayFunctions.id2i(map_object_changes,map_selected_ids[0]);//todo maybe refactor array map_selected_ids[0] to map_selected_id
    r(map_selected_ids,i);


    var content=map_object_changes[i].content.data;

    content = markdown.toHTML(content);



    content+=[
        '<hr>' +
        '<a class="js-popup-window-open" content="storywrite" href="#">Upravit</a>' +
        '<br>' +
        '<a onclick="deleteStory('+map_selected_ids[0]+')" href="#">Smazat</a>'
    ].join('');

    window_write_header(map_object_changes[i].name);
    window_write_content(content);



};

//======================================================================================================================

Pages.storyread.closeJS = function(){

    map_selected_ids=[];
    Map.loadMap();

};

//======================================================================================================================



function deleteStory(id){

    if(confirm('Opracdu smazat???')){//todo create better confirm //todo use locale

        dismantle(id);
        Map.loadMapAsync();
        window_close();

    }

}




