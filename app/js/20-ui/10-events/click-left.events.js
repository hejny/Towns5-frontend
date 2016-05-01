/**
 * @author Towns.cz
 * @fileOverview  Click on map - call the action eg. selecting, building, T.UI.Menu.dismantling,...
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

        r('T.UI Event: click');


        $('#loading').css('top', e.clientY-15);
        $('#loading').css('left', e.clientX-10);
        $('#loading').show();


        canvas_mouse_x = e.clientX + window_width;//-pos.left;
        canvas_mouse_y = e.clientY + window_height;//-pos.top;


        var map_click_x=(e.clientX-(window_width/2));
        var map_click_y=(e.clientY-(window_height/2));
        var mapPos=T.UI.Map.Coords.mouseCenterPos2MapPos(map_click_x,map_click_y);


        clearTimeout(clickingTimeout);
        clickingTimeout = setTimeout(function () {

            r('mouseDown: clickingTimeout');

            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Building
            if(building!== false){

                $('#loading').hide();


                var tmp=building.clone();

                tmp.x=mapPos.x;
                tmp.y=mapPos.y;


                //tmp.design.data.compileRotationSize();

                /*if(tmp.subtype=='block'){
                 for(var i in tmp.design.data.particles){
                 tmp.design.data.particles[i].color=selected_color;
                 }
                 }*/


                create(tmp,function(){
                    T.UI.Map.loadMap();
                });


                T.UI.Menu.Building.update();

                //mapSpecialCursorStop();

                return;

            }
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++T.UI.Menu.dismantling
            if(T.UI.Menu.dismantling !== false){

                //todo sounds ion.sound.play("door_bump");

                $('#loading').hide();


                for(var i=objects_external.length-1;i>=0;i--){

                    if(objects_external[i].type=='building'){
                        if(T.Math.xy2dist(objects_external[i].x-mapPos.x,objects_external[i].y-mapPos.y)<=selecting_distance_fields){

                            dismantle(objects_external[i].id);

                        }
                    }

                }


                T.UI.Map.loadMap();


                if(T.UI.Menu.terrainChanging === false){
                    return;
                }


            }
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++T.UI.Menu.terrainChanging
            if(T.UI.Menu.terrainChanging !== false){

                //todo sounds ion.sound.play("door_bump");

                $('#loading').hide();


                /*mapPos.y=(mapPos.y)+2;/*todo Better solution ?*/


                T.UI.Menu.terrainChanging.design.data.size=selecting_distance_fields;
                T.UI.Menu.terrainChanging.x=mapPos.x;
                T.UI.Menu.terrainChanging.y=mapPos.y;
                create(T.UI.Menu.terrainChanging);

                //saveObjectsInternal();
                T.UI.Map.loadMap();


                return;


            }
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++T.UI.Menu.storyWriting
            if(T.UI.Menu.storyWriting !== false){


                $('#loading').hide();

                T.UI.Menu.storyWriting.x=mapPos.x;
                T.UI.Menu.storyWriting.y=mapPos.y;
                var id=create(T.UI.Menu.storyWriting);

                map_selected_ids=[id];
                T.Plugins.open('story-editor',1,id);

                mapSpecialCursorStop();
                hideLeftMenu();


                T.UI.Map.loadMapAsync(1000);


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

            if(selected_object=== false){
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

            //------------------------------------------Redrawing Map and T.UI if map_selected_ids changed

            //r(map_selected_ids.join(',') +'!='+ map_selected_ids_prev);
            if (map_selected_ids.join(',') != map_selected_ids_prev) {

                T.UI.Menu.Object.menu();
                T.UI.Map.drawMapAsync();


            }


            //------------------------------------------Hide loading icon



            $('#loading').hide();


            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++






        }, IMMEDIATELY_MS);
    };


    $('#map_drag').click(mouseClick);
    $('#selecting-distance').click(mouseClick);

});