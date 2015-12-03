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

    building=object;
    building.rot=0;
    building.size=1;
    selecting_offset={x: 150,y: 250};



    $('#selecting-distance').attr('height',300);//todo Jaká by měla být velikost - rozmyslet?
    $('#selecting-distance').attr('width',300);
    //$('#selecting-distance').css('border',2);

    buildingUpdate();
    //r(building.res);


    $('#selecting-distance-ctl').css('background','');//neutral background
    $('#selecting-distance-ctl').show();//showing toolbar control
    $('#selecting-distance-ctl .mini-button').hide();//hiding all buttons
    //showing buttons used by actual tool
    if(object.group!='wall')$('#selecting-distance-right').show();//todo refactor group to subtype
    if(object.group!='wall')$('#selecting-distance-left').show();
    $('#selecting-distance-plus').show();
    $('#selecting-distance-minus').show();
    if(object.group=='block')$('#selecting-distance-color').show();
    $('#selecting-distance-close').show();



    $('#selecting-distance').show();
}

//---------------------------------------------------------------


function buildingUpdate(object){

    selecting_distance_canvas_ctx.clearRect ( 0 , 0 ,300 , 300 );


    building.design.data.draw(selecting_distance_canvas_ctx,/*Model.addRotSize(building.res,(building.rot-map_rotation),building.size),*/map_zoom_m*map_model_size,selecting_offset['x'],selecting_offset['y'],0,map_slope,building.group=='block'?selected_color:false);


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

function objectMenuUnique(subtype){

    var objectmenu='';

    r(objectPrototypes);

    for(var i= 0,l=objectPrototypes.length;i<l;i++){


        if(objectPrototypes[i].subtype==subtype){

            var icon=objectPrototypes[i].design.data.createIcon(50);


            var title='ahoj';
            var content='rsgeths aetsyhj  res6tu yhj esyhu j sy rthu ae5y t ae5 y';
            var action='buildingStart(objectPrototypes['+(i)+']);';


            objectmenu+=objectmenu_template
                .split('%icon').join(icon)
                .split('%title').join(htmlEncode(title))
                .split('%content').join(htmlEncode(content))
                .split('%action').join(htmlEncode(action));

            //$(objectmenu[i]).children('div').attr('content',content);
            //$(objectmenu[i]).children('.js-popup-action-open').css('background','url(\''+icon+'\')');

        }



    }


    showLeftMenu(objectmenu);

}