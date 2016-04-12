/**
 * @author ©Towns.cz
 * @fileOverview Show story
 */
//======================================================================================================================

//todo this file should be Viewer!
T.Plugins.install(new T.Page(
    'story',
    '',
    '',
    function(){


        var i = ArrayFunctions.id2i(objects_external,map_selected_ids[0]);//todo maybe refactor array map_selected_ids[0] to map_selected_id
        r(map_selected_ids,i);


        var content=objects_external[i].content.data;

        content = $(markdown.toHTML(content));


        content.find('img').each(function(){

            var src = $(this).attr('src');
            src = URI(src)
                .removeSearch("width")
                .addSearch({ width: 800/*todo constant maybe POPUP_WINDOW_NORMAL_WIDTH*/ })
                .toString()
            ;

            $(this).attr('src',src);

        });

        content=content[0].outerHTML;



        content+=[
            '<hr>' +
            '<a class="js-popup-window-open" content="story-editor" href="#">{{story edit}}</a>' +
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
));
