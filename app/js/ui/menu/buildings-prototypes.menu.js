/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu creating and dismantling buildings
 */
//======================================================================================================================




//todo refactor all names unique to object_prototypes
//======================================================================================================================buildingStart

var forceJoining=false;


//BUILDING
function buildingStart(prototypeId){

    mapSpecialCursorStart();

    building=deepCopyObject(ArrayFunctions.id2item(object_prototypes,prototypeId,'Prototype with id '+prototypeId+' do not exist.'));

    building.prototypeId=prototypeId;//todo should it be here?
    //r('buildingStart',building);

    forceJoining=false;

    /*selecting_size={x: 300,y: 700};
    selecting_offset={x: 150,y: 650};*/


    buildingRedraw();
    //buildingUpdate();
    //r(building.res);


    $('#selecting-distance-ctl').css('background','');//neutral background
    $('#selecting-distance-ctl').show();//showing toolbar control
    $('#selecting-distance-ctl .button-icon').hide();//hiding all buttons
    //showing buttons used by actual tool
    if(building.subtype!='wall')$('#selecting-distance-right').show();
    if(building.subtype!='wall')$('#selecting-distance-left').show();
    $('#selecting-distance-plus').show();
    $('#selecting-distance-minus').show();
    $('#selecting-distance-close').show();



    $('#selecting-distance').show();
}

//---------------------------------------------------------------

function buildingRedraw() {


    selecting_size={x: 200,y: 200};
    selecting_offset={x: 100,y: 100};


    $('#selecting-distance').attr('width',selecting_size.x);//todo Jaká by měla být velikost - rozmyslet?
    $('#selecting-distance').attr('height',selecting_size.y);

    //$('#selecting-distance').scss('border',2);


    //selecting_distance_3D_webgl = /*building*/object_prototypes[0].design.data.create3D(selecting_distance_3D_gl, 1/*map_zoom_m/*map_model_size*/, 150, 150, /*map_rotation, map_slope*/0,30 , true, false);


    $(selecting_distance_2d_canvas).hide();
    $(selecting_distance_3d_canvas)
        .attr('width',selecting_size.x)
        .attr('height',selecting_size.y)
        .show();

    selecting_distance_3d_canvas_gl = selecting_distance_3d_canvas.getContext('webgl');

    selecting_distance_3d_canvas_webgl = building.design.data.create3D(selecting_distance_3d_canvas_gl, map_zoom_m*2, 150, 150, 0,30 , true, false);



}



//---------------------------------------------------------------


function buildingUpdate() {

    //r('buildingUpdate');



    var join=createNewOrJoin(building);



    if(join===false/* || true*/){
        //------------------------------------------------------------Normal building

            r(building.rotation);
            selecting_distance_3d_canvas_webgl.rotations[1].deg=building.design.data.rotation+45+map_rotation;//todo better solution than 45
            selecting_distance_3d_canvas_webgl.drawScene();


            $(selecting_distance_3d_canvas).css('border','none');


            //building.design.data.drawCashedAsync(selecting_distance_2d_canvas_ctx,map_zoom_m*map_model_size,selecting_offset['x'],selecting_offset['y'],map_rotation,map_slope,true,true,true);
            //,building.subtype=='block'?selected_color:false

        //------------------------------------------------------------
    }else{
        //------------------------------------------------------------Join buildings

            selecting_distance_3d_canvas_webgl.rotations[1].deg=building.design.data.rotation+45+map_rotation;//-building.design.data.rotation+90;//todo better solution than 45
            selecting_distance_3d_canvas_webgl.drawScene();

            $(selecting_distance_3d_canvas).css('border','2px solid #ff0000');

            /*r('buildingUpdate');


            var tmpModel=deepCopyModel(objects_external[join.i].design.data);

            //building.design.data.compileRotationSize();

            tmpModel.joinModel(
                building.design.data,
                join.xy.x,
                join.xy.y
            );

            var screen_position=Map.mapPos2MouseCenterPos(objects_external[join.i].x,objects_external[join.i].y);


            $('#selecting-distance').css('left', screen_position.x-selecting_offset['x']);
            $('#selecting-distance').css('top', screen_position.y-selecting_offset['y']);

            tmpModel.drawCashedAsync(selecting_distance_2d_canvas_ctx,map_zoom_m*map_model_size,selecting_offset['x'],selecting_offset['y'],map_rotation,map_slope,true);*/


        //------------------------------------------------------------
    }






}

//---------------------------------------------------------------


function buildingStop(){

    building=false;
    selecting_offset={x: 0,y: 0};

}

//======================================================================================================================dismantlingStart
//DISMANTLING

function dismantlingStart(){

    mapSpecialCursorStop();
    mapSpecialCursorStart();

    updateSelectingDistance();

    dismantling=true;

    $('#selecting-distance-ctl').css('background','');
    $('#selecting-distance-ctl').css('background-size','cover');


    $('#selecting-distance-ctl').show();
    $('#selecting-distance-left').hide();
    $('#selecting-distance-right').hide();



    $('#selecting-distance').show();

}


//---------------------------------------------------------------dismantlingStop


function dismantlingStop(){

    dismantling=false;


}

