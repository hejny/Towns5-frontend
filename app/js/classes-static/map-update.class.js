/**
 * @author ©Towns.cz
 * @fileOverview Additional methods to object Map
 */
//======================================================================================================================


/**
 * Updates map position, zoom, ect. and run DrawMap
 * @static
 * @param ms @deprecated
 */
Map.updateMap = function(){

    r('updateMap');
    var ms=1000;

    //----------------

    map_zoom+=map_zoom_delta*ms/1000;
    map_rotation+=map_rotation_delta*ms/1000;
    map_slope+=map_slope_delta*ms/1000;

    map_x+=map_x_delta*ms/1000;
    map_y+=map_y_delta*ms/1000;
    map_size+=map_size_delta;//Tady se ms neuplatnuji



    //----------------


    map_zoom=Math.round(map_zoom*100)/100;
    map_rotation=Math.round(map_rotation*10)/10;
    map_slope=Math.round(map_slope*10)/10;

    map_x=Math.round(map_x*100)/100;
    map_y=Math.round(map_y*100)/100;
    map_size=Math.round(map_size);

    //----------------bounds

    if(map_rotation<0)map_rotation+=360;
    if(map_rotation>360)map_rotation-=360;

    if(map_slope<20)map_slope=20;
    if(map_slope>90)map_slope=90;

    if(map_zoom>1)map_zoom=1;
    if(map_zoom<-4)map_zoom=-4;


    //----------------Zm


    if(map_zoom_delta || !map_zoom_m){
        map_zoom_m=Math.pow(2,map_zoom);
        updateSelectingDistance();
    }

    if(map_rotation_delta || !map_rotation_r) {

        map_rotation_r = map_rotation / 180 * Math.PI;
        map_rotation_sin = Math.sin(map_rotation_r);
        map_rotation_cos = Math.cos(map_rotation_r);
        map_rotation_sin_minus = Math.sin(-map_rotation_r);
    }

    if(map_slope_delta || !map_slope_m){
        map_slope_m=Math.abs(1/Math.sin(map_slope/180*Math.PI));
        map_slope_n=Math.abs(1/Math.cos(map_slope/180*Math.PI));
    }


    if(map_x_delta || map_y_delta || map_size_delta || map_zoom_delta || map_rotation_delta || !is(map_size)){


        updateMapLocationHash();

        //r(canvas_height,canvas_width,map_field_size,map_zoom_m);
        map_size=Math.max((canvas_height/80/*1.4*/),(canvas_width/map_field_size/*1.4*/))/map_zoom_m;
        map_size=Math.ceil(map_size/2)*2;



        if(map_size<4)map_size=4;
        if(map_size>max_map_size)map_size=max_map_size;

        //console.log(map_size);

        //console.log('loadMap');
        if(isNaN(map_size))throw 'map_size is NaN after updateMap and before loadMap';
        Map.loadMapAsync();

    }




    //----------------Vynulovani hodnot

    map_zoom_delta=0;
    map_rotation_delta=0;
    map_slope_delta=0;
    map_x_delta=0;
    map_y_delta=0;
    map_size_delta=0;

    //----------------



    //----------------




};




//======================================================================================================================


Map.mapMove = function(deltaX,deltaY,autoUpdate=false) {

    //----------------

    var x_delta = -Math.sin(map_rotation / 180 * Math.PI) * deltaY / 180 / map_zoom_m*map_slope_m;
    var y_delta = -Math.cos(map_rotation / 180 * Math.PI) * deltaY / 180 / map_zoom_m*map_slope_m;


    x_delta += -Math.cos(map_rotation / 180 * Math.PI) * deltaX / 180 / map_zoom_m;
    y_delta += Math.sin(map_rotation / 180 * Math.PI) * deltaX / 180 / map_zoom_m;

    x_delta = x_delta*1.133;
    y_delta = y_delta*1.133;


    map_x_delta+=x_delta/100000;
    map_y_delta+=y_delta/100000;


    map_x+=x_delta;
    map_y+=y_delta;


    //----------------

    var map_bg_x = Math.toInt($('#map_bg').css('left'));
    var map_bg_y = Math.toInt($('#map_bg').css('top'));

    //console.log($('#map_bg').scss('left'),map_bg_x,map_bg_y);

    map_bg_x += deltaX;
    map_bg_y += deltaY;

    $('#map_bg').css('left', map_bg_x);//faster than +=
    $('#map_bg').css('top', map_bg_y);


    $('.moving-object').css( 'left', '+='+deltaX );
    $('.moving-object').css( 'top', '+='+deltaY );


    if(autoUpdate){
        if(Math.xy2dist(map_bg_x-canvas_left,map_bg_y-canvas_top)>600){
            Map.updateMap();
        }
    }


};