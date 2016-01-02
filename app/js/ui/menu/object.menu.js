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
            //icon: 'media/image/icon/f_upgrade.png',
            inner: '<i class="fa fa-building-o"></i>',
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


        objectmenu+=Templates.objectMenu({
            //icon: 'media/image/icon/f_create_wall.png',
            inner: '<i class="fa fa-code"></i>',
            title: 'Zdrojový kód',
            content: 'co co',
            action: 'window_open(\'object_json\')'
        });





        showLeftMenu(objectmenu);

    }else{

        hideLeftMenu();

    }



}