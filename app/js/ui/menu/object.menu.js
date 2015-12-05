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


        //r(id)
        var object_data; //todo id2i
        for(var i=0,l=map_data.length;i<l;i++){

            if(map_data[i].id==id){
                //r(map_data[i]);
                object_data=map_data[i];
                break;

            }

        }

        var objectmenu='';

        var icon,content;


        objectmenu+=objectmenu_template
            .split('%icon').join('media/image/icon/f_upgrade.png')
            .split('%title').join('Duplikat')//todo message
            .split('%content').join(htmlEncode('co co'))//todo message
            .split('%action').join(htmlEncode('alert(123);definePrototype(object_data);'));




        for(var key in object_data.actions){


            icon='media/image/icon/f_'+(object_data.actions[key].class)+'.png';
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