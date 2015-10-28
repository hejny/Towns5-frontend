



//======================================================================================================================Load Unique



var unique_objects=localStorage.getItem('unique_objects');

if(unique_objects!==null) {

    unique_objects=JSON.parse(unique_objects);


}else{

    r('loading unique_objects from TownsAPI');
    townsApi(
        [
            'list',
            'id,x,y,type,res,_name,profile,func,permalink,func,group,own,superown,fp,fs',
            //'id,name,_name,type,permalink,origin,func,group,expand,block,attack,hold,res,profile,fp,fs,fc,fr,fx,own,superown,x,y,ww,traceid,starttime,readytime,stoptime',
            'unique',
            'id'
        ]
        ,function(json){

            unique_objects=json['objects'];


            //+++++++++++++++++++++++++++++++++++++++++++++++++Parse //todo nakonec presunout do API
            for(var i= 0,l=unique_objects.length;i<l;i++){


                //r(unique_objects[i]._name,i);

                if(typeof unique_objects[i].res!='undefined'){


                    if(unique_objects[i].res.substring(0,1)=='{'){

                        var ress=unique_objects[i].res.substring(1,unique_objects[i].res.length-2).split('}{');

                        //unique_objects[i].res=[];
                        unique_objects[i].res=unique_objects[11].res;
                        unique_objects[i].res_path=ress[3];
                        unique_objects[i].res_node=unique_objects[i].res

                        //r(unique_objects[i]._name,unique_objects[i].res);

                    }


                    unique_objects[i].icon=createIcon(unique_objects[i].res,50);


                }

            }
            //+++++++++++++++++++++++++++++++++++++++++++++++++




            //unique_objects=[{res:'[50,50,NaN][17,15,15][89,6,36][11,89,0][75,98,0]:;2,3,5,4:00CCFF,00CCFF'}];

            setTimeout(function(){

                localStorage.setItem('unique_objects',JSON.stringify(unique_objects));
                //objectMenuUnique('wall');

            },100);




        });

}





//======================================================================================================================buildingStart

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



    $('#selecting-distance-ctl').css('background','');
    //$('#selecting-distance-ctl').css('background-size','cover');


    $('#selecting-distance-ctl').show();
    $('#selecting-distance-left').show();
    $('#selecting-distance-right').show();


    $('#selecting-distance').show();
}

//---------------------------------------------------------------


function buildingUpdate(object){

    selecting_distance_canvas_ctx.clearRect ( 0 , 0 ,300 , 300 );


    drawModel(selecting_distance_canvas_ctx,modelRotSize(building.res,(building.rot-map_rotation),building.size),map_zoom_m*map_model_size,selecting_offset['x'],selecting_offset['y'],0,map_slope);


}

//---------------------------------------------------------------


function buildingStop(){

    building=false;
    selecting_offset={x: 0,y: 0};

}

//======================================================================================================================dismantlingStart

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

function objectMenuUnique(group){

    var objectmenu='';

    r(unique_objects);

    for(var i= 0,l=unique_objects.length;i<l;i++){


        if(unique_objects[i].group==group){

            var icon=unique_objects[i].icon;


            var title='ahoj';
            var content='rsgeths aetsyhj  res6tu yhj esyhu j sy rthu ae5y t ae5 y';
            var action='buildingStart(unique_objects['+(i)+']);';


            objectmenu+=objectmenu_template
                .split('%icon').join(icon)
                .split('%title').join(htmlEncode(title))
                .split('%content').join(htmlEncode(content))
                .split('%action').join(htmlEncode(action));

            //$(objectmenu[i]).children('div').attr('content',content);
            //$(objectmenu[i]).children('.js-popup-action-open').css('background','url(\''+icon+'\')');

        }



    }


    for(i=0;i<5;i++)
        objectmenu+='<br>';

    $('#objectmenu-inner').html(objectmenu);

    $('#objectmenu').animate({left:0}, 200);

    uiScript();


}