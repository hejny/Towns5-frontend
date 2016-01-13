/**
 * @author ©Towns.cz
 * @fileOverview Buffer for building walls
 * todo where this file should be?
 */
//======================================================================================================================


function bufferDrawStartCtl(ctx,objects){




    $('#map_buffer').css('position','absolute');
    $('#map_buffer').css('top','0px');
    $('#map_buffer').css('left','0px');

    map_buffer.width=window_width;
    map_buffer.height=window_height;

    $('#map_buffer').css('z-index',$('#map_bg').css('z-index')-(-10));


}


//------------------------------------
function bufferDrawEndCtl(){


    map_buffer_ctx.clearRect(0, 0, window_width, window_height);
}

//------------------------------------

function bufferDrawCtl(){

    Map.objectsDraw(map_buffer_ctx,objects_external_buffer);


}


