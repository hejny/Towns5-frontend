/**

      ██████╗ ██████╗      ██╗███████╗ ██████╗████████╗    ███╗   ███╗███████╗███╗   ██╗██╗   ██╗
     ██╔═══██╗██╔══██╗     ██║██╔════╝██╔════╝╚══██╔══╝    ████╗ ████║██╔════╝████╗  ██║██║   ██║
     ██║   ██║██████╔╝     ██║█████╗  ██║        ██║       ██╔████╔██║█████╗  ██╔██╗ ██║██║   ██║
     ██║   ██║██╔══██╗██   ██║██╔══╝  ██║        ██║       ██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║
     ╚██████╔╝██████╔╝╚█████╔╝███████╗╚██████╗   ██║       ██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝
      ╚═════╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝       ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝
     © Towns.cz

 * @fileOverview Left tool menu shown when user select building.

 */


//======================================================================================================================


function objectMenu(){
    r('objectMenu');


    $('#objectmenu').stop(true,true);

    if(map_selected_ids.length>0){

        //--------------------------------------------------

        var id=map_selected_ids[0];

        var i=id2i(map_data,id);


        var objectmenu='';

        var icon,content;


        objectmenu+=objectmenu_template
            .split('%icon').join('media/image/icon/f_upgrade.png')
            .split('%title').join('Duplikat')//todo message
            .split('%content').join(htmlEncode('co co'))//todo message
            .split('%action').join(htmlEncode('definePrototype(map_data[id2i(map_data,'+id+')]);'));


        objectmenu+=objectmenu_template
            .split('%icon').join('media/image/icon/f_create_wall.png')
            .split('%title').join('Duplikat')//todo message
            .split('%content').join(htmlEncode('co co'))//todo message
            .split('%action').join(htmlEncode('definePrototype(map_data[id2i(map_data,'+id+')],\'wall\');'));



        for(var key in map_data[i].actions){


            icon='media/image/icon/f_'+(map_data[i].actions[key].class)+'.png';
            content='<h2>'+key+id+'</h2>' +
                '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi et ex fuga mollitia nisi obcaecati possimus sint, tenetur vitae? A aspernatur officiis quas quis ratione. Atque fugit optio suscipit?</p> ' +
                '<button>Postaviť drist!</button>';


            objectmenu+=objectmenu_template
                .split('%icon').join(icon)
                .split('%content').join(htmlEncode(content));

            //$(objectmenu[i]).children('div').attr('content',content);
            //$(objectmenu[i]).children('.js-popup-action-open').css('background','url(\''+icon+'\')');



        }


        showLeftMenu(objectmenu);

    }else{

        hideLeftMenu();

    }



}