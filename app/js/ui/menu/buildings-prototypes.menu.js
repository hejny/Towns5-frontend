/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu creating and dismantling buildings
 */
//======================================================================================================================




//todo refactor all names unique to object_prototypes
//======================================================================================================================buildingStart

var forceJoining=false;


//BUILDING
function buildingStart(object){//todo here should be prototype id

    mapSpecialCursorStart();

    building=deepCopyObject(object);
    forceJoining=false;

    selecting_size={x: 300,y: 700};
    selecting_offset={x: 150,y: 650};


    $('#selecting-distance').attr('width',selecting_size.x);//todo Jaká by měla být velikost - rozmyslet?
    $('#selecting-distance').attr('height',selecting_size.y);

    //$('#selecting-distance').scss('border',2);

    buildingUpdate();
    //r(building.res);


    $('#selecting-distance-ctl').css('background','');//neutral background
    $('#selecting-distance-ctl').show();//showing toolbar control
    $('#selecting-distance-ctl .mini-button').hide();//hiding all buttons
    //showing buttons used by actual tool
    if(object.subtype!='wall')$('#selecting-distance-right').show();
    if(object.subtype!='wall')$('#selecting-distance-left').show();
    $('#selecting-distance-plus').show();
    $('#selecting-distance-minus').show();
    if(object.subtype=='block')$('#selecting-distance-color').show();//todo refactor not same if conditions
    if(object.subtype=='block')$('#selecting-distance-blocks').show();
    $('#selecting-distance-close').show();



    $('#selecting-distance').show();
}

//---------------------------------------------------------------


function buildingUpdate(object) {

    //r('buildingUpdate');

    selecting_distance_canvas_ctx.clearRect(0, 0, selecting_size.x, selecting_size.y);



    var join=createNewOrJoin(building);



    if(join===false){
        //------------------------------------------------------------Normal building

            building.design.data.draw(selecting_distance_canvas_ctx,map_zoom_m*map_model_size,selecting_offset['x'],selecting_offset['y'],-map_rotation,map_slope,false,true);
            //,building.subtype=='block'?selected_color:false

        //------------------------------------------------------------
    }else{
        //------------------------------------------------------------Join buildings

            r('buildingUpdate');


            var tmpModel=deepCopyModel(map_object_changes[join.i].design.data);

            building.design.data.compileRotationSize();

            tmpModel.joinModel(
                building.design.data,
                join.xy.x,
                join.xy.y
            );

            var screen_position=Map.mapPos2MouseCenterPos(map_object_changes[join.i].x,map_object_changes[join.i].y);


            $('#selecting-distance').css('left', screen_position.x-selecting_offset['x']);
            $('#selecting-distance').css('top', screen_position.y-selecting_offset['y']);

            tmpModel.draw(selecting_distance_canvas_ctx,map_zoom_m*map_model_size,selecting_offset['x'],selecting_offset['y'],-map_rotation,map_slope,false,true);


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

//======================================================================================================================ObjectMenu
//MENU

function objectMenuBuildingsPrototypes(subtype){

    var objectmenu='';


    if(subtype=='block')
        objectmenu+=Templates.objectMenu({
            icon: 'media/image/icons/add.svg',
            icon_size: 0.55,
            title: title,
            content: content,
            action: `mapSpecialCursorStop();window_open('block_editor');`
        });



    //r(object_prototypes);
    for(var i= 0,l=object_prototypes.length;i<l;i++){


        if(object_prototypes[i].subtype==subtype){

            var icon=object_prototypes[i].design.data.createIcon(50);


            var title=object_prototypes[i].name;
            var content='popis budovy';
            var action='buildingStart(object_prototypes['+(i)+']);';//todo here should be id


            objectmenu+=Templates.objectMenu({
                icon: icon,
                selectable: true,
                title: title,
                content: content,
                action: action
            });


            //$(objectmenu[i]).children('div').attr('content',content);
            //$(objectmenu[i]).children('.js-popup-action-open').scss('background','url(\''+icon+'\')');

        }



    }



    showLeftMenu(objectmenu);

}