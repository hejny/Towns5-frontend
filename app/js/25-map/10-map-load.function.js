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



T.Map.loadMapRequestCallback=function(){


    //----------------------------------Create map_data and map_bg_data from local objects


    tstart('generating map');

    var map_center_floor = new T.Position(Math.floor(map_center.x),Math.floor(map_center.y));


    tstart('getCompleteObjects');
    var objects_to_scene = T.World.mapGenerator.getCompleteObjects(objects_server,map_center_floor,map_radius,true/*,map_center_last*/);
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


    T.UI.Map.scene.update(objects_to_scene);
    //T.Map.drawMap(objects_external);

    //----------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Count collisions

    //~~~~~~~~~~~~~Terrains

    /*T.ArrayFunctions.iterate2D(map_bg_data,function(y,x){

        if(!is(map_collision_data[y]))map_collision_data[y]=[];

        if(typeof map_bg_data[y][x]=='undefined'){

            map_collision_data[y][x]=true;
            return;

        }


        if(map_bg_data[y][x].getCode()>0 && blockedTerrains.indexOf(map_bg_data[y][x].getCode())==-1){

            map_collision_data[y][x]=true;

        }else{

            map_collision_data[y][x]=false;

        }


    });*/

    //~~~~~~~~~~~~~Objects


    /*map_data.forEach(function(object){

        var x=Math.round(object.x)-Math.round(map_center.x-(map_radius));
        var y=Math.round(object.y)-Math.round(map_center.y-(map_radius));

        if(x>=0)
            if(y>=0)
                if(x<(map_radius*2))
                    if(y<(map_radius*2))
                        map_collision_data[y][x]=false;


    });*/

    //~~~~~~~~~~~~~zones


    /*T.ArrayFunctions.iterate2D(map_collision_data,function(y,x){

        if(map_collision_data[y][x]==== false){


            for(var yNext=y-1;yNext<=y+1;yNext++){
                for(var xNext=x-1;xNext<=x+1;xNext++){


                    if(xNext>=0)
                        if(yNext>=0)
                            if(xNext<(map_radius*2))
                                if(yNext<(map_radius*2))
                                    if(xNext==x?yNext!=y:yNext==y)
                                        if(map_collision_data[yNext][xNext]=== true){

                                            map_collision_data[yNext][xNext]=-1;
                                        }


                }
            }


        }

    });*/



    /*T.ArrayFunctions.iterate2D(map_collision_data,function(y,x){

        if(map_collision_data[y][x]==-1)map_collision_data[y][x]=false;

    });*/

    //~~~~~~~~~~~~~


    //mapWindow(map_collision_data);


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /*tstart('T.UI.Map.drawMap');
    T.UI.Map.drawMap();
    tend('T.UI.Map.drawMap');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //todo ?DI? what is better $('#map-stories').html(T.UI.Map.storiesHTML(map_data_stories)); vs. T.UI.Map.drawMap();

    tstart('T.UI.Map.storiesHTML');
    $('#map-stories').html(T.UI.Map.storiesHTML(map_data_stories));
    tend('T.UI.Map.storiesHTML');*/

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


};

