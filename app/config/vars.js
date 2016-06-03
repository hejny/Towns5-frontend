/**
 * @author ©Towns.cz
 * @fileOverview JS constants and preset variabiles for Towns
 */
//======================================================================================================================
//CONSTANTS


//var TOWNS_CDN_URL='http://localhost/towns/towns-cdn/';
var TOWNS_CDN_URL='http://cdn.towns.cz/';
var TOWNS_CDN_FILE_ACCEPTED_TYPES=[
    'image/jpeg'
    ,'image/jpg'
    ,'image/gif'
    ,'image/png'
    //todo maybe bmp? sync with towns-cdn
];
var TOWNS_CDN_FILE_MAX_SIZE = 7 * Math.pow(1024, 2/*MB*/);
var TOWNS_CDN_REQUEST_MAX_SIZE = 11047955;



var IMMEDIATELY_MS = 100;
var MESSAGE_FADEOUT = 2000;
var MESSAGE_DURATION = 6;
//todo collect all constants and put it here

//======================================================================================================================
//PRESET


var Pages={};
var Editors={};



var objects_server=new T.Objects.Array([]);
var objects_external=new T.Objects.Array([]);
var objects_external_buffer=[];//Preview eg. walls//todo new T.Objects.Array([]);
var objects_server_move=new T.Objects.Array([]);//Moving objects



var selecting_distance_2d_canvas;//todo refactor selecting distance to ?tool
var selecting_distance_2d_canvas_ctx;

var selecting_distance_3d_canvas;
var selecting_distance_3d_canvas_gl;
var selecting_distance_3d_canvas_webgl;

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


var map_canvas_size=2;//1.8;
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


var max_map_radius=90;//180;

var selecting_distance=1000;
var selecting_distance_fields=0;


//----

var map_zoom_delta=0;
var map_rotation_delta=0;
var map_slope_delta=0;

T.setNamespace('UI.Map');

var map_center = new T.Position(0,0);//todo Static object Map



var map_x_delta=0;//todo refactor delete all delta
var map_y_delta=0;
var map_radius_delta=0;

//----------------

var map_selected_ids = [];
//var map_out_ids = [];

var terrainCount=14;


//----------------

var seedCount=3;
//----

var treeCount=10;
var rockCount=6;
var rockCountDark=4;
var rockMaxDark=50;

//----------------Extended values

var map_radius=50;
/*todo refactor map_center.x, map_center.y to map_center*/



var map_zoom_m;


var map_data_buildings;//todo maybe refactor names or put into instance?
var map_data_stories;//todo maybe refactor names?
var map_data_terrains;//todo maybe refactor names?
var map_array;//todo maybe refactor names?



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


var appDir = (environment=='production')?'/app-build':'/app';


//var feed_url='http://blog.towns.cz/feed/';


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








