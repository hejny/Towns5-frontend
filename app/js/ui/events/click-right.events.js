/**
 * @author ©Towns.cz
 * @fileOverview  Right click on map - create path destination of selected building
 */
//======================================================================================================================

$(function(){

    var mouseRightClick = function(e) {
        e.preventDefault();


        var map_click_x=(e.clientX-(canvas_width / 3/2));
        var map_click_y=(e.clientY-(canvas_height / 3/2));
        var mapPos=Map.mouseCenterPos2MapPos(map_click_x,map_click_y);

        r('right click on map',mapPos);


        map_selected_ids.forEach(function(id){

            var i=ArrayFunctions.id2i(map_object_changes,id);

            if(Path.is(map_object_changes[i].path)){
                var position=map_object_changes[i].path.recount();
            }else{
                var position=new Position(map_object_changes[i].x,map_object_changes[i].y);
            }


            map_object_changes[i].x=position.x;
            map_object_changes[i].y=position.y;


            try {

                map_object_changes[i].path=new Path(position,mapPos,6,map_collision_data,new Position(Math.round(map_x-(map_size/2)), Math.round(map_y-(map_size/2))));

            }catch(error) {

                message(error,'error');

            }




        });


        orderMoveAndNormal();



    };





    $('#map_drag').bind("contextmenu",mouseRightClick);
    $('#selecting-distance').bind("contextmenu",mouseRightClick);

});