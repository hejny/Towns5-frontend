/**
 * @author Towns.cz
 * @fileOverview  Building walls and paths by dragging
 */
//======================================================================================================================

var dragging_subtypes = ["wall", "path"]; // todo refactor move to vars

var buildingByDraggingPath = false; // todo refactor rename
var buildingByDraggingRange = false;
// todo sjednotit nazyvani uhlu v rad a deg

$(function () {
  //----------------------------------------------------------------------------------mouseMove

  var mouseMove = function (e) {
    // r('mouseMove',building,buildingByDragging);
    // if (building ==== false)r('building ==== false');
    // if (buildingByDragging ==== false)r('buildingByDragging ==== false');

    if (building === false) return;
    if (dragging_subtypes.indexOf(building.subtype) == -1) return;
    if (buildingByDraggingPath === false) return;

    r("T.UI Event: mousemove");

    //-------------------Convert mouse positions to map positions

    var map_click_x = e.clientX - window_width / 2;
    var map_click_y = e.clientY - window_height / 2;

    var mapPos = T.UI.Map.Coords.mouseCenterPos2MapPos(
      map_click_x,
      map_click_y
    );

    //-------------------

    if (buildingByDraggingPath.length > 0) {
      if (false) {
        var lastX, lastY;

        if (buildingByDraggingPath.length > 1) {
          lastX = buildingByDraggingPath[buildingByDraggingPath.length - 2][0];
          lastY = buildingByDraggingPath[buildingByDraggingPath.length - 2][1];
        } else {
          lastX = buildingByDraggingPath[buildingByDraggingPath.length - 1][0];
          lastY = buildingByDraggingPath[buildingByDraggingPath.length - 1][1];
        }

        var dist = T.Math.xy2dist(lastX - mapPos.x, lastY - mapPos.y);
        // r(dist,(building.size * map_model_size));

        if (dist > building.size * map_model_size) {
          // r('newpoint');
          buildingByDraggingPath.push([mapPos.x, mapPos.y]);
        } else {
          // r('aacpoint');
          buildingByDraggingPath[buildingByDraggingPath.length - 1] = [
            mapPos.x,
            mapPos.y,
          ];
        }
      } else {
        buildingByDraggingPath[1] = [mapPos.x, mapPos.y];
      }
    } else {
      // r('startpoint');
      buildingByDraggingPath = [[mapPos.x, mapPos.y]];
    }
  };

  $("#map_drag").mousemove(mouseMove);
  $("#selecting-distance").mousemove(mouseMove);

  //----------------------------------------------------------------------------------mouseDown

  var mouseDown = function (e) {
    if (building === false) return;

    r("T.UI Event: mousedown");

    if (dragging_subtypes.indexOf(building.subtype) == -1) {
      var map_click_x = e.clientX - window_width / 2;
      var map_click_y = e.clientY - window_height / 2;

      var forceJoiningMapPos = T.UI.Map.Coords.mouseCenterPos2MapPos(
        map_click_x,
        map_click_y
      );

      var building_test = building.clone();
      building_test.x = forceJoiningMapPos.x;
      building_test.y = forceJoiningMapPos.y;

      T.UI.Menu.Building.forceJoining = createNewOrJoin(building_test);

      if (T.UI.Menu.Building.forceJoining !== false) {
        map_selected_ids = [T.UI.Menu.Building.forceJoining.id];
        // T.UI.Map.drawMapAsync();
      }
    } else {
      buildingByDraggingRange = (building.getModel().range("x") / 100) * 2; // todo better

      buildingByDraggingPath = [];
      mouseMove(e);

      T.UI.Map.MapBuffer.start();
      $("#selecting-distance").hide(); // todo [PH] ? Do
      // T.UI.Map.MapBuffer.start
      requestAnimationFrame(buildingLoop);
    }
  };

  $("#map_drag").mousedown(mouseDown);
  $("#selecting-distance").mousedown(mouseDown);

  //----------------------------------------------------------------------------------BuildingLoop

  var wall_segments, wall_segments_last;

  var buildingLoop = function (e) {
    if (building === false) return;
    if (buildingByDraggingPath === false) return;

    //------------------------------------------------------

    objects_external_buffer = [];

    // r(buildingByDraggingPath);
    for (var ii = 1, ll = buildingByDraggingPath.length; ii < ll; ii++) {
      var buildingByDraggingStartX = buildingByDraggingPath[ii - 1][0];
      var buildingByDraggingStartY = buildingByDraggingPath[ii - 1][1];

      var buildingByDraggingEndX = buildingByDraggingPath[ii][0];
      var buildingByDraggingEndY = buildingByDraggingPath[ii][1];

      var buildingByDraggingPlusX =
        buildingByDraggingEndX - buildingByDraggingStartX;
      var buildingByDraggingPlusY =
        buildingByDraggingEndY - buildingByDraggingStartY;

      var buildingByDraggingPlusDistDeg = T.Math.xy2distDeg(
        buildingByDraggingPlusX,
        buildingByDraggingPlusY
      );

      buildingByDraggingPlusDistDeg.dist =
        Math.round(buildingByDraggingPlusDistDeg.dist / 2) * 2;
      buildingByDraggingPlusDistDeg.deg =
        Math.round(buildingByDraggingPlusDistDeg.deg / 15) * 15;

      var buildingByDraggingPlusXY = T.Math.distDeg2xy(
        buildingByDraggingPlusDistDeg.dist,
        buildingByDraggingPlusDistDeg.deg
      );

      buildingByDraggingEndX =
        buildingByDraggingStartX + buildingByDraggingPlusXY.x;
      buildingByDraggingEndY =
        buildingByDraggingStartY + buildingByDraggingPlusXY.y;

      // r(buildingByDraggingPath);

      var distance = buildingByDraggingPlusDistDeg.dist; // T.Math.xy2dist(buildingByDraggingEndX -
      // buildingByDraggingStartX, buildingByDraggingEndY -
      // buildingByDraggingStartY);

      // todo pouzit funkci T.T.Math.xy2distDeg
      var rot = Math.round(
        Math.atan2(
          buildingByDraggingEndX - buildingByDraggingStartX,
          buildingByDraggingEndY - buildingByDraggingStartY
        ) *
          (180 / Math.PI)
      );
      if (rot < 0) rot = rot + 360;

      wall_segments = Math.floor(distance / 2); // todo by constant
      // Math.floor(distance / (buildingByDraggingRange * map_model_size
      // /*/ 1.11*/ * building.design.data.size ));

      if (wall_segments != wall_segments_last) {
        wall_segments_last = wall_segments;
        // todo sounds ion.sound.play("door_bump");
      }

      for (var i = ii == 1 ? 0 : 1, l = wall_segments; i <= l; i++) {
        // r(i,l);

        var tmp = building.clone();

        /*if (l < 2 && ll<2) {
         rot = tmp.rot;

         } else {

         tmp.rot = rot;

         if (ii==1 && i === 0) {
         tmp.res = tmp.res_node;
         } else if (ii==ll-1 && i == l) {
         tmp.res = tmp.res_node;
         } else {
         tmp.res = tmp.res_path;
         }


         }*/

        tmp.x =
          buildingByDraggingStartX +
          (buildingByDraggingEndX - buildingByDraggingStartX) * (i / l);
        tmp.y =
          buildingByDraggingStartY +
          (buildingByDraggingEndY - buildingByDraggingStartY) * (i / l);

        /*if([0,4,10].indexOf(map_bg_data[Math.round(tmp.y)+Math.floor(map_radius)][Math.round(tmp.x)+Math.floor(map_radius)])!=-1){
         tmp.res=tmp.res_node;
         }*/

        tmp.getModel().rotation = rot - 45; // 360-rot+45;

        // delete tmp.rot;
        // delete tmp.res_path;

        //------

        objects_external_buffer.push(tmp);
      }
    }

    //------------------------------------------------------

    try {
      T.UI.Map.MapBuffer.tick();
    } catch (error) {
      // todo IndexSizeError: Index or size is negative or greater than the
      // allowed amount
    }

    setTimeout(function () {
      requestAnimationFrame(buildingLoop);
    }, 10);
  };

  //----------------------------------------------------------------------------------mouseUp

  var mouseUp = function (e) {
    if (building === false) return;
    if (dragging_subtypes.indexOf(building.subtype) == -1) return;
    if (buildingByDraggingPath === false) return;

    r("T.UI Event: mouseup");

    var objects_external_buffer_length = objects_external_buffer.length;

    buildingLoop();

    objects_external_buffer.forEach(function (object) {
      create(object);
    });

    objects_external_buffer = [];

    buildingByDraggingPath = false;

    T.UI.Map.loadMap();
    $("#selecting-distance").show();
    T.UI.Map.MapBuffer.stop();

    //------------------------------------------
    if (objects_external_buffer_length === 0) {
      T.UI.Message.info(
        T.Locale.get("building by dragging", building.subtype, "info")
      );
      T.UI.Menu.Building.start(building._prototypeId); // todo should it be here _prototypeId
    }
    //------------------------------------------
  };

  $("#map_drag").mouseup(mouseUp);
  $("#selecting-distance").mouseup(mouseUp);
});
