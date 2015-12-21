/**
 * Created by hejny on 4.12.15.
 */
//todo header


//----------------Změny kumulované uživatelem na objektech (budovy, pribehy,...)


var map_object_changes=Storage.load('map_object_changes','[]');

/*var map_object_changes_=map_object_changes;
 setTimeout(function(){
 window_open('',map_object_changes_);
 },2000);*/



try {
    map_object_changes=JSON.parse(map_object_changes);

    /* todo do we need this?*/
    for(var i in map_object_changes){

        if(is(map_object_changes[i].design.data))
            map_object_changes[i].design.data=new Model(map_object_changes[i].design.data);
    }


}
catch(err) {
    map_object_changes=[];
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


var map_object_changes_buffer=[];//Preview eg. walls
var map_object_changes_move=[];//Moving objects
