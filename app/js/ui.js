/**
 * Created by matusko on 6/28/15.
 * Updated by ph
 *
 */


function uiScript(){

    //==================================================================================================================popup action

    // kliknutie na .js-popup-action-open trigger...
    $(".js-popup-action-open").on("click", function(){

        // ... pri kliknutí na práve otvorenú ponuku akcie odoberie .action-wrapper-u triedu .active
        if ($(this).parent(".action-wrapper").hasClass("active")){
            $(".action-wrapper").removeClass("active");

        // ... pri kliknutí na neotvorenú ponuku akcie odstráni všetkým .action-wrapper prípadnú triedu .active, a pridá ju len tomu, na ktorý sme klikli
        } else {
            $(".action-wrapper").removeClass("active");
            $(this).parent(".action-wrapper").addClass("active");
        }
    });

    // kliknutie na .js-popup-action-close trigger odoberie všetkým .action-wrapper triedu .active
    $(".js-popup-action-close").on("click", function(){
        $(".action-wrapper").removeClass("active");
    });

    //==================================================================================================================popup story



    // kliknutie na js-popup-window-open trigger zobrazí overlay a popup-window
    $(".js-popup-window-open").on("click", function(){
        $(".overlay").show();
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
