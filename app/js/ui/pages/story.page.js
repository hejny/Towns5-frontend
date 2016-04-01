/**
 * @author ©Towns.cz
 * @fileOverview Show story
 */
//======================================================================================================================


Pages.story = new Page(
    '',
    '',
    function(){


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

        UI.popupWindowTitle(objects_external[i].name);
        UI.popupWindowContent(content);



    },
    function(){

        map_selected_ids=[];
        Map.loadMap();

    }
);
