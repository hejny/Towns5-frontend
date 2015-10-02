

//======================================================================================================================first size

var selecting_distance_canvas;
var selecting_distance_canvas_ctx;

//-------------------------

var canvas_width;
var canvas_height;

$(function() {

    $('#map_bg').attr('width',$(document).width()*3);
    $('#map_bg').attr('height',$(document).height()*3);

    canvas_width=map_bg.width;
    canvas_height=map_bg.height;

});

//======================================================window resize, zoom



$( window ).resize(debounce(function() {


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

    drawMap();
},500));


//======================================================================================================================

/*$(function() {


    var myel = document.getElementById('map_drag');
    var mc = new Hammer.Manager(myel);

    // create a pinch and rotate recognizer
    // these require 2 pointers
    var pinch = new Hammer.Pinch();
    var rotate = new Hammer.Rotate();

    // we want to detect both the same time
    pinch.recognizeWith(rotate);

    // add to the Manager
    mc.add([pinch, rotate]);


    mc.on("pinch rotate", debounce(function (ev) {

        ev.preventDefault();


        map_rotation_delta += ev.rotation;//e.deltaY *2;

        map_zoom_delta += Math.log(ev.scale)/4;//e.deltaY *2;

        updateMap();



    },200));

});*/

//======================================================================================================================


var window_opened=false;

var keys=[];





var controls={
    'up':  [38,87],
    'down':  [40,83],
    'left':  [37,65],
    'right':  [39,68]
    /*'slopeup':  [88],
    'slopedown':  [67],
    'perspectiveup':  [86],
    'perspectivedown':  [66],
    'sizeup':  [78],
    'sizedown':  [77]*/


};

var moving=false;


