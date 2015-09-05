/**
 * Created by matusko on 6/28/15.
 * Updated by ph
 *
 */


function uiScript(){

    //==================================================================================================================popup action

    // [PH] Celé jsem to udělal pomocí jednoho popup-action , který js po kliknutí naplní umístí a zobrazí
    // kliknutie na .js-popup-action-open trigger...
    $(".js-popup-action-open").on("click", function(){

        var content=$(this).offset();
        $('#popup-action').css('top',content.top);
        $('#popup-action .content').html($(this).attr('content'));
        $('#popup-action').show();

    });


    $(".js-popup-action-close").on("click", function(){

        $('#popup-action').hide();

    });

    //==================================================================================================================popup story



    // kliknutie na js-popup-window-open trigger zobrazí overlay a popup-window
    $(".js-popup-window-open").on("click", function(){
        $(".overlay").show();

        //r($(this).attr('content'));
        //r(window[$(this).attr('content')]);

        $(".popup-window .header").html($(this).attr('header'));
        $(".popup-window .content").html(window[$(this).attr('content')]);


        $(".popup-window").show();
    });

    // kliknutie na overlay schová overlay a popup-window
    $(".overlay").on("click", function(){
        $(this).hide();
        $(".popup-window").hide();
    });

    // kliknutie na js-popup-window-close trigger schová overlay a popup-window
    $(".js-popup-window-close").on("click", function(){
        $(".overlay").hide();
        $(".popup-window").hide();
    });


    //==================================================================================================================popup notification



    // kliknutie na js-popup-notification-open trigger zobrazí popup-notification
    $(".js-popup-notification-open").on("click", function(event){
        event.stopPropagation();
        $(".popup-notification").toggle();
    });

    // kliknutie na otvorený popup-notification neurobí nič
    $(".popup-notification").on("click", function(event){
        event.stopPropagation();
    });

    // kliknutie na document schová popup-notification
    $(document).on("click", function(){
        $(".popup-notification").hide();
    });



    //==================================================================================================================esc keyup




    // ak sa klikne tlačítkom esc ...
    $(document).keyup(function(e) {

        // ... a ak to tlačítko je esc (27)...
        if (e.keyCode == 27) {
            // ... schovaj action-popup
            $(".action-wrapper").removeClass("active");

            // ... schovaj overlay
            $(".overlay").hide();

            // schovaj popup-window
            $(".popup-window").hide();

            // schovaj popup-notification
            $(".popup-notification").hide();
        }
    });



    //==================================================================================================================ENV

    if($.inArray('debug',env)!=-1)$("#debuginfo").show();

    if($.inArray('onlymap',env)!=-1)$(".menu").hide();

    //==================================================================================================================


}



$(function(){uiScript();});
