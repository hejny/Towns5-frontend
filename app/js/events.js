

//======================================================================================================================first size

var canvas_width;
var canvas_height;

$( document ).ready(function() {//@todo sjednotit

    $('#map_bg').attr('width',$(document).width()*3);
    $('#map_bg').attr('height',$(document).height()*3);

    canvas_width=map_bg.width;
    canvas_height=map_bg.height;

});

//======================================================window resize, zoom



$( window ).resize(function() {


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

    //alert(canvas_width/3+','+canvas_height/3);


    $('#map_bg').css('left',-canvas_width/3);
    $('#map_bg').css('top',-canvas_height/3);

    //map_ctx.fillStyle = "#000000";
    //map_ctx.fillRect( 0 , 0 ,canvas_width , canvas_height );
    //$('#map_bg').css('left',0);
    //$('#map_bg').css('top',0);

    drawMap();
});

//document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });
//document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });


//======================================================================================================================

/*
$('#map_drag').hammer().bind("pinch", function(ev){

    alert('aaa');

});*/

$( document ).ready(function() {


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


    mc.on("pinch rotate", function (ev) {

        ev.preventDefault();

        //console.log(ev);

        //ev.scale;


        map_rotation_delta += ev.rotation;//e.deltaY *2;

        map_zoom_delta += Math.log(ev.scale)/4;//e.deltaY *2;

        updateMap();

        //myElement.textContent += ev.type +" ";
        //alert('aaa');

    });

});

//======================================================================================================================




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



$( document ).ready(function() {

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

                //map_x -= Math.sin(map_rotation / 180 * pi) * 30 / 180;
                //map_y -= Math.cos(map_rotation / 180 * pi) * 30 / 180;

                mapMove(0,30);

                //updateMap();

            }


            if ($.inArray('down', keys_) != -1) {

                //map_x_delta = Math.sin(map_rotation / 180 * pi) * 50;
                //map_y_delta = Math.cos(map_rotation / 180 * pi) * 50;
                mapMove(0,-30);


            }


            if ($.inArray('left', keys_) != -1) {
                //map_rotation_delta = 45;
                //updateMap();
                mapMove(30,0);
            }


            if ($.inArray('right', keys_) != -1) {
                //map_rotation_delta = -45;
                //updateMap();
                mapMove(-30,0);
            }


            /*if ($.inArray('slopeup', keys_) != -1) {
                map_slope_delta = 90;
            }


            if ($.inArray('slopedown', keys_) != -1) {
                map_slope_delta = -90;
            }

            if ($.inArray('perspectiveup', keys_) != -1) {
                map_perspective_delta = 0.01;
            }


            if ($.inArray('perspectivedown', keys_) != -1) {
                map_perspective_delta = -0.01;
            }

            if ($.inArray('sizeup', keys_) != -1) {
                map_size_delta = 2;
            }


            if ($.inArray('sizedown', keys_) != -1) {
                map_size_delta = -2;
            }*/


        }
        , 100
    );


//======================================================================================================================

    $('#map_drag').mousewheel(function (e) {

        //e.preDefault();

        if(e.deltaY>0){
            map_zoom_delta = 0.4;//e.deltaY *2;
        }else{
            map_zoom_delta = -0.4;//e.deltaY *2;
        }


        updateMap();


    });


//======================================================================================================================

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
        'drag': function () {

            current_offset = $(this).offset();

            deltaX = current_offset.left - last_offset.left;
            deltaY = current_offset.top - last_offset.top;


            last_offset = current_offset;


            mapMove(deltaX,deltaY,true);


        }


    });


//======================================================================================================================


    $("#map_drag").mousemove(function (e) {

        //var pos   = $(this).offset();

        canvas_mouse_x = e.clientX+(canvas_width/3);//-pos.left;
        canvas_mouse_y = e.clientY+(canvas_height/3);//-pos.top;


    });



//=======================================================================================================================schovani sidebar


    $("#map_drag").click(function (e) {

        //$('.sidebar').hide();

        canvas_mouse_x = e.clientX+(canvas_width/3);//-pos.left;
        canvas_mouse_y = e.clientY+(canvas_height/3);//-pos.top;
        map_selected_uids=[];
        map_selecting=true;

        //alert('click');

        drawMap();
        updateValues();
        objectMenu();


    });





//======================================================================================================================

});