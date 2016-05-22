/**
 * @author ©Towns.cz
 * @fileOverview Drawing map loop for moving objects
 */
//======================================================================================================================


T.UI.Map.MapMove = class {



    /*todo For Ctl and other non-draw functions create new file*/
    static orderMoveAndNormal() {

        r('orderMoveAndNormal');

        var change = false;

        //Standing object put into objects_external;
        objects_server_move = objects_server_move.filter(function (object) {

            if (!object.isMoving()) {

                objects_server.getAll().push(object);
                change = true;
                return false;

            } else {
                return true;
            }

        });


        r(objects_external);
        //Moving object put into objects_server_move;
        objects_server = objects_external.filter(function (object) {

            //r(object);
            if (object.isMoving()) {

                r(object);

                objects_server_move.getAll().push(object);
                change = true;
                return false;

            } else {
                return true;
            }

        });

        r(change);

        if (change)T.UI.Map.loadMap();

    }



    static draw() {

        $('#map-move').html(T.UI.Map.objectsHTML(objects_server_move));
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
