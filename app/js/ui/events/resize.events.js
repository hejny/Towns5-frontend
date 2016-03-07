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

    canvas_width=window_width*map_canvas_size;
    canvas_height=window_height*map_canvas_size;


    $('#map_bg').attr('width',canvas_width);
    $('#map_bg').attr('height',canvas_height);

    //r(window_width,canvas_width);

    canvas_left=window_width*-((map_canvas_size-1)/2);
    canvas_top=window_height*-((map_canvas_size-1)/2);

    //r(canvas_left);

    $('#map_bg').css('left',canvas_left);
    $('#map_bg').css('top',canvas_top);

};


$( window ).resize(Interval.debounce(function() {

    canvasResize();
    Map.drawMap();

},500));