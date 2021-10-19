/**
 * @author ©Towns.cz
 * @fileOverview Additional methods to object Map
 */
//======================================================================================================================
T.setNamespace('UI.Map');

/**
 * Draw the map on canvas
 * @static
 */
T.UI.Map.drawMap = function() {
  // r(map_ctx);
  if (map_ctx === false)
    return;
  // r('drawMap');
  if (isNaN((map_radius * 2)))
    throw '(map_radius*2) is NaN';
  t('drawMap start');

  //----------------Move canvas

  $('#map_bg').css('left', canvas_left).css('top', canvas_top);

  //----------------Move stories

  $('#map-stories').css('left', canvas_left).css('top', canvas_top);

  //----------------Prepare objects

  var map_draw = [];

  // todo refactor should it be here?
  var selecting_distance_pow = selecting_distance * map_zoom_m;
  selecting_distance_pow = selecting_distance_pow * selecting_distance_pow;

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~map_data_terrains

  for (var y = 0; y < (map_radius * 2); y++) {
    for (var x = 0; x < (map_radius * 2); x++) {

      if (map_array[y][x]) {

        var world_x = x + Math.floor(T.UI.Map.map_center.x) - map_radius;
        var world_y = y + Math.floor(T.UI.Map.map_center.y) - map_radius;

        var xc = world_x - T.UI.Map.map_center.x;
        var yc = world_y - T.UI.Map.map_center.y;

        // var xc = x - ( T.UI.Map.map_center.x -
        // Math.floor(T.UI.Map.map_center.x)) - map_radius; var yc = y - (
        // T.UI.Map.map_center.y - Math.floor(T.UI.Map.map_center.y)) -
        // map_radius;

        // var terrain_size = 1;
        var terrain_size = Math.cos((world_x * world_y) % 100) / 2 / 4 + 1;

        var width = Math.ceil(map_field_size * terrain_size * 3 * map_zoom_m);
        var height = Math.ceil(width * terrain_size);

        var screen_x =
            ((map_rotation_cos * xc - map_rotation_sin * yc) * map_field_size) *
            map_zoom_m;
        var screen_y =
            ((map_rotation_sin * xc + map_rotation_cos * yc) * map_field_size) /
            map_slope_m * map_zoom_m;

        screen_x += (canvas_width / 2);
        screen_y += (canvas_height / 2);

        //------------------------------------------

        if (screen_x > -(width / 2) && screen_y > -(height / 2) &&
            screen_x < canvas_width &&
            screen_y < canvas_height + (map_field_size * terrain_size)) {

          //----------------------------------------------------------------------------------------------

          var seed = Math.abs(world_x * world_y - 1) % seedCount;

          //-----

          map_draw.push({

            drawtype : 'image',
            data :
                T.Cache.backgrounds.get('t' + (map_array[y][x]) + 's' + seed),

            screen_x : screen_x,
            screen_y : screen_y,

            anchor_x : width / 2,
            anchor_y : 0,

            width : width,
            height : height

          });

          //----------------------------------------------------------------------------------------------
        }
      }
    }
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~map_data_buildings

  selecting_distance_pow = 20; // todo should it be here?
  selecting_distance_pow = selecting_distance_pow * selecting_distance_pow;

  map_data_buildings.forEach(function(object) {
    /// todo dynamic position   //var position = object.getPosition();
    var object_xc = object.x - T.UI.Map.map_center.x;
    var object_yc = object.y - T.UI.Map.map_center.y;

    var object_screen_x =
        ((map_rotation_cos * object_xc - map_rotation_sin * object_yc) *
         map_field_size) *
        map_zoom_m;
    var object_screen_y =
        ((map_rotation_sin * object_xc + map_rotation_cos * object_yc) *
         map_field_size) /
        map_slope_m * map_zoom_m;

    object_screen_x += (canvas_width / 2);
    object_screen_y += (canvas_height / 2);

    if (object.type == 'building') {
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      map_draw.push({
        drawtype : 'model',
        data : object,
        screen_x : object_screen_x,
        screen_y : object_screen_y,
      });

      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    } else if (object.type == 'natural') {
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      var image = T.Cache.objectsNatural.get(object.getCode());

      var size = object.design.data.size || 1;

      var width = map_field_size * map_zoom_m * 3 * size;
      var height = image.height / image.width * width;

      map_draw.push({

        drawtype : 'image',
        data : image,

        screen_x : object_screen_x,
        screen_y : object_screen_y,

        anchor_x : width / 2,
        anchor_y : height - (width / 2 / map_slope_m),

        width : width,
        height : height

      });

      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    }

    //-----------------------------------------
  });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Sort
  //objects

  map_draw.sort(function(a, b) {
    if (a.screen_y > b.screen_y) {
      return (1);
    } else if (a.screen_y < b.screen_y) {
      return (-1);
    } else {
      return (0);
    }
  });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Draw
  //objects
  //----------------Clear canvas

  map_ctx.clearRect(0, 0, canvas_width, canvas_height);

  map_ctx.fillStyle = '#000000';
  map_ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  map_ctx.lineWidth = 0;

  //----------------Drawing... :)

  for (var i = 0; i < map_draw.length; i++) {

    if (map_draw[i].drawtype == 'image') { // todo is it used?
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~image
      try {
        map_ctx.drawImage(

            // todo refactor: maybe map_zoom_m should be applied here

            map_draw[i].data,

            map_draw[i].screen_x - map_draw[i].anchor_x,
            map_draw[i].screen_y - map_draw[i].anchor_y,

            map_draw[i].width, map_draw[i].height

        );
      } catch (err) {
        r('Could not load', map_draw[i].data);
      }

      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    } else if (map_draw[i].drawtype == 'model') {
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~building

      map_draw[i].data.getModel().drawCashedAsync(
          map_ctx, map_zoom_m * map_model_size, map_draw[i].screen_x,
          map_draw[i].screen_y, map_rotation, map_slope,

          (map_selected_ids.indexOf(map_draw[i].data.id) != -1 ? true : false),
          true);

      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // t('Drawing end');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  }

  t('drawMap end');

  /*if(Math.random()>0.95)
      throw('aaa');*/
};

/**
 * Draw the map on canvas asynchronously
 * @static
 * @param {number} delay ms
 */
T.UI.Map.drawMapAsync = function(
    delay = IMMEDIATELY_MS) { // todo search where to use this function
  setTimeout(function() { T.UI.Map.drawMap(); }, delay);
};