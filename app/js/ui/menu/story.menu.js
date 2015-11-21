




var storyPrototypes= {

    "story": {
        "type": 'story',
        "name": 'Jmeno',
        "content": {
            "type": 'markdown',
            "data": 'story'

        }
    }

};


//======================================================================================================================objectMenuTerrainChange
/*
  ██████╗██╗  ██╗ █████╗ ███╗   ██╗ ██████╗ ███████╗
 ██╔════╝██║  ██║██╔══██╗████╗  ██║██╔════╝ ██╔════╝
 ██║     ███████║███████║██╔██╗ ██║██║  ███╗█████╗
 ██║     ██╔══██║██╔══██║██║╚██╗██║██║   ██║██╔══╝
 ╚██████╗██║  ██║██║  ██║██║ ╚████║╚██████╔╝███████╗
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝

 */

function storyWriteStart(storyType){

    mapSpecialCursorStop();
    mapSpecialCursorStart();

    updateSelectingDistance();

    storyWriting=storyPrototypes[storyType];

    $('#map_drag').css('cursor','Crosshair');


    $('#selecting-distance-ctl').css('background','');

    $('#selecting-distance-ctl').show();
    $('#selecting-distance-left').hide();
    $('#selecting-distance-right').hide();
    $('#selecting-distance-plus').hide();
    $('#selecting-distance-minus').hide();


}

function storyWriteStop(){


    $('#selecting-distance-ctl').hide();

    $('#map_drag').css('cursor','Auto');
    storyWriting=false;

}



//======================================================================================================================
/*
 ███╗   ███╗███████╗███╗   ██╗██╗   ██╗
 ████╗ ████║██╔════╝████╗  ██║██║   ██║
 ██╔████╔██║█████╗  ██╔██╗ ██║██║   ██║
 ██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║
 ██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝
 ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝
 */


function objectMenuStory(){

    var objectmenu='';

    var storyTypes=['story','image'];

    for(var key in storyTypes){


        var icon='media/image/terrain/t'+(storyTypes[key])+'.png';

        /*content='<h2>'+l('terrain','t'+terrain)+'</h2>' +
         '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi et ex fuga mollitia nisi obcaecati possimus sint, tenetur vitae? A aspernatur officiis quas quis ratione. Atque fugit optio suscipit?</p> ' +
         '<button>Postaviť drist!</button>';*/
        var content='';
        var action='storyWriteStart(\''+(storyTypes[key])+'\');';


        objectmenu+=objectmenu_template
            .split('%icon').join(icon)
            .split('%content').join(htmlEncode(content))
            .split('%action').join(htmlEncode(action));


    }


    for(i=0;i<5;i++)
        objectmenu+='<br>';


    $('#objectmenu-inner').html(objectmenu);
    $('#objectmenu').animate({left:0}, 200);

    uiScript();



};