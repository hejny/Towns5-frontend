/**
 * @author ©Towns.cz
 * @fileOverview Additional methods to object Map
 */
//======================================================================================================================



//todo refactor this should not be here
var map_request_callback;


Map.loadMap = function(){
    r('loadMap');
    if(isNaN(map_size))throw 'map_size is NaN';

    var map_xy_data = MapGenerator.getMap(Math.round(map_x-(map_size/2)), Math.round(map_y-(map_size/2)), map_size);

    //console.log(map_data);

    map_z_data = map_xy_data[0];
    map_bg_data = map_xy_data[1];

    //strict//delete map_xy_data;

    var tmp=Math.round(map_size/2)-2;


    /*if(typeof map_request_callback!=='undefined')
        map_request_callback.abort();*/

    map_request_callback=function(res){

            r('Loaded from Towns API');

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Server Objects

            map_data=[];

            res.forEach(function(serverObject){

                if(['building','story'].indexOf(serverObject.type)!=-1){//todo here should be all type of objects - terrain

                    var serverObjectCopy=deepCopyObject(serverObject);//todo init object


                    serverObjectCopy.id=serverObjectCopy._id;//todo refactor all object.id to object._id and delete this row


                    //todo in map_object_changes should be all changes - terrain
                    var i=ArrayFunctions.id2i(map_object_changes,serverObjectCopy.id);
                    //r('server object',i,serverObjectCopy);

                    if(i!=-1){
                        //-------------Existing object
                        map_object_changes[i]=serverObjectCopy;//todo map object changes refactor to objects internal
                        //-------------
                    }else{
                        //-------------New object

                        map_object_changes.push(serverObjectCopy);

                        //-------------
                    }


                }

            });

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Local Objects//todo rename this notice

            map_data=map_data.concat(map_object_changes);//todo delete map_data use only map_object_changes refactored to objects internal
            //map_data=map_data.concat(map_object_changes_buffer);

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Server Terrains

            /*r(res);*/
            /*var map_data_terrain=res[1]['objects'];

             for(var i= 0, l=map_data_terrain.length;i<l;i++){

             var x=Math.floor(map_data_terrain[i].x-map_x+map_size/2);
             var y=Math.floor(map_data_terrain[i].y-map_y+map_size/2);


             if(
             x<0 ||
             y<0 ||
             x>=map_size ||
             y>=map_size

             ){
             //r(x+','+y);
             }else{

             if(typeof(map_data_terrain[i].res)!='undefined'){

             var terrain=map_data_terrain[i].res;
             terrain=Math.toInt(terrain.substr(1));

             //terrain=terrain-1;

             if(terrain>0)
             map_bg_data[y][x]=terrain;





             }

             if(typeof(map_data_terrain[i].level)!='undefined'){
             map_z_data[y][x]=map_data_terrain[i].level;
             }else{
             //map_z_data[y][x]=0.1;
             }


             }

             }*/

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Local Terrains

            //r(map_terrain_changes);

            for(var i= 0,l=map_terrain_changes.length;i<l;i++){

                var x=map_terrain_changes[i][0],
                    y=map_terrain_changes[i][1],
                    terrain=map_terrain_changes[i][2],

                //r(x,y,map_x,map_y);

                    x=x-Math.round(map_x)+Math.floor(map_size/2);
                y=y-Math.round(map_y)+Math.floor(map_size/2);

                //r(x,y);

                if(
                    x<0 ||
                    y<0 ||
                    x>=map_size ||
                    y>=map_size

                ){}else{
                    map_bg_data[y][x]=terrain;
                }

            }
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Collisions

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

        r('Executing drawMap');
        Map.drawMap();

    };


    townsAPI.get(
        'objects',
        {},
        map_request_callback
    );


    map_request_callback([]);



};


Map.loadMapAsync = function(delay) {//todo search where to use this function

    delay=cParam(delay,IMMEDIATELY_MS);

    setTimeout(
        function(){Map.loadMap();},delay
    );
};