

//----------------Změny kumulované uživatelem na mapě


var map_terrain_changes=localStorage.getItem('map_terrain_changes');

if(!map_terrain_changes || map_terrain_changes=='')map_terrain_changes='[]';

try {
    map_terrain_changes=JSON.parse(map_terrain_changes);
}
catch(err) {
    map_terrain_changes=[];
}


//======================================================================================================================