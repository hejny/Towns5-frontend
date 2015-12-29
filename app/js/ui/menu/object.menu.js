/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu shown when user select building.
 */
//======================================================================================================================


function objectMenu(){
    r('objectMenu');


    $('#objectmenu').stop(true,true);

    if(map_selected_ids.length>0){

        //--------------------------------------------------

        var id=map_selected_ids[0];

        var i=ArrayFunctions.id2i(map_data,id);


        var objectmenu='';

        var icon,content;




        objectmenu+=Templates.objectMenu({
            icon: 'media/image/icon/f_upgrade.png',
            title: 'Duplikat',
            content: 'co co',
            action: 'definePrototype(map_data[ArrayFunctions.id2i(map_data,'+id+')]);'
        });

        objectmenu+=Templates.objectMenu({
            icon: 'media/image/icon/f_create_wall.png',
            title: 'Duplikat',
            content: 'co co',
            action: 'definePrototype(map_data[ArrayFunctions.id2i(map_data,'+id+')],\'wall\');'
        });



        for(var key in map_data[i].actions){


            icon='media/image/icon/f_'+(map_data[i].actions[key].class)+'.png';
            content='<h2>'+key+id+'</h2>' +
                '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi et ex fuga mollitia nisi obcaecati possimus sint, tenetur vitae? A aspernatur officiis quas quis ratione. Atque fugit optio suscipit?</p> ' +
                '<button>Postaviť drist!</button>';



            objectmenu+=Templates.objectMenu({
                icon: icon,
                title: '',
                content: content,
                action: ''
            });



            //$(objectmenu[i]).children('div').attr('content',content);
            //$(objectmenu[i]).children('.js-popup-action-open').scss('background','url(\''+icon+'\')');



        }


        showLeftMenu(objectmenu);

    }else{

        hideLeftMenu();

    }



}