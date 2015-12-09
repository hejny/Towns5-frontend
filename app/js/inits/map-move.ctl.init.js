
//======================================================================================================================
/*
 ███╗   ███╗ ██████╗ ██╗   ██╗███████╗     ██████╗████████╗██╗
 ████╗ ████║██╔═══██╗██║   ██║██╔════╝    ██╔════╝╚══██╔══╝██║
 ██╔████╔██║██║   ██║██║   ██║█████╗      ██║        ██║   ██║
 ██║╚██╔╝██║██║   ██║╚██╗ ██╔╝██╔══╝      ██║        ██║   ██║
 ██║ ╚═╝ ██║╚██████╔╝ ╚████╔╝ ███████╗    ╚██████╗   ██║   ███████╗
 ╚═╝     ╚═╝ ╚═════╝   ╚═══╝  ╚══════╝     ╚═════╝   ╚═╝   ╚══════╝
 */

/*todo For Ctl and other non-draw functions create new file*/
function orderMoveAndNormal(){

    var change=false;

    //Standing object put into map_object_changes;
    map_object_changes_move=map_object_changes_move.filter(function(object){

        if(!Path.is(object.path)){

            map_object_changes.push(object);
            change=true;
            return false;

        }else{
            return true;
        }

    });


    //Moving object put into map_object_changes_move;
    map_object_changes=map_object_changes.filter(function(object){

        if(Path.is(object.path)){

            map_object_changes_move.push(object);
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

    $('#map-move').html(Map.objectsHTML(map_object_changes_move));
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
