/**
 * @author Towns.cz
 * @fileOverview  Building walls by dragging
 */
//======================================================================================================================



var buildingByDraggingPath=false;
var buildingByDraggingRange=false;
//todo sjednotit nazyvani uhlu v rad a deg


$(function(){

    //----------------------------------------------------------------------------------mouseMove

    var mouseMove=function (e) {

        //r('mouseMove',building,buildingByDragging);
        //if (building === false)r('building === false');
        //if (buildingByDragging === false)r('buildingByDragging === false');

        if (building === false)return;
        if (building.subtype!='wall')return;
        if (buildingByDraggingPath === false)return;

        //-------------------Convert mouse positions to map positions

        var map_click_x=(e.clientX-(window_width/2));
        var map_click_y=(e.clientY-(window_height/2));

        var mapPos=Map.mouseCenterPos2MapPos(map_click_x,map_click_y);

        //-------------------

        if(buildingByDraggingPath.length>0){


            if(false){


                if(buildingByDraggingPath.length>1) {
                    var lastX = buildingByDraggingPath[buildingByDraggingPath.length - 2][0],
                        lastY = buildingByDraggingPath[buildingByDraggingPath.length - 2][1];
                }else{
                    var lastX = buildingByDraggingPath[buildingByDraggingPath.length - 1][0],
                        lastY = buildingByDraggingPath[buildingByDraggingPath.length - 1][1];
                }


                var dist=Math.xy2dist(lastX-mapPos.x,lastY-mapPos.y);
                //r(dist,(building.size * map_model_size));


                if(dist>(building.size * map_model_size)){

                    //r('newpoint');
                    buildingByDraggingPath.push([mapPos.x,mapPos.y]);

                }else{

                    //r('aacpoint');
                    buildingByDraggingPath[buildingByDraggingPath.length-1]=([mapPos.x,mapPos.y]);

                }

            }else{

                buildingByDraggingPath[1]=[mapPos.x,mapPos.y];

            }


        }else{


            //r('startpoint');
            buildingByDraggingPath=[[mapPos.x,mapPos.y]];

        }

    };


    $('#map_drag').mousemove(mouseMove);
    $('#selecting-distance').mousemove(mouseMove);

    //----------------------------------------------------------------------------------mouseDown

    var mouseDown=function (e) {

        r('mouseDown');

        if (building == false)return;
        if (building.subtype!='wall'){


            var map_click_x=(e.clientX-(window_width/2));
            var map_click_y=(e.clientY-(window_height/2));



            var forceJoiningMapPos=Map.mouseCenterPos2MapPos(map_click_x,map_click_y);


            var building_test=deepCopyObject(building);
            building_test.x = forceJoiningMapPos.x;
            building_test.y = forceJoiningMapPos.y;

            forceJoining=createNewOrJoin(building_test);

            if(forceJoining!=false){
                map_selected_ids=[forceJoining.id];
                //Map.drawMapAsync();
            }



        }else{


            buildingByDraggingRange = building.design.data.range('x')/100*2;//todo better


            buildingByDraggingPath=[];
            mouseMove(e);

            bufferDrawStartCtl();
            $('#selecting-distance').hide();//todo [PH] ? Do bufferDrawStartCtl
            requestAnimationFrame(buildingLoop);


        }

    };


    $('#map_drag').mousedown(mouseDown);
    $('#selecting-distance').mousedown(mouseDown);

    //----------------------------------------------------------------------------------BuildingLoop

    var wall_segments,wall_segments_last;

    var buildingLoop=function (e) {

        if (building == false)return;
        if (buildingByDraggingPath === false)return;

        //------------------------------------------------------

        map_object_changes_buffer=[];


        //r(buildingByDraggingPath);
        for(var ii=1,ll=buildingByDraggingPath.length;ii<ll;ii++) {


            var buildingByDraggingStartX = buildingByDraggingPath[ii-1][0];
            var buildingByDraggingStartY = buildingByDraggingPath[ii-1][1];


            var buildingByDraggingEndX = buildingByDraggingPath[ii][0];
            var buildingByDraggingEndY = buildingByDraggingPath[ii][1];

            //r(buildingByDraggingPath);


            var distance = Math.xy2dist(buildingByDraggingEndX - buildingByDraggingStartX, buildingByDraggingEndY - buildingByDraggingStartY);

            //todo pouzit funkci Math.xy2distDeg
            var rot = Math.round(Math.atan2(buildingByDraggingEndX - buildingByDraggingStartX, buildingByDraggingEndY - buildingByDraggingStartY) * (180 / Math.PI));
            if (rot < 0)rot = rot + 360;


            wall_segments =Math.round(distance / (buildingByDraggingRange * map_model_size / 1.11 * building.design.data.size ))


            if(wall_segments!=wall_segments_last){
                wall_segments_last=wall_segments;
                //todo sounds ion.sound.play("door_bump");
            }


            for (var i = (ii==1?0:1), l = wall_segments; i <= l; i++) {


                //r(i,l);

                var tmp = deepCopyObject(building);


                /*if (l < 2 && ll<2) {
                 rot = tmp.rot;

                 } else {

                 tmp.rot = rot;

                 if (ii==1 && i == 0) {
                 tmp.res = tmp.res_node;
                 } else if (ii==ll-1 && i == l) {
                 tmp.res = tmp.res_node;
                 } else {
                 tmp.res = tmp.res_path;
                 }


                 }*/


                tmp.x = buildingByDraggingStartX + (buildingByDraggingEndX - buildingByDraggingStartX) * (i / l);
                tmp.y = buildingByDraggingStartY + (buildingByDraggingEndY - buildingByDraggingStartY) * (i / l);


                /*if([0,4,10].indexOf(map_bg_data[Math.round(tmp.y)+Math.floor(map_size/2)][Math.round(tmp.x)+Math.floor(map_size/2)])!=-1){
                 tmp.res=tmp.res_node;
                 }*/


                tmp.design.data.rotation=360-rot-45;


                //delete tmp.rot;
                //delete tmp.res_path;

                //------

                map_object_changes_buffer.push(tmp);

            }
        }

        //------------------------------------------------------


        try{

            bufferDrawCtl();

        }catch(e){

            //todo IndexSizeError: Index or size is negative or greater than the allowed amount

        }


        setTimeout(function(){

            requestAnimationFrame(buildingLoop);

        },10);


    };

    //----------------------------------------------------------------------------------mouseUp

    var mouseUp=function (e) {

        if (building == false)return;
        if (building.subtype!='wall')return;
        if (buildingByDraggingPath === false)return;

        buildingLoop();

        createMulti(map_object_changes_buffer);
        map_object_changes_buffer=[];


        buildingByDraggingPath=false;


        Map.loadMap();
        $('#selecting-distance').show();
        bufferDrawEndCtl();

    };


    $('#map_drag').mouseup(mouseUp);
    $('#selecting-distance').mouseup(mouseUp);

});