/**
 * @author Towns.cz
 * @fileOverview  Map controls
 */
//======================================================================================================================
document.addEventListener("DOMContentLoaded", function(event) {//todo maybe refactor use this


    $('#map-ctl-move').click(function(){

        T.UI.Map.scene.mode('MOVING');

    });


    $('#map-ctl-rotate').click(function(){

        T.UI.Map.scene.mode('ROTATING');

    });



});

