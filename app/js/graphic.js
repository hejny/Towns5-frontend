/**

      ██████╗ ██████╗  █████╗ ██████╗ ██╗  ██╗██╗ ██████╗
     ██╔════╝ ██╔══██╗██╔══██╗██╔══██╗██║  ██║██║██╔════╝
     ██║  ███╗██████╔╝███████║██████╔╝███████║██║██║
     ██║   ██║██╔══██╗██╔══██║██╔═══╝ ██╔══██║██║██║
     ╚██████╔╝██║  ██║██║  ██║██║     ██║  ██║██║╚██████╗
      ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚═╝ ╚═════╝
     © Towns.cz

 * @fileOverview Map canvas rendring functions

 */


//======================================================================================================================

//----------------

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

//----

var map_zoom_delta=0;
var map_rotation_delta=0;
var map_slope_delta=0;

var map_x_delta=0;
var map_y_delta=0;
var map_size_delta=0;

//----------------

var canvas_mouse_x = 0;
var canvas_mouse_y = 0;
var map_mouse_x = 0;
var map_mouse_y = 0;
var map_selecting = false;
var map_selected_ids = [];

var terrainCount=13;


//----------------

var seedCount=5;
//----

var treeCount=10;
var rockCount=6;
var rockCountDark=4;
var rockMaxDark=50;

//----------------Odvozene hodnoty

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





//----------------Konstanty


gr=1.62;


//----------------------------------------------------------------------------------------------------------------------




//Model.draw(ctx,res);




//----------------------------------------------------------------------------------------------------------------------Prednacitani


function imageLoad(){
    //r('imageLoad');

    all_images_loaded++;


    //$('#loadbar').html(all_images_bg_loaded+'/'+all_images_bg_count);
    var percent=Math.floor((all_images_loaded/all_images_count)*100);

    $('#loadbar').html(percent+'%');



    if(all_images_loaded >= all_images_count) {


        r('all graphics loaded',all_images_loaded,all_images_count);

        map_loaded=true;
        updateMap();
        $('#loadbar').remove();

        var map_object_changes_=map_object_changes;
        setTimeout(function(){
            loadMap();
        },500);

    }

}


//----------------------------------------------------------------Pocet

//r(terrainCount,seedCount,treeCount,rockCount,rockCountDark);
//r((terrainCount*seedCount),(treeCount),(rockCount*rockCountDark));


var all_images_count=(terrainCount*seedCount)+(treeCount)+(rockCount*rockCountDark);
var all_images_loaded=0;





//----------------------------------------------------------------------------------------------------------------------Frames


var fps=0;
var time=0;

var map_bg =false;
var map_ctx =false;
var map_buffer =false;
var map_buffer_ctx =false;

var all_images_bg=[];
var all_images_tree=[];
var all_images_rock=[];

$(function() {

    map_bg = document.getElementById('map_bg');
    map_ctx = map_bg.getContext('2d');

    r('Loaded canvas context');

    map_buffer = document.getElementById('map_buffer');
    map_buffer_ctx = map_buffer.getContext('2d');

    //r(map_buffer_ctx);

    //----------------------------------------------------------------Podklad


    for(var terrain=0;terrain<terrainCount;terrain++) {
        all_images_bg[terrain] = [];
        for (var seed = 0; seed < seedCount; seed++) {


            all_images_bg[terrain][seed] = new Image();
            all_images_bg[terrain][seed].src = 'app/graphic/terrain.php?terrain=t' + (terrain+1)/*Teren 0 je temnota*/ + '&seed=' + seed + '&size=160';

            all_images_bg[terrain][seed].onload = imageLoad;


        }
    }

    //----------------------------------------------------------------Tree
    for (var seed = 0; seed < treeCount; seed++) {


        all_images_tree[seed] = new Image();
        all_images_tree[seed].src = 'app/graphic/treerock.php?type=tree&seed=' + seed + '&width=100';
        //all_images_tree[seed].src = 'ui/image/tree/' + seed + '.png';

        all_images_tree[seed].onload = imageLoad;


    }
    //r(all_images_tree);
    //----------------------------------------------------------------Rock
    for (var seed = 0; seed < rockCount; seed++) {

        all_images_rock[seed] = [];

        for (var dark = 0; dark < rockCountDark; dark++) {

            all_images_rock[seed][dark] = new Image();
            all_images_rock[seed][dark].src = 'app/graphic/treerock.php?type=rock&seed=' + seed + '&width=133&dark=' + Math.round(dark/rockCountDark*rockMaxDark);

            all_images_rock[seed][dark].onload = imageLoad;
        }

    }

});


