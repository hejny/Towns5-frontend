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

        var object=ArrayFunctions.id2item(objects_external,id);


        var objectmenu='';

        var icon,content;



        var possible =Towns.Plugins.search('view',ArrayFunctions.id2item(objects_external,id));
        possible=possible.map(function(item){
            return(`<button onclick="Towns.Plugins.open('`+item+`',1,'`+id+`')">`+Locale.get('plugin',item,'open',object.type,object.subtype,'view')+`</button>`);
        });
        possible=possible.join('');
        objectmenu+=Templates.objectMenu({
            icon: '/media/image/icons/view.svg',
            icon_size: 0.8,
            title: Locale.get('dismantle building'),
            content: Locale.get(object.type,object.subtype,'view')+possible
        });



        objectmenu+=Templates.objectMenu({
            icon: '/media/image/icons/clone.svg',
            icon_size: 0.8,
            title: Locale.get('dismantle building'),
            content: Locale.get('dismantle building description'),
            action: 'buildingStart(\''+object._prototypeId+'\');'
        });


        objectmenu+=Templates.objectMenu({
            icon: '/media/image/icons/dismantle.svg',
            icon_size: 0.8,
            title: Locale.get('dismantle building'),
            content: Locale.get('dismantle building description'),
            action: 'dismantleUI(\''+id+'\');'
        });

        /*objectmenu+=Templates.objectMenu({
            icon: 'media/image/icons/define_building_main.svg.svg',
            icon_size: 0.8,
            title: Locale.get('define prototype building main'),
            content: Locale.get('define prototype building main description'),
            action: 'definePrototypeUI(map_data[ArrayFunctions.id2i(map_data,'+id+')]);'
        });

        objectmenu+=Templates.objectMenu({
            icon: 'media/image/icons/define_building_wall.svg',
            icon_size: 0.8,
            title: Locale.get('define prototype building wall'),
            content: Locale.get('define prototype building wall description'),
            action: 'definePrototypeUI(map_data[ArrayFunctions.id2i(map_data,'+id+')],\'wall\');'
        });*/









        /*objectmenu+=Templates.objectMenu({
            icon: 'media/image/icons/source.svg',
            icon_size: 0.8,
            title: Locale.get('object json'),
            content: Locale.get('object json description'),
            action: 'Towns.Plugins.Pages.open(\'object_json\')'
        });
*/




        showLeftMenu(objectmenu);

    }else{

        hideLeftMenu();

    }



}