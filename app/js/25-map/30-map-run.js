/**
 * @author ©Towns.cz
 * @fileOverview Creates map refresh interval
 */
//======================================================================================================================
T.setNamespace('Map');





$(function(){




    var message = new T.UI.Message(
        T.Locale.get('ui warnings runmap'),'WARNING',
        `<button class="micro-button" >` + T.Locale.get('ui','buttons','runmap')+`</button>`
    );



    message.get$().find('.micro-button').click(function(){

        message.close(0);


        $('map-canvas-alt').remove();

        T.Map.loadMap.locked = false;
        T.Map.loadMap(true);


    });




});






/*
T.Map.map_refresh = setInterval(function(){


    //todo BETTER SYNC
    T.Map.loadMap(true);


},10000);*/