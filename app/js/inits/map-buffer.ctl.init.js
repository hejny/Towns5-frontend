
//======================================================================================================================
/*
 ██████╗ ██╗   ██╗███████╗███████╗███████╗██████╗      ██████╗████████╗██╗
 ██╔══██╗██║   ██║██╔════╝██╔════╝██╔════╝██╔══██╗    ██╔════╝╚══██╔══╝██║
 ██████╔╝██║   ██║█████╗  █████╗  █████╗  ██████╔╝    ██║        ██║   ██║
 ██╔══██╗██║   ██║██╔══╝  ██╔══╝  ██╔══╝  ██╔══██╗    ██║        ██║   ██║
 ██████╔╝╚██████╔╝██║     ██║     ███████╗██║  ██║    ╚██████╗   ██║   ███████╗
 ╚═════╝  ╚═════╝ ╚═╝     ╚═╝     ╚══════╝╚═╝  ╚═╝     ╚═════╝   ╚═╝   ╚══════╝
 */

function bufferDrawStartCtl(ctx,objects){




    $('#map_buffer').css('position','absolute');
    $('#map_buffer').css('top','0px');
    $('#map_buffer').css('left','0px');

    map_buffer.width=canvas_width/3;
    map_buffer.height=canvas_height/3;

    $('#map_buffer').css('z-index',$('#map_bg').css('z-index')-(-10));


}


//------------------------------------
function bufferDrawEndCtl(){


    map_buffer_ctx.clearRect(0, 0, canvas_width/3, canvas_height/3);
}

//------------------------------------

function bufferDrawCtl(){

    objectsDraw(map_buffer_ctx,map_object_changes_buffer);


}


