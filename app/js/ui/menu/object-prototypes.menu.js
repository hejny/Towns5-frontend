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
    //------------------------


    object_prototypes.forEach(function(object){


        if(object.type==type && (!is(subtype) || object.subtype==subtype)){

            //----------------------------------------------------

            //------------------------building
            if(object.type=='building'){
                var icon=object.design.data.createIcon(50);

                var title=object.name;
                var content='popis budovy';
                var action='buildingStart(\''+object.id+'\');';//todo refactor all object.id to object._id

            }
            //------------------------

            //------------------------story
            if(object.type=='story'){

                var icon='media/image/terrain/t1.png';


                var content='';
                var action='storyWritingStart(\''+object.id+'\');';

            }
            //------------------------


            object_menu_html+=Templates.objectMenu({
                icon: icon,
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