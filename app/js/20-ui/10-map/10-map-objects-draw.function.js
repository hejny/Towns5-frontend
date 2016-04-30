/**
 * @author ©Towns.cz
 * @fileOverview Additional methods to object Map
 */
//======================================================================================================================
T.setNamespace('UI.Map');


/**
 * Draw objects on canvas
 * @static
 * @param ctx
 * @param {array} objects
 */
T.UI.Map.objectsDraw = function(ctx,objects) {

    //r('objectsDraw',objects.length,objects);

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Material objects

    var map_draw = [];
    for (var i = 0; i < objects.length; i++) {

        //-----------------------------------------
        if (is(objects[i].path)) {

            var position = objects[i].path.recount();


            objects[i].x = position.x;
            objects[i].y = position.y;

        }
        //-----------------------------------------

        var object_id = objects[i].id;


        object_xc = objects[i].x - T.UI.Map.map_center.x;
        object_yc = objects[i].y - T.UI.Map.map_center.y;

        object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * map_field_size ) * map_zoom_m;
        object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * map_field_size ) / map_slope_m * map_zoom_m;


        object_screen_x += (ctx.canvas.width / 2);
        object_screen_y += (ctx.canvas.height / 2);


        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        map_draw.push([
            objects[i].type,
            objects[i],
            object_screen_x,
            object_screen_y,
             object_screen_y + 120
        ]);


        //-----------------------------------------

    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Sort objects

    map_draw.sort(function (a, b) {

        if (a[4] > b[4]) {
            return (1);
        } else if (a[4] < b[4]) {
            return (-1);
        } else {
            return (0);
        }

    });


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Draw objects

    //----------------Clear canvas

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //----------------Drawing... :)

    //lastY=0;

    for (i = 0; i < map_draw.length; i++) {

        if (map_draw[i][0] == 'building') {


            map_draw[i][1].design.data.drawCashedAsync(ctx, map_zoom_m * map_model_size, map_draw[i][2], map_draw[i][3], map_rotation, map_slope,
                (map_selected_ids.indexOf(map_draw[i][1].id) != -1?true:false)
            );

        }

    }





};