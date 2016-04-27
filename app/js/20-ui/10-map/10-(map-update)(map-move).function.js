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
    map_radius+=map_radius_delta;//Tady se ms neuplatnuji



    //----------------


    map_zoom=Math.round(map_zoom*100)/100;
    map_rotation=Math.round(map_rotation*10)/10;
    map_slope=Math.round(map_slope*10)/10;

    map_x=Math.round(map_x*100)/100;
    map_y=Math.round(map_y*100)/100;
    map_radius=Math.round(map_radius);

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

        if(typeof updateSelectingDistance != 'undefined')//todo refactor
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


    if(map_x_delta || map_y_delta || map_radius_delta || map_zoom_delta || map_rotation_delta || !is((map_radius*2))){


        //T.URI.position=new T.Position(map_x,map_y);
        T.URI.write();

        //r(canvas_height,canvas_width,map_field_size,map_zoom_m);
        map_radius=Math.min((canvas_height/map_field_size),((canvas_width-100)/map_field_size/2))/map_zoom_m;
        map_radius=Math.ceil(map_radius);

        //todo maybe min_map_radius
        if(map_radius>max_map_radius)map_radius=max_map_radius;

        //console.log((map_radius*2));

        //console.log('loadMap');
        if(isNaN((map_radius*2)))throw '(map_radius*2) is NaN after updateMap and before loadMap';
        Map.loadMapAsync();

    }




    //----------------Vynulovani hodnot

    map_zoom_delta=0;
    map_rotation_delta=0;
    map_slope_delta=0;
    map_x_delta=0;
    map_y_delta=0;
    map_radius_delta=0;

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

    var map_bg_x = T.Math.toInt($('#map_bg').css('left'));
    var map_bg_y = T.Math.toInt($('#map_bg').css('top'));

    //console.log($('#map_bg').scss('left'),map_bg_x,map_bg_y);

    map_bg_x += deltaX;
    map_bg_y += deltaY;

    //todo cache common JQuery objects in static container
    $('#map_bg')
        .css('left', map_bg_x)
        .css('top', map_bg_y)
    ;

    $('#map-stories')
        .css('left', map_bg_x)//faster than +=
        .css('top', map_bg_y)
    ;


    $('.moving-object')
        .css( 'left', '+='+deltaX )
        .css( 'top', '+='+deltaY )
    ;


    $('body').css('background-position',map_bg_x+'px '+map_bg_y+'px');


    if(autoUpdate){
        if(T.Math.xy2dist(map_bg_x-canvas_left,map_bg_y-canvas_top)>600){
            Map.updateMap();
        }
    }


};