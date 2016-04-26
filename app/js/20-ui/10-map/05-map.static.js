/**
 * @author ©Towns.cz
 * @fileOverview Creates object Map with static methods
 */
//======================================================================================================================


var Map={};

//FUNC

//todo maybe refactor to positon
Map.mouseCenterPos2MapPos = function(map_click_x,map_click_y) {


    //r(map_click_x,map_click_y,map_zoom_m,map_slope_m);

    var brainfuck=1.12;

    map_click_x=map_click_x/180/map_zoom_m*brainfuck;
    map_click_y=map_click_y/180/map_zoom_m*map_slope_m*brainfuck;


    var map_click_dist=Math.pow(Math.pow(map_click_x,2)+Math.pow(map_click_y,2),(1/2));


    //********OLD
    /*var map_click_rot=Math.acos(map_click_x/map_click_dist);
     if(map_click_y<0){
     map_click_rot=2*Math.PI - map_click_rot;
     }*/
    //********NEW

    //todo pouzit funkci T.T.Math.xy2distDeg
    var map_click_rot=Math.atan2(map_click_y,map_click_x);//todo why reverse order



    map_click_rot=map_click_rot-map_rotation_r;


    map_click_x=Math.cos(map_click_rot)*map_click_dist;
    map_click_y=Math.sin(map_click_rot)*map_click_dist;


    map_click_x+=map_x;
    map_click_y+=map_y;

    return(new Position(map_click_x,map_click_y));


};

//======================================================================================================================


//todo maybe refactor to positon
Map.mapPos2MouseCenterPos = function(map_position_x,map_position_y) {//todo refactor use this function in all mapDraws


    object_xc = map_position_x - map_x;
    object_yc = map_position_y - map_y;

    object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * map_field_size ) * map_zoom_m;
    object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * map_field_size ) / map_slope_m * map_zoom_m;

    object_screen_x += (window_width / 2);
    object_screen_y += (window_height/ 2);



    return(new Position(object_screen_x,object_screen_y));


};