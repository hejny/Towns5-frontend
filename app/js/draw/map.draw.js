/*
 ██████╗ ██████╗  █████╗ ██╗    ██╗
 ██╔══██╗██╔══██╗██╔══██╗██║    ██║
 ██║  ██║██████╔╝███████║██║ █╗ ██║
 ██║  ██║██╔══██╗██╔══██║██║███╗██║
 ██████╔╝██║  ██║██║  ██║╚███╔███╔╝
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝
 */


function drawEllipse(ctx, x, y, w, h) {
    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle

    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    ctx.closePath(); // todo not used correctly, see comments (use to close off open path)
    ctx.stroke();
    ctx.fill();
}




//----------------------------------------------------------------------------------------------------------------------




function drawMap() {

    //r(map_ctx);
    if (map_ctx == false)return;
    //r('drawMap');
    if(isNaN(map_size))throw 'map_size is NaN';
    t('drawMap start');


    //----------------Move canvas

    $('#map_bg').css('left', -canvas_width / 3);
    $('#map_bg').css('top', -canvas_height / 3);

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


                var terrain = map_bg_data[y][x] - 1/*Teren 0 je temnota*/;


                //r(map_z_data[y][x]);


                if (terrain != -1) {


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
                    screen_y += (canvas_height / 2) - (height / 2);


                    //------------------------------------------


                    if (screen_x > -(width / 2) && screen_y > -(height / 2) && screen_x < canvas_width && screen_y < canvas_height + (map_field_size * terrain_size)) {

                        //----------------------------------------------------------------------------------------------

                        var seed = Math.abs(world_x * world_y - 1) % seedCount;

                        //-----


                        map_draw.push([
                            'terrain',
                            all_images_bg[terrain][seed],
                            screen_x,
                            screen_y,
                            screen_y + height / terrain_size - Math.floor(width / 4),
                            width,
                            height
                        ]);


                        //----------------------------------------------------------------------------------------------Virtuální objekty

                        if ((terrain == 9 /*&& map_data[y+1][x]!=4 && map_data[y-1][x]!=4 && map_data[y][x+1]!=4 && map_data[y][x-1]!=4*/ ) || terrain == 4) {

                            var block_object = false;
                            if (terrain == 9) {

                                if (y > 0)
                                    if (map_bg_data[y - 1][x] == 4)block_object = true;
                                if (y < map_size - 1)
                                    if (map_bg_data[y + 1][x] == 4)block_object = true;
                                if (x > 0)
                                    if (map_bg_data[y][x - 1] == 4)block_object = true;
                                if (x < map_size - 1)
                                    if (map_bg_data[y][x + 1] == 4)block_object = true;

                            }

                            if (!block_object) {


                                if (terrain == 9) {
                                    var size = Math.sin(Math.pow(Math.abs(world_x * world_y), (1 / 1.5)) / 10) * map_tree_size_diff + map_tree_size;
                                } else {

                                    //var size = Math.sin(Math.pow(Math.abs(world_x * world_y), (1 / 2.5)) / 10) * map_rock_size_diff + map_rock_size;

                                    var object_size_seed = Math.floor(Math.pow(Math.pow(world_x, 2) + Math.pow(world_y, 2), 1.1)) % rockCountDark;

                                    var size = (1 - (object_size_seed / rockCountDark)) * map_rock_size_diff + map_rock_size;

                                }

                                var object_seed = (Math.pow(world_x, 2) + Math.pow(world_y, 2)) % (terrain == 9 ? treeCount : rockCount);

                                var object = (terrain == 9 ? all_images_tree[object_seed] : all_images_rock[object_seed][object_size_seed]);

                                var object_id = (terrain == 9 ? 't' : 'r') + world_x + 'x' + world_y + 'y';


                                var object_width = object.width * map_zoom_m * 5 * size;
                                var object_height = object.height * map_zoom_m * 5 * size;


                                object_xc = xc;
                                object_yc = yc;

                                object_xc += Math.sin((world_x + world_y) / 100) / 1.41;
                                object_yc += Math.sin((world_x - world_y) / 100) / 1.41;


                                object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * map_field_size ) * map_zoom_m;
                                object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * map_field_size ) / map_slope_m * map_zoom_m - 300 / map_slope_n * map_zoom_m;


                                object_screen_x += (canvas_width / 2);
                                object_screen_y += (canvas_height / 2);


                                /*
                                 if(map_selecting)
                                 if(Math.pow(object_screen_x-canvas_mouse_x,2)+Math.pow(object_screen_y-canvas_mouse_y,2)<900){

                                 map_selecting=false;

                                 map_mouse_x=world_x;
                                 map_mouse_y=world_y;
                                 //alert(object_id);
                                 map_selected_ids=[object_id];
                                 }
                                 */

                                object_screen_x += (width / 2) - (object_width / 2);
                                object_screen_y += -(object_height) + (object_width / 4) + (height / 4);


                                /*
                                 if($.inArray(object_id,map_selected_ids)!=-1){

                                 alert('selected'+object_id);

                                 map_draw.push([
                                 'ellipse',
                                 ['rgba(50,50,50,0.4)','rgba(0,0,0,0.8)',3],
                                 object_screen_x,
                                 object_screen_y+object_height-(object_width/map_slope_m),
                                 999999,
                                 object_width,
                                 object_width/map_slope_m

                                 ]);

                                 }
                                 */


                                map_draw.push([
                                    'image',
                                    object,
                                    object_screen_x,
                                    object_screen_y,
                                    object_screen_y + object_height - Math.floor(object_width / 4) + 120 + (terrain == 9 ? map_tree_size_zip : map_rock_size_zip),
                                    object_width,
                                    object_height

                                ]);


                            }

                        }
                        //----------------------------------------------------------------------------------------------


                    }


                }
            }

        }
    }
    //t('Terrains end');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Material objects

    var selecting_distance_pow = 20;
    selecting_distance_pow = selecting_distance_pow * selecting_distance_pow;

    var object = all_images_rock[0][0];
    for (var i = 0; i < map_data.length; i++) {


        /*
         map_bg = document.getElementById("map_bg");
         map_ctx = map_bg.getContext("2d");*/

        /*var object=document.createElement("canvas");
         object.width=550;
         object.height=350;
         object_ctx = object.getContext("2d");

         Model.draw(object_ctx,map_data[i].res);*/


        var object_id = map_data[i].id;


        object_xc = map_data[i].x - map_x;
        object_yc = map_data[i].y - map_y;

        object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * map_field_size ) * map_zoom_m;
        object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * map_field_size ) / map_slope_m * map_zoom_m;


        object_screen_x += (canvas_width / 2);
        object_screen_y += (canvas_height / 2);


        //----------------------------------------------Selected object?
        if (map_data[i].type != 'story')
            if (map_selected_ids.indexOf(object_id) != -1) {


                var ellipse_width = 100;

                map_draw.push([
                    'ellipse',
                    ['rgba(50,50,50,0.4)', 'rgba(0,0,0,0.8)', 3],
                    object_screen_x - (ellipse_width / 2),
                    object_screen_y - (ellipse_width / map_slope_m / 2),
                    object_screen_y + 120 - 1,
                    ellipse_width,
                    ellipse_width / map_slope_m

                ]);


            }
        //----------------------------------------------


        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        map_draw.push([
            map_data[i].type,
            map_data[i].type == 'story' ? map_data[i].content : map_data[i].design.data,
            object_screen_x,
            object_screen_y,
            ((map_data[i].type == 'story') ? 9999 : object_screen_y + 120 + 10 * map_model_size)
        ]);


        //-----------------------------------------

    }
    //t('Putting into array end');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Sort objects

    //r(map_draw);

    map_draw.sort(function (a, b) {

        if (a[4] > b[4]) {
            return (1);
        } else if (a[4] < b[4]) {
            return (-1);
        } else {
            return (0);
        }

    });
    t('Sorting end');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Draw objects
    //----------------Clear canvas

    map_ctx.clearRect(0, 0, canvas_width, canvas_height);

    map_ctx.fillStyle = '#000000';
    map_ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    map_ctx.lineWidth = 0;

    //----------------Drawing... :)

    //lastY=0;

    //r(map_ctx);

    for (var i = 0; i < map_draw.length; i++) {

        if (map_draw[i][0] == 'image') {//todo is it used?
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~image

            try {
                map_ctx.drawImage(
                    map_draw[i][1],
                    map_draw[i][2],
                    map_draw[i][3],
                    //[4] is order used in sorting
                    map_draw[i][5],
                    map_draw[i][6]
                );
            } catch (err) {
                r('Could not load', map_draw[i][1]);
            }


            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        } else if (map_draw[i][0] == 'terrain') {
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~terrain

            map_ctx.drawImage(
                map_draw[i][1],
                map_draw[i][2],
                map_draw[i][3],
                //[4] is order used in sorting
                map_draw[i][5],
                map_draw[i][6]
            );


            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        } else if (map_draw[i][0] == 'building') {
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~building

            map_draw[i][1].draw(map_ctx, map_zoom_m * map_model_size, map_draw[i][2], map_draw[i][3], -map_rotation, map_slope);

        } else if (map_draw[i][0] == 'ellipse') {


            map_ctx.fillStyle = map_draw[i][1][0];
            map_ctx.strokeStyle = map_draw[i][1][1];
            map_ctx.lineWidth = map_draw[i][1][2];


            drawEllipse(
                map_ctx,
                map_draw[i][2],
                map_draw[i][3],
                map_draw[i][5],
                map_draw[i][6]
            );

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        } else if (map_draw[i][0] == 'story') {
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


            var content = map_draw[i][1];

            //r(content);

            var ellipse_width = Math.pow(content.data.length, 1 / 3) * 2;


            //r('storka');
            map_ctx.fillStyle = '#110011';
            //map_ctx.fillStyle =     'rgba(0,0,0,0)';
            map_ctx.strokeStyle = 'rgba(70,20,200,0.5)';
            map_ctx.lineWidth = 20;


            drawEllipse(
                map_ctx,
                map_draw[i][2] - (ellipse_width / 2),
                map_draw[i][3] - (ellipse_width / 2),
                ellipse_width,
                ellipse_width
            );
        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //t('Drawing end');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    }



    t('drawMap end');

    /*if(Math.random()>0.95)
        throw('aaa');*/
}



function drawMapAsync(delay) {//todo search where to use this function

    delay=cParam(delay,IMMEDIATELY_MS);

    setTimeout(
        function(){drawMap();},delay
    );
}