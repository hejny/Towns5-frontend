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


//======================================================================================================================Load
/*
 ██╗      ██████╗  █████╗ ██████╗
 ██║     ██╔═══██╗██╔══██╗██╔══██╗
 ██║     ██║   ██║███████║██║  ██║
 ██║     ██║   ██║██╔══██║██║  ██║
 ███████╗╚██████╔╝██║  ██║██████╔╝
 ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝
 */
//todo refactor move loading to init
/*
var objectPrototypes


if(/*Storage.is('objectPrototypes') false) {//todo cache object prototypes

    objectPrototypes=JSON.parse(Storage.load('objectPrototypes'));


}else{

    r('loading objectPrototypes from TownsAPI');
    townsApi(
        [
            'list',
            'id,x,y,type,res,_name,profile,func,permalink,func,group,own,superown,fp,fs',
            //'id,name,_name,type,permalink,origin,func,group,expand,block,attack,hold,res,profile,fp,fs,fc,fr,fx,own,superown,x,y,ww,traceid,starttime,readytime,stoptime',
            'unique',
            'id'
        ]
        ,function(json){

            objectPrototypes=json['objects'];
            //+++++++++++++++++++++++++++++++++++++++++++++++++

            objectPrototypes.push({
                'name': 'krychle',
                'type': 'building',
                'group': 'block',
                'res': '[50,50,50][20,20,0][80,20,0][20,80,0][80,80,0][20,20,60][80,20,60][20,80,60][80,80,60]:;2,3,5,4;4,8,9,5;5,9,7,3;3,7,6,2;4,8,6,2;8,9,7,6:,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc'
            });
            objectPrototypes.push({
                'name': 'jehlan',
                'type': 'building',
                'group': 'block',
                'res': '[90,10,0][10,10,0][10,90,0][90,90,0][50,50,50]:;3,5,4;4,5,1;5,1,2;3,5,2:CCCCCC,CCCCCC,CCCCCC,CCCCCC,CCCCCC'
            });

            //+++++++++++++++++++++++++++++++++++++++++++++++++Parse //todo nakonec presunout do API
            for(var i= 0,l=objectPrototypes.length;i<l;i++){


                //r(objectPrototypes[i]._name,i);

                if(typeof objectPrototypes[i].res!='undefined'){


                    if(objectPrototypes[i].res.substring(0,1)=='{'){

                        var ress=objectPrototypes[i].res.substring(1,objectPrototypes[i].res.length-2).split('}{');

                        //objectPrototypes[i].res=[];
                        objectPrototypes[i].res=objectPrototypes[11].res;
                        objectPrototypes[i].res_path=ress[3];
                        objectPrototypes[i].res_node=objectPrototypes[i].res

                        //r(objectPrototypes[i]._name,objectPrototypes[i].res);

                    }


                    objectPrototypes[i].icon=Model.createIcon(objectPrototypes[i].res,50);


                }

            }
            //+++++++++++++++++++++++++++++++++++++++++++++++++




            //objectPrototypes=[{res:'[50,50,NaN][17,15,15][89,6,36][11,89,0][75,98,0]:;2,3,5,4:00CCFF,00CCFF'}];

            setTimeout(function(){

                Storage.save('objectPrototypes',JSON.stringify(objectPrototypes));
                //objectMenuUnique('wall');


            },100);




        });

}*/





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


    Model.draw(selecting_distance_canvas_ctx,Model.addRotSize(building.res,(building.rot-map_rotation),building.size),map_zoom_m*map_model_size,selecting_offset['x'],selecting_offset['y'],0,map_slope,building.group=='block'?selected_color:false);


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

function objectMenuUnique(group){

    var objectmenu='';

    r(objectPrototypes);

    for(var i= 0,l=objectPrototypes.length;i<l;i++){


        if(objectPrototypes[i].group==group){

            var icon=objectPrototypes[i].icon;


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