//======================================================================================================================
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//======================================================================================================================loadMap

var map_request_holder;

function loadMap() {
    r('loadMap');

    var map_xy_data = getMap(Math.round(map_x-(map_size/2)), Math.round(map_y-(map_size/2)), map_size);

    //console.log(map_data);

    map_z_data = map_xy_data[0];
    map_bg_data = map_xy_data[1];

    delete map_xy_data;

    var tmp=Math.round(map_size/2)-2;

    /*map_data=[];
    drawMap();
    return;*/

    if(typeof map_request_holder!=='undefined')
        map_request_holder.abort();

    map_request_holder=FaketownsApiMulti(
        [
            [
                'list',
                'id,x,y,type,res,_name,func,permalink,func,own,superown,fp,fs',
                //'id,name,_name,type,permalink,origin,func,group,expand,block,attack,hold,res,profile,fp,fs,fc,fr,fx,own,superown,x,y,ww,traceid,starttime,readytime,stoptime',
                ['type!=\'terrain\'','radius('+Math.round(map_x)+','+Math.round(map_y)+','+Math.round(tmp)+')'],
                'y,x'
            ],
            [
                'list',
                'x,y,res',
                ['type=\'terrain\'','radius('+Math.round(map_x)+','+Math.round(map_y)+','+Math.round(tmp)+')'],
                'y,x'
            ]

        ]


        ,function(res){


            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Server Objects
            if(res.length>0)
                map_data=res[0]['objects'];
            else
                map_data=[];
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Local Objects

            map_data=map_data.concat(map_object_changes);
            //map_data=map_data.concat(map_object_changes_buffer);

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Server Terrains

            /*var map_data_terrain=res[1]['objects'];

            for(var i= 0, l=map_data_terrain.length;i<l;i++){

                var x=Math.floor(map_data_terrain[i].x-map_x+map_size/2);
                var y=Math.floor(map_data_terrain[i].y-map_y+map_size/2);


                if(
                x<0 ||
                y<0 ||
                x>=map_size ||
                y>=map_size

                ){
                    //r(x+','+y);
                }else{

                    if(typeof(map_data_terrain[i].res)!='undefined'){

                        var terrain=map_data_terrain[i].res;
                        terrain=parseInt(terrain.substr(1));

                        //terrain=terrain-1;

                        if(terrain>0)
                            map_bg_data[y][x]=terrain;





                    }

                    if(typeof(map_data_terrain[i].level)!='undefined'){
                        map_z_data[y][x]=map_data_terrain[i].level;
                    }else{
                        //map_z_data[y][x]=0.1;
                    }


                }

            }*/

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Local Terrains

            //r(map_terrain_changes);

            for(var i= 0,l=map_terrain_changes.length;i<l;i++){

                var x=map_terrain_changes[i][0],
                    y=map_terrain_changes[i][1],
                    terrain=map_terrain_changes[i][2],
                    z=map_terrain_changes[i][3];

                //r(x,y,map_x,map_y);

                x=x-Math.round(map_x)+Math.floor(map_size/2);
                y=y-Math.round(map_y)+Math.floor(map_size/2);

                //r(x,y);

                if(
                    x<0 ||
                    y<0 ||
                    x>=map_size ||
                    y>=map_size

                ){}else{
                    map_bg_data[y][x]=terrain;
                    map_z_data[y][x]=z;
                }

            }

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            drawMap();

    });

}


//----------------------------------------------------------------------------------------------------------------------


