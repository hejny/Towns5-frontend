

var unique_objects=localStorage.getItem('unique_objects');

if(unique_objects!==null) {

    unique_objects=JSON.parse(unique_objects);

    setTimeout(function(){
        objectMenuUnique();
    },1500);


}else{

    r('loading unique_objects from TownsAPI');
    townsApi(
        [
            'list',
            'id,x,y,type,res,_name,icon,func,permalink,func,group,own,superown,fp,fs',
            //'id,name,_name,type,permalink,origin,func,group,expand,block,attack,hold,res,profile,fp,fs,fc,fr,fx,own,superown,x,y,ww,traceid,starttime,readytime,stoptime',
            'unique',
            'id'
        ]
        ,function(json){

            unique_objects=json['objects'];
            //unique_objects=[{res:'[50,50,NaN][17,15,15][89,6,36][11,89,0][75,98,0]:;2,3,5,4:00CCFF,00CCFF'}];

            setTimeout(function(){

                localStorage.setItem('unique_objects',JSON.stringify(unique_objects));
                objectMenuUnique();

            },100)




        });

}





//======================================================================================================================objectMenuLevelChange

function buildingStart(object){

    mapSpecialCursorStop();

    building=object;
    selecting_offset={x: 150,y: 250};


    $('#selecting-distance').attr('height',300);
    $('#selecting-distance').attr('width',300);
    //$('#selecting-distance').css('border',2);

    drawModel(selecting_distance_canvas_ctx,building.res,map_zoom_m*map_model_size,selecting_offset['x'],selecting_offset['y'],0,map_slope);

    //r(building.res);

    $('#selecting-distance').show();
}



function buildingStop(){

    building=false;
    selecting_offset={x: 0,y: 0};


    $('#selecting-distance').hide();
    $(".active").removeClass("active");
}


//----------------------------------------------------

function objectMenuUnique(group){

    var objectmenu='';

    for(var i= 0,l=unique_objects.length;i<l;i++){


        var icon=unique_objects[0].icon;


        var content='ahoj ahoj';
        var action='buildingStart(unique_objects['+(i)+']);';


        objectmenu+=objectmenu_template.split('%icon').join(icon).split('%content').join(htmlEncode(content)).split('%action').join(htmlEncode(action));

        //$(objectmenu[i]).children('div').attr('content',content);
        //$(objectmenu[i]).children('.js-popup-action-open').css('background','url(\''+icon+'\')');



    }


    for(i=0;i<5;i++)
        objectmenu+='<br>';


    $('#objectmenu-inner').html(objectmenu);

    $('#objectmenu').animate({left:0}, 200);

    uiScript();


}