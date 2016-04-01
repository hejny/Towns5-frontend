/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu for terrain changing
 */
//======================================================================================================================objectMenuTerrainChange
//CHANGE

function terrainChangeStart(prototypeId){

    mapSpecialCursorStart();

    updateSelectingDistance();

    terrainChanging=deepCopyObject(ArrayFunctions.id2item(object_prototypes,prototypeId));

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
    if(blockedTerrains.indexOf(terrainChanging)!=-1){
        dismantling=true;
    }
    //----------------------------

    //if(terrain_change){
    $('#selecting-distance-ctl').css('background','url(\''+appDir+'/php/terrain.php?raw&size=200&terrain=t'+(terrainChanging.design.data.image)+'\')');
    $('#selecting-distance-ctl').css('background-size','cover');
    //}


    $('#selecting-distance-ctl').show();//showing toolbar control
    $('#selecting-distance-ctl .button-icon').hide();//hiding all buttons
    //showing buttons used by actual tool
    $('#selecting-distance-plus').show();
    $('#selecting-distance-minus').show();
    $('#selecting-distance-close').show();




    $('#selecting-distance').show();
}

function terrainChangeStop(){

    terrainChanging=false;

}

