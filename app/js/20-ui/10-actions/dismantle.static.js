/**
 * @author Towns.cz
 * @fileOverview Action dismantle
 */
//======================================================================================================================




function dismantle(id){


    saveObject({
        id: id,
        stop_time: true//todo is thare a better solution?
    });


}



//todo create static class fro actions and UI actions
function dismantleUI(id){

    if(confirm(Locale.get('dismantle '+ArrayFunctions.id2item(objects_external,id).type+' confirm'))){//todo create better confirm

        dismantle(id);
        Map.loadMapAsync();
        hideLeftMenu();
        UI.popupWindowClose();

    }

}

