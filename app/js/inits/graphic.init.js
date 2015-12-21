/*
 ██╗      ██████╗  █████╗ ██████╗
 ██║     ██╔═══██╗██╔══██╗██╔══██╗
 ██║     ██║   ██║███████║██║  ██║
 ██║     ██║   ██║██╔══██║██║  ██║
 ███████╗╚██████╔╝██║  ██║██████╔╝
 ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝

 */



//---------------------------------------------------------------------------------------------------------------------


//todo headers

var imageLoadTimeout=false;

function imageLoad(){
    //r('imageLoad');

    all_images_loaded++;


    //$('#loadbar').html(all_images_bg_loaded+'/'+all_images_bg_count);
    var percent=Math.floor((all_images_loaded/all_images_count)*100);

    $('#loadbar').html(percent+'%');



    if(all_images_loaded >= all_images_count) {


        r('all graphics loaded',all_images_loaded,all_images_count);

        map_loaded=true;

        $('#loadbar').remove();

        var map_object_changes_=map_object_changes;

        clearTimeout(imageLoadTimeout);
        imageLoadTimeout=setTimeout(function(){

            r('Loaded!');
            Map.updateMap();
            Map.loadMap();
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


    //----------------------------------------------------------------window sizw


    $('#map_bg').attr('width',$(document).width()*3);
    $('#map_bg').attr('height',$(document).height()*3);


    canvas_width=map_bg.width;
    canvas_height=map_bg.height;


    //----------------------------------------------------------------Podklad


    for(var terrain=0;terrain<terrainCount;terrain++) {
        all_images_bg[terrain] = [];
        for (var seed = 0; seed < seedCount; seed++) {


            all_images_bg[terrain][seed] = new Image();
            all_images_bg[terrain][seed].src = appDir+'/php/terrain.php?terrain=t' + (terrain+1)/*Teren 0 je temnota*/ + '&seed=' + seed + '&size=220';

            all_images_bg[terrain][seed].onload = imageLoad;


        }
    }

    //----------------------------------------------------------------Tree
    for (var seed = 0; seed < treeCount; seed++) {


        all_images_tree[seed] = new Image();
        all_images_tree[seed].src = appDir+'/php/treerock.php?type=tree&seed=' + seed + '&width=100';
        //all_images_tree[seed].src = 'ui/image/tree/' + seed + '.png';

        all_images_tree[seed].onload = imageLoad;


    }
    //r(all_images_tree);
    //----------------------------------------------------------------Rock
    for (var seed = 0; seed < rockCount; seed++) {

        all_images_rock[seed] = [];

        for (var dark = 0; dark < rockCountDark; dark++) {

            all_images_rock[seed][dark] = new Image();
            all_images_rock[seed][dark].src = appDir+'/php/treerock.php?type=rock&seed=' + seed + '&width=133&dark=' + Math.round(dark/rockCountDark*rockMaxDark);

            all_images_rock[seed][dark].onload = imageLoad;
        }

    }

});
