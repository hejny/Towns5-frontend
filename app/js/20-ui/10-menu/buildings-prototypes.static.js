/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu creating and T.UI.Menu.dismantling buildings
 */
//======================================================================================================================
T.setNamespace('UI.Menu');


T.UI.Menu.Building = class {



    static start(prototypeId) {


        var building = T.User.object_prototypes.getById(prototypeId).clone();


        if(dragging_subtypes.indexOf(building.subtype)===-1){

            T.UI.Map.scene.attachObjectCreatingPoint(building,function(position,rotation,size){

                building.x=position.x;
                building.y=position.y;

                building.getModel().rotation=rotation;
                building.getModel().size=size;

                create(building,function(){


                    r('Building created on server!!!');

                });



            });

        }else{

            T.UI.Map.scene.attachObjectCreatingLine(building,function(positions,rotation,size){

                r('!!!!!!!!!!!!!!!!!!!!!!todo!!!!!!!!!!!!!!!!!!!!!!!!');

            });

        }






        /*
        mapSpecialCursorStart();

        building = T.User.object_prototypes.getById(prototypeId).clone();

        building.prototypeId = prototypeId;

        T.UI.Menu.Building.forceJoining = false;



        T.UI.Menu.Building.redraw();


        $('#selecting-distance-ctl').css('background', '');//neutral background
        $('#selecting-distance-ctl').show();//showing toolbar control
        $('#selecting-distance-ctl .button-icon').hide();//hiding all buttons
        if (dragging_subtypes.indexOf(building.subtype) == -1)$('#selecting-distance-right').show();
        if (dragging_subtypes.indexOf(building.subtype) == -1)$('#selecting-distance-left').show();
        $('#selecting-distance-plus').show();
        $('#selecting-distance-minus').show();
        $('#selecting-distance-close').show();


        $('#selecting-distance').show();

        */


    }



    /*
    static redraw() {


        window.selecting_size = {x: 200, y: 200};
        window.selecting_offset = {x: 100, y: 100};


        $('#selecting-distance').attr('width', selecting_size.x);//todo Jaká by měla být velikost - rozmyslet?
        $('#selecting-distance').attr('height', selecting_size.y);


        $(selecting_distance_2d_canvas).hide();
        $(selecting_distance_3d_canvas)
            .attr('width', selecting_size.x)
            .attr('height', selecting_size.y)
            .show();

        selecting_distance_3d_canvas_gl = selecting_distance_3d_canvas.getContext('webgl');

        selecting_distance_3d_canvas_webgl = building.getModel().create3D(selecting_distance_3d_canvas_gl, map_zoom_m * 2, 150, 150, 0, 30, true, false);


    }




    static update() {


        selecting_distance_3d_canvas_webgl.rotations[1].deg = -building.getModel().rotation + 45 + map_rotation;//todo better solution than 45
        selecting_distance_3d_canvas_webgl.drawScene();


        var join = createNewOrJoin(building);


        if (join === false) {
            //------------------------------------------------------------Normal building

            r(building.rotation);



            //------------------------------------------------------------
        } else {
            //------------------------------------------------------------Join buildings


            var model_z = building.getModel().joinModelZ(
                building.design.data,
                join.xy.x,
                join.xy.y
            );

            if ($('#selecting-distance').attr('joinmoved') != '0') {//todo refactor better solution
                $('#selecting-distance').css('top', '+=-' + model_z);
                $('#selecting-distance').attr('joinmoved', '0');
            }


            //------------------------------------------------------------
        }


    }




    static stop() {

        building = false;
        selecting_offset = {x: 0, y: 0};

    }

    //======================================================================================================================T.UI.Menu.Building.T.UI.Menu.dismantlingStart



    static dismantlingStart() {

        mapSpecialCursorStop();
        mapSpecialCursorStart();

        updateSelectingDistance();

        T.UI.Menu.dismantling = true;

        $('#selecting-distance-ctl').css('background', '');
        $('#selecting-distance-ctl').css('background-size', 'cover');


        $('#selecting-distance-ctl').show();
        $('#selecting-distance-left').hide();
        $('#selecting-distance-right').hide();


        $('#selecting-distance').show();

    }




    static dismantlingStop() {

        T.UI.Menu.dismantling = false;


    }
    /**/


};


//T.UI.Menu.Building.forceJoining = false;//todo better

