/**
 * @author ©Towns.cz
 * @fileOverview Additional methods to object Map
 */
//======================================================================================================================
T.setNamespace('UI.Map');


//todo refactor this should not be here
var map_request_ajax=false;


T.UI.Map.loadMap = function(){
    r('loadMap');
    if(isNaN((map_radius*2)))throw new Error('(map_radius*2) is NaN');


    //todo refactor purge map_z_data and map_bg_data


    if(map_request_ajax){
        map_request_ajax.abort();
    }


    map_request_ajax=T.TownsAPI.townsAPI.get(
        'objects',
        {
            x: Math.round(T.UI.Map.map_center.x),
            y: Math.round(T.UI.Map.map_center.y),
            radius: map_radius
            //not: map_out_ids

        },//todo range and order by time
        T.UI.Map.loadMapRequestCallback
    );

    //T.UI.Map.loadMapRequestCallback([]);

    tstart('loading map');


};


//======================================================================================================================

T.UI.Map.loadMapRequestCallback=function(response){

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

    var map_center_floor = new T.Position(Math.floor(T.UI.Map.map_center.x),Math.floor(T.UI.Map.map_center.y));


    tstart('getCompleteObjects');
    objects_external = T.World.mapGenerator.getCompleteObjects(new T.Objects.Array(response),map_center_floor,map_radius,true/*,T.UI.Map.map_center_last*/);
    tend('getCompleteObjects');

    //----------------------------------Create map_data and map_bg_data from objects_external

    tstart('filterTypes');
    map_data_buildings = objects_external.filterTypes('building','natural');
    map_data_stories   = objects_external.filterTypes('story');
    map_data_terrains  = objects_external.filterTypes('terrain');
    tend('filterTypes');

    //----------------------------------

    tstart('getMapOfTerrainCodes');
    map_array = map_data_terrains.getMapOfTerrainCodes(map_center_floor,map_radius);
    tend('getMapOfTerrainCodes');


    T.UI.Map.map_center_last = T.UI.Map.map_center.clone();


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

        var x=Math.round(object.x)-Math.round(T.UI.Map.map_center.x-(map_radius));
        var y=Math.round(object.y)-Math.round(T.UI.Map.map_center.y-(map_radius));

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

    tstart('T.UI.Map.drawMap');
    T.UI.Map.drawMap();
    tend('T.UI.Map.drawMap');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //todo ?DI? what is better $('#map-stories').html(T.UI.Map.storiesHTML(map_data_stories)); vs. T.UI.Map.drawMap();

    tstart('T.UI.Map.storiesHTML');
    $('#map-stories').html(T.UI.Map.storiesHTML(map_data_stories));
    tend('T.UI.Map.storiesHTML');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


};


//======================================================================================================================


T.UI.Map.loadMapAsync = function(delay=IMMEDIATELY_MS) {//todo search where to use this function


    setTimeout(
        function(){T.UI.Map.loadMap();},delay
    );
};