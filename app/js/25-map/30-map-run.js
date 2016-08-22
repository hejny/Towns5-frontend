/**
 * @author ©Towns.cz
 * @fileOverview Creates map refresh interval
 */
//======================================================================================================================
TOWNS.setNamespace('Map');





$(function(){




    var message = new TOWNS.UI.Message(
        TOWNS.Locale.get('ui warnings runmap'),'WARNING',
        `<button class="micro-button" >` + TOWNS.Locale.get('ui','buttons','runmap')+`</button>`
    );



    message.get$().find('.micro-button').click(function(){

        message.close(0);


        $('map-canvas-alt').remove();

        TOWNS.Map.loadMap.locked = false;
        TOWNS.Map.loadMap(true);


    });




});






/*
TOWNS.Map.map_refresh = setInterval(function(){


    //todo BETTER SYNC
    TOWNS.Map.loadMap(true);


},10000);*/