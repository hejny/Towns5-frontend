/**
 * @author ©Towns.cz
 * @fileOverview  Resizing window events
 */
//======================================================================================================================

$( window ).resize(Interval.debounce(function() {


    /*if(screen.width == window.innerWidth){
     alert("you are on normal page with 100% zoom");
     } else if(screen.width > window.innerWidth){
     alert("you have zoomed in the page i.e more than 100%");
     } else {
     alert("you have zoomed out i.e less than 100%");
     }*/



    //document.body.style.zoom="100%";

    //console.log('resized');

    $('#map_drag').attr('width',$('body').width());
    $('#map_drag').attr('height',$('body').height());



    $('#map_bg').attr('width',$('body').width()*3);
    $('#map_bg').attr('height',$('body').height()*3);

    canvas_width=map_bg.width;
    canvas_height=map_bg.height;


    $('#map_bg').css('left',-canvas_width/3);
    $('#map_bg').css('top',-canvas_height/3);

    Map.drawMap();
},500));