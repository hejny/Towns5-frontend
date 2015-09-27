

//======================================================================================================================objectMenuLevelChange


function objectMenuUnique(){

    var objectmenu='';

    for(var level=-1;level<=1;level+=0.5){


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
