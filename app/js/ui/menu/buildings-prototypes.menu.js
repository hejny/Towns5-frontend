/**

     ██╗   ██╗███╗   ██╗██╗ ██████╗ ██╗   ██╗███████╗    ███╗   ███╗███████╗███╗   ██╗██╗   ██╗
     ██║   ██║████╗  ██║██║██╔═══██╗██║   ██║██╔════╝    ████╗ ████║██╔════╝████╗  ██║██║   ██║
     ██║   ██║██╔██╗ ██║██║██║   ██║██║   ██║█████╗      ██╔████╔██║█████╗  ██╔██╗ ██║██║   ██║
     ██║   ██║██║╚██╗██║██║██║▄▄ ██║██║   ██║██╔══╝      ██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║
     ╚██████╔╝██║ ╚████║██║╚██████╔╝╚██████╔╝███████╗    ██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝
      ╚═════╝ ╚═╝  ╚═══╝╚═╝ ╚══▀▀═╝  ╚═════╝ ╚══════╝    ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝
     © Towns.cz

 * @fileOverview Left tool menu creating and dismantling buildings

 */



//todo refactor all names unique to objectPrototypes
//======================================================================================================================buildingStart
/*
 ██████╗ ██╗   ██╗██╗██╗     ██████╗ ██╗███╗   ██╗ ██████╗
 ██╔══██╗██║   ██║██║██║     ██╔══██╗██║████╗  ██║██╔════╝
 ██████╔╝██║   ██║██║██║     ██║  ██║██║██╔██╗ ██║██║  ███╗
 ██╔══██╗██║   ██║██║██║     ██║  ██║██║██║╚██╗██║██║   ██║
 ██████╔╝╚██████╔╝██║███████╗██████╔╝██║██║ ╚████║╚██████╔╝
 ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝

 */

function buildingStart(object){

    mapSpecialCursorStart();

    building=deepCopyObject(object);

    selecting_size={x: 300,y: 700};
    selecting_offset={x: 150,y: 650};


    $('#selecting-distance').attr('width',selecting_size.x);//todo Jaká by měla být velikost - rozmyslet?
    $('#selecting-distance').attr('height',selecting_size.y);

    //$('#selecting-distance').css('border',2);

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


function buildingUpdate(object){

    //r('buildingUpdate');

    selecting_distance_canvas_ctx.clearRect ( 0 , 0 ,selecting_size.x , selecting_size.y );


    var join=createNewOrJoin(building);
    if(join===false){
        //------------------------------------------------------------Normal building

            building.design.data.draw(selecting_distance_canvas_ctx,map_zoom_m*map_model_size,selecting_offset['x'],selecting_offset['y'],-map_rotation,map_slope);
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
            /*$('#selecting-distance').css('left', screen_position.x+(canvas_width / 3/2));
            $('#selecting-distance').css('top', screen_position.y+(canvas_height / 3/2));*/



            tmpModel.draw(selecting_distance_canvas_ctx,map_zoom_m*map_model_size,selecting_offset['x'],selecting_offset['y'],-map_rotation,map_slope);


        //------------------------------------------------------------
    }















}

//---------------------------------------------------------------


function buildingStop(){

    building=false;
    selecting_offset={x: 0,y: 0};

}

//======================================================================================================================dismantlingStart
/*
 ██████╗ ██╗███████╗███╗   ███╗ █████╗ ███╗   ██╗████████╗██╗     ██╗███╗   ██╗ ██████╗
 ██╔══██╗██║██╔════╝████╗ ████║██╔══██╗████╗  ██║╚══██╔══╝██║     ██║████╗  ██║██╔════╝
 ██║  ██║██║███████╗██╔████╔██║███████║██╔██╗ ██║   ██║   ██║     ██║██╔██╗ ██║██║  ███╗
 ██║  ██║██║╚════██║██║╚██╔╝██║██╔══██║██║╚██╗██║   ██║   ██║     ██║██║╚██╗██║██║   ██║
 ██████╔╝██║███████║██║ ╚═╝ ██║██║  ██║██║ ╚████║   ██║   ███████╗██║██║ ╚████║╚██████╔╝
 ╚═════╝ ╚═╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝

 */

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
/*
 ███╗   ███╗███████╗███╗   ██╗██╗   ██╗
 ████╗ ████║██╔════╝████╗  ██║██║   ██║
 ██╔████╔██║█████╗  ██╔██╗ ██║██║   ██║
 ██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║
 ██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝
 ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝
 */

function objectMenuBuildingsPrototypes(subtype){

    var objectmenu='';

    r(objectPrototypes);

    for(var i= 0,l=objectPrototypes.length;i<l;i++){


        if(objectPrototypes[i].subtype==subtype){

            var icon=objectPrototypes[i].design.data.createIcon(50);


            var title='ahoj';
            var content='rsgeths aetsyhj  res6tu yhj esyhu j sy rthu ae5y t ae5 y';
            var action='buildingStart(objectPrototypes['+(i)+']);';


            objectmenu+=Template.get('objectmenu',{
                icon: icon,
                title: title,
                content: content,
                action: action
            });


            //$(objectmenu[i]).children('div').attr('content',content);
            //$(objectmenu[i]).children('.js-popup-action-open').css('background','url(\''+icon+'\')');

        }



    }


    showLeftMenu(objectmenu);

}