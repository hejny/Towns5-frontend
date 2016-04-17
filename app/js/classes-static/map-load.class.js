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

    map_bg_data = Towns.MapGenerator.mapGenerator.getMapCircle({x: map_x,y: map_y}, map_radius);


    //todo refactor purge map_z_data



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

Map.loadMapRequestCallback=function(res){

    r('Loaded from Towns API');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Load server Objects to Local objects

    //if(townsAPI.online) {


    objects_external = [];

    res.forEach(function (serverObject) {


        if (['building', 'story', 'terrain'/*todo should be terrein here*/].indexOf(serverObject.type) != -1) {


            var serverObjectCopy = deepCopyObject(serverObject);//todo read object

            serverObjectCopy.id = serverObjectCopy._id;//todo refactor all object.id to object._id and delete this row

            objects_external.push(serverObjectCopy);


        }


    });


    //}

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Create map_data and map_bg_data from local objects

    map_data=[];//todo maybe delete and use only local_objects
    map_data_stories=[];//todo maybe delete and use only local_objects


    objects_external.forEach(Map.iterateAndCreateMapData);


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Count collisions

    //~~~~~~~~~~~~~Terrains

    ArrayFunctions.iterate2D(map_bg_data,function(y,x){

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


    });

    //~~~~~~~~~~~~~Objects


    /*r(map_collision_data);*/

    map_data.forEach(function(object){

        var x=Math.round(object.x)-Math.round(map_x-(map_radius));
        var y=Math.round(object.y)-Math.round(map_y-(map_radius));

        if(x>=0)
            if(y>=0)
                if(x<(map_radius*2))/*todo is it OK to use (map_radius*2)???*/
                    if(y<(map_radius*2))
                        map_collision_data[y][x]=false;


    });
    //~~~~~~~~~~~~~zones


    ArrayFunctions.iterate2D(map_collision_data,function(y,x){

        if(map_collision_data[y][x]==false){


            for(var yNext=y-1;yNext<=y+1;yNext++){
                for(var xNext=x-1;xNext<=x+1;xNext++){


                    if(xNext>=0)
                        if(yNext>=0)
                            if(xNext<(map_radius*2))/*todo is it OK to use (map_radius*2)???*/
                                if(yNext<(map_radius*2))
                                    if(xNext==x?yNext!=y:yNext==y)
                                        if(map_collision_data[yNext][xNext]==true){

                                            map_collision_data[yNext][xNext]=-1;
                                        }


                }
            }


        }

    });



    ArrayFunctions.iterate2D(map_collision_data,function(y,x){

        if(map_collision_data[y][x]==-1)map_collision_data[y][x]=false;

    });

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


Map.iterateAndCreateMapData=function(object) {//todo refactor local_objects

    if (object.type == 'building') {

        map_data.push(object);

    }else
    if(object.type == 'story'){

        map_data_stories.push(object);


    }else
    if(object.type == 'terrain'){


        for(var y=Math.floor(object.y-map_y-object.design.data.size+(map_radius));y<=Math.ceil(object.y-map_y+object.design.data.size+(map_radius));y++){

        if(typeof map_bg_data[y] === 'undefined')continue;


        for(var x=Math.floor(object.x-map_x-object.design.data.size+(map_radius));x<=Math.ceil(object.x-map_x+object.design.data.size+(map_radius));x++){


            if(typeof map_bg_data[y][x] === 'undefined')continue;


            if (T.Math.xy2dist(x-(map_radius)+map_x-object.x,y-(map_radius)+map_y-object.y) <= object.design.data.size) {

                map_bg_data[y][x]
                    =
                    T.MapGenerator.terrains[object.design.data.image];//todo maybe better

            }
        }
        }


    }else{

        throw new Error('Map.iterateAndCreateMapData: Unknown object type '+object.type+'.');

    }

};


//======================================================================================================================


Map.loadMapAsync = function(delay) {//todo search where to use this function

    delay=cParam(delay,IMMEDIATELY_MS);

    setTimeout(
        function(){Map.loadMap();},delay
    );
};