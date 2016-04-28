/**
 * @author ©Towns.cz
 * @fileOverview Additional methods to object Map
 */
//======================================================================================================================



//todo refactor this should not be here
var map_request_ajax=false;


Map.loadMap = function(){
    r('loadMap');
    if(isNaN((map_radius*2)))throw new Error('(map_radius*2) is NaN');


    //todo refactor purge map_z_data and map_bg_data


    if(map_request_ajax){
        map_request_ajax.abort();
    }


    map_request_ajax=T.TownsAPI.townsAPI.get(
        'objects',
        {
            x: Math.round(map_x),
            y: Math.round(map_y),
            radius: map_radius,
            //keys: ,

        },//todo range and order by time
        Map.loadMapRequestCallback
    );

    tstart('loading map');


};


//======================================================================================================================

Map.loadMapRequestCallback=function(response){

    tend('loading map');

    //----------------------------------Load object from response to objects_external todo in future maybe delete this part


    /*objects_external = new T.Objects.Array();//todo use this in frontend
    response.forEach(function (serverObject) {


            var serverObjectCopy = deepCopyObject(serverObject);//todo read object
            serverObjectCopy.id = serverObjectCopy._id;//todo refactor all object.id to object._id and delete this row

            objects_external.push(serverObjectCopy);


    });*/

    //----------------------------------Create map_data and map_bg_data from local objects

    tstart('generating map');

    tstart('getCompleteObjects');
    objects_external = T.World.mapGenerator.getCompleteObjects(new T.Objects.Array(response), new T.Position(Math.floor(map_x),Math.floor(map_y)), map_radius);
    tend('getCompleteObjects');

    //----------------------------------Create map_data and map_bg_data from objects_external

    tstart('filterTypes');
    map_data_buildings = objects_external.filterTypes('building','natural');
    map_data_stories   = objects_external.filterTypes('story');
    map_data_terrains  = objects_external.filterTypes('terrain');
    tend('filterTypes');

    //----------------------------------

    tstart('getMapOfTerrainCodes');
    map_array = map_data_terrains.getMapOfTerrainCodes(new T.Position(Math.floor(map_x),Math.floor(map_y)),map_radius);
    tend('getMapOfTerrainCodes');

    tend('generating map');

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

        var x=Math.round(object.x)-Math.round(map_x-(map_radius));
        var y=Math.round(object.y)-Math.round(map_y-(map_radius));

        if(x>=0)
            if(y>=0)
                if(x<(map_radius*2))
                    if(y<(map_radius*2))
                        map_collision_data[y][x]=false;


    });*/

    //~~~~~~~~~~~~~zones


    /*T.ArrayFunctions.iterate2D(map_collision_data,function(y,x){

        if(map_collision_data[y][x]==false){


            for(var yNext=y-1;yNext<=y+1;yNext++){
                for(var xNext=x-1;xNext<=x+1;xNext++){


                    if(xNext>=0)
                        if(yNext>=0)
                            if(xNext<(map_radius*2))
                                if(yNext<(map_radius*2))
                                    if(xNext==x?yNext!=y:yNext==y)
                                        if(map_collision_data[yNext][xNext]==true){

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

    tstart('Map.drawMap');
    Map.drawMap();
    tend('Map.drawMap');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //todo ?DI? what is better $('#map-stories').html(Map.storiesHTML(map_data_stories)); vs. Map.drawMap();

    tstart('Map.storiesHTML');
    $('#map-stories').html(Map.storiesHTML(map_data_stories));
    tend('Map.storiesHTML');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


};


//======================================================================================================================


Map.loadMapAsync = function(delay=IMMEDIATELY_MS) {//todo search where to use this function


    setTimeout(
        function(){Map.loadMap();},delay
    );
};