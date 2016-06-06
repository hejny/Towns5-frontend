/**
 * @author Towns.cz
 * @fileOverview  Map controls
 */
//======================================================================================================================
document.addEventListener("DOMContentLoaded", function(event) {//todo maybe refactor use this


    $('#map-ctl-move').click(function(){

        T.UI.Map.scene.attachMapMoving();

    });


    $('#map-ctl-rotate').click(function(){

        T.UI.Map.scene.attachMapRotating();

    });


    $('#map-ctl-select').click(function(){

        T.UI.Map.scene.attachMapSelecting();

    });



});

