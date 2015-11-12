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

/*
 ██╗      ██████╗  █████╗ ██████╗
 ██║     ██╔═══██╗██╔══██╗██╔══██╗
 ██║     ██║   ██║███████║██║  ██║
 ██║     ██║   ██║██╔══██║██║  ██║
 ███████╗╚██████╔╝██║  ██║██████╔╝
 ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝

 */

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

    map_buffer = document.getElementById('map_buffer');
    map_buffer_ctx = map_buffer.getContext('2d');


    //r(map_buffer_ctx);

    //----------------------------------------------------------------Podklad


    for(var terrain=0;terrain<terrainCount;terrain++) {
        all_images_bg[terrain] = [];
        for (var seed = 0; seed < seedCount; seed++) {


            all_images_bg[terrain][seed] = new Image();
            all_images_bg[terrain][seed].src = appDir+'/graphic/terrain.php?terrain=t' + (terrain+1)/*Teren 0 je temnota*/ + '&seed=' + seed + '&size=220';

            all_images_bg[terrain][seed].onload = imageLoad;


        }
    }

    //----------------------------------------------------------------Tree
    for (var seed = 0; seed < treeCount; seed++) {


        all_images_tree[seed] = new Image();
        all_images_tree[seed].src = appDir+'/graphic/treerock.php?type=tree&seed=' + seed + '&width=100';
        //all_images_tree[seed].src = 'ui/image/tree/' + seed + '.png';

        all_images_tree[seed].onload = imageLoad;


    }
    //r(all_images_tree);
    //----------------------------------------------------------------Rock
    for (var seed = 0; seed < rockCount; seed++) {

        all_images_rock[seed] = [];

        for (var dark = 0; dark < rockCountDark; dark++) {

            all_images_rock[seed][dark] = new Image();
            all_images_rock[seed][dark].src = appDir+'/graphic/treerock.php?type=rock&seed=' + seed + '&width=133&dark=' + Math.round(dark/rockCountDark*rockMaxDark);

            all_images_rock[seed][dark].onload = imageLoad;
        }

    }

});


//======================================================================================================================loadMap
/*
 ██╗      ██████╗  █████╗ ██████╗ ███╗   ███╗ █████╗ ██████╗
 ██║     ██╔═══██╗██╔══██╗██╔══██╗████╗ ████║██╔══██╗██╔══██╗
 ██║     ██║   ██║███████║██║  ██║██╔████╔██║███████║██████╔╝
 ██║     ██║   ██║██╔══██║██║  ██║██║╚██╔╝██║██╔══██║██╔═══╝
 ███████╗╚██████╔╝██║  ██║██████╔╝██║ ╚═╝ ██║██║  ██║██║
 ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝

 */


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
                }

            }
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Collisions

            //~~~~~~~~~~~~~Terrains

            iterate2D(map_bg_data,function(y,x){

                if(!is(map_collision_data[y]))map_collision_data[y]=[];


                if(map_bg_data[y][x]>0 && blockedTerrains.indexOf(map_bg_data[y][x])==-1){

                    map_collision_data[y][x]=true;

                }else{

                    map_collision_data[y][x]=false;

                }


            });

            //~~~~~~~~~~~~~Objects


            map_data.forEach(function(object){

                var x=Math.round(object.x)-Math.round(map_x-(map_size/2));
                var y=Math.round(object.y)-Math.round(map_y-(map_size/2));

                if(x>=0)
                if(y>=0)
                if(x<map_size)/*todo is it OK to use map_size???*/
                if(y<map_size)
                    map_collision_data[y][x]=false;


            });
            //~~~~~~~~~~~~~zones


            iterate2D(map_collision_data,function(y,x){

                if(map_collision_data[y][x]==false){


                    for(var yNext=y-1;yNext<=y+1;yNext++){
                        for(var xNext=x-1;xNext<=x+1;xNext++){


                            if(xNext>=0)
                            if(yNext>=0)
                            if(xNext<map_size)/*todo is it OK to use map_size???*/
                            if(yNext<map_size)
                            if(xNext==x?yNext!=y:yNext==y)
                            if(map_collision_data[yNext][xNext]==true){

                                map_collision_data[yNext][xNext]=-1;
                            }


                        }
                    }


                }

            });



            iterate2D(map_collision_data,function(y,x){

                if(map_collision_data[y][x]==-1)map_collision_data[y][x]=false;

            });

            //~~~~~~~~~~~~~


            //mapWindow(map_collision_data);


            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            drawMap();

    });

}


