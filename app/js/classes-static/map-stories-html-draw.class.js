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


        var text=$(content).text();

        var length = text.length + 1000*$(content).find('img').length;

        size=20+Math.pow(length,1/2.62);


        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        var image = $(content).find('img:first').attr('src');
        if(image){


            image = URI(image)
                .removeSearch("width")
                .addSearch({ width: Math.floor(size)*2 })
                .toString()
            ;

        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


        var tag = $('<div>'+text+'</div>')//todo refactor maybe without jQuery?
            .css('position','absolute')
            .css('left',Math.floor(object_screen_x-size/2))
            .css('top', Math.floor(object_screen_y-size/2))

            .css('width', Math.floor(size))
            .css('height', Math.floor(size))

            .css('background', "url('"+image+"')")
            .css('background-size', "cover")
            .css('background-color', "#ccc")

            .attr('id', objects[i].id)
            .attr('onclick', "Towns.Plugins.open('story',1,$(this).attr('id'));")


            .addClass('story')
        ;


        //r(tag[0].outerHTML);

        html+=tag[0].outerHTML;


        //-----------------------------------------

    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    return(html);

};