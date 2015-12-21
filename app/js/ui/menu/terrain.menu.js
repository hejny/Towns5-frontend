/**

     ████████╗███████╗██████╗ ██████╗  █████╗ ██╗███╗   ██╗    ███╗   ███╗███████╗███╗   ██╗██╗   ██╗
     ╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔══██╗██║████╗  ██║    ████╗ ████║██╔════╝████╗  ██║██║   ██║
        ██║   █████╗  ██████╔╝██████╔╝███████║██║██╔██╗ ██║    ██╔████╔██║█████╗  ██╔██╗ ██║██║   ██║
        ██║   ██╔══╝  ██╔══██╗██╔══██╗██╔══██║██║██║╚██╗██║    ██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║
        ██║   ███████╗██║  ██║██║  ██║██║  ██║██║██║ ╚████║    ██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝
        ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝    ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝
     © Towns.cz

 * @fileOverview Left tool menu for terrain changing

 */

//======================================================================================================================objectMenuTerrainChange
/*
 ███╗   ██╗███████╗██╗   ██╗████████╗██████╗  █████╗ ██╗     ██╗███████╗███████╗
 ████╗  ██║██╔════╝██║   ██║╚══██╔══╝██╔══██╗██╔══██╗██║     ██║╚══███╔╝██╔════╝
 ██╔██╗ ██║█████╗  ██║   ██║   ██║   ██████╔╝███████║██║     ██║  ███╔╝ █████╗
 ██║╚██╗██║██╔══╝  ██║   ██║   ██║   ██╔══██╗██╔══██║██║     ██║ ███╔╝  ██╔══╝
 ██║ ╚████║███████╗╚██████╔╝   ██║   ██║  ██║██║  ██║███████╗██║███████╗███████╗
 ╚═╝  ╚═══╝╚══════╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝╚══════╝


 */

function terrainNeutralizeStart(){

    mapSpecialCursorStop();
    mapSpecialCursorStart();

    updateSelectingDistance();


    terrainNeutralizing=true;


    $('#selecting-distance-ctl').css('background','');


    $('#selecting-distance-ctl').show();//showing toolbar control
    $('#selecting-distance-ctl .mini-button').hide();//hiding all buttons
    //showing buttons used by actual tool
    $('#selecting-distance-plus').show();
    $('#selecting-distance-minus').show();
    $('#selecting-distance-close').show();



    $('#selecting-distance').show();
}

function terrainNeutralizeStop(){

    terrainNeutralizing=false;

}

//======================================================================================================================objectMenuTerrainChange
/*
  ██████╗██╗  ██╗ █████╗ ███╗   ██╗ ██████╗ ███████╗
 ██╔════╝██║  ██║██╔══██╗████╗  ██║██╔════╝ ██╔════╝
 ██║     ███████║███████║██╔██╗ ██║██║  ███╗█████╗
 ██║     ██╔══██║██╔══██║██║╚██╗██║██║   ██║██╔══╝
 ╚██████╗██║  ██║██║  ██║██║ ╚████║╚██████╔╝███████╗
  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝

 */

function terrainChangeStart(terrain){

    mapSpecialCursorStop();
    mapSpecialCursorStart();

    updateSelectingDistance();

    terrainChanging=terrain;

    //----------------------------Dismantling by terrain changing eg. when changing to water, all building are dismantled
    if(blockedTerrains.indexOf(terrainChanging)!=-1){
        dismantling=true;
    }
    //----------------------------

    //if(terrain_change){
    $('#selecting-distance-ctl').css('background','url(\'media/image/terrain/t'+(terrainChanging)+'.png\')');
    $('#selecting-distance-ctl').css('background-size','cover');
    //}


    $('#selecting-distance-ctl').show();//showing toolbar control
    $('#selecting-distance-ctl .mini-button').hide();//hiding all buttons
    //showing buttons used by actual tool
    $('#selecting-distance-plus').show();
    $('#selecting-distance-minus').show();
    $('#selecting-distance-close').show();




    $('#selecting-distance').show();
}

function terrainChangeStop(){

    terrainChanging=false;

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



function objectMenuTerrainChange(){

    var objectmenu='';

        for(var terrain=1;terrain<14;terrain++){


            var icon='media/image/terrain/t'+(terrain)+'.png';

            /*content='<h2>'+l('terrain','t'+terrain)+'</h2>' +
                '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi et ex fuga mollitia nisi obcaecati possimus sint, tenetur vitae? A aspernatur officiis quas quis ratione. Atque fugit optio suscipit?</p> ' +
                '<button>Postaviť drist!</button>';*/
            var content='';
            var action='terrainChangeStart('+(terrain)+',false);';


            objectmenu+=Templates.objectMenu({
                icon: icon,
                title: Locale.get('terrains.t'+terrain),
                content: content,
                action: action
            });



            //$(objectmenu[i]).children('div').attr('content',content);
            //$(objectmenu[i]).children('.js-popup-action-open').css('background','url(\''+icon+'\')');



        }


    showLeftMenu(objectmenu);


}