//======================================================================================================================
/*
 ██████╗ ██████╗  █████╗ ██╗    ██╗
 ██╔══██╗██╔══██╗██╔══██╗██║    ██║
 ██║  ██║██████╔╝███████║██║ █╗ ██║
 ██║  ██║██╔══██╗██╔══██║██║███╗██║
 ██████╔╝██║  ██║██║  ██║╚███╔███╔╝
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝
 */


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
    //t('drawMap start');


    //----------------Move canvas

    $('#map_bg').css('left', -canvas_width / 3);
    $('#map_bg').css('top', -canvas_height / 3);

    //----------------Prepare objects

    var map_draw = [];


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Virtual objects

    var selecting_distance_pow = selecting_distance * map_zoom_m;
    selecting_distance_pow = selecting_distance_pow * selecting_distance_pow;

    //t('Terrains start');

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


                    var terrain_size=Math.cos((world_x*world_y)%100)/2/4+1;


                    var width = Math.ceil(map_field_size * terrain_size * 3 * map_zoom_m);
                    var height = Math.ceil(width * terrain_size /* map_zoom_m*/);



                    var screen_x = ((map_rotation_cos * xc - map_rotation_sin * yc ) * map_field_size ) * map_zoom_m;
                    var screen_y = ((map_rotation_sin * xc + map_rotation_cos * yc ) * map_field_size ) / map_slope_m  * map_zoom_m;


                    screen_x += (canvas_width / 2);
                    screen_y += (canvas_height / 2) - (height / 2);


                    //------------------------------------------


                    if (screen_x > -(width / 2) && screen_y > -(height / 2) && screen_x < canvas_width && screen_y < canvas_height + (map_field_size * terrain_size)) {

                        //----------------------------------------------------------------------------------------------

                        var seed = Math.abs(world_x * world_y - 1) % seedCount;

                        //-----


                        map_draw.push([
                            'terrain',
                            all_images_bg[terrain][seed],
                            screen_x,
                            screen_y,
                            screen_y + height/terrain_size - Math.floor(width / 4),
                            width,
                            height
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



                                var object_width = object.width * map_zoom_m * 5 *  size;
                                var object_height = object.height * map_zoom_m * 5 * size;


                                object_xc = xc;
                                object_yc = yc;

                                object_xc += Math.sin((world_x+world_y) / 100) / 1.41;
                                object_yc += Math.sin((world_x-world_y) / 100) / 1.41;


                                object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * map_field_size ) * map_zoom_m;
                                object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * map_field_size ) / map_slope_m * map_zoom_m - 300 / map_slope_n * map_zoom_m;


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
    //t('Terrains end');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Material objects

    var selecting_distance_pow = 20;
    selecting_distance_pow = selecting_distance_pow * selecting_distance_pow;

    var object = all_images_rock[0][0];
    for (var i = 0; i < map_data.length; i++) {


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



        //----------------------------------------------Selected object?
        if(map_selected_ids.indexOf(object_id)!=-1){


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


        }
        //----------------------------------------------




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
    //t('Putting into array end');

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
    //t('Sorting end');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Draw objects
    //----------------Clear canvas

    map_ctx.clearRect(0, 0, canvas_width, canvas_height);

    map_ctx.fillStyle = '#000000';
    map_ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    map_ctx.lineWidth = 0;

    //t('ClearingRect end');

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
    //t('Drawing end');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    //t('drawMap end');

}


//======================================================================================================================
/*
  ██████╗ ██████╗      ██╗███████╗ ██████╗████████╗███████╗    ██████╗ ██████╗  █████╗ ██╗    ██╗
 ██╔═══██╗██╔══██╗     ██║██╔════╝██╔════╝╚══██╔══╝██╔════╝    ██╔══██╗██╔══██╗██╔══██╗██║    ██║
 ██║   ██║██████╔╝     ██║█████╗  ██║        ██║   ███████╗    ██║  ██║██████╔╝███████║██║ █╗ ██║
 ██║   ██║██╔══██╗██   ██║██╔══╝  ██║        ██║   ╚════██║    ██║  ██║██╔══██╗██╔══██║██║███╗██║
 ╚██████╔╝██████╔╝╚█████╔╝███████╗╚██████╗   ██║   ███████║    ██████╔╝██║  ██║██║  ██║╚███╔███╔╝
  ╚═════╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝
 */


function objectsDraw(ctx,objects) {

    //r('objectsDraw',objects.length,objects);

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Material objects

    var map_draw = [];
    for (var i = 0; i < objects.length; i++) {

        //-----------------------------------------
        if (is(objects[i].path)) {

            var position = objects[i].path.recount();


            objects[i].x = position.x;
            objects[i].y = position.y;

        }
        //-----------------------------------------

        var object_id = objects[i].id;


        object_xc = objects[i].x - map_x;
        object_yc = objects[i].y - map_y;

        object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * map_field_size ) * map_zoom_m;
        object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * map_field_size ) / map_slope_m * map_zoom_m;


        object_screen_x += (canvas_width / 3 / 2);
        object_screen_y += (canvas_height / 3 / 2);


        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        map_draw.push([
            objects[i].type,
            objects[i].res,
            object_screen_x,
            object_screen_y,
            ((objects[i].type == 'story') ? 9999 : object_screen_y + 120)
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

    ctx.clearRect(0, 0, canvas_width / 3, canvas_height / 3);

    //----------------Drawing... :)

    //lastY=0;

    for (var i = 0; i < map_draw.length; i++) {

        if (map_draw[i][0] == 'building') {


            Model.draw(ctx, map_draw[i][1], map_zoom_m * map_model_size, map_draw[i][2], map_draw[i][3], -map_rotation, map_slope);

        }

    }





}
//======================================================================================================================
/*
  ██████╗ ██████╗      ██╗███████╗ ██████╗████████╗███████╗    ██╗  ██╗████████╗███╗   ███╗██╗
 ██╔═══██╗██╔══██╗     ██║██╔════╝██╔════╝╚══██╔══╝██╔════╝    ██║  ██║╚══██╔══╝████╗ ████║██║
 ██║   ██║██████╔╝     ██║█████╗  ██║        ██║   ███████╗    ███████║   ██║   ██╔████╔██║██║
 ██║   ██║██╔══██╗██   ██║██╔══╝  ██║        ██║   ╚════██║    ██╔══██║   ██║   ██║╚██╔╝██║██║
 ╚██████╔╝██████╔╝╚█████╔╝███████╗╚██████╗   ██║   ███████║    ██║  ██║   ██║   ██║ ╚═╝ ██║███████╗
  ╚═════╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚══════╝
 */


function objectsHTML(objects) {

    //r('objectsDraw',objects.length,objects);

    var notMoving=false;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Material objects

    var map_draw = [];
    for (var i = 0; i < objects.length; i++) {

        //-----------------------------------------
        if (Path.is(objects[i].path)) {

            var position = objects[i].path.recount();


            objects[i].x = position.x;
            objects[i].y = position.y;



            var res_moving=Model.rewriteRot(objects[i].res,objects[i].path.rotation());



        }else{

            notMoving=true;
            var res_moving=map_object_changes[i].res;

        }
        //-----------------------------------------

        var object_id = objects[i].id;


        object_xc = objects[i].x - map_x;
        object_yc = objects[i].y - map_y;

        object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * map_field_size ) * map_zoom_m;
        object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * map_field_size ) / map_slope_m * map_zoom_m;

        object_screen_x += (canvas_width / 3 / 2);
        object_screen_y += (canvas_height / 3 / 2);

        //----------------------------------------------Selected object?
        if(map_selected_ids.indexOf(object_id)!=-1){


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


        }
        //----------------------------------------------

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        map_draw.push([
            objects[i].type,
            res_moving,
            object_screen_x,
            object_screen_y,
            ((objects[i].type == 'story') ? 9999 : object_screen_y + 120)
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

    //---------------empty

    var html='';

    //----------------Drawing... :)

    var x_begin=50,
        y_begin=170,
        x_size=100,
        y_size=200;

    map_draw.forEach(function(draw_item){

        if (draw_item[0] == 'building') {

            var img = new Image(x_size/*todo refactor*/, y_size);
            img.src = Model.createSrc(draw_item[1], map_zoom_m * map_model_size, x_begin, y_begin, x_size, y_size, -map_rotation, map_slope);/*todo cache SRCs*/

            $(img).css('position','absolute');
            $(img).addClass('moving-object');
            $(img).css('left',Math.floor(draw_item[2]-x_begin));
            $(img).css('top', Math.floor(draw_item[3]-y_begin));

             html+=img.outerHTML;




        }else if (draw_item[0] == 'ellipse') {


            var width  = draw_item[5] + draw_item[1][2] * 2,
                height = draw_item[6] + draw_item[1][2] * 2;


            var img = new Image(width,height);


            img.src=canvas2Src(width,height,function(ctx){


                ctx.fillStyle = draw_item[1][0];
                ctx.strokeStyle = draw_item[1][1];
                ctx.lineWidth = draw_item[1][2];


                drawEllipse(
                    ctx,
                    draw_item[1][2],
                    draw_item[1][2],
                    draw_item[5],
                    draw_item[6]
                );

            });



            $(img).css('position','absolute');
            $(img).addClass('moving-object');
            $(img).css('left',Math.floor(draw_item[2]));
            $(img).css('top', Math.floor(draw_item[3]));

            html+=img.outerHTML;


        }

    });

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    if(notMoving)orderMoveAndNormal();

    return(html);

}



/**todo refactor to tools*/
function canvas2Src(width,height,manipulationFunction){

    var canvas = document.createElement('canvas');
    canvas.width=width;
    canvas.height = height;
    var context = canvas.getContext('2d');

    manipulationFunction(context);

    return(canvas.toDataURL());


}


//======================================================================================================================
/*
 ███╗   ███╗ ██████╗ ██╗   ██╗███████╗     ██████╗████████╗██╗
 ████╗ ████║██╔═══██╗██║   ██║██╔════╝    ██╔════╝╚══██╔══╝██║
 ██╔████╔██║██║   ██║██║   ██║█████╗      ██║        ██║   ██║
 ██║╚██╔╝██║██║   ██║╚██╗ ██╔╝██╔══╝      ██║        ██║   ██║
 ██║ ╚═╝ ██║╚██████╔╝ ╚████╔╝ ███████╗    ╚██████╗   ██║   ███████╗
 ╚═╝     ╚═╝ ╚═════╝   ╚═══╝  ╚══════╝     ╚═════╝   ╚═╝   ╚══════╝
 */

/*todo For Ctl and other non-draw functions create new file*/
function orderMoveAndNormal(){

    var change=false;

    //Standing object put into map_object_changes;
    map_object_changes_move=map_object_changes_move.filter(function(object){

        if(!Path.is(object.path)){

            map_object_changes.push(object);
            change=true;
            return false;

        }else{
            return true;
        }

    });


    //Moving object put into map_object_changes_move;
    map_object_changes=map_object_changes.filter(function(object){

        if(Path.is(object.path)){

            map_object_changes_move.push(object);
            change=true;
            return false;

        }else{
            return true;
        }

    });


    if(change)loadMap();

}

//------------------------------------

function moveDrawCtl(){

    $('#map-move').html(objectsHTML(map_object_changes_move));
    //r($('#map-move').html());




}

//---------

function moveDrawLoop() {

    setTimeout(function(){

        moveDrawCtl();
        requestAnimationFrame(moveDrawLoop);

    },50);


}
moveDrawLoop();


//======================================================================================================================
/*
 ██████╗ ██╗   ██╗███████╗███████╗███████╗██████╗      ██████╗████████╗██╗
 ██╔══██╗██║   ██║██╔════╝██╔════╝██╔════╝██╔══██╗    ██╔════╝╚══██╔══╝██║
 ██████╔╝██║   ██║█████╗  █████╗  █████╗  ██████╔╝    ██║        ██║   ██║
 ██╔══██╗██║   ██║██╔══╝  ██╔══╝  ██╔══╝  ██╔══██╗    ██║        ██║   ██║
 ██████╔╝╚██████╔╝██║     ██║     ███████╗██║  ██║    ╚██████╗   ██║   ███████╗
 ╚═════╝  ╚═════╝ ╚═╝     ╚═╝     ╚══════╝╚═╝  ╚═╝     ╚═════╝   ╚═╝   ╚══════╝
 */

function bufferDrawStartCtl(ctx,objects){




    $('#map_buffer').css('position','absolute');
    $('#map_buffer').css('top','0px');
    $('#map_buffer').css('left','0px');

    map_buffer.width=canvas_width/3;
    map_buffer.height=canvas_height/3;

    $('#map_buffer').css('z-index',$('#map_bg').css('z-index')-(-10));


}


//------------------------------------
function bufferDrawEndCtl(){


    map_buffer_ctx.clearRect(0, 0, canvas_width/3, canvas_height/3);
}

//------------------------------------

function bufferDrawCtl(){

    objectsDraw(map_buffer_ctx,map_object_changes_buffer);


}


//======================================================================================================================
/*
 ██╗   ██╗██████╗ ██████╗  █████╗ ████████╗███████╗
 ██║   ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝
 ██║   ██║██████╔╝██║  ██║███████║   ██║   █████╗
 ██║   ██║██╔═══╝ ██║  ██║██╔══██║   ██║   ██╔══╝
 ╚██████╔╝██║     ██████╔╝██║  ██║   ██║   ███████╗
 ╚═════╝ ╚═╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
 */

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



    //----------------

    //drawMap(); tohle je uz v loadmap



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


    $('.moving-object').css( 'left', '+='+deltaX );
    $('.moving-object').css( 'top', '+='+deltaY );


}

//======================================================================================================================
/*
 ███████╗██╗   ██╗███╗   ██╗ ██████╗
 ██╔════╝██║   ██║████╗  ██║██╔════╝
 █████╗  ██║   ██║██╔██╗ ██║██║
 ██╔══╝  ██║   ██║██║╚██╗██║██║
 ██║     ╚██████╔╝██║ ╚████║╚██████╗
 ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝

 */

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

    return(new Position(map_click_x,map_click_y));


}


//======================================================================================================================



































