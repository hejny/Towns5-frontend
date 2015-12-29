/**
 * @author ©Towns.cz
 * @fileOverview Load object data from Storage
 */
//======================================================================================================================



function loadMapObjectChanges(json){
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

function saveMapObjectChangesToStorage(){

    Storage.save('map_object_changes',JSON.stringify(map_object_changes));
}

//----------------

function saveMapTerrainChangesToStorage(){

    Storage.save('map_terrain_changes',JSON.stringify(map_terrain_changes));
}


//----------------



loadMapObjectChanges(Storage.load('map_object_changes','[]'));



var map_object_changes_buffer=[];//Preview eg. walls
var map_object_changes_move=[];//Moving objects
