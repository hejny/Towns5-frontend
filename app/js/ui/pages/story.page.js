/**
 * @author ©Towns.cz
 * @fileOverview Display story
 */
//======================================================================================================================


Pages.story={};
Pages.story.header='';


//======================================================================================================================

Pages.story.openJS = function(){


    var i = ArrayFunctions.id2i(map_object_changes,map_selected_ids[0]);//todo maybe refactor array map_selected_ids[0] to map_selected_id
    r(map_selected_ids,i);


    var content=map_object_changes[i].content.data;

    content = markdown.toHTML(content);



    content+=[
        '<hr>' +
        '<a class="js-popup-window-open" content="story_editor" href="#">{{story edit}}</a>' +
        '<br>' +
        '<a onclick="dismantleUI('+map_selected_ids[0]+')" href="#">{{story delete}}</a>'
    ].join('');

    window_write_header(map_object_changes[i].name);
    window_write_content(content);



};

//======================================================================================================================

Pages.story.closeJS = function(){

    map_selected_ids=[];
    Map.loadMap();

};

