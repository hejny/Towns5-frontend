/**
 * @author ©Towns.cz
 * @fileOverview Additional methods to object Map
 */
//======================================================================================================================


/**
 * Render objects as HTML
 * @param {array} objects
 * @return {string} html code
 */
Map.storiesHTML = function(objects) {

    //r(objects);

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Sort objects

    /*map_draw.sort(function (a, b) {

        if (a[4] > b[4]) {
            return (1);
        } else if (a[4] < b[4]) {
            return (-1);
        } else {
            return (0);
        }

    });*/



    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Material objects


    //---------------empty

    var html='';


    //---------------Drawing... :)

    for (var i = 0; i < objects.length; i++) {


        object_xc = objects[i].x - map_x;
        object_yc = objects[i].y - map_y;

        object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * map_field_size ) * map_zoom_m;
        object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * map_field_size ) / map_slope_m * map_zoom_m;


        object_screen_x += (canvas_width / 2);
        object_screen_y += (canvas_height / 2);




        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        var size=30;

        var content=objects[i].content.data;
        content = markdown.toHTML(content);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


        var tag = $('<div>'+content+'</div>')//todo refactor maybe without jQuery?
            .css('position','absolute')
            .css('left',Math.floor(object_screen_x-size/2))
            .css('top', Math.floor(object_screen_y-size/2))

            .css('width', size)
            .css('height', size)


            .addClass('story')
        ;


        //r(tag[0].outerHTML);

        html+=tag[0].outerHTML;


        //-----------------------------------------

    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    return(html);

};