function drawEllipse(ctx, x, y, w, h) {
    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle

    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    ctx.closePath(); // todo not used correctly, see comments (use to close off open path)
    ctx.stroke();
    ctx.fill();
}




//----------------------------------------------------------------------------------------------------------------------




function drawMap() {

    //r(map_ctx);
    if (map_ctx == false)return;
    r('drawMap');


    //----------------Move canvas

    $('#map_bg').css('left', -canvas_width / 3);
    $('#map_bg').css('top', -canvas_height / 3);

    //----------------Prepare objects

    var map_draw = [];


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Virtual objects

    var selecting_distance_pow = selecting_distance * map_zoom_m;
    selecting_distance_pow = selecting_distance_pow * selecting_distance_pow;


    for (var y = 0; y < map_size; y++) {
        for (var x = 0; x < map_size; x++) {


            if (x >= 0 && y >= 0 && x < map_size && y < map_size /*Math.pow(x-(map_size/2),2)+Math.pow(y-(map_size/2),2)<=Math.pow(map_size/2,2)*/) {


                var terrain = map_bg_data[y][x] - 1/*Teren 0 je temnota*/;


                //r(map_z_data[y][x]);


                if (terrain != -1) {


                    var xc = x - map_x + Math.round(map_x) - (map_size - 1) / 2;
                    var yc = y - map_y + Math.round(map_y) - (map_size - 1) / 2;

                    var world_x = x + Math.round(map_x) - Math.round(map_size / 2);
                    var world_y = y + Math.round(map_y) - Math.round(map_size / 2);


                    var z = (Math.pow(map_z_data[y][x], (1 / 12)) - 0.85) * -6000;
                    //var z=0;
                    //r(map_z_data[y][x]);


                    //var size = (Math.sin((world_x * world_y) / 10) / 4) + 1.25;
                    var size=1;

                    var width = Math.ceil(map_field_size * size * 3 * map_zoom_m);
                    var height = Math.ceil(width * size /* map_zoom_m*/);

                    height_z=height*(1+map_z_data[y][x]);



                    var screen_x = ((map_rotation_cos * xc - map_rotation_sin * yc ) * map_field_size ) * map_zoom_m;
                    var screen_y = ((map_rotation_sin * xc + map_rotation_cos * yc ) * map_field_size ) / map_slope_m * map_zoom_m + z / map_slope_n * map_zoom_m;


                    screen_x += (canvas_width / 2);
                    screen_y += (canvas_height / 2) - (height / 2);


                    //------------------------------------------
                    if (map_selecting && terrainChanging) {

                        var distance = Math.pow(screen_x + (width / 2) - canvas_mouse_x, 2) + Math.pow((screen_y + (height / 4) - canvas_mouse_y) * map_slope_m, 2);


                        if (distance < selecting_distance_pow) {

                            //selecting_distance_pow = distance;
                            //map_selecting = false;

                            map_mouse_x = object_xc;
                            map_mouse_y = object_yc;

                            //r(y+','+x+' t'+terrain_change);

                            //----------------------------------------------------------Zmena typu terenu
                            if (terrain_change !== false) {


                                map_bg_data[y][x] = terrain_change;
                                map_terrain_changes.push([world_x, world_y, terrain_change, map_z_data[y][x]]);

                                //++++++++++++++++++ begin duplicate
                                var terrain = map_bg_data[y][x] - 1;
                                //++++++++++++++++++ end of duplicate

                            }
                            //----------------------------------------------------------




                        }
                    }
                    //------------------------------------------


                    if (screen_x > -(width / 2) && screen_y > -(height / 2) && screen_x < canvas_width && screen_y < canvas_height + (map_field_size * size)) {

                        //----------------------------------------------------------------------------------------------

                        if(width<height_z/2) {
                            seed = -1;
                        }else{
                            var seed = Math.abs(world_x * world_y - 1) % seedCount;
                        }


                        //-----

                        //r(z);
                        //r(seed);

                        map_draw.push([
                            'terrain',
                            all_images_bg[terrain][seed],
                            screen_x,
                            screen_y,
                            screen_y + height - Math.floor(width / 4),
                            width,
                            height_z
                        ]);


                        //----------------------------------------------------------------------------------------------Virtuální objekty

                        if ((terrain == 9 /*&& map_data[y+1][x]!=4 && map_data[y-1][x]!=4 && map_data[y][x+1]!=4 && map_data[y][x-1]!=4*/ ) || terrain == 4) {

                            var block_object = false;
                            if (terrain == 9) {

                                if (y > 0)
                                    if (map_bg_data[y - 1][x] == 4)block_object = true;
                                if (y < map_size - 1)
                                    if (map_bg_data[y + 1][x] == 4)block_object = true;
                                if (x > 0)
                                    if (map_bg_data[y][x - 1] == 4)block_object = true;
                                if (x < map_size - 1)
                                    if (map_bg_data[y][x + 1] == 4)block_object = true;

                            }

                            if (!block_object) {


                                if (terrain == 9) {
                                    var size = Math.sin(Math.pow(Math.abs(world_x * world_y), (1 / 1.5)) / 10) * map_tree_size_diff + map_tree_size;
                                } else {

                                    //var size = Math.sin(Math.pow(Math.abs(world_x * world_y), (1 / 2.5)) / 10) * map_rock_size_diff + map_rock_size;

                                    var object_size_seed=Math.floor(Math.pow(Math.pow(world_x,2)+Math.pow(world_y,2), 1.1))%rockCountDark;

                                    var size = (1-(object_size_seed/rockCountDark)) * map_rock_size_diff + map_rock_size;

                                }

                                var object_seed = (Math.pow(world_x, 2) + Math.pow(world_y, 2)) % (terrain == 9 ? treeCount : rockCount);

                                var object = (terrain == 9 ? all_images_tree[object_seed] : all_images_rock[object_seed][object_size_seed]);

                                var object_id = (terrain == 9 ? 't' : 'r') + world_x + 'x' + world_y + 'y';



                                var object_width = object.width * (width / 100) * size;
                                var object_height = object.height * (width / 100) * size;


                                object_xc = xc;
                                object_yc = yc;

                                object_xc += Math.sin((world_x+world_y) / 100) / 1.41;
                                object_yc += Math.sin((world_x-world_y) / 100) / 1.41;


                                object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * map_field_size ) * map_zoom_m;
                                object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * map_field_size ) / map_slope_m * map_zoom_m + (z - 300) / map_slope_n * map_zoom_m;


                                object_screen_x += (canvas_width / 2);
                                object_screen_y += (canvas_height / 2);


                                /*
                                 if(map_selecting)
                                 if(Math.pow(object_screen_x-canvas_mouse_x,2)+Math.pow(object_screen_y-canvas_mouse_y,2)<900){

                                 map_selecting=false;

                                 map_mouse_x=world_x;
                                 map_mouse_y=world_y;
                                 //alert(object_id);
                                 map_selected_ids=[object_id];
                                 }
                                 */

                                object_screen_x += (width / 2) - (object_width / 2);
                                object_screen_y += -(object_height) + (object_width / 4) + (height / 4);


                                /*
                                 if($.inArray(object_id,map_selected_ids)!=-1){

                                 alert('selected'+object_id);

                                 map_draw.push([
                                 'ellipse',
                                 ['rgba(50,50,50,0.4)','rgba(0,0,0,0.8)',3],
                                 object_screen_x,
                                 object_screen_y+object_height-(object_width/map_slope_m),
                                 999999,
                                 object_width,
                                 object_width/map_slope_m

                                 ]);

                                 }
                                 */


                                map_draw.push([
                                    'image',
                                    object,
                                    object_screen_x,
                                    object_screen_y,
                                    object_screen_y + object_height - Math.floor(object_width / 4) + 120 + (terrain == 9?map_tree_size_zip:map_rock_size_zip),
                                    object_width,
                                    object_height

                                ]);


                            }

                        }
                        //----------------------------------------------------------------------------------------------


                    }


                }
            }

        }
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Material objects

    var selecting_distance_pow = 20;
    selecting_distance_pow = selecting_distance_pow * selecting_distance_pow;

    var object = all_images_rock[0][0];
    for (var i = 0; i < map_data.length; i++) {

        //-----------------------------------------


        /*
         map_bg = document.getElementById("map_bg");
         map_ctx = map_bg.getContext("2d");*/

        /*var object=document.createElement("canvas");
         object.width=550;
         object.height=350;
         object_ctx = object.getContext("2d");

         Model.draw(object_ctx,map_data[i].res);*/


        var object_id = map_data[i].id;


        object_xc = map_data[i].x - map_x;
        object_yc = map_data[i].y - map_y;

        object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * map_field_size ) * map_zoom_m;
        object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * map_field_size ) / map_slope_m * map_zoom_m;


        object_screen_x += (canvas_width / 2);
        object_screen_y += (canvas_height / 2);

        if (map_selecting && !terrainChanging) {

            var distance = Math.pow(object_screen_x - canvas_mouse_x, 2) + Math.pow(object_screen_y - canvas_mouse_y, 2);

            if (distance < selecting_distance_pow) {

                selecting_distance_pow = distance;

                map_selecting = false;

                map_mouse_x = object_xc;
                map_mouse_y = object_yc;

                //------------------------------------------
                if (map_data[i].type == 'building') {
                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    map_selected_ids = [object_id];


                    var ellipse_width = 100;

                    map_draw.push([
                        'ellipse',
                        ['rgba(50,50,50,0.4)', 'rgba(0,0,0,0.8)', 3],
                        object_screen_x - (ellipse_width / 2),
                        object_screen_y - (ellipse_width / map_slope_m / 2),
                        object_screen_y + 120 - 1,
                        ellipse_width,
                        ellipse_width / map_slope_m

                    ]);
                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                } else if (map_data[i].type == 'story') {
                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    var res = map_data[i].res;
                    res = res.substr(5);

                    window_open(map_data[i]._name, res);

                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                }
                //------------------------------------------
            }
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        map_draw.push([
            map_data[i].type,
            map_data[i].res,
            object_screen_x,
            object_screen_y,
            ((map_data[i].type == 'story') ? 9999 : object_screen_y + 120+10*map_model_size)
        ]);


        //-----------------------------------------

    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Sort objects

    //map_draw;
    map_draw.sort(function (a, b) {

        if (a[4] > b[4]) {
            return (1);
        } else if (a[4] < b[4]) {
            return (-1);
        } else {
            return (0);
        }

    });

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Draw objects
    //----------------Clear canvas

    map_ctx.clearRect(0, 0, canvas_width, canvas_height);

    map_ctx.fillStyle = '#000000';
    map_ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    map_ctx.lineWidth = 0;


    /* todo ? Promyslet zda podparvovat cernou elipsou
    map_width=map_field_size*map_size*map_zoom_m;
    map_width=map_width-100;
    map_height=map_width/map_slope_m;
    drawEllipse(map_ctx,(canvas_width-map_width)/2,(canvas_height-map_height)/2,map_width,map_height);*/

    //----------------Drawing... :)

    //lastY=0;

    //r(map_ctx);

    for (var i = 0; i < map_draw.length; i++) {

        if (map_draw[i][0] == 'image') {

            try{
                map_ctx.drawImage(
                    map_draw[i][1],
                    map_draw[i][2],
                    map_draw[i][3],
                    //[4] is order used in sorting
                    map_draw[i][5],
                    map_draw[i][6]
                );
            }catch(err){
                r('Could not load',map_draw[i][1]);
            }




        } else if (map_draw[i][0] == 'terrain') {


            map_ctx.drawImage(
                map_draw[i][1],
                map_draw[i][2],
                map_draw[i][3],
                //[4] is order used in sorting
                map_draw[i][5],
                map_draw[i][6]
            );

            /*if(map_draw[i][5]<map_draw[i][6]){
                //lastY=map_draw[i][3];


                var width=map_draw[i][5]*5;
                var height=map_draw[i][6]*5;

                var startx=map_draw[i][2]+(width/2);
                var starty=map_draw[i][3]+(height/2);

                var gradient = map_ctx.createRadialGradient(startx,starty,width/2,startx,starty,0);
                gradient.addColorStop(0,"transparent");
                gradient.addColorStop(1,"red");
                map_ctx.fillStyle=gradient;
                map_ctx.fillRect(map_draw[i][2],map_draw[i][3],width,height);
                //map_ctx.fillRect(map_draw[i][2],map_draw[i][3],map_draw[i][5],map_draw[i][6]);
            }*/


        } else if (map_draw[i][0] == 'building') {

            Model.draw(map_ctx, map_draw[i][1], map_zoom_m*map_model_size, map_draw[i][2], map_draw[i][3], -map_rotation, map_slope);

        } else if (map_draw[i][0] == 'ellipse') {

            r(map_draw[i]);


            map_ctx.fillStyle = map_draw[i][1][0];
            map_ctx.strokeStyle = map_draw[i][1][1];
            map_ctx.lineWidth = map_draw[i][1][2];


            drawEllipse(
                map_ctx,
                map_draw[i][2],
                map_draw[i][3],
                map_draw[i][5],
                map_draw[i][6]
            );

        } else if (map_draw[i][0] == 'story') {


            var res = map_draw[i][1];
            res = res.substr(5);

            //r(res);

            var ellipse_width = Math.pow(res.length, 1 / 3) * 2;


            //r('storka');
            map_ctx.fillStyle = '#110011';
            //map_ctx.fillStyle =     'rgba(0,0,0,0)';
            map_ctx.strokeStyle = 'rgba(70,20,200,0.5)';
            map_ctx.lineWidth = 20;


            drawEllipse(
                map_ctx,
                map_draw[i][2] - (ellipse_width / 2),
                map_draw[i][3] - (ellipse_width / 2),
                ellipse_width,
                ellipse_width
            );
        }

    }


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    if(map_selecting && terrainChanging){


        //todo presunout do terrain.js
       /* //todo opravit priority
        map_terrain_changes.sort(function (a, b) {

            if (a[0] > b[0]) {
                return (1);
            } else if (a[0] < b[0]) {
                return (-1);
            } else {

                if (a[1] > b[1]) {
                    return (1);
                } else if (a[1] < b[1]) {
                    return (-1);
                } else {
                    return (0);
                }

            }

        });

        var map_terrain_changes_new=[];
        var a=false,b=false;
        for (var i = map_terrain_changes.length-1; i >= 0; i--){

            if(a==map_terrain_changes[i][0] && b==map_terrain_changes[i][1]){}else{
                map_terrain_changes_new.push(map_terrain_changes[i]);
            }

            a=map_terrain_changes[i][0];
            b=map_terrain_changes[i][1];
        }

        map_terrain_changes=map_terrain_changes_new.splice(0);
        delete map_terrain_changes_new;
*/
        //r(map_terrain_changes);
        saveMapTerrainChangesToLocalStorage();
    }


}




