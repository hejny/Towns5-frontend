/**
 * @author Towns.cz
 * @fileOverview Action dismantle
 */
//======================================================================================================================
//todo create T.UI.Actions or solve actions in towns-shared



function dismantle(id){


    r('saveObject: Deleting object');


    T.TownsAPI.townsAPI.delete('objects/'+id,function(response){

        r('object '+id+' was deleted in server');

    });

    objects_external.removeId(id);


}



//todo create static class fro actions and T.UI actions
function dismantleUI(id){

    if(confirm(T.Locale.get('dismantle '+T.ArrayFunctions.id2item(objects_external,id).type+' confirm'))){//todo create better confirm

        dismantle(id);
        T.UI.Map.loadMapAsync();
        hideLeftMenu();
        T.UI.popupWindow.close();

    }

}

