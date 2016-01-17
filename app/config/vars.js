/**
 * @author ©Towns.cz
 * @fileOverview JS constants and preset variabiles for Towns
 */
//======================================================================================================================
//CONSTANTS

var TOWNS_API_URL='http://localhost:3000/';


var IMMEDIATELY_MS = 100;
var MESSAGE_MS = 2000;
//todo collect all constants and put it here

//======================================================================================================================
//PRESET


var Pages={};




var object_prototypes=[];



var objects_external=[];
var objects_external_buffer=[];//Preview eg. walls
var objects_external_move=[];//Moving objects



var selecting_distance_canvas;
var selecting_distance_canvas_ctx;

//-------------------------

//------------TMP values

var canvas_width;
var canvas_height;

var canvas_left;
var canvas_top;

var window_width;
var window_height;

//------------

var map_loaded=false;

//----


var map_canvas_size=1.8;
var map_zoom=-3;
//var map_rotation=Math.random()*360;
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


var max_map_size=180;//180;

var selecting_distance=1000;
var selecting_distance_fields=0;


var selected_color='#cccccc';

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


var map_collision_data=[[false]];

var map_rotation_r;
var map_rotation_sin;
var map_rotation_cos;
var map_rotation_sin_minus;

var map_slope_m;
var map_slope_n;


var window_opened=false;
var keys=[];
var moving=false;



var blockedTerrains=[1,11,5];


var appDir = (environment=='production')?'app-dist':'app';


var feed_url='http://blog.towns.cz/feed/';


var authors=[//todo better
    {
        "nick": "PH",
        "name": "Pavol Hejný"
    },
    {
        "nick": "PH",
        "name": "Štefan Kecskés"
    }
];








