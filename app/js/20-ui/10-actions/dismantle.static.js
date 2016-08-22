/**
 * @author Towns.cz
 * @fileOverview Action deleteObject
 */
//======================================================================================================================
//todo create TOWNS.UI.Actions or solve actions in towns-shared



function dismantle(id){

    deleteObject(id);

}




//todo create static class fro actions and TOWNS.UI actions
function dismantleUI(id){

    if(confirm(TOWNS.Locale.get('delete '+objects_server.getById(id).type+' confirm'))){//todo create better confirm

        deleteObject(id);
        TOWNS.Map.loadMap();
        hideLeftMenu();
        TOWNS.UI.popupWindow.close();

    }

}

