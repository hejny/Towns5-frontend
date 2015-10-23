

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

        if(terrainChanging!=false){

            if(e.deltaY>0){
                selecting_distance+=100;
            }else{
                selecting_distance-=100;
            }
            updateSelectingDistance();


        }else
        if(building!=false){

            if(e.deltaY>0){
                building.rot+=10;
            }else{
                building.rot-=10;
            }
            buildingUpdate();

        }else
        {

            /*if(e.deltaY>0){
             map_zoom_delta = 0.4;//e.deltaY *2;
             }else{
             map_zoom_delta = -0.4;//e.deltaY *2;
             }*/


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

            //if (buildingByDraggingStartX === false)return; todo opravdu?

            //r(touchScreen);
            //if (touchScreen)return; //todo Funguje to?
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



//=======================================================================================================================Klikani - oznaceni + obycejne staveni

    var clickingTimeout;


    var mouseClick=function (e) {

        if (building !== false)
            if (typeof building.res_path!=='undefined')return;

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

            //-----------------------------------------------------------------Building
            if(building!==false){

                $('#loading').hide();


                var tmp=jQuery.extend({}, building);


                var map_click_x=(e.clientX-(canvas_width / 3/2));
                var map_click_y=(e.clientY-(canvas_height / 3/2));
                var mapPos=mouseCenterPos2MapPos(map_click_x,map_click_y);


                tmp.x=mapPos.x;
                tmp.y=mapPos.y;


                tmp.res = modelRotSize(tmp.res, tmp.rot, tmp.size);


                delete tmp.rot;
                delete tmp.size;

                create(tmp);


                loadMap();

                //mapSpecialCursorStop();

                return;

            }
            //-----------------------------------------------------------------



            var map_selected_ids_prev = map_selected_ids;
            map_selecting = true;


            drawMap();
            updateValues();


            //Pokud nedoslo k zadne zmene, oznaceny objekt se odznaci
            if (map_selected_ids == map_selected_ids_prev) {
                map_selected_ids = [];
            }

            $('#loading').hide();

            if (!map_selecting)
                objectMenu();


            drawMap();


            map_selecting = false;

        }, 100);
    };


    $("#map_drag").click(mouseClick);
    $("#selecting-distance").click(mouseClick);


