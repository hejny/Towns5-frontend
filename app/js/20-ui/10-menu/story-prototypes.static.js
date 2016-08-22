/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu shown to create story.
 */
//======================================================================================================================
TOWNS.setNamespace('UI.Menu');


TOWNS.UI.Menu.Story = class {


    static start(prototypeId) {


        var story = TOWNS.User.object_prototypes.getById(prototypeId).clone();


        TOWNS.Map.scene.mode('CREATING_POINT',story,function(position,rotation,size){

            story.x=position.x;
            story.y=position.y;


            create(story,function(){

                TOWNS.Plugins.open('story-editor',1,story.id);


            });



        });




        /*

        TOWNS.UI.Menu.storyWriting = TOWNS.User.object_prototypes.getById(prototypeId).clone();

        $('#map_drag').css('cursor', 'Crosshair');


        $('#selecting-distance-ctl').css('background', '');//neutral background
        $('#selecting-distance-ctl').show();//showing toolbar control
        $('#selecting-distance-ctl .button-icon').hide();//hiding all buttons
        //showing buttons used by actual tool
        $('#selecting-distance-close').show();*/


    }

    /*
    //todo in doc this funcs. dont use directly only via mapSpecialCursorStop();
    static stop() {


        $('#selecting-distance-ctl').hide();

        $('#map_drag').css('cursor', 'Auto');
        TOWNS.UI.Menu.storyWriting = false;

    }*/


};

