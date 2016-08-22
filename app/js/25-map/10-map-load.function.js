/**
 * @author ©Towns.cz
 * @fileOverview Additional methods to object Map
 */
//======================================================================================================================
TOWNS.setNamespace('Map');


//todo refactor this should not be here
var map_request_ajax=false;

TOWNS.Map.loadMap = function(from_server=false,callback=false){


    if(typeof TOWNS.Map.scene === 'undefined'){
        //console.warn('Stopped loading map because of TOWNS.Map.scene is '+TOWNS.Map.scene);
        //return;

        if(this.locked){
            return;
        }


        TOWNS.Map.scene = new TOWNS.Map.Scene();

    }
    if(isNaN(map_radius))throw new Error('map_radius is NaN');



    if(from_server) {

        r('Loading map from server.');


        if (map_request_ajax) {
            map_request_ajax.abort();
        }


        map_request_ajax = TOWNS.TownsAPI.townsAPI.get(
            'objects',
            {
                x: Math.round(map_center.x),
                y: Math.round(map_center.y),
                radius: map_radius*3//todo to constant
                //not: map_out_ids

            },//todo range and order by time
            function(response){

                objects_server=new TOWNS.Objects.Array(response);
                TOWNS.Map.loadMapRequestCallback(callback);

            }
        );

    }else{

        r('Loading map from only local.');

        TOWNS.Map.loadMapRequestCallback(callback);

    }


};


TOWNS.Map.loadMap.locked = true;




//======================================================================================================================
var objects_in_scene;



TOWNS.Map.loadMapRequestCallback=function(callback=false){


    //----------------------------------Create map_data and map_bg_data from local objects


    tstart('generating map');

    var map_center_floor = new TOWNS.Position(Math.floor(map_center.x),Math.floor(map_center.y));


    tstart('getCompleteObjects');
    objects_in_scene = TOWNS.World.mapGenerator.getCompleteObjects(objects_server,map_center_floor,map_radius,true/*,map_center_last*/);
    tend('getCompleteObjects');

    //----------------------------------Create map_data and map_bg_data from objects_external

    /*tstart('filterTypes');//todo purge map_data_buildings, map_data_stories, map_data_terrains, map_array
    map_data_buildings = objects_external.filterTypes('building','natural');
    map_data_stories   = objects_external.filterTypes('story');
    map_data_terrains  = objects_external.filterTypes('terrain');
    tend('filterTypes');*/

    //----------------------------------

    /*tstart('getMapOfTerrainCodes');
    map_array = map_data_terrains.getMapOfTerrainCodes(map_center_floor,map_radius);
    tend('getMapOfTerrainCodes');*/


    map_center_last = map_center.clone();


    tend('generating map');


    TOWNS.Map.scene.update(objects_in_scene);
    //TOWNS.Map.drawMap(objects_external);

    if(callback){
        setTimeout(function(){
            callback();
        },IMMEDIATELY_MS)
    }


};

