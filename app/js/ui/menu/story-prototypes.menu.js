/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu shown to create story.
 */
//======================================================================================================================


function storyWritingStart(prototypeId){

    mapSpecialCursorStop();
    mapSpecialCursorStart();


    storyWriting=deepCopyObject(ArrayFunctions.id2item(object_prototypes,prototypeId));

    $('#map_drag').css('cursor','Crosshair');


    $('#selecting-distance-ctl').css('background','');//neutral background
    $('#selecting-distance-ctl').show();//showing toolbar control
    $('#selecting-distance-ctl .mini-button').hide();//hiding all buttons
    //showing buttons used by actual tool
    $('#selecting-distance-close').show();


}


//todo in doc this funcs. dont use directly only via mapSpecialCursorStop();
function storyWritingStop(){


    $('#selecting-distance-ctl').hide();

    $('#map_drag').css('cursor','Auto');
    storyWriting=false;

}



