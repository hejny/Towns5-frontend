
//todo headers

var Map={};

/*
 ███████╗██╗   ██╗███╗   ██╗ ██████╗
 ██╔════╝██║   ██║████╗  ██║██╔════╝
 █████╗  ██║   ██║██╔██╗ ██║██║
 ██╔══╝  ██║   ██║██║╚██╗██║██║
 ██║     ╚██████╔╝██║ ╚████║╚██████╗
 ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝

 */

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

    //todo pouzit funkci Math.xy2distDeg
    var map_click_rot=Math.atan2(map_click_y,map_click_x);//todo why reverse order



    map_click_rot=map_click_rot-map_rotation_r;


    map_click_x=Math.cos(map_click_rot)*map_click_dist;
    map_click_y=Math.sin(map_click_rot)*map_click_dist;


    map_click_x+=map_x;
    map_click_y+=map_y;

    return(new Position(map_click_x,map_click_y));


};