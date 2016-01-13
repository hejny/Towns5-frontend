/**
 * @author ©Towns.cz
 * @fileOverview Display story
 */
//======================================================================================================================


Pages.story={};
Pages.story.header='';


//======================================================================================================================

Pages.story.openJS = function(){


    var i = ArrayFunctions.id2i(objects_external,map_selected_ids[0]);//todo maybe refactor array map_selected_ids[0] to map_selected_id
    r(map_selected_ids,i);


    var content=objects_external[i].content.data;

    content = markdown.toHTML(content);



    content+=[
        '<hr>' +
        '<a class="js-popup-window-open" content="story_editor" href="#">{{story edit}}</a>' +
        '<br>' +
        '<a onclick="dismantleUI('+map_selected_ids[0]+')" href="#">{{story delete}}</a>'
    ].join('');

    window_write_header(objects_external[i].name);
    window_write_content(content);



};

//======================================================================================================================

Pages.story.closeJS = function(){

    map_selected_ids=[];
    Map.loadMap();

};

