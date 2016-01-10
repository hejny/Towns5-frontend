/**
 * @author ©Towns.cz
 * @fileOverview Load object data from Storage
 */
//======================================================================================================================


function loadMapObjectChanges(json){//todo refactor rename to localChanges
    try {
        map_object_changes=JSON.parse(json);


        for(var i in map_object_changes){

            if(is(map_object_changes[i].design.data))
                map_object_changes[i].design.data=new Model(map_object_changes[i].design.data);
        }


    }
    catch(err) {
        map_object_changes=[];
    }
}


//----------------

function saveMapObjectChangesToStorage(){//todo refactor rename to localChanges

    Storage.save('map_object_changes',JSON.stringify(map_object_changes));
}

//----------------


loadMapObjectChanges(Storage.load('map_object_changes','[]'));



var map_object_changes_buffer=[];//Preview eg. walls
var map_object_changes_move=[];//Moving objects
