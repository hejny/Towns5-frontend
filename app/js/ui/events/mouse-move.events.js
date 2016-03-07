/**
 * @author Towns.cz
 * @fileOverview  xxx
 */
//======================================================================================================================

$(function(){


    selecting_distance_3d_canvas = document.getElementById('selecting-distance-3d');//todo move to other file


    selecting_distance_2d_canvas = document.getElementById('selecting-distance-2d');//todo move to other file
    selecting_distance_2d_canvas_ctx = selecting_distance_2d_canvas.getContext('2d');
    //selecting_distance_2d_canvas_gl = selecting_distance_2d_canvas.getContext('webgl');


    window.updateSelectingDistance= function() {//todo to static object

        if(selecting_distance<100)selecting_distance=100;
        if(selecting_distance>10000)selecting_distance=10000;


        selecting_distance_fields=selecting_distance/map_field_size;

        var width=selecting_distance * map_zoom_m*2;
        var height=selecting_distance * map_zoom_m;
        var border=3;

        $(selecting_distance_3d_canvas).hide();
        $(selecting_distance_2d_canvas)
            .attr('width',width+2*border)
            .attr('height',height+2*border)
            .show();

        selecting_offset.x=width/2-border;
        selecting_offset.y=height/2-border;


        selecting_distance_2d_canvas_ctx.clearRect ( 0 , 0 ,width+border , height+border );

        selecting_distance_2d_canvas_ctx.fillStyle = 'transparent';
        selecting_distance_2d_canvas_ctx.strokeStyle = '#0098ff';
        selecting_distance_2d_canvas_ctx.lineWidth = border;
        selecting_distance_2d_canvas_ctx.drawEllipse( border, border, width,height);


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


            if(BorderMoveX!==0 || BorderMoveY!==0){

                BorderMoveDelay_-=100;

                //r(BorderMoveDelay_);
                if(BorderMoveDelay_<0){

                    r('border moving');
                    Map.mapMove(BorderMoveX,BorderMoveY,true);
                    BorderMoveQ=true;
                }


            }


        },100);//todo fps


    $(window).mouseleave(function() {// cursor has left the window
        BorderMoveX=0;BorderMoveY=0;
    });

    $('body').mouseleave(function() {// cursor has left the IE window
        BorderMoveX=0;BorderMoveY=0;
    });


    $('body').mouseup(function() {

        BorderMoveX=0;BorderMoveY=0;

    });


    var mouseMove=function (e) {
        //r('mouseMove');



        if(e.clientX<BorderMoveRegion){
            BorderMoveX=BorderMoveSpeed;//r('set borders');
        }else
        if(e.clientX>window_width-BorderMoveRegion){
            BorderMoveX=-BorderMoveSpeed;//r('set borders');
        }else{
            BorderMoveX=0;

        }


        if(e.clientY<BorderMoveRegion){
            BorderMoveY=BorderMoveSpeed;//r('set borders');
        }else
        if(e.clientY>window_height-BorderMoveRegion){
            BorderMoveY=-BorderMoveSpeed;//r('set borders');
        }else{
            BorderMoveY=0;
        }


        if(BorderMoveX==0 && BorderMoveY==0 && BorderMoveQ){
            BorderMoveQ=false;
            BorderMoveDelay_=BorderMoveDelay;
            Map.updateMap();
        }



        if(specialCursor) {


            $('#selecting-distance').css('left', e.clientX - selecting_offset['x']);
            $('#selecting-distance').css('top', e.clientY - selecting_offset['y']);
            $('#selecting-distance').attr('joinmoved', '1');//todo refactor better solution


            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Building
            if(building!==false){
                if(building.subtype!=='wall'){

                    //r('preview');


                    var map_click_x=(e.clientX-(window_width/2));
                    var map_click_y=(e.clientY-(window_height/2));
                    var mapPos=Map.mouseCenterPos2MapPos(map_click_x,map_click_y);

                    building.x=mapPos.x;
                    building.y=mapPos.y;

                    buildingUpdate();

                }
            }
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


        }




    };


    $('#map_drag').mousemove(mouseMove);
    $('#selecting-distance').mousemove(mouseMove);

});