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

            r('T.UI Event: drag start');

            $(this).addClass('js-label-noclick');//todo should it has this name

            first_offset = $(this).offset();
            last_offset = first_offset;


        },
        'stop': function () {

            r('T.UI Event: drag stop');

            //todo sounds ion.sound.play("door_bump");

            $(this).css('left', first_offset.left);
            $(this).css('top', first_offset.top);

            T.UI.Map.updateMap();


        },
        'drag': function (e) {

            r('T.UI Event: dragging');

            current_offset = $(this).offset();

            deltaX = current_offset.left - last_offset.left;
            deltaY = current_offset.top - last_offset.top;


            last_offset = current_offset;

            T.UI.Map.mapMove(deltaX,deltaY);


        }


    });

});