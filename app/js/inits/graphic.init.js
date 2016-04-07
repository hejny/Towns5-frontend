/**
 * @author ©Towns.cz
 * @fileOverview Load Trees, Rock and Terrains for map
 */
//======================================================================================================================


var imageLoadTimeout=false;

var imageLoad = function(percent){


    $('#loadbar').html(Math.floor(percent*100)+'%');



    if(percent==1) {


        map_loaded=true;

        $('#loadbar').remove();

        var objects_external_=objects_external;

        clearTimeout(imageLoadTimeout);
        imageLoadTimeout=setTimeout(function(){

            r('Loaded!');
            Map.updateMap();
            Map.loadMap();
        },500);

    }

};

//----------------------------------------------------------------------------------------------------------------------Frames


var fps=0;
var time=0;

var map_bg =false;
var map_ctx =false;

var map_buffer =false;
var map_buffer_ctx =false;


var all_images_tree=[];
var all_images_rock=[];




//----------------------------------------------------------------Podklad

//todo refactor make factory function
files=[];
for(var terrain=0;terrain<terrainCount;terrain++) {
    for (var seed = 0; seed < seedCount; seed++) {

        files['t'+terrain+'s'+seed] = 't' + (terrain+1) + '&seed=' + seed + '&size=220';


    }
}

var Backgrounds= new ImagesCollection(files,appDir+'/php/terrain.php?terrain=',imageLoad);

//----------------------------------------------------------------





$(function() {

    map_bg = document.getElementById('map_bg');
    map_ctx = map_bg.getContext('2d');

    map_buffer = document.getElementById('map_buffer');
    map_buffer_ctx = map_buffer.getContext('2d');


    //----------------------------------------------------------------window size

    canvasResize();


    //----------------------------------------------------------------Tree

    for (var seed = 0; seed < treeCount; seed++) {


        all_images_tree[seed] = new Image();
        all_images_tree[seed].src = appDir+'/php/treerock.php?type=tree&seed=' + seed + '&width=100';
        //all_images_tree[seed].src = 'ui/image/tree/' + seed + '.png';

        //all_images_tree[seed].onload = imageLoad;


    }
    //r(all_images_tree);
    //----------------------------------------------------------------Rock
    for (var seed = 0; seed < rockCount; seed++) {

        all_images_rock[seed] = [];

        for (var dark = 0; dark < rockCountDark; dark++) {

            all_images_rock[seed][dark] = new Image();
            all_images_rock[seed][dark].src = appDir+'/php/treerock.php?type=rock&seed=' + seed + '&width=133&dark=' + Math.round(dark/rockCountDark*rockMaxDark);

            //all_images_rock[seed][dark].onload = imageLoad;
        }

    }

});
