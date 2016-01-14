/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu for terrain changing
 */
//======================================================================================================================
//NEUTRALIZE



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
//CHANGE

function terrainChangeStart(terrain){//todo here should be prototype id

    mapSpecialCursorStart();

    updateSelectingDistance();

    terrainChanging={
        "type": "terrain",
        "design": {
            "type": "terrain",
            "data": {
                "image": terrain,
                "size": 1//todo maybe this (terrains and buildings) should be radius
            }
        }
    };

    //----------------------------Dismantling by terrain changing eg. when changing to water, all building are dismantled
    if(blockedTerrains.indexOf(terrainChanging)!=-1){
        dismantling=true;
    }
    //----------------------------

    //if(terrain_change){
    $('#selecting-distance-ctl').css('background','url(\''+appDir+'/php/terrain.php?raw&size=200&terrain=t'+(terrain)+'\')');
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
//MENU



function objectMenuTerrainChange(){//todo refactor this should be under objectMenu

    var objectmenu='';

        for(var terrain=1;terrain<14;terrain++){


            var icon=appDir+'/php/terrain.php?raw&size=60&terrain=t'+(terrain);

            /*content='<h2>'+l('terrain','t'+terrain)+'</h2>' +
                '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi et ex fuga mollitia nisi obcaecati possimus sint, tenetur vitae? A aspernatur officiis quas quis ratione. Atque fugit optio suscipit?</p> ' +
                '<button>Postaviť drist!</button>';*/
            var content='';
            var action='terrainChangeStart('+(terrain)+',false);';


            objectmenu+=Templates.objectMenu({
                icon: icon,
                icon_size: 1.2,
                selectable: true,
                title: Locale.get('terrain '+terrain),
                content: Locale.get('terrain '+terrain+' description'),
                action: action
            });



            //$(objectmenu[i]).children('div').attr('content',content);
            //$(objectmenu[i]).children('.js-popup-action-open').scss('background','url(\''+icon+'\')');



        }


    showLeftMenu(objectmenu);


}

