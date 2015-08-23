
//----------------

var map_loaded=false;

//----


var map_zoom=-2.5;
var map_rotation=Math.random()*360;
var map_slope=27;


var map_x=(Math.random()-0.5)*1000000;
var map_y=(Math.random()-0.5)*1000000;
//var map_y=map_x+(Math.random()-0.5)*200000;

//var map_x=30311400;
//var map_y=30311400;

//var map_x=-40311400;
//var map_y=-40311400;

var map_x=30;var map_y=40;
var map_rotation=45;


var max_map_size=100;
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
var map_selected_uids = [];

terrainCount=13;



//----------------
/*
seedCount=1;
//----

treeCount=1;
rockCount=1;*/

//----------------

seedCount=6;
//----

treeCount=6;
rockCount=6;

//----------------Odvozene hodnoty

var map_size;

var map_zoom_m;

var map_data;
var map_z_data;
var map_bg_data;

var size_water;
var size_spring;
var size_summer;
var size_autumn;
var size_winter;

var map_rotation_r;
var map_rotation_sin;
var map_rotation_cos;
var map_rotation_sin_minus;

var map_slope_m;
var map_slope_n;





//----------------Konstanty


pi=3.1415
gr=1.62;


//----------------------------------------------------------------------------------------------------------------------




//drawModel(ctx,res);




//----------------------------------------------------------------------------------------------------------------------Prednacitani


function imageLoad(){
    //r('imageLoad');

    all_images_loaded++;


    //$('#loadbar').html(all_images_bg_loaded+'/'+all_images_bg_count);
    var percent=Math.floor((all_images_loaded/all_images_count)*100);

    $('#loadbar').html(percent+'%');



    if(all_images_loaded === all_images_count) {

        map_loaded=true;
        updateMap();
        $('#loadbar').remove();
    }

}


//----------------------------------------------------------------Pocet



var all_images_count=terrainCount*seedCount+treeCount+rockCount;
var all_images_loaded=0;


//----------------------------------------------------------------Podklad

var all_images_bg=[];
for(var terrain=0;terrain<terrainCount;terrain++) {


    all_images_bg[terrain] = [];
    for (var seed = 0; seed < seedCount; seed++) {


        all_images_bg[terrain][seed] = new Image();
        all_images_bg[terrain][seed].src = 'app/graphic/terrain.php?terrain=t' + (terrain+1)/*Teren 0 je temnota*/ + '&seed=' + seed + '&size=120';

        all_images_bg[terrain][seed].onload = imageLoad;


    }
}

//----------------------------------------------------------------Tree

var all_images_tree=[];
for (var seed = 0; seed < treeCount; seed++) {


    all_images_tree[seed] = new Image();
    all_images_tree[seed].src = 'app/graphic/treerock.php?type=tree&seed=' + seed + '&width=100';
    //all_images_tree[seed].src = 'ui/image/tree/' + seed + '.png';

    all_images_tree[seed].onload = imageLoad;


}
//r(all_images_tree);
//----------------------------------------------------------------Rock

var all_images_rock=[];
for (var seed = 0; seed < rockCount; seed++) {


    all_images_rock[seed] = new Image();
    all_images_rock[seed].src = 'app/graphic/treerock.php?type=rock&seed=' + seed + '&width=133';

    all_images_rock[seed].onload = imageLoad;


}





//======================================================================================================================loadMap


