/**
 * @author Towns.cz
 * @fileOverview  Resizing window events
 */
//======================================================================================================================


//todo create Events static object
var canvasResize=function(){

    window_width=$('body').width();
    window_height=$('body').height();

    $('#map_drag').attr('width',window_width);
    $('#map_drag').attr('height',window_height);


    if(window_height>window_width*2){

        canvas_height=canvas_height*map_canvas_size;
        canvas_width = canvas_height*2;

    }else{

        canvas_width = window_width*map_canvas_size;
        canvas_height=canvas_width/2;

    }

    //canvas_width+=500;


    $('#map_bg').attr('width',canvas_width);
    $('#map_bg').attr('height',canvas_height);

    //r(window_width,canvas_width);

    canvas_left = (window_width  - canvas_width  )/2;
    canvas_top  = (window_height - canvas_height )/2;

    //r(canvas_left);

    $('#map_bg').css('left',canvas_left);
    $('#map_bg').css('top',canvas_top);

};


$( window ).resize(Interval.debounce(function() {

    canvasResize();
    Map.drawMap();

},500));