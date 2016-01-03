/**
 * @author Towns.cz
 * @fileOverview Action dismantle
 */
//======================================================================================================================




function dismantle(id){

    var i = ArrayFunctions.id2i(map_object_changes,id);

    map_object_changes.splice(i,1);
    saveMapObjectChangesToStorage();

}



//todo create static class fro actions and UI actions
function dismantleUI(id){

    if(confirm(Locale.get('types.'+ArrayFunctions.id2item(map_object_changes,id).type+'.delete_confirm'))){//todo create better confirm

        dismantle(id);
        Map.loadMapAsync();
        hideLeftMenu();
        window_close();

    }

}

