/**
 * @author ©Towns.cz
 * @fileOverview Additional methods to object Map
 */
//======================================================================================================================



//todo refactor this should not be here
var map_request_ajax=false;


Map.loadMap = function(){
    r('loadMap');
    if(isNaN(map_size))throw 'map_size is NaN';

    var map_xy_data = MapGenerator.getMap(Math.round(map_x-(map_size/2)), Math.round(map_y-(map_size/2)), map_size);

    //console.log(map_data);

    map_z_data = map_xy_data[0];
    map_bg_data = map_xy_data[1];

    //strict//delete map_xy_data;

    var tmp=Math.round(map_size/2)-2;





    if(map_request_ajax){
        map_request_ajax.abort();
    }


    map_request_ajax=townsAPI.get(
        'objects',
        {
            x: Math.round(map_x),
            y: Math.round(map_y),
            radius: map_size,
            //keys: ,

        },//todo range and order by time
        Map.loadMapRequestCallback
    );


    //Map.loadMapRequestCallback([]);



};


//======================================================================================================================

Map.loadMapRequestCallback=function(res){

    r('Loaded from Towns API');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Load server Objects to Local objects

    //if(townsAPI.online) {


    objects_external = [];

    res.forEach(function (serverObject) {


        if (['building', 'story', 'terrain'].indexOf(serverObject.type) != -1) {//todo here should be all type of objects - terrain


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


        if(map_bg_data[y][x]>0 && blockedTerrains.indexOf(map_bg_data[y][x])==-1){

            map_collision_data[y][x]=true;

        }else{

            map_collision_data[y][x]=false;

        }


    });

    //~~~~~~~~~~~~~Objects


    /*r(map_collision_data);*/

    map_data.forEach(function(object){

        var x=Math.round(object.x)-Math.round(map_x-(map_size/2));
        var y=Math.round(object.y)-Math.round(map_y-(map_size/2));

        if(x>=0)
            if(y>=0)
                if(x<map_size)/*todo is it OK to use map_size???*/
                    if(y<map_size)
                        map_collision_data[y][x]=false;


    });
    //~~~~~~~~~~~~~zones


    ArrayFunctions.iterate2D(map_collision_data,function(y,x){

        if(map_collision_data[y][x]==false){


            for(var yNext=y-1;yNext<=y+1;yNext++){
                for(var xNext=x-1;xNext<=x+1;xNext++){


                    if(xNext>=0)
                        if(yNext>=0)
                            if(xNext<map_size)/*todo is it OK to use map_size???*/
                                if(yNext<map_size)
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

    //todo ?DI? what is better $('#map-stories').html(Map.storiesHTML(map_data_stories)); vs. Map.drawMap();

    $('#map-stories').html(Map.storiesHTML(map_data_stories));
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //r('Executing drawMap');
    Map.drawMap();

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

        var xc=object.x,//center
            yc=object.y,
            size=Math.ceil(object.design.data.size);

        xc=xc-Math.round(map_x)+Math.floor(map_size/2);
        yc=yc-Math.round(map_y)+Math.floor(map_size/2);


        if(
            xc<0 ||
            yc<0 ||
            xc>=map_size ||
            yc>=map_size

        ){}else{


            //r(xc,yc,size);

            for(var y=yc-size;y<=yc+size;y++){

                for(var x=xc-size;x<=xc+size;x++){

                    if (Math.xy2dist(x-xc,y-yc) <= object.design.data.size) {

                        //r(x,y);
                        map_bg_data[Math.round(y)][Math.round(x)]=object.design.data.image;

                    }
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