$(function() {

    //------------------------------------------------------------

    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    //------------------------------------------------------------


    $(document).keydown(function (e) {

        //e.preDefault();

        //console.log(e.which);
        //$('html').scrollLeft(0);
        //$('html').scrollTop(0);


        if ($.inArray(e.which, keys) == -1) {
            keys.push(e.which);

        }

    });

    $(document).keyup(function (e) {
        //e.preDefault();

        var i = $.inArray(e.which, keys);


        if (i != -1) {
            keys.splice(i, 1);

        }

    });


    setInterval(
        function () {

            if(window_opened)return;

            //console.log(keys);

            var keys_ = [];

            for (var i = 0; i < keys.length; i++) {

                $.each(controls, function (keyname, val) {
                    //console.log(keyname);

                    if ($.inArray(keys[i], val) != -1) {
                        keys_.push(keyname);

                    }


                });

            }


            if ($.inArray('up', keys_) != -1) {
                mapMove(0,30);
                moving=true;
            }


            if ($.inArray('down', keys_) != -1) {
                mapMove(0,-30);
                moving=true;
            }

            if ($.inArray('left', keys_) != -1) {
                mapMove(30,0);
                moving=true;
            }


            if ($.inArray('right', keys_) != -1) {
                mapMove(-30,0);
                moving=true;
            }


            if(moving===true)
                if ($.inArray('up', keys_) == -1)
                if ($.inArray('down', keys_) == -1)
                if ($.inArray('left', keys_) == -1)
                if ($.inArray('right', keys_) == -1){
                    moving=false;
                    //alert('stop moving by keys');
                    updateMap();
                }






        }
        , 100
    );


//======================================================================================================================

    mouseWheel=function (e) {

        //e.preDefault();

        if(!terrainChanging){

            /*if(e.deltaY>0){
                map_zoom_delta = 0.4;//e.deltaY *2;
            }else{
                map_zoom_delta = -0.4;//e.deltaY *2;
            }*/

        }else{

            if(e.deltaY>0){
                selecting_distance+=100;
            }else{
                selecting_distance-=100;
            }
            updateSelectingDistance();

        }



        updateMap();


    };


    $("#map_drag").mousewheel(mouseWheel);
    $("#selecting-distance").mousewheel(mouseWheel);


//======================================================================================================================

    window.terrainChanging=false;
    window.building=false;
    window.selecting_offset={x: 0,y: 0};

    var first_offset = false;
    var last_offset = false;
    var current_offset = false;


    $('#map_drag').draggable({

        'scroll': false,
        'start': function () {

            first_offset = $(this).offset();
            last_offset = first_offset;


        },
        'stop': function () {

            $(this).css('left', first_offset.left);
            $(this).css('top', first_offset.top);

            updateMap();


        },
        'drag': function (e) {

            current_offset = $(this).offset();

            deltaX = current_offset.left - last_offset.left;
            deltaY = current_offset.top - last_offset.top;


            last_offset = current_offset;

            mapMove(deltaX,deltaY);


        }


    });

//======================================================================================================================

    selecting_distance_canvas = document.getElementById("selecting-distance");
    selecting_distance_canvas_ctx = selecting_distance_canvas.getContext("2d");


    window.updateSelectingDistance= function() {//todo all as this

        if(selecting_distance<100)selecting_distance=100;
        if(selecting_distance>10000)selecting_distance=10000;



        var width=selecting_distance * map_zoom_m*2;
        var height=selecting_distance * map_zoom_m;
        var border=3;

        $('#selecting-distance').attr('width',width+2*border);
        $('#selecting-distance').attr('height',height+2*border);

        selecting_offset.x=width/2-border;
        selecting_offset.y=height/2-border;


        selecting_distance_canvas_ctx.clearRect ( 0 , 0 ,width+border , height+border );

        selecting_distance_canvas_ctx.fillStyle = 'transparent';
        selecting_distance_canvas_ctx.strokeStyle = '#0098ff';
        selecting_distance_canvas_ctx.lineWidth = border;
        drawEllipse(selecting_distance_canvas_ctx, border, border, width,height);


    };


    //----------------------

    var BorderMoveRegion=100;
    var BorderMoveSpeed=30;
    var BorderMoveDelay=600;

    var BorderMoveQ=false;
    var BorderMoveY=0;
    var BorderMoveX=0;
    var BorderMoveDelay_=BorderMoveDelay;


    setInterval(
        function () {

            if (window_opened)return;


            if(BorderMoveX!=0 || BorderMoveY!=0){

                BorderMoveDelay_-=100;

                //r(BorderMoveDelay_);
                if(BorderMoveDelay_<0){
                    mapMove(BorderMoveX,BorderMoveY);
                    BorderMoveQ=true;
                }


            }


        },100);//todo fps


    $(window).mouseleave(function() {// cursor has left the window
        BorderMoveX=0;BorderMoveY=0;
    })

    $('body').mouseleave(function() {// cursor has left the IE window
        BorderMoveX=0;BorderMoveY=0;
    })


    var mouseMove=function (e) {
        //r('mouseMove');



        if(e.clientX<BorderMoveRegion){
            BorderMoveX=BorderMoveSpeed;
        }else
        if(e.clientX>(canvas_width/3)-BorderMoveRegion){
            BorderMoveX=-BorderMoveSpeed;
        }else{
            BorderMoveX=0;

        }


        if(e.clientY<BorderMoveRegion){
            BorderMoveY=BorderMoveSpeed;
        }else
        if(e.clientY>(canvas_height/3)-BorderMoveRegion){
            BorderMoveY=-BorderMoveSpeed;
        }else{
            BorderMoveY=0;
        }


        if(BorderMoveX==0 && BorderMoveY==0 && BorderMoveQ){
            BorderMoveQ=false;
            BorderMoveDelay_=BorderMoveDelay;
            updateMap();
        }

        /*if(BorderMoveQ==false){
            BorderMoveX=0;
            BorderMoveY=0;
        }*/


        canvas_mouse_x = e.clientX+(canvas_width/3);//-pos.left;
        canvas_mouse_y = e.clientY+(canvas_height/3);//-pos.top;


        if(terrainChanging || building) {


            $('#selecting-distance').css('left', e.clientX - selecting_offset['x']);
            $('#selecting-distance').css('top', e.clientY - selecting_offset['y']);
        }

    };


    $("#map_drag").mousemove(mouseMove);
    $("#selecting-distance").mousemove(mouseMove);


    //----------------------------------------

    $('#selecting-distance-plus').click(function(){
        selecting_distance+=100;
        updateSelectingDistance();
    });

    $('#selecting-distance-minus').click(function(){
        selecting_distance-=100;
        updateSelectingDistance();
    });

    $('#selecting-distance-close').click(function(){
        terrainChangeStop();
    });



//=======================================================================================================================schovani sidebar


/*
    var paintingTimeout;
    canvas_mouse_x = e.clientX+(canvas_width/3);//-pos.left;
    canvas_mouse_y = e.clientY+(canvas_height/3);//-pos.top;

    clearTimeout(paintingTimeout);
    paintingTimeout=setTimeout(function() {
        drawMap();
    },100);
*/




    var clickingTimeout;
    //var clickingInterval;

    var mouseClick=function (e) {
        r('mouseDown');

        //r(e);
        $('#loading').css('top', e.clientY);
        $('#loading').css('left', e.clientX);
        //$('#loading').css('display','block');
        $('#loading').show();


        canvas_mouse_x = e.clientX + (canvas_width / 3);//-pos.left;
        canvas_mouse_y = e.clientY + (canvas_height / 3);//-pos.top;


        clearTimeout(clickingTimeout);
        clickingTimeout = setTimeout(function () {

            if(building!==false){

                $('#loading').hide();


                var tmp=jQuery.extend({}, building);


                //------

                var map_click_x=(e.clientX-(canvas_width / 3/2));
                var map_click_y=(e.clientY-(canvas_height / 3/2));

                r(map_click_x,map_click_y,map_zoom_m,map_slope_m);

                map_rotation_rmap_rotation_r=map_click_x/180/map_zoom_m;
                map_click_y=map_click_y/180/map_zoom_m/map_slope_m;



                var map_click_dist=Math.pow(Math.pow(map_click_x,2)+Math.pow(map_click_y,2),(1/2));
                var map_click_rot=Math.acos(map_click_x/map_click_dist);
                if(map_click_y<0){
                    map_click_rot=2*3.1415 - map_click_rot;//todo v celem projektu udelat pi a golden ratio jako konstantu
                }


                map_click_rot=map_click_rot-map_rotation_r;


                map_rotation_r=Math.cos(map_click_rot)*map_click_dist;
                map_rotation_r=Math.sin(map_click_rot)*map_click_dist;


                //r(map_click_x,map_click_y);


                map_click_x+=map_x;
                map_click_y+=map_y;

                r(map_click_x,map_click_y);

                //-----

                tmp.x=map_click_x;
                tmp.y=map_click_y;

                map_object_changes.push(tmp);

                loadMap();

                mapSpecialCursorStop();

                return;

            }



            var map_selected_ids_prev = map_selected_ids;
            map_selecting = true;


            drawMap();
            updateValues();


            //Pokud nedoslo k zadne zmene, oznaceny objekt se odznaci
            if (map_selected_ids == map_selected_ids_prev) {
                map_selected_ids = [];
            }

            $('#loading').hide();

            if(!map_selecting)
                objectMenu();


            drawMap();


            map_selecting = false;


            /*clickingInterval = setInterval(function () {
                //r('clickingInterval');
                //canvas_mouse_x = e.clientX+(canvas_width/3);//-pos.left;
                //canvas_mouse_y = e.clientY+(canvas_height/3);//-pos.top;
                drawMap();
            },300);*/




            }, 100);
    };


    $("#map_drag").click(mouseClick);
    $("#selecting-distance").click(mouseClick);


    //----------------------

    /*var mouseUp=function (e) {
        r('mouseUp');
        clearInterval(clickingInterval);
    };

    $("#map_drag").mouseup(mouseUp);
    $("#selecting-distance").mouseup(mouseUp);*/


//======================================================================================================================

});