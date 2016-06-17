/**
 * @author ©Towns.cz
 * @fileOverview Additional methods to object Map
 */
//======================================================================================================================
T.setNamespace('Map');


//todo refactor this should not be here
var map_request_ajax=false;


T.Map.loadMap = function(from_server=false){


    if(typeof T.UI.Map.scene === 'undefined'){
        //console.warn('Stopped loading map because of T.UI.Map.scene is '+T.UI.Map.scene);
        //return;

        T.UI.Map.scene = new T.Map.Scene();

    }
    if(isNaN(map_radius))throw new Error('map_radius is NaN');



    if(from_server) {

        r('Loading map from server.');


        if (map_request_ajax) {
            map_request_ajax.abort();
        }


        map_request_ajax = T.TownsAPI.townsAPI.get(
            'objects',
            {
                x: Math.round(map_center.x),
                y: Math.round(map_center.y),
                radius: map_radius*3//todo to constant
                //not: map_out_ids

            },//todo range and order by time
            function(response){

                objects_server=new T.Objects.Array(response);
                T.Map.loadMapRequestCallback();

            }
        );

    }else{

        r('Loading map from only local.');

        T.Map.loadMapRequestCallback();

    }


};


//======================================================================================================================
var objects_in_scene;



T.Map.loadMapRequestCallback=function(){


    //----------------------------------Create map_data and map_bg_data from local objects


    tstart('generating map');

    var map_center_floor = new T.Position(Math.floor(map_center.x),Math.floor(map_center.y));


    tstart('getCompleteObjects');
    objects_in_scene = T.World.mapGenerator.getCompleteObjects(objects_server,map_center_floor,map_radius,true/*,map_center_last*/);
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


    T.UI.Map.scene.update(objects_in_scene);
    //T.Map.drawMap(objects_external);


};

