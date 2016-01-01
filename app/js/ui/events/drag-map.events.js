/**
 * @author Towns.cz
 * @fileOverview  Dragging Map
 */
//======================================================================================================================

$(function(){

    window.terrainChanging=false;
    window.building=false;
    window.selecting_offset={x: 0,y: 0};

    var first_offset = false;
    var last_offset = false;
    var current_offset = false;


    $('#map_drag').draggable({

        'scroll': false,
        'start': function () {

            first_offset = $(this).offset();
            last_offset = first_offset;


        },
        'stop': function () {

            //todo sounds ion.sound.play("door_bump");

            $(this).css('left', first_offset.left);
            $(this).css('top', first_offset.top);

            Map.updateMap();


        },
        'drag': function (e) {

            current_offset = $(this).offset();

            deltaX = current_offset.left - last_offset.left;
            deltaY = current_offset.top - last_offset.top;


            last_offset = current_offset;

            Map.mapMove(deltaX,deltaY);


        }


    });

});