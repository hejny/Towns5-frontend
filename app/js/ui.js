/**
 * Created by matusko on 6/28/15.
 * Updated by ph
 *
 */

window.window_open = function(header,content){

    $(".popup-window .header").html(header);
    $(".popup-window .content").html(content);

    $(".overlay").show();
    $(".popup-window").show();

    window_opened=true;



};


window.window_close = function(){

    $(".overlay").hide();
    $(".popup-window").hide();

    window_opened=false;
};

//--------------------------------------------------------------------------------


window.uiScript = function(){

    $(document).on("contextmenu", function (event) { event.preventDefault(); });

    $('body').disableSelection();

/*    $('#selecting-distance').disableSelection();
    $('.menu').disableSelection();
    $('.menu-list-item').disableSelection();
    $('.menu-dlist-item').disableSelection();
    $('#objectmenu').disableSelection();
    $('.close').disableSelection();*/

    //==================================================================================================================popup action

    // [PH] Celé jsem to udělal pomocí jednoho popup-action , který js po kliknutí naplní umístí a zobrazí
    // kliknutie na .js-popup-action-open trigger...
    $(".js-popup-action-open").on("click", function(e){

        e.preventDefault();

        if($(this).hasClass('active')==false){
            //---------------------------------Označení nástroje
            r('Označení nástroje');
            mapSpecialCursorStop();
            $(".active").removeClass('active');
            $(this).addClass('active');

            eval($(this).attr('onclick'));

            //---------------------------------
        }else
        if($('#popup-action').css('display')=='none'){
            //---------------------------------Zobrazení nápovědy
            r('Zobrazení nápovědy');
            var content=$(this).attr('content');
            var title=$(this).attr('title');

            if(content!='') {

                content='<h2>'+title+'</h2><p>'+content+'</p>';

                var offset=$(this).offset();

                $('#popup-action').css('top',offset.top);
                $('#popup-action .content').html(content);
                $('#popup-action').show();


            }else{
                $('#popup-action').hide();
            }
            //---------------------------------
        }else{
            //---------------------------------Odznačení všeho
            r('Odznačení všeho');
            $(".active").removeClass("active");
            $('#popup-action').hide();
            mapSpecialCursorStop();

            //---------------------------------
        }

    });


    $(".js-popup-action-close").on("click", function(){

        $('#popup-action').hide();

    });

    //==================================================================================================================popup story



    // kliknutie na js-popup-window-open trigger zobrazí overlay a popup-window
    $(".js-popup-window-open").on("click", function(){

        window_open($(this).attr('header'),window[$(this).attr('content')]);

    });

    // kliknutie na overlay schová overlay a popup-window
    $(".overlay").on("click", function(){
        window_close()
    });

    // kliknutie na js-popup-window-close trigger schová overlay a popup-window
    $(".js-popup-window-close").on("click", function(){
        window_close()
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

    //==================================================================================================================selecting_distance Click

    //todo pri klikani na tyhle tlacitka vycentrovat selecting distance
    $('#selecting-distance-plus').click(function(){

        if(building){
            building.size+=0.1;
            if(building.size>2.5)building.size=2.5;//todo funkce pro bounds
            buildingUpdate();
        }else{
            selecting_distance+=100;
            updateSelectingDistance();
        }
    });

    $('#selecting-distance-minus').click(function(){
        if(building){
            building.size-=0.1;
            if(building.size<0.5)building.size=0.5;
            buildingUpdate();
        }else{
            selecting_distance-=100;
            updateSelectingDistance();
        }
    });

    $('#selecting-distance-left').click(function(){
        building.rot-=10;
        buildingUpdate();
    });

    $('#selecting-distance-right').click(function(){
        building.rot+=10;
        buildingUpdate();
    });

    $('#selecting-distance-close').click(function(){
        mapSpecialCursorStop();
        $('#popup-action').hide();
    });


    //==================================================================================================================ENV

    if($.inArray('debug',env)!=-1)$("#debuginfo").show();

    if($.inArray('onlymap',env)!=-1)$(".menu").hide();

    //==================================================================================================================




};


//======================================================================================================================

window.mapSpecialCursorStop = function(){
    buildingStop();
    terrainChangeStop();
};


window.objectmenu_template='';



$(function(){

    objectmenu_template = $('#objectmenu-inner').html();

    mapSpecialCursorStop();
    uiScript();


});
