



//======================================================================================================================
/*
  ██████╗ ██████╗      ██╗███████╗ ██████╗████████╗███████╗    ██╗  ██╗████████╗███╗   ███╗██╗
 ██╔═══██╗██╔══██╗     ██║██╔════╝██╔════╝╚══██╔══╝██╔════╝    ██║  ██║╚══██╔══╝████╗ ████║██║
 ██║   ██║██████╔╝     ██║█████╗  ██║        ██║   ███████╗    ███████║   ██║   ██╔████╔██║██║
 ██║   ██║██╔══██╗██   ██║██╔══╝  ██║        ██║   ╚════██║    ██╔══██║   ██║   ██║╚██╔╝██║██║
 ╚██████╔╝██████╔╝╚█████╔╝███████╗╚██████╗   ██║   ███████║    ██║  ██║   ██║   ██║ ╚═╝ ██║███████╗
  ╚═════╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚══════╝
 */


Map.objectsHTML = function(objects) {

    //r('objectsDraw',objects.length,objects);

    var notMoving=false;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Material objects

    var map_draw = [];
    for (var i = 0; i < objects.length; i++) {

        //-----------------------------------------
        if (Path.is(objects[i].path)) {

            var position = objects[i].path.recount();


            objects[i].x = position.x;
            objects[i].y = position.y;



            //var model_moving=deepCopyModel(objects[i].design.data);//Model.rewriteRot(objects[i].res,objects[i].path.rotation());
            objects[i].design.data.rotation=objects[i].path.rotation();


        }else{

            notMoving=true;
            //var model_moving=objects[i].design.data;

        }
        //-----------------------------------------

        var object_id = objects[i].id;


        object_xc = objects[i].x - map_x;
        object_yc = objects[i].y - map_y;

        object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * map_field_size ) * map_zoom_m;
        object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * map_field_size ) / map_slope_m * map_zoom_m;

        object_screen_x += (canvas_width / 3 / 2);
        object_screen_y += (canvas_height / 3 / 2);

        //----------------------------------------------Selected object?
        if(map_selected_ids.indexOf(object_id)!=-1){


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
            objects[i].type,
            objects[i],//todo do it same as map-draw
            object_screen_x,
            object_screen_y,
            ((objects[i].type == 'story') ? 9999 : object_screen_y + 120)
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

    //---------------empty

    var html='';

    //----------------Drawing... :)

    var x_begin=50,
        y_begin=170,
        x_size=100,
        y_size=200;

    map_draw.forEach(function(draw_item){

        if (draw_item[0] == 'building') {

            var img = new Image(x_size/*todo refactor*/, y_size);
            img.src = draw_item[1].design.data.createSrc( map_zoom_m * map_model_size, x_begin, y_begin, x_size, y_size, -map_rotation, map_slope,
                (map_selected_ids.indexOf(draw_item[1].id) != -1?true:false)

            );/*todo cache SRCs*/

            $(img).css('position','absolute');
            $(img).addClass('moving-object');
            $(img).css('left',Math.floor(draw_item[2]-x_begin));
            $(img).css('top', Math.floor(draw_item[3]-y_begin));

            html+=img.outerHTML;




        }

    });

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    if(notMoving)orderMoveAndNormal();

    return(html);

};