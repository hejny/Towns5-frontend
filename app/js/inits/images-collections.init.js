/**
 * @author ©Towns.cz
 * @fileOverview Load Trees, Rock and Terrains for map
 */
//======================================================================================================================

var ImagesCollections={};



//----------------------------------------------------------------Textury
ImagesCollections.textures= new ImagesCollection({

    shadow: 'shadow.png',

    //todo refactor smart loading file list
    clay_bricks: 'clay-bricks.jpg',
    clay_roof: 'clay-roof.jpg',
    iron_plates: 'iron-plates.jpg',
    stone_bricks: 'stone-bricks.jpg',
    stone_plain: 'stone-plain.jpg',
    wood_boards: 'wood-boards.jpg',
    wood_raw: 'wood-raw.jpg',
    wood_fence: 'wood-fence.jpg'

},appDir+'/php/image.php?width=128&file=media/image/textures/');




//----------------------------------------------------------------Podklad

/*todo maybe ArrayFunctions.multipleFor(
 [[0,terrainCount],[0,seedCount]]
 ,function(terrain,seed){


 });*/


files=[];
for(var terrain=0;terrain<terrainCount;terrain++) {
    for (var seed = 0; seed < seedCount; seed++) {

        files['t'+terrain+'s'+seed] = 't' + (terrain) + '&seed=' + seed + '&size=220';


    }
}

ImagesCollections.backgrounds= new ImagesCollection(files,appDir+'/php/terrain.php?terrain=');






//----------------------------------------------------------------Tree,Rock

files=[];

//----------------Tree


for (var seed = 0; seed < treeCount; seed++) {

    files['tree'+seed] = '?type=tree&seed=' + seed + '&width=100';

}


//----------------Rock


for (var seed = 0; seed < rockCount; seed++) {

    for (var dark = 0; dark < rockCountDark; dark++) {

        files['rock'+seed+'dark'+dark] = '?type=rock&seed=' + seed + '&width=133&dark=' + Math.round(dark/rockCountDark*rockMaxDark);

    }
}

//----------------

ImagesCollections.imageObjects= new ImagesCollection(files,appDir+'/php/treerock.php');



//----------------------------------------------------------------Loading callback


ImagesCollections.imageLoad = function(){

    var percent = (
            ImagesCollections.textures.loaded()+
            ImagesCollections.backgrounds.loaded()+
            ImagesCollections.imageObjects.loaded()
        ) / 3;

    /*r(  ImagesCollections.textures.loaded(),
     ImagesCollections.backgrounds.loaded(),
     ImagesCollections.imageObjects.loaded(),percent);*/


    $('#loadbar').find('.load-percent').text(Math.floor(percent*100)+'%');



    if(percent==1) {

        $('#loadbar').slideUp();

        map_loaded=true;//todo refactor move to static object Map

        Map.updateMap();
        Map.loadMap();

    }

};

//----------------------------------------------------------------On document ready start loading

$(function(){

    r('Start loading of ImagesCollections...');

    ImagesCollections.textures.load(ImagesCollections.imageLoad);
    ImagesCollections.backgrounds.load(ImagesCollections.imageLoad);
    ImagesCollections.imageObjects.load(ImagesCollections.imageLoad);

});