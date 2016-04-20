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


    map_request_ajax=townsAPI.get(
        'objects',
        {
            x: Math.round(map_x),
            y: Math.round(map_y),
            radius: map_radius,
            //keys: ,

        },//todo range and order by time
        Map.loadMapRequestCallback
    );


};


//======================================================================================================================

Map.loadMapRequestCallback=function(response){

    r('Loaded from Towns API');

    //----------------------------------Load object from response to objects_external todo in future maybe delete this part


    objects_external = new T.Objects.Array();//todo use this in frontend
    response.forEach(function (serverObject) {


            var serverObjectCopy = deepCopyObject(serverObject);//todo read object
            serverObjectCopy.id = serverObjectCopy._id;//todo refactor all object.id to object._id and delete this row

            objects_external.push(serverObjectCopy);


    });

    //----------------------------------Create map_data and map_bg_data from local objects


    T.World.mapGenerator.completeObjects(objects_external, {x:Math.floor(map_x),y: Math.floor(map_y)}, map_radius);


    //----------------------------------Create map_data and map_bg_data from objects_external

    map_data_buildings = new T.Objects.Array();
    map_data_stories = new T.Objects.Array();
    map_data_terrains = new T.Objects.Array();


    objects_external.forEach(function(object) {


        if (object.type == 'building' || object.type == 'natural') {

            map_data_buildings.push(object);

        }else
        if(object.type == 'story'){

            map_data_stories.push(object);


        }else
        if(object.type == 'terrain'){


            map_data_terrains.push(object);


        }


    });

    //----------------------------------

    map_array = map_data_terrains.getMapArray({x:Math.floor(map_x),y:Math.floor(map_y)},map_radius);


    //----------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Count collisions

    //~~~~~~~~~~~~~Terrains

    /*ArrayFunctions.iterate2D(map_bg_data,function(y,x){

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


    /*ArrayFunctions.iterate2D(map_collision_data,function(y,x){

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



    /*ArrayFunctions.iterate2D(map_collision_data,function(y,x){

        if(map_collision_data[y][x]==-1)map_collision_data[y][x]=false;

    });*/

    //~~~~~~~~~~~~~


    //mapWindow(map_collision_data);


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //r('Executing drawMap');
    Map.drawMap();

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //todo ?DI? what is better $('#map-stories').html(Map.storiesHTML(map_data_stories)); vs. Map.drawMap();

    $('#map-stories').html(Map.storiesHTML(map_data_stories));

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


};


//======================================================================================================================


Map.loadMapAsync = function(delay) {//todo search where to use this function

    delay=cParam(delay,IMMEDIATELY_MS);

    setTimeout(
        function(){Map.loadMap();},delay
    );
};