//----------------------------------------------------------------------------------------------------------------------updateMap



function updateMap(ms){
    //r('updateMap');

    if(typeof ms=='undefined'){


        var timeLast=time;
        tmp = new Date();
        time = (new Date()).getTime();
        delete tmp;

        if(timeLast==0){
            var ms=0;
            fps=0;
        }else{
            var ms=time-timeLast;
            fps=Math.round(100000/ms)/100;

        }



    }

    //console.log(ms);


    //if(!map_loaded)return
    if(!ms)ms=1000;

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

    //----

    if(map_rotation<0)map_rotation+=360;
    if(map_rotation>360)map_rotation-=360;

    if(map_slope<20)map_slope=20;
    if(map_slope>90)map_slope=90;

    if(map_zoom>-1.5)map_zoom=-1.5;
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


    if(map_x_delta || map_y_delta || map_size_delta || map_zoom_delta || !map_size){


        updateMapLocationHash();


        map_size=Math.max((canvas_height/80/*1.4*/),(canvas_width/map_field_size/*1.4*/))/map_zoom_m;
        map_size=Math.ceil(map_size/2)*2;



        if(map_size<4)map_size=4;
        if(map_size>max_map_size)map_size=max_map_size;

        //console.log(map_size);

        //console.log('loadMap');
        loadMap();

    }




    //----------------Vynulovani hodnot

    map_zoom_delta=0;
    map_rotation_delta=0;
    map_slope_delta=0;
    map_x_delta=0;
    map_y_delta=0;
    map_size_delta=0;

    //----------------

    updateValues();


    //----------------

    //drawMap(); tohle je uz v loadmap



}