//======================================================================================================================Building By Dragging

    var buildingByDraggingPath=false;
        //todo sjednotit nazyvani uhlu v rad a deg

    //----------------------------------------------------------------------------------mouseMove

    var mouseMove=function (e) {

        //r('mouseMove',building,buildingByDragging);
        //if (building === false)r('building === false');
        //if (buildingByDragging === false)r('buildingByDragging === false');

        if (building === false)return;
        if (typeof building.res_path==='undefined')return;
        if (buildingByDraggingPath === false)return;

        //-------------------Convert mouse positions to map positions

        var map_click_x=(e.clientX-(canvas_width / 3/2));
        var map_click_y=(e.clientY-(canvas_height / 3/2));

        var mapPos=mouseCenterPos2MapPos(map_click_x,map_click_y);

        //-------------------

        if(buildingByDraggingPath.length>0){


            if(false){


                if(buildingByDraggingPath.length>1) {
                    var lastX = buildingByDraggingPath[buildingByDraggingPath.length - 2][0],
                        lastY = buildingByDraggingPath[buildingByDraggingPath.length - 2][1];
                }else{
                    var lastX = buildingByDraggingPath[buildingByDraggingPath.length - 1][0],
                        lastY = buildingByDraggingPath[buildingByDraggingPath.length - 1][1];
                }


                var dist=xy2dist(lastX-mapPos.x,lastY-mapPos.y);
                //r(dist,(building.size * map_model_size));


                if(dist>(building.size * map_model_size)){

                    //r('newpoint');
                    buildingByDraggingPath.push([mapPos.x,mapPos.y]);

                }else{

                    //r('aacpoint');
                    buildingByDraggingPath[buildingByDraggingPath.length-1]=([mapPos.x,mapPos.y]);

                }

            }else{

                buildingByDraggingPath[1]=[mapPos.x,mapPos.y];

            }


        }else{


            //r('startpoint');
            buildingByDraggingPath=[[mapPos.x,mapPos.y]];

        }

    };


    $("#map_drag").mousemove(mouseMove);
    $("#selecting-distance").mousemove(mouseMove);

    //----------------------------------------------------------------------------------mouseDown

    var mouseDown=function (e) {

        if (building == false)return;
        if (typeof building.res_path==='undefined')return;

        buildingByDraggingPath=[];
        mouseMove(e);

        bufferDrawStart();
        $('#selecting-distance').hide();//todo [PH] ? Do bufferDrawStart
        requestAnimationFrame(buildingLoop);


    };


    $("#map_drag").mousedown(mouseDown);
    $("#selecting-distance").mousedown(mouseDown);

    //----------------------------------------------------------------------------------BuildingLoop

    var buildingLoop=function (e) {

        if (building == false)return;
        if (buildingByDraggingPath === false)return;

        //------------------------------------------------------

        map_object_changes_buffer=[];


        //r(buildingByDraggingPath);
        for(var ii=1,ll=buildingByDraggingPath.length;ii<ll;ii++) {


            var buildingByDraggingStartX = buildingByDraggingPath[ii-1][0];
            var buildingByDraggingStartY = buildingByDraggingPath[ii-1][1];


            var buildingByDraggingEndX = buildingByDraggingPath[ii][0];
            var buildingByDraggingEndY = buildingByDraggingPath[ii][1];

            //r(buildingByDraggingPath);


            var distance = xy2dist(buildingByDraggingEndX - buildingByDraggingStartX, buildingByDraggingEndY - buildingByDraggingStartY);

            //todo pouzit funkci xy2distDeg
            var rot = Math.round(Math.atan2(buildingByDraggingEndX - buildingByDraggingStartX, buildingByDraggingEndY - buildingByDraggingStartY) * (180 / Math.PI));
            if (rot < 0)rot = rot + 360;


            for (var i = (ii==1?0:1), l = Math.round(distance / (building.size * map_model_size)); i <= l; i++) {


                //r(i,l);

                var tmp = jQuery.extend({}, building);


                if (l < 2 && ll<2) {
                    var rot = tmp.rot;

                } else {

                    tmp.rot = rot;

                    if (ii==1 && i == 0) {
                        tmp.res = tmp.res_node;
                    } else if (ii==ll-1 && i == l) {
                        tmp.res = tmp.res_node;
                    } else {
                        tmp.res = tmp.res_path;
                    }


                }


                tmp.x = buildingByDraggingStartX + (buildingByDraggingEndX - buildingByDraggingStartX) * (i / l);
                tmp.y = buildingByDraggingStartY + (buildingByDraggingEndY - buildingByDraggingStartY) * (i / l);


                /*if([0,4,10].indexOf(map_bg_data[Math.round(tmp.y)+Math.floor(map_size/2)][Math.round(tmp.x)+Math.floor(map_size/2)])!=-1){
                 tmp.res=tmp.res_node;
                 }*/


                tmp.res = modelRotSize(tmp.res, rot, building.size);


                delete tmp.rot;
                //delete tmp.res_path;

                //------

                map_object_changes_buffer.push(tmp);

            }
        }

        //------------------------------------------------------

        bufferDraw();

        setTimeout(function(){

            requestAnimationFrame(buildingLoop);

        },10);


    };

    //----------------------------------------------------------------------------------mouseUp

    var mouseUp=function (e) {

        if (building == false)return;
        if (typeof building.res_path==='undefined')return;
        if (buildingByDraggingPath === false)return;

        buildingLoop();

        createMulti(map_object_changes_buffer);
        map_object_changes_buffer=[];


        buildingByDraggingPath=false;


        loadMap();
        $('#selecting-distance').show();
        bufferDrawEnd();

    };


    $("#map_drag").mouseup(mouseUp);
    $("#selecting-distance").mouseup(mouseUp);

    //----------------------------------------------------------------------------------
//======================================================================================================================

});