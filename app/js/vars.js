/**
 *
     ██╗   ██╗ █████╗ ██████╗ ███████╗
     ██║   ██║██╔══██╗██╔══██╗██╔════╝
     ██║   ██║███████║██████╔╝███████╗
     ╚██╗ ██╔╝██╔══██║██╔══██╗╚════██║
      ╚████╔╝ ██║  ██║██║  ██║███████║
       ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
    * © Towns.cz
 *
 * @fileOverview JS constants and preset variabiles for Towns
 */


//======================================================================================================================
/*
  ██████╗ ██████╗ ███╗   ██╗███████╗████████╗ █████╗ ███╗   ██╗████████╗███████╗
 ██╔════╝██╔═══██╗████╗  ██║██╔════╝╚══██╔══╝██╔══██╗████╗  ██║╚══██╔══╝██╔════╝
 ██║     ██║   ██║██╔██╗ ██║███████╗   ██║   ███████║██╔██╗ ██║   ██║   ███████╗
 ██║     ██║   ██║██║╚██╗██║╚════██║   ██║   ██╔══██║██║╚██╗██║   ██║   ╚════██║
 ╚██████╗╚██████╔╝██║ ╚████║███████║   ██║   ██║  ██║██║ ╚████║   ██║   ███████║
  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
 */


var IMMEDIATELY_MS = 100;
//todo collect all constants and put it here

//======================================================================================================================
/*
 ██████╗ ██████╗ ███████╗███████╗███████╗████████╗
 ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝╚══██╔══╝
 ██████╔╝██████╔╝█████╗  ███████╗█████╗     ██║
 ██╔═══╝ ██╔══██╗██╔══╝  ╚════██║██╔══╝     ██║
 ██║     ██║  ██║███████╗███████║███████╗   ██║
 ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝   ╚═╝
 */

var map_loaded=false;

//----


var map_zoom=-3;
var map_rotation=Math.random()*360;
var map_slope=27;



var map_field_size=160;

var map_model_size=2,


    map_tree_size=1,
    map_tree_size_diff=0.2,
    map_tree_size_zip=10,


/* map_rock_size=0.8,
 map_rock_size_diff=0.2
 map_rock_size_zip=5;*/


    map_rock_size=1.2,
    map_rock_size_diff=0.1,
    map_rock_size_zip=-5;



var map_rotation=45;


var max_map_size=180;

var selecting_distance=1000;
var selecting_distance_fields=0;

//----

var map_zoom_delta=0;
var map_rotation_delta=0;
var map_slope_delta=0;

var map_x_delta=0;
var map_y_delta=0;
var map_size_delta=0;

//----------------

var map_selected_ids = [];

var terrainCount=13;


//----------------

var seedCount=3;
//----

var treeCount=10;
var rockCount=6;
var rockCountDark=4;
var rockMaxDark=50;

//----------------Extended values

var map_size;

var map_zoom_m;

var map_data;
var map_z_data;
var map_bg_data;

var map_rotation_r;
var map_rotation_sin;
var map_rotation_cos;
var map_rotation_sin_minus;

var map_slope_m;
var map_slope_n;