//----------------------------------------------------------------------------------------------------------------------


function updateValues(){

    $('#fps').html(fps);

    $('#canvas_mouse').html(canvas_mouse_x+','+canvas_mouse_y);
    $('#map_mouse').html(map_mouse_x+','+map_mouse_y);


    $('#map_levels').html(fps);
    $('#map_zoom').html(map_zoom);
    $('#map_rotation').html(map_rotation);
    $('#map_slope').html(map_slope);
    $('#map_x').html(map_x);
    $('#map_y').html(map_y);
    $('#map_size').html(map_size);


}


//======================================================================================================================


function mapMove(deltaX,deltaY) {

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

    var map_bg_x = parseInt($('#map_bg').css('left'));
    var map_bg_y = parseInt($('#map_bg').css('top'));

    //console.log($('#map_bg').css('left'),map_bg_x,map_bg_y);

    map_bg_x += deltaX;
    map_bg_y += deltaY;

    $('#map_bg').css('left', map_bg_x);
    $('#map_bg').css('top', map_bg_y);

}

//======================================================================================================================

function mouseCenterPos2MapPos(map_click_x,map_click_y) {


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

    return({x:map_click_x,y:map_click_y});


}
//======================================================================================================================bufferDraw

function bufferDrawStart(){




    $('#map_buffer').css('position','absolute');
    $('#map_buffer').css('top','0px');
    $('#map_buffer').css('left','0px');

    map_buffer.width=canvas_width/3;
    map_buffer.height=canvas_height/3;

    $('#map_buffer').css('z-index',$('#map_bg').css('z-index')-(-1));


}


