/**
 * @author ©Towns.cz
 * @fileOverview Creates object Map with static methods
 */
//======================================================================================================================
T.setNamespace('UI.Map');

T.UI.Map.Coords = class{


    //todo maybe refactor to positon
    static mouseCenterPos2MapPos(map_click_x,map_click_y) {


        //r(map_click_x,map_click_y,map_zoom_m,map_slope_m);

        var brainfuck=1.12;

        map_click_x=map_click_x/180/map_zoom_m*brainfuck;
        map_click_y=map_click_y/180/map_zoom_m*map_slope_m*brainfuck;


        var map_click_dist=Math.pow(Math.pow(map_click_x,2)+Math.pow(map_click_y,2),(1/2));



        //todo pouzit funkci T.T.Math.xy2distDeg
        var map_click_rot=Math.atan2(map_click_y,map_click_x);//todo why reverse order



        map_click_rot=map_click_rot-map_rotation_r;


        map_click_x=Math.cos(map_click_rot)*map_click_dist;
        map_click_y=Math.sin(map_click_rot)*map_click_dist;


        map_click_x+=T.UI.Map.map_center.x;
        map_click_y+=T.UI.Map.map_center.y;

        return(new T.Position(map_click_x,map_click_y));


    }

//======================================================================================================================


    //todo maybe refactor to positon
    static mapPos2MouseCenterPos(map_position_x,map_position_y) {//todo refactor use this function in all mapDraws


        object_xc = map_position_x - T.UI.Map.map_center.x;
        object_yc = map_position_y - T.UI.Map.map_center.y;

        object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * map_field_size ) * map_zoom_m;
        object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * map_field_size ) / map_slope_m * map_zoom_m;

        object_screen_x += (window_width / 2);
        object_screen_y += (window_height/ 2);

        return(new T.Position(object_screen_x,object_screen_y));

    }

};


