/**
 * @author ©Towns.cz
 * @fileOverview Drawing map loop for moving objects
 */
//======================================================================================================================


/*todo For Ctl and other non-draw functions create new file*/
function orderMoveAndNormal(){

    var change=false;

    //Standing object put into objects_external;
    objects_external_move=objects_external_move.filter(function(object){

        if(!Path.is(object.path)){

            objects_external.push(object);
            change=true;
            return false;

        }else{
            return true;
        }

    });


    //Moving object put into objects_external_move;
    objects_external=objects_external.filter(function(object){

        if(Path.is(object.path)){

            objects_external_move.push(object);
            change=true;
            return false;

        }else{
            return true;
        }

    });


    if(change)Map.loadMap();

}

//------------------------------------

function moveDrawCtl(){

    $('#map-move').html(Map.objectsHTML(objects_external_move));
    //r($('#map-move').html());




}

//---------

function moveDrawLoop() {

    setTimeout(function(){

        moveDrawCtl();
        requestAnimationFrame(moveDrawLoop);

    },50);


}
moveDrawLoop();