//------------------------------------
function bufferDrawEnd(){


    map_buffer_ctx.clearRect(0, 0, canvas_width/3, canvas_height/3);
}

//------------------------------------

function bufferDraw(){

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Material objects

    var map_draw=[];
    for (var i = 0; i < map_object_changes_buffer.length; i++) {

        //-----------------------------------------


        var object_id = map_object_changes_buffer[i].id;


        object_xc = map_object_changes_buffer[i].x - map_x;
        object_yc = map_object_changes_buffer[i].y - map_y;

        object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * map_field_size ) * map_zoom_m;
        object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * map_field_size ) / map_slope_m * map_zoom_m;


        object_screen_x += (canvas_width /3 / 2);
        object_screen_y += (canvas_height /3 / 2);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        map_draw.push([
            map_object_changes_buffer[i].type,
            map_object_changes_buffer[i].res,
            object_screen_x,
            object_screen_y,
            ((map_object_changes_buffer[i].type == 'story') ? 9999 : object_screen_y + 120)
        ]);


        //-----------------------------------------

    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Sort objects

    map_draw.sort(function (a, b) {

        if (a[4] > b[4]) {
            return (1);
        } else if (a[4] < b[4]) {
            return (-1);
        } else {
            return (0);
        }

    });


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Draw objects

    //----------------Clear canvas

    map_buffer_ctx.clearRect(0, 0, canvas_width/3, canvas_height/3);

    //----------------Drawing... :)

    //lastY=0;

    for (var i = 0; i < map_draw.length; i++) {

        if (map_draw[i][0] == 'building') {

            Model.draw(map_buffer_ctx, map_draw[i][1], map_zoom_m*map_model_size, map_draw[i][2], map_draw[i][3], -map_rotation, map_slope);

        }

    }

}

//======================================================================================================================



































