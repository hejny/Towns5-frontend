/**
 * @author Towns.cz
 * @fileOverview  Map controls
 */
//======================================================================================================================
$(function(){


    $('#map-plus').click(function(){

        map_zoom_delta=0.5;
        Map.updateMap();

    });


    $('#map-minus').click(function(){

        map_zoom_delta=-0.5;
        Map.updateMap();

    });


    $('#map-left').click(function(){

        map_rotation_delta=15;
        Map.updateMap();

    });

    $('#map-right').click(function(){

        map_rotation_delta=-15;
        Map.updateMap();

    });


});

