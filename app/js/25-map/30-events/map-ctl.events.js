/**
 * @author Towns.cz
 * @fileOverview  Map controls
 */
//======================================================================================================================
document.addEventListener("DOMContentLoaded", function(event) {//todo maybe refactor use this


    $('#map-ctl-moving').click(function(){

        T.UI.Map.scene.mode('MOVING');

    });


    $('#map-ctl-rotating').click(function(){

        T.UI.Map.scene.mode('ROTATING');

    });



});

