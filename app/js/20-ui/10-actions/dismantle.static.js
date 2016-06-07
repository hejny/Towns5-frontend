/**
 * @author Towns.cz
 * @fileOverview Action deleteObject
 */
//======================================================================================================================
//todo create T.UI.Actions or solve actions in towns-shared



function dismantle(id){

    deleteObject(id);

}




//todo create static class fro actions and T.UI actions
function dismantleUI(id){

    if(confirm(T.Locale.get('delete '+objects_server.getById(id).type+' confirm'))){//todo create better confirm

        deleteObject(id);
        T.UI.Map.loadMap();
        hideLeftMenu();
        T.UI.popupWindow.close();

    }

}

