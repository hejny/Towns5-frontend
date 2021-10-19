/**
 * @author ©Towns.cz
 * @fileOverview Load Trees, Rock and Terrains for map
 */
//======================================================================================================================

//----------------------------------------------------------------Textury
T.Cache.textures = new T.Cache.ImagesCollection(
    {

      shadow : 'shadow.png',

      // todo refactor smart loading file list
      clay_bricks : 'clay-bricks.jpg',
      clay_roof : 'clay-roof.jpg',
      iron_plates : 'iron-plates.jpg',
      stone_bricks : 'stone-bricks.jpg',
      stone_plain : 'stone-plain.jpg',
      wood_boards : 'wood-boards.jpg',
      wood_raw : 'wood-raw.jpg',
      wood_fence : 'wood-fence.jpg'

    },
    appDir + '/php/image.php?width=128&file=media/image/textures/');

//----------------------------------------------------------------Podklad

/*todo maybe T.ArrayFunctions.multipleFor(
 [[0,terrainCount],[0,seedCount]]
 ,function(terrain,seed){


 });*/

files = [];
for (var terrain = 1; terrain < terrainCount + 1; terrain++) {
  for (var seed = 0; seed < seedCount; seed++) {

    files['t' + terrain + 's' + seed] =
        't' + (terrain) + '&seed=' + seed + '&size=220';
  }
}

T.Cache.backgrounds =
    new T.Cache.ImagesCollection(files, appDir + '/php/terrain.php?terrain=');

//----------------------------------------------------------------Tree,Rock

files = [];

//----------------Tree

for (var seed = 0; seed < treeCount; seed++) {

  files['tree' + seed] = '?type=tree&seed=' + seed + '&width=100';
}

//----------------Rock

for (var seed = 0; seed < rockCount; seed++) {

  for (var dark = 0; dark < rockCountDark; dark++) {

    files['rock' + seed + 'dark' + dark] =
        '?type=rock&seed=' + seed +
        '&width=133&dark=' + Math.round(dark / rockCountDark * rockMaxDark);
  }
}

//----------------

T.Cache.objectsNatural =
    new T.Cache.ImagesCollection(files, appDir + '/php/treerock.php');

//----------------------------------------------------------------Loading
//callback

T.Cache.imageLoad = function() {
  var percent = (T.Cache.textures.loaded() + T.Cache.backgrounds.loaded() +
                 T.Cache.objectsNatural.loaded()) /
                3;

  /*r(  T.Cache.textures.loaded(),
   T.Cache.backgrounds.loaded(),
   T.Cache.objectsNatural.loaded(),percent);*/

  T.Cache.message.text(T.Locale.get('loading of graphic') + ' ' +
                       Math.floor(percent * 100) + '%');

  if (percent == 1) {

    T.Cache.message.close();

    map_loaded = true; // todo refactor move to static object Map

    T.UI.Map.updateMap(true);
    // T.UI.Map.loadMap(true);
  }
};

//----------------------------------------------------------------On document
//ready start loading

$(function() {
  r('Start loading of ImagesCollections...');

  T.Cache.message = T.UI.Message.info();

  T.Cache.textures.load(T.Cache.imageLoad);
  T.Cache.backgrounds.load(T.Cache.imageLoad);
  T.Cache.objectsNatural.load(T.Cache.imageLoad);
});