/**
 * @author ©Towns.cz
 * @fileOverview Drawing map loop for moving objects
 */
//======================================================================================================================


T.UI.Map.MapMove = class {



    /*todo For Ctl and other non-draw functions create new file*/
    static orderMoveAndNormal() {

        var change = false;

        //Standing object put into objects_external;
        objects_external_move = objects_external_move.filter(function (object) {

            if (!T.Path.is(object.path)) {

                objects_external.push(object);
                change = true;
                return false;

            } else {
                return true;
            }

        });


        //Moving object put into objects_external_move;
        objects_external = objects_external.filter(function (object) {

            if (T.Path.is(object.path)) {

                objects_external_move.push(object);
                change = true;
                return false;

            } else {
                return true;
            }

        });


        if (change)T.UI.Map.loadMap();

    }



    static draw() {

        $('#map-move').html(T.UI.Map.objectsHTML(objects_external_move));
        //r($('#map-move').html());


    }





    static drawLoop() {

        setTimeout(function () {

            T.UI.Map.MapMove.draw();
            requestAnimationFrame(T.UI.Map.MapMove.drawLoop);

        }, 50);


    }

};






//todo move to another file and rename this file
T.UI.Map.MapMove.drawLoop();
