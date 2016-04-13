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




        ['view','edit'].forEach(function(action){


            var possible =Towns.Plugins.search(action,ArrayFunctions.id2item(objects_external,id));
            possible=possible.map(function(item){
                return(`<button onclick="Towns.Plugins.open('`+item+`',1,'`+id+`')">`+Locale.get('plugin',item,'open',object.type,object.subtype,action)+`</button>`);
            });
            possible=possible.join('');
            objectmenu+=Templates.objectMenu({
                icon: '/media/image/icons/'+action+'.svg',
                icon_size: 0.8,
                title: Locale.get(object.type,object.subtype,action),
                content: Locale.get(object.type,object.subtype,action,'description')+'<br>'+possible
            });

        });



        objectmenu+=Templates.objectMenu({
            icon: '/media/image/icons/clone.svg',
            icon_size: 0.8,
            title: Locale.get(object.type,object.subtype,'clone'),
            content:Locale.get(object.type,object.subtype,'clone','description'),
            action: 'buildingStart(\''+object._prototypeId+'\');'
        });


        objectmenu+=Templates.objectMenu({
            icon: '/media/image/icons/dismantle.svg',
            icon_size: 0.8,
            title: Locale.get(object.type,object.subtype,'dismantle'),
            content: Locale.get(object.type,object.subtype,'dismantle','description'),
            action: 'dismantleUI(\''+id+'\');'
        });






        showLeftMenu(objectmenu);

    }else{

        hideLeftMenu();

    }



}