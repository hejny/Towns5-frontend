/**
 * @author Towns.cz
 * @fileOverview Action dismantle
 */
//======================================================================================================================
//todo create T.UI.Actions or solve actions in towns-shared



function dismantle(id){


    saveObject({
        id: id,
        stop_time: true//todo is thare a better solution?
    });


}



//todo create static class fro actions and T.UI actions
function dismantleUI(id){

    if(confirm(T.Locale.get('dismantle '+T.ArrayFunctions.id2item(objects_external,id).type+' confirm'))){//todo create better confirm

        dismantle(id);
        Map.loadMapAsync();
        hideLeftMenu();
        T.UI.popupWindow.close();

    }

}

