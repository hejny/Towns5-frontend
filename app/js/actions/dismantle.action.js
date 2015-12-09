//todo headers



function dismantle(id){

    var i = ArrayFunctions.id2i(map_object_changes,id);

    map_object_changes.splice(i,1);
    saveMapObjectChangesToStorage();

}