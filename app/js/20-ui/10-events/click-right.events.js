/**
 * @author Towns.cz
 * @fileOverview  Right click on map - create path destination of selected building
 */
//======================================================================================================================

$(function(){

    var mouseRightClick = function(e) {
        e.preventDefault();


        var map_click_x=(e.clientX-(window_width/2));
        var map_click_y=(e.clientY-(window_height/2));
        var mapPos=T.UI.Map.Coords.mouseCenterPos2MapPos(map_click_x,map_click_y);

        r('T.UI Event: contextmenu (this part of code is unused.)');
        /*return;


        map_selected_ids.forEach(function(id){

            var i=T.ArrayFunctions.id2i(objects_external,id);

            if(T.Path.is(objects_external[i].path)){
                var position=objects_external[i].path.recount();
            }else{
                var position=new T.Position(objects_external[i].x,objects_external[i].y);
            }


            objects_external[i].x=position.x;
            objects_external[i].y=position.y;


            try {

                objects_external[i].path=new T.Path(position,mapPos,6,map_collision_data,new T.Position(Math.round(T.UI.Map.map_center.x-(map_radius)), Math.round(T.UI.Map.map_center.y-(map_radius))));

            }catch(error) {

                message(error,'error');

            }




        });


        T.UI.Map.MapMove.orderMoveAndNormal();

        */

    };





    $('#map_drag').bind("contextmenu",mouseRightClick);
    $('#selecting-distance').bind("contextmenu",mouseRightClick);

});