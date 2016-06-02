/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu for terrain changing
 */
//======================================================================================================================T.UI.Menu.Object.menuTerrainChange
T.setNamespace('UI.Menu');
    
    
T.UI.Menu.Terrains = class {


    static start(prototypeId) {


        var terrain = T.User.object_prototypes.getById(prototypeId).clone();


        T.UI.Map.scene.attachObjectCreating(terrain,function(position,rotation,size){

            terrain.x=position.x;
            terrain.y=position.y;

            terrain.design.data.size=size;


            create(terrain,function(){



                r('Building created on server!!!');

            });

            T.UI.Map.loadMap();



        });




        /*mapSpecialCursorStart();

        updateSelectingDistance();

        T.UI.Menu.terrainChanging = T.User.object_prototypes.getById(prototypeId).clone();


        //----------------------------Dismantling by terrain changing eg. when changing to water, all building are dismantled
        if (blockedTerrains.indexOf(T.UI.Menu.terrainChanging) != -1) {
            T.UI.Menu.dismantling = true;
        }
        //----------------------------

        //if(terrain_change){
        $('#selecting-distance-ctl').css('background', 'url(\'' + appDir + '/php/terrain.php?raw&size=200&terrain=t' + (T.UI.Menu.terrainChanging.design.data.image) + '\')');
        $('#selecting-distance-ctl').css('background-size', 'cover');
        //}


        $('#selecting-distance-ctl').show();//showing toolbar control
        $('#selecting-distance-ctl .button-icon').hide();//hiding all buttons
        //showing buttons used by actual tool
        $('#selecting-distance-plus').show();
        $('#selecting-distance-minus').show();
        $('#selecting-distance-close').show();


        $('#selecting-distance').show();*/
    }



    static stop() {

        T.UI.Menu.terrainChanging = false;

    }


};