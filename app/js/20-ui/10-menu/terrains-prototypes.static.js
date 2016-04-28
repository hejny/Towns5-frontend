/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu for terrain changing
 */
//======================================================================================================================T.UI.Menu.Object.menuTerrainChange
T.setNamespace('T.UI.Menu');
    
    
T.UI.Menu.Terrains = class {


    static start(prototypeId) {

        mapSpecialCursorStart();

        updateSelectingDistance();

        terrainChanging = T.User.object_prototypes.getById(prototypeId).clone();

        /*terrainChanging={
         "type": "terrain",
         "design": {
         "type": "terrain",
         "data": {
         "image": terrain,
         "size": 1//todo maybe this (terrains and buildings) should be radius
         }
         }
         };*/

        //----------------------------Dismantling by terrain changing eg. when changing to water, all building are dismantled
        if (blockedTerrains.indexOf(terrainChanging) != -1) {
            dismantling = true;
        }
        //----------------------------

        //if(terrain_change){
        $('#selecting-distance-ctl').css('background', 'url(\'' + appDir + '/php/terrain.php?raw&size=200&terrain=t' + (terrainChanging.design.data.image) + '\')');
        $('#selecting-distance-ctl').css('background-size', 'cover');
        //}


        $('#selecting-distance-ctl').show();//showing toolbar control
        $('#selecting-distance-ctl .button-icon').hide();//hiding all buttons
        //showing buttons used by actual tool
        $('#selecting-distance-plus').show();
        $('#selecting-distance-minus').show();
        $('#selecting-distance-close').show();


        $('#selecting-distance').show();
    }



    static stop() {

        terrainChanging = false;

    }


};