

var uniqueobjects;

townsApi(
    [
        'list',
        'id,x,y,type,res,_name,func,permalink,func,own,superown,fp,fs',
        //'id,name,_name,type,permalink,origin,func,group,expand,block,attack,hold,res,profile,fp,fs,fc,fr,fx,own,superown,x,y,ww,traceid,starttime,readytime,stoptime',
        'unique',
        'id'
    ]
    ,function(json){

            uniqueobjects=json['objects'];



        });




//======================================================================================================================objectMenuLevelChange


function objectMenuUnique(){

    var objectmenu='';

    for(var i= 0,l=uniqueobjects.length;i<l;i){


        var icon='media/image/terrain/f_create_terrain.png';


        var content='';
        var action='terrainChangeStart(false,'+(level)+');';


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


//======================================================================================================================objectMenuTerrainChange



$(function(){

    objectMenuUnique();

});
