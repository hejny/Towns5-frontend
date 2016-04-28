/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu creating and dismantling buildings
 */
//======================================================================================================================
T.setNamespace('T.UI.Menu');


T.UI.Menu.Building = class {


    static forceJoining = false;


    static start(prototypeId) {

        mapSpecialCursorStart();

        building = T.User.object_prototypes.getById(prototypeId).clone();

        building.prototypeId = prototypeId;//todo should it be here?
        //r('T.UI.Menu.Building.start',building);

        T.UI.Menu.Building.forceJoining = false;

        /*selecting_size={x: 300,y: 700};
         selecting_offset={x: 150,y: 650};*/


        T.UI.Menu.Building.redraw();
        //T.UI.Menu.Building.update();
        //r(building.res);


        $('#selecting-distance-ctl').css('background', '');//neutral background
        $('#selecting-distance-ctl').show();//showing toolbar control
        $('#selecting-distance-ctl .button-icon').hide();//hiding all buttons
        //showing buttons used by actual tool
        if (dragging_subtypes.indexOf(building.subtype) == -1)$('#selecting-distance-right').show();
        if (dragging_subtypes.indexOf(building.subtype) == -1)$('#selecting-distance-left').show();
        $('#selecting-distance-plus').show();
        $('#selecting-distance-minus').show();
        $('#selecting-distance-close').show();


        $('#selecting-distance').show();
    }




    static redraw() {


        selecting_size = {x: 200, y: 200};
        selecting_offset = {x: 100, y: 100};


        $('#selecting-distance').attr('width', selecting_size.x);//todo Jaká by měla být velikost - rozmyslet?
        $('#selecting-distance').attr('height', selecting_size.y);

        //$('#selecting-distance').scss('border',2);


        //selecting_distance_3D_webgl = /*building*/T.User.object_prototypes[0].design.data.create3D(selecting_distance_3D_gl, 1/*map_zoom_m/*map_model_size*/, 150, 150, /*map_rotation, map_slope*/0,30 , true, false);


        $(selecting_distance_2d_canvas).hide();
        $(selecting_distance_3d_canvas)
            .attr('width', selecting_size.x)
            .attr('height', selecting_size.y)
            .show();

        selecting_distance_3d_canvas_gl = selecting_distance_3d_canvas.getContext('webgl');

        selecting_distance_3d_canvas_webgl = building.design.data.create3D(selecting_distance_3d_canvas_gl, map_zoom_m * 2, 150, 150, 0, 30, true, false);


    }




    static update() {

        //r('T.UI.Menu.Building.update');


        selecting_distance_3d_canvas_webgl.rotations[1].deg = -building.design.data.rotation + 45 + map_rotation;//todo better solution than 45
        selecting_distance_3d_canvas_webgl.drawScene();


        var join = createNewOrJoin(building);


        if (join === false/* || true*/) {
            //------------------------------------------------------------Normal building

            r(building.rotation);


            //$(selecting_distance_3d_canvas).css('filter','contrast(100%)');


            //------------------------------------------------------------
        } else {
            //------------------------------------------------------------Join buildings

            //$(selecting_distance_3d_canvas).css('filter','contrast(150%)');


            var model_z = building.design.data.joinModelZ(
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

    //======================================================================================================================T.UI.Menu.Building.dismantlingStart
    //DISMANTLING



    static dismantlingStart() {

        mapSpecialCursorStop();
        mapSpecialCursorStart();

        updateSelectingDistance();

        dismantling = true;

        $('#selecting-distance-ctl').css('background', '');
        $('#selecting-distance-ctl').css('background-size', 'cover');


        $('#selecting-distance-ctl').show();
        $('#selecting-distance-left').hide();
        $('#selecting-distance-right').hide();


        $('#selecting-distance').show();

    }




    static dismantlingStop() {

        dismantling = false;


    }


};