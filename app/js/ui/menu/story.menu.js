/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu shown to create story.
 */
//======================================================================================================================




//todo refactor move to init
var storyPrototypes= {

    "story": {
        "type": 'story',//todo create subtype
        "name": 'Jmeno',
        "content": {
            "type": 'markdown',
            "data": 'story'

        }
    }

};


//======================================================================================================================objectMenuTerrainChange
//CHANGE

function story_editorStart(storyType){

    mapSpecialCursorStop();
    mapSpecialCursorStart();


    storyWriting=storyPrototypes[storyType];

    $('#map_drag').css('cursor','Crosshair');


    $('#selecting-distance-ctl').css('background','');//neutral background
    $('#selecting-distance-ctl').show();//showing toolbar control
    $('#selecting-distance-ctl .mini-button').hide();//hiding all buttons
    //showing buttons used by actual tool
    $('#selecting-distance-close').show();


}

//todo in doc this funcs. dont use directly only via mapSpecialCursorStop();
function story_editorStop(){


    $('#selecting-distance-ctl').hide();

    $('#map_drag').css('cursor','Auto');
    storyWriting=false;

}



//======================================================================================================================
//MENU


function objectMenuStory(){

    var objectmenu='';

    var storyTypes=['story'/*,'image'*/];

    for(var key in storyTypes){


        var icon='media/image/terrain/t'+(storyTypes[key])+'.png';

        /*content='<h2>'+l('terrain','t'+terrain)+'</h2>' +
         '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi et ex fuga mollitia nisi obcaecati possimus sint, tenetur vitae? A aspernatur officiis quas quis ratione. Atque fugit optio suscipit?</p> ' +
         '<button>Postaviť drist!</button>';*/
        var content='';
        var action='story_editorStart(\''+(storyTypes[key])+'\');';


        objectmenu+=Templates.objectMenu({
            icon: icon,
            selectable: true,
            title: '',
            content: content,
            action: action
        });



    }


    showLeftMenu(objectmenu);



}