function loadMap() {
    //r('loadMap');

    var map_xy_data = getMap(Math.round(map_x-(map_size/2)), Math.round(map_y-(map_size/2)), map_size);

    //console.log(map_data);

    map_z_data = map_xy_data[0];
    map_bg_data = map_xy_data[1];

    delete map_xy_data;

    var tmp=Math.round(map_size/2)-2;

    townsApi(
        [
            'list',
            'id,x,y,type,res',
            ['radius('+Math.round(map_x)+','+Math.round(map_y)+','+Math.round(tmp)+')'],
            'y,x'
        ]

        ,function(response){

        var map_data_=response['objects'];

        //r(map_data_);

        map_data=[];

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Material terrains - add to map_z_data and map_bg_data, remove from map_data

            //r(map_size);

        for(var i= 0, l=map_data_.length;i<l;i++){

            if(map_data_[i].type=='terrain'){

                var x=Math.floor(map_data_[i].x-map_x+map_size/2);
                var y=Math.floor(map_data_[i].y-map_y+map_size/2);


                if(
                x<0 ||
                y<0 ||
                x>=map_size ||
                x>=map_size

                )r(x+','+y);


                //r(map_data_[i].x+'-'+map_x+'+'+map_size/2));
                //r(x+','+y);

                //r(map_data_[i].terrain);

                if(typeof(map_data_[i].res)!='undefined'){

                    var terrain=map_data_[i].res;
                    terrain=parseInt(terrain.substr(1));

                    //terrain=terrain-1;

                    if(terrain>0)
                        map_bg_data[y][x]=terrain;





                }

                if(typeof(map_data_[i].level)!='undefined'){
                    map_z_data[y][x]=map_data_[i].level;
                }else{
                    //map_z_data[y][x]=0.1;
                }


            }else{
                map_data.push(map_data_[i]);
            }

        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        $('#map_bg').css('left',-canvas_width/3);
        $('#map_bg').css('top',-canvas_height/3);

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
    ctx.closePath(); // not used correctly, see comments (use to close off open path)
    ctx.stroke();
    ctx.fill();
}




//----------------------------------------------------------------------------------------------------------------------




function drawMap(){

    //----------------Prepare objects

    var map_draw=[];


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Virtual objects

    for(var y=0;y<map_size;y++){
        for(var x=0;x<map_size;x++){



            if(x>=0 && y>=0 && x<map_size && y<map_size /*Math.pow(x-(map_size/2),2)+Math.pow(y-(map_size/2),2)<=Math.pow(map_size/2,2)*/) {


                var terrain = map_bg_data[y][x] - 1/*Teren 0 je temnota*/;




                if (terrain != -1) {


                    var xc = x - map_x + Math.round(map_x) - (map_size - 1) / 2;
                    var yc = y - map_y + Math.round(map_y) - (map_size - 1) / 2;

                    var world_x = x + Math.floor(map_x) - Math.floor(map_size/2);
                    var world_y = y + Math.floor(map_y) - Math.floor(map_size/2);


                    if (terrain == 0 || terrain == 10){

                        map_z_data[y][x] = 0.1;
                        var size=size_water;

                    }
                    else
                    if(terrain == 8 || terrain == 11){//Jaro
                        var size=size_spring;
                    }
                    else
                    if(terrain == 12 || terrain == 3 || terrain == 7){//Leto
                        var size=size_summer;
                    }
                    else
                    if(/*terrain == 9 ||*/ terrain == 5){//Podzim
                        var size=size_autumn;
                    }
                    else
                    if(terrain == 2 || terrain == 6){//Zima
                        var size=size_winter;
                    }
                    else{
                        size=1

                    }




                    var z = (Math.pow(map_z_data[y][x], (1 / 12))-0.85) * -6000;


                    var size=(Math.sin((world_x*world_y)/10)/4)+1;

                    var width = Math.ceil(160 * size * 3 * map_zoom_m);
                    var height = Math.ceil(width  * size /* map_zoom_m*/);


                    screen_x = ((map_rotation_cos * xc - map_rotation_sin * yc ) * 160 ) * map_zoom_m;
                    screen_y = ((map_rotation_sin * xc + map_rotation_cos * yc ) * 160 ) / map_slope_m * map_zoom_m + z / map_slope_n * map_zoom_m;




                    screen_x += (canvas_width / 2);
                    screen_y += (canvas_height / 2)-(height/2);


                    if(screen_x>-(width/2) && screen_y>-(height/2) && screen_x<canvas_width && screen_y<canvas_height+(160*size)){

                        //----------------------------------------------------------------------------------------------

                        var seed = Math.abs(world_x * world_y - 1) % seedCount;

                        //-----

                        map_draw.push([
                            'image',
                            all_images_bg[terrain][seed],
                            screen_x,
                            screen_y,
                            screen_y+height-Math.floor(width/4),
                            width,
                            height
                        ]);

                        //----------------------------------------------------------------------------------------------Virtuální objekty

                        if((terrain==9 /*&& map_data[y+1][x]!=4 && map_data[y-1][x]!=4 && map_data[y][x+1]!=4 && map_data[y][x-1]!=4*/ ) || terrain==4) {

                            var block_object=false;
                            if(terrain==9){

                                if(y>0)
                                    if(map_bg_data[y-1][x]==4)block_object=true;
                                if(y<map_size-1)
                                    if(map_bg_data[y+1][x]==4)block_object=true;
                                if(x>0)
                                    if(map_bg_data[y][x-1]==4)block_object=true;
                                if(x<map_size-1)
                                    if(map_bg_data[y][x+1]==4)block_object=true;

                            }

                            if(!block_object){


                                var object_seed=(Math.pow(world_x,2)+Math.pow(world_y,2))%(terrain==9?treeCount:rockCount);

                                var object=(terrain==9?all_images_tree[object_seed]:all_images_rock[object_seed]);

                                var object_uid=(terrain==9?'t':'r')+world_x+'x'+world_y+'y';


                                if(terrain==9){
                                    var size=Math.sin(Math.pow(Math.abs(world_x*world_y),(1/1.5))/10)/10+0.6;
                                }else{
                                    var size=Math.sin(Math.pow(Math.abs(world_x*world_y),(1/2))/10)/5+0.8;
                                }


                                var object_width=object.width*(width/100)*size;
                                var object_height=object.height*(width/100)*size;


                                object_xc=xc;
                                object_yc=yc;

                                object_xc+=Math.sin((Math.pow(world_x,2)+Math.pow(world_y,2))/10)/1.41;
                                object_yc+=Math.sin((Math.pow(world_x,4)+Math.pow(world_y,1))/10)/1.41;


                                object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * 160 ) * map_zoom_m;
                                object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * 160 ) / map_slope_m * map_zoom_m + (z-300) / map_slope_n * map_zoom_m;



                                object_screen_x += (canvas_width / 2);
                                object_screen_y += (canvas_height / 2);


                                if(map_selecting)
                                if(Math.pow(object_screen_x-canvas_mouse_x,2)+Math.pow(object_screen_y-canvas_mouse_y,2)<900){

                                    map_selecting=false;

                                    map_mouse_x=world_x;
                                    map_mouse_y=world_y;
                                    //alert(object_uid);
                                    map_selected_uids=[object_uid];
                                }

                                object_screen_x += (width/2)  - (object_width/2);
                                object_screen_y += -(object_height)+(object_width/4)+(height/4);


                                if($.inArray(object_uid,map_selected_uids)!=-1){

                                    //alert('selected'+object_uid);

                                    /*map_ctx.strokeStyle = 'rgba(0,0,0,0.8)';
                                    map_ctx.fillStyle = 'rgba(50,50,50,0.4)';
                                    map_ctx.lineWidth = 3;

                                    drawEllipse(
                                        map_ctx,
                                        object_screen_x,
                                        object_screen_y+object_height-(object_width/map_slope_m),
                                        object_width,
                                        object_width/map_slope_m);*/
                                    map_draw.push([
                                        'ellipse',
                                        ['rgba(50,50,50,0.4)','rgba(0,0,0,0.8)',3],
                                        object_screen_x,
                                        object_screen_y+object_height-(object_width/map_slope_m),
                                        object_width,
                                        object_width/map_slope_m
                                    ]);

                                }


                                map_draw.push([
                                    'image',
                                    object,
                                    object_screen_x,
                                    object_screen_y,
                                    object_screen_y+object_height-Math.floor(object_width/4)+(terrain==9?120:120),
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

    for(var i=0;i<map_data.length;i++){

        //-----------------------------------------

                var object_seed=(Math.pow(world_x,2)+Math.pow(world_y,2))%(terrain==9?treeCount:rockCount);

                var object=all_images_rock[0];

                /*
                 map_bg = document.getElementById("map_bg");
                 map_ctx = map_bg.getContext("2d");*/

                /*var object=document.createElement("canvas");
                object.width=550;
                object.height=350;
                object_ctx = object.getContext("2d");

                drawModel(object_ctx,map_data[i].res);*/


                var object_uid=map_data[i].uid;


                object_xc=map_data[i].x-Math.floor(map_x);
                object_yc=map_data[i].y-Math.floor(map_y);


                object_screen_x = ((map_rotation_cos * object_xc - map_rotation_sin * object_yc ) * 160 ) * map_zoom_m;
                object_screen_y = ((map_rotation_sin * object_xc + map_rotation_cos * object_yc ) * 160 ) / map_slope_m * map_zoom_m ;


                object_screen_x += (canvas_width / 2);
                object_screen_y += (canvas_height / 2);


                /*if(map_selecting)
                    if(Math.pow(object_screen_x-canvas_mouse_x,2)+Math.pow(object_screen_y-canvas_mouse_y,2)<900){

                        map_selecting=false;

                        map_mouse_x=world_x;
                        map_mouse_y=world_y;
                        //alert(object_uid);
                        map_selected_uids=[object_uid];
                    }*/


                map_draw.push([
                    'res',
                    map_data[i].res,
                    object_screen_x,
                    object_screen_y,
                    object_screen_y+200
                ]);


        //-----------------------------------------

    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Sort objects

    //map_draw;
    map_draw.sort(function(a,b){

        if(a[4]>b[4]){
            return(1);
        }else
        if(a[4]<b[4]){
            return(-1);
        }else{
            return(0);
        }

    });

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Draw objects
    //----------------Clear canvas

    map_ctx.clearRect ( 0 , 0 ,canvas_width , canvas_height );

    //----------------Drawing... :)

    for(var i=0;i<map_draw.length;i++){

        if(map_draw[i][0]=='image'){

            map_ctx.drawImage(
                map_draw[i][1],
                map_draw[i][2],
                map_draw[i][3],
                //[4] is order used in sorting
                map_draw[i][5],
                map_draw[i][6]
            );
        }else
        if(map_draw[i][0]=='res'){

            drawModel(map_ctx,map_draw[i][1],map_zoom_m,map_draw[i][2],map_draw[i][3],-map_rotation,map_slope);

        }else
        if(map_draw[i][0]=='ellipse'){



            map_ctx.fillStyle =     map_draw[i][1][0];
            map_ctx.strokeStyle =   map_draw[i][1][1];
            map_ctx.lineWidth =     map_draw[i][1][2];


            drawEllipse(

                map_ctx,
                map_draw[i][2],
                map_draw[i][3],
                map_draw[i][5],
                map_draw[i][6]

            );

        }

    }


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
    }

    if(map_rotation_delta || !map_rotation_r) {

        map_rotation_r = map_rotation / 180 * pi;
        map_rotation_sin = Math.sin(map_rotation_r);
        map_rotation_cos = Math.cos(map_rotation_r);
        map_rotation_sin_minus = Math.sin(-map_rotation_r);
    }

    if(map_slope_delta || !map_slope_m){
        map_slope_m=Math.abs(1/Math.sin(map_slope/180*pi));
        map_slope_n=Math.abs(1/Math.cos(map_slope/180*pi));
    }


    if(map_x_delta || map_y_delta || map_size_delta || map_zoom_delta || !map_size){


        map_size=Math.max((canvas_height/80/*1.4*/),(canvas_width/160/*1.4*/))/map_zoom_m;
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


    /*size_water = (Math.sin(time / 1000) + 1) / 1 + 2;

    size_spring = (Math.sin(time/10000+(pi*(0/4)))+1)/3+1;
    size_summer = (Math.sin(time/10000+(pi*(1/4)))+1)/3+1;
    size_autumn = (Math.sin(time/10000+(pi*(2/4)))+1)/3+1;
    size_winter = (Math.sin(time/10000+(pi*(3/4)))+1)/3+1;


    size_water=Math.round(size_water*1000)/1000;
    size_spring=Math.round(size_spring*100)/100;
    size_summer=Math.round(size_summer*100)/100;
    size_autumn=Math.round(size_autumn*100)/100;
    size_winter=Math.round(size_winter*100)/100;*/

    size_water=1.6;
    size_spring=1;
    size_summer=1;
    size_autumn=1;
    size_winter=1;

    //----------------

    updateValues();


    //----------------

    //drawMap(); tohle je uz v loadmap



}


//----------------------------------------------------------------------------------------------------------------------Frames


var fps=0;
var time=0;

var map_bg =false;
var map_ctx =false;

    $( document ).ready(function() {

    map_bg = document.getElementById("map_bg");
    map_ctx = map_bg.getContext("2d");



    /*setInterval(function() {

            //--------------------------------FPS


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
            //--------------------------------Actions

            //Brutal//updateMap(ms);

            updateMap(ms);

            //--------------------------------

    },500);*/

        //setTimeout(function() {
           // fps=1;
           // updateMap();
        //},1000);


});

//----------------------------------------------------------------------------------------------------------------------


function updateValues(){

    $('#fps').html(fps);

    $('#size_water').html(size_water);
    $('#size_spring').html(size_spring);

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


//----------------------------------------------------------------------------------------------------------------------


function mapMove(deltaX,deltaY,noUpdate) {

    //----------------

    var x_delta = -Math.sin(map_rotation / 180 * pi) * deltaY / 180 / map_zoom_m*map_slope_m;
    var y_delta = -Math.cos(map_rotation / 180 * pi) * deltaY / 180 / map_zoom_m*map_slope_m;


    x_delta += -Math.cos(map_rotation / 180 * pi) * deltaX / 180 / map_zoom_m;
    y_delta += Math.sin(map_rotation / 180 * pi) * deltaX / 180 / map_zoom_m;

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



        ///console.log(Math.pow(map_bg_x,2)+Math.pow(map_bg_y/2,2),(Math.pow(screen_x,2)+Math.pow(screen_y/2,2))/2    );

        if(!noUpdate)
        if(Math.pow(map_bg_x+canvas_width/3,2)+Math.pow(map_bg_y+canvas_width/3/2,2)>(Math.pow(screen_x,2)+Math.pow(screen_y/2,2))/32){

            //alert(Math.pow(map_bg_x,2)+Math.pow(map_bg_y/2,2));
            updateMap();

    }

    //----------------
}

































