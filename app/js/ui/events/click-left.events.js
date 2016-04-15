/**
 * @author Towns.cz
 * @fileOverview  Click on map - call the action eg. selecting, building, dismantling,...
 */
//======================================================================================================================

var clickingTimeout;

$(function(){


    var mouseClick=function (e) {

        /*if (building !== false)
            if (typeof building.res_path!=='undefined')return;*/

        if ($(this).hasClass('js-label-noclick')) {

            $(this).removeClass('js-label-noclick');
            return;

        }

        r('UI Event: click');


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

            r('mouseDown: clickingTimeout');

            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Building
            if(building!==false){

                $('#loading').hide();


                var tmp=deepCopyObject(building);

                tmp.x=mapPos.x;
                tmp.y=mapPos.y;


                //tmp.design.data.compileRotationSize();

                /*if(tmp.subtype=='block'){
                 for(var i in tmp.design.data.particles){
                 tmp.design.data.particles[i].color=selected_color;
                 }
                 }*/


                create(tmp,function(){
                    Map.loadMap()
                });


                buildingUpdate();

                //mapSpecialCursorStop();

                return;

            }
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++dismantling
            if(dismantling !== false){

                //todo sounds ion.sound.play("door_bump");

                $('#loading').hide();


                for(var i=objects_external.length-1;i>=0;i--){

                    if(objects_external[i].type=='building'){
                        if(T.Math.xy2dist(objects_external[i].x-mapPos.x,objects_external[i].y-mapPos.y)<=selecting_distance_fields){

                            dismantle(objects_external[i].id);

                        }
                    }

                }


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


                /*mapPos.y=(mapPos.y)+2;/*todo Better solution ?*/


                terrainChanging.design.data.size=selecting_distance_fields;
                terrainChanging.x=mapPos.x;
                terrainChanging.y=mapPos.y;
                create(terrainChanging);

                //saveObjectsInternal();
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
                Towns.Plugins.open('story-editor',1,id);

                mapSpecialCursorStop();
                hideLeftMenu();


                Map.loadMapAsync(1000);


                return;


            }
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Map selecting

            //-----------------------------------------Preparing values

            var selecting_distance_pow=Math.pow(1.4/*todo constant*/,2);
            var map_selected_ids_prev = map_selected_ids.join(',');

            var selected_object=false;

            //-----------------------------------------Searching for nearest object

            objects_external.forEach(function(object){

                if(object.type!='building')return;//you can select only buildings

                var distance_pow = Math.pow(object.x - mapPos.x, 2) + Math.pow(object.y - mapPos.y, 2);


                if (distance_pow < selecting_distance_pow) {


                    selecting_distance_pow = distance_pow;



                    selected_object=object;



                }


            });


            //------------------------------------------Processing selection

            if(selected_object==false){
                //~~~~~~~~~~~~~~~~~~~~
                //todo sounds ion.sound.play("door_bump");

                map_selected_ids=[];


                //~~~~~~~~~~~~~~~~~~~~

            }else{
                //~~~~~~~~~~~~~~~~~~~~
                //todo sounds ion.sound.play("door_bump");

                map_selected_ids=[selected_object.id];


                //~~~~~~~~~~~~~~~~~~~~
            }

            //------------------------------------------Redrawing Map and UI if map_selected_ids changed

            //r(map_selected_ids.join(',') +'!='+ map_selected_ids_prev);
            if (map_selected_ids.join(',') != map_selected_ids_prev) {

                objectMenu();
                Map.drawMapAsync();


            }


            //------------------------------------------Hide loading icon



            $('#loading').hide();


            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++






        }, IMMEDIATELY_MS);
    };


    $('#map_drag').click(mouseClick);
    $('#selecting-distance').click(mouseClick);

});