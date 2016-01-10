/**
 * @author Towns.cz
 * @fileOverview  Click on map - call the action eg. selecting, building, dismantling,...
 */
//======================================================================================================================

var clickingTimeout;

$(function(){


    var mouseClick=function (e) {

        if (building !== false)
            if (typeof building.res_path!=='undefined')return;

        r('mouseDown');

        $('#loading').css('top', e.clientY-15);
        $('#loading').css('left', e.clientX-10);
        $('#loading').show();


        canvas_mouse_x = e.clientX + window_width;//-pos.left;
        canvas_mouse_y = e.clientY + window_height;//-pos.top;


        var map_click_x=(e.clientX-(window_width/2));
        var map_click_y=(e.clientY-(window_height/2));
        var mapPos=Map.mouseCenterPos2MapPos(map_click_x,map_click_y);


        clearTimeout(clickingTimeout);
        clickingTimeout = setTimeout(function () {


            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Building
            if(building!==false){

                $('#loading').hide();


                var tmp=deepCopyObject(building);

                tmp.x=mapPos.x;
                tmp.y=mapPos.y;


                tmp.design.data.compileRotationSize();



                /*if(tmp.subtype=='block'){
                 for(var i in tmp.design.data.particles){
                 tmp.design.data.particles[i].color=selected_color;
                 }
                 }*/


                create(tmp);


                Map.loadMap();
                buildingUpdate();

                //mapSpecialCursorStop();

                return;

            }
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++dismantling
            if(dismantling !== false){

                //todo sounds ion.sound.play("door_bump");

                $('#loading').hide();


                for(var i=map_object_changes.length-1;i>=0;i--){

                    if(map_object_changes[i].type=='building')
                    //r(Math.xy2dist(map_object_changes[i].x-mapPos.x,map_object_changes[i].y-mapPos.y),selecting_distance/map_field_size);
                        if(Math.xy2dist(map_object_changes[i].x-mapPos.x,map_object_changes[i].y-mapPos.y)<=selecting_distance_fields){

                            //r('splicing '+i);

                            //todo refactor use here action dismantle

                            //---------------------------------------Sending to TownsAPI

                            townsAPI.delete('objects/'+map_object_changes[i].id,function(response){

                                r('object '+map_object_changes[i].id+' was deleted in server');

                            });
                            //---------------------------------------

                            map_object_changes.splice(i,1);//todo existuje pouze funkce na zniceni prvku bez jeho vraceni?

                        }

                }

                saveMapObjectChangesToStorage();
                Map.loadMap();


                if(terrainChanging == false){
                    return;
                }


            }
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++terrainChanging
            if(terrainChanging !== false){

                //todo sounds ion.sound.play("door_bump");

                $('#loading').hide();


                mapPos.y=(mapPos.y)+2;/*todo Better solution ?*/

                for(var y=Math.round(mapPos.y-selecting_distance_fields);y<=Math.round(mapPos.y+selecting_distance_fields);y++){

                    for(var x=Math.round(mapPos.x-selecting_distance_fields);x<=Math.round(mapPos.x+selecting_distance_fields);x++) {

                        if (Math.xy2dist(x - mapPos.x, y - mapPos.y) <= selecting_distance_fields) {

                            terrainChanging.x=x;
                            terrainChanging.y=y;
                            create(terrainChanging);


                            //map_terrain_changes.push([x, y, terrainChanging]);
                        }
                    }
                }

                saveMapTerrainChangesToStorage();
                Map.loadMap();


                return;


            }
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++terrainNeutralizing
            if(terrainNeutralizing !== false){

                //todo sounds ion.sound.play("door_bump");

                $('#loading').hide();


                mapPos.y=(mapPos.y)+2;/*todo Better solution ?*/


                for(var i=map_terrain_changes.length-1;i>=0;i--){


                    if(Math.xy2dist(map_terrain_changes[i][0]-mapPos.x,map_terrain_changes[i][1]-mapPos.y)<=selecting_distance_fields){

                        //r('splicing '+i);

                        map_terrain_changes.splice(i,1);//todo existuje pouze funkce na zniceni prvku bez jeho vraceni?

                    }

                }

                saveMapTerrainChangesToStorage();
                Map.loadMap();


                return;


            }
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++storyWriting
            if(storyWriting !== false){


                $('#loading').hide();

                storyWriting.x=mapPos.x;
                storyWriting.y=mapPos.y;
                var id=create(storyWriting);

                map_selected_ids=[id];
                window_open('story_editor');

                mapSpecialCursorStop();
                hideLeftMenu();


                Map.loadMapAsync(1000);


                return;


            }
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Map selecting

            //-----------------------------------------Preparing values

            var selecting_distance_pow=Math.pow(1.4/*todo constant*/,2);
            var map_selected_ids_prev = map_selected_ids;

            var selected_object=false;

            //-----------------------------------------Searching for nearest object

            map_object_changes.forEach(function(object){

                var distance_pow = Math.pow(object.x - mapPos.x, 2) + Math.pow(object.y - mapPos.y, 2);


                if (distance_pow < selecting_distance_pow) {


                    selecting_distance_pow = distance_pow;



                    selected_object=object;



                }


            });



            //------------------------------------------Processing selection

            if(selected_object==false){
                //~~~~~~~~~~~~~~~~~~~~

                map_selected_ids=[];

                objectMenu();

                setTimeout(
                    function(){Map.drawMap();},IMMEDIATELY_MS
                );

                //~~~~~~~~~~~~~~~~~~~~

            }else{
                //~~~~~~~~~~~~~~~~~~~~

                //todo sounds ion.sound.play("door_bump");

                map_selected_ids=[selected_object.id];


                if (map_selected_ids == map_selected_ids_prev) {
                    map_selected_ids = [];
                }



                if (selected_object.type == 'story') {
                    //~~~~~~~~~

                    window_open('story');

                    //~~~~~~~~~
                }else{
                    //~~~~~~~~~
                    Map.drawMapAsync();
                    //~~~~~~~~~
                }



                objectMenu();



                //~~~~~~~~~~~~~~~~~~~~
            }





            //------------------------------------------



            $('#loading').hide();


            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++






        }, IMMEDIATELY_MS);
    };


    $('#map_drag').click(mouseClick);
    $('#selecting-distance').click(mouseClick);

});