/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu shown to create story.
 */
//======================================================================================================================




function objectPrototypesMenu(type,subtype=false){

    var object_menu_html='';

    //------------------------Extra buttons
    if(type=='building' && subtype=='block'){
        object_menu_html+=Templates.objectMenu({
            icon: 'media/image/icons/add.svg',
            icon_size: 0.55,
            title: '',
            content: content,
            action: `mapSpecialCursorStop();window_open('block_editor');`
        });
    }

    if(type=='building' && subtype=='main'){
        object_menu_html+=Templates.objectMenu({
            icon: 'media/image/icons/add.svg',
            icon_size: 0.55,
            title: '',
            content: content,
            action: `mapSpecialCursorStop();window_open('building_editor');`
        });
    }
    //------------------------.


    object_prototypes.forEach(function(object){


        if(object.type==type && (!is(subtype) || object.subtype==subtype)){

            //----------------------------------------------------


             var icon,
                icon_size=1,
                title=object.name,
                content='',
                action=''
            ;


            //------------------------building
            if(object.type=='building'){

                icon=object.design.data.createIcon(50);
                content='popis budovy';
                action='buildingStart(\''+object.id+'\');';//todo refactor all object.id to object._id

            }
            //------------------------

            //------------------------terrain
            if(object.type=='terrain'){

                icon=appDir+'/php/terrain.php?raw&size=60&terrain=t'+(object.design.data.image);
                action='terrainChangeStart(\''+object.id+'\');';
                icon_size=1.2;

            }
            //------------------------

            //------------------------story
            if(object.type=='story'){

                icon='media/image/terrain/t1.png';
                action='storyWritingStart(\''+object.id+'\');';

            }
            //------------------------


            object_menu_html+=Templates.objectMenu({
                icon: icon,
                icon_size: icon_size,
                selectable: true,
                title: title,
                content: content,
                action: action
            });


            //----------------------------------------------------

        }


    });

    showLeftMenu(object_menu_html);

}