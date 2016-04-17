/**
 * @author ©Towns.cz
 * @fileOverview Additional methods to object Map
 */
//======================================================================================================================


/**
 * Draw the map on canvas
 * @static
 */
Map.drawMap = function(){

    //r(map_ctx);
    if (map_ctx == false)return;
    //r('drawMap');
    if(isNaN(map_size))throw 'map_size is NaN';
    t('drawMap start');


    //----------------Move canvas

    $('#map_bg')
        .css('left', canvas_left)
        .css('top', canvas_top)
    ;


    //----------------Move stories

    $('#map-stories')
        .css('left', canvas_left)
        .css('top', canvas_top)
    ;

    //----------------Prepare objects

    var map_draw = [];


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Virtual objects

    var selecting_distance_pow = selecting_distance * map_zoom_m;
    selecting_distance_pow = selecting_distance_pow * selecting_distance_pow;

    //t('Terrains start');


    for (var y = 0; y < map_size; y++) {
        for (var x = 0; x < map_size; x++) {


            //r('Terrains process');
            if (x >= 0 && y >= 0 && x < map_size && y < map_size /*Math.pow(x-(map_size/2),2)+Math.pow(y-(map_size/2),2)<=Math.pow(map_size/2,2)*/) {


                if (map_bg_data[y][x]) {


                    var terrain = map_bg_data[y][x];


                    var xc = x - map_x + Math.round(map_x) - (map_size - 1) / 2;
                    var yc = y - map_y + Math.round(map_y) - (map_size - 1) / 2;

                    var world_x = x + Math.round(map_x) - Math.round(map_size / 2);
                    var world_y = y + Math.round(map_y) - Math.round(map_size / 2);


                    var terrain_size = Math.cos((world_x * world_y) % 100) / 2 / 4 + 1;


                    var width = Math.ceil(map_field_size * terrain_size * 3 * map_zoom_m);
                    var height = Math.ceil(width * terrain_size /* map_zoom_m*/);


                    var screen_x = ((map_rotation_cos * xc - map_rotation_sin * yc ) * map_field_size ) * map_zoom_m;
                    var screen_y = ((map_rotation_sin * xc + map_rotation_cos * yc ) * map_field_size ) / map_slope_m * map_zoom_m;


                    screen_x += (canvas_width / 2);
                    screen_y += (canvas_height / 2)/* - (height / 2)*/;


                    //------------------------------------------


                    if (screen_x > -(width / 2) && screen_y > -(height / 2) && screen_x < canvas_width && screen_y < canvas_height + (map_field_size * terrain_size)) {

                        //----------------------------------------------------------------------------------------------

                        var seed = Math.abs(world_x * world_y - 1) % seedCount;

                        //-----


                        map_draw.push({

                            drawtype: 'image',
                            data: ImagesCollections.backgrounds.get('t' + (terrain.getCode()) + 's' + seed),

                            screen_x: screen_x,
                            screen_y: screen_y,

                            anchor_x: width/2,
                            anchor_y: height/2,

                            width: width,
                            height: height


                        });


                        terrain.getVirtualObjects(new Position(world_x,world_y)).forEach(function(virtual_object){


                            map_data.push(deepCopyObject(virtual_object));



                        });

                        //----------------------------------------------------------------------------------------------


                    }


                }
            }

        }
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Material objects

    var selecting_distance_pow = 20;
    selecting_distance_pow = selecting_distance_pow * selecting_distance_pow;

    var object = ImagesCollections.objectsNatural.get('rock0dark0');//todo refactor delete
    for (var i = 0; i < map_data.length; i++) {



        var object_id = map_data[i].id;


        object_xc = map_data[i].x - map_x;
        object_yc = map_data[i].y - map_y;

        object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * map_field_size ) * map_zoom_m;
        object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * map_field_size ) / map_slope_m * map_zoom_m;


        object_screen_x += (canvas_width / 2);
        object_screen_y += (canvas_height / 2);


        if(map_data[i].type=='building'){
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

            map_draw.push({
                drawtype: 'model',
                data: map_data[i].design.data,
                screen_x: object_screen_x,
                screen_y: object_screen_y,
            });

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        }else
        if(map_data[i].type=='natural'){
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

            var image = ImagesCollections.objectsNatural.get(map_data[i].design.data.image);


            map_draw.push({

                drawtype: 'image',
                data:  image,

                screen_x: object_screen_x,
                screen_y: object_screen_y,

                anchor_x: (image.width/2),
                anchor_y: (width/2/map_slope_m),

                width: image.width,
                height: image.height


            });

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        }


        //-----------------------------------------

    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Sort objects


    map_draw.sort(function (a, b) {

        if (a.y > b.y) {
            return (1);
        } else if (a.y < b.y) {
            return (-1);
        } else {
            return (0);
        }

    });

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Draw objects
    //----------------Clear canvas

    map_ctx.clearRect(0, 0, canvas_width, canvas_height);

    map_ctx.fillStyle = '#000000';
    map_ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    map_ctx.lineWidth = 0;

    //----------------Drawing... :)


    for (var i = 0; i < map_draw.length; i++) {

        if (map_draw[i].drawtype == 'image') {//todo is it used?
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~image
            try {
                map_ctx.drawImage(

                    map_draw[i].data,

                    map_draw[i].screen_x-map_draw[i].anchor_x,
                    map_draw[i].screen_y-map_draw[i].anchor_y,

                    map_draw[i].width,
                    map_draw[i].height

                );
            } catch (err) {
                r('Could not load', map_draw[i].data);
            }


            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        } else if (map_draw[i].drawtype == 'model') {
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~building

            map_draw[i].data.drawCashedAsync(map_ctx, map_zoom_m * map_model_size, map_draw[i].screen_x, map_draw[i].screen_y, map_rotation, map_slope,

                /*(map_selected_ids.indexOf(map_draw[i][1].id) != -1?true:false)*/false,true
            );

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //t('Drawing end');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    }



    t('drawMap end');

    /*if(Math.random()>0.95)
        throw('aaa');*/
};


/**
 * Draw the map on canvas asynchronously
 * @static
 * @param {number} delay ms
 */
Map.drawMapAsync = function(delay){//todo search where to use this function

    delay=cParam(delay,IMMEDIATELY_MS);

    setTimeout(
        function(){Map.drawMap();},delay
    );
};