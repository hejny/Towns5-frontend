/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu for terrain changing
 */
//======================================================================================================================TOWNS.UI.Menu.Object.menuTerrainChange
TOWNS.setNamespace('UI.Menu');
    
    
TOWNS.UI.Menu.Terrains = class {


    static start(prototypeId) {


        var terrain = TOWNS.User.object_prototypes.getById(prototypeId).clone();


        TOWNS.Map.scene.mode('CREATING_CIRCLE',terrain,function(position,rotation,size){

            terrain.x=position.x;
            terrain.y=position.y;

            terrain.design.data.size=size;


            create(terrain,function(){



                r('Building created on server!!!');

            });

            TOWNS.Map.loadMap();



        });




        /*mapSpecialCursorStart();

        updateSelectingDistance();

        TOWNS.UI.Menu.terrainChanging = TOWNS.User.object_prototypes.getById(prototypeId).clone();


        //----------------------------Dismantling by terrain changing eg. when changing to water, all building are dismantled
        if (blockedTerrains.indexOf(TOWNS.UI.Menu.terrainChanging) != -1) {
            TOWNS.UI.Menu.dismantling = true;
        }
        //----------------------------

        //if(terrain_change){
        $('#selecting-distance-ctl').css('background', 'url(\'' + appDir + '/php/terrain.php?raw&size=200&terrain=t' + (TOWNS.UI.Menu.terrainChanging.design.data.image) + '\')');
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

        TOWNS.UI.Menu.terrainChanging = false;

    }


};