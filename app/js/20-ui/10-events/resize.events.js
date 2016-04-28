/**
 * @author Towns.cz
 * @fileOverview  Resizing window events
 */
//======================================================================================================================


//todo create Events static object
var canvasResize=function(){

    r('T.UI Event: resize');


    window_width=$('body').width();
    window_height=$('body').height();

    $('#map_drag')
        .attr('width',window_width)
        .attr('height',window_height)
    ;


    if(window_height>window_width*2){

        canvas_height=canvas_height*map_canvas_size;
        canvas_width = canvas_height*2;

    }else{

        canvas_width = window_width*map_canvas_size;
        canvas_height=canvas_width/2;

    }



    $('#map_bg')
        .attr('width',canvas_width)
        .attr('height',canvas_height)
    ;
    /*$('#map-stories')
        .attr('width',canvas_width)
        .attr('height',canvas_height)
    ;*/




    canvas_left = (window_width  - canvas_width  )/2;
    canvas_top  = (window_height - canvas_height )/2;



    //----------------Move canvas

    $('#map_bg')
        .css('left', canvas_left)
        .css('top', canvas_top)
    ;
    //----------------


    //----------------Move stories

    $('#map-stories')
        .css('left', canvas_left)
        .css('top', canvas_top)
    ;
    //----------------



};


$( window ).resize(Interval.debounce(function() {

    canvasResize();
    T.UI.Map.drawMap();

},500));