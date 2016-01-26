/**
 * @author ©Towns.cz
 * @fileOverview User interface initialization
 */
//======================================================================================================================


//------------------------------------------------------------------eu_cookies

$(function(){

    if(document.cookie.indexOf('eu_cookies=1')==-1){
        $('#eu_cookies').show();
    }


    $('#eu_cookies').click(function() {

        setCookie('eu_cookies',1);
        $('#eu_cookies').hide();
    });

});

//======================================================================================================================
//UISCRIPT

window.uiScript = function(){

    r('uiScript');


    //todo ??? $(document).on('contextmenu', function (event) { event.preventDefault(); });

    $('body').disableSelection();

/*    $('#selecting-distance').disableSelection();
    $('.menu').disableSelection();
    $('.menu-list-item').disableSelection();
    $('.menu-dlist-item').disableSelection();
    $('#objectmenu').disableSelection();
    $('.close').disableSelection();*/

    //==================================================================================================================popup action

    // kliknutie na .js-popup-action-open trigger...
    $('.js-popup-action-open').unbind('click').on('click', function(e){

        //e.preventDefault();
        //r('Kliknutí na nástroj');
        $('.active').removeClass('active');

        if($(this).attr('selectable')=='1') {


            if ($(this).hasClass('active') == false) {
                //---------------------------------Označení nástroje
                r('Označení nástroje');

                $(this).addClass('active');
                eval($(this).attr('action'));

                //---------------------------------
            } else {
                //---------------------------------Odznačení všeho
                r('Odznačení všeho');

                $('#popup-action').hide();
                mapSpecialCursorStop();

                //---------------------------------
            }

        }else{

            eval($(this).attr('action'));

        }

    });


    $('.js-popup-action-open').unbind('mouseenter').on('mouseenter', function(e){


        //---------------------------------Zobrazení nápovědy
        //r('Zobrazení nápovědy');
        var content=$(this).attr('content');
        var title=$(this).attr('popup_title');

        if(is(title) || is(content)) {

            var html='';

            if(is(title))
            html+='<h2>'+title+'</h2>';

            if(is(content))
            html+='<p>'+content+'</p>';

            var offset=$(this).offset();

            $('#popup-action').css('top',offset.top);
            $('#popup-action .content').html(html);

            $('#popup-action').stop();
            $('#popup-action').css('opacity',1);
            $('#popup-action').show();


        }else{

            $('#popup-action').hide();
        }

        //---------------------------------

    });

    $('.js-popup-action-open').unbind('mouseleave').on('mouseleave', function(e){
        $('#popup-action').fadeOut(200);
    });



    //==================================================================================================================popup story




    // kliknutie na js-popup-window-open trigger zobrazí overlay a popup-window
    $('.js-popup-window-open').unbind('click').on('click', function(){

        var page=$(this).attr('page');
        Towns.Plugins.Pages.open(page);

    });

    // kliknutie na overlay schová overlay a popup-window
    $('.overlay').unbind('click').on('click', function(){
        UI.popupWindowClose()
    });

    // kliknutie na js-popup-window-close trigger schová overlay a popup-window
    $('.js-popup-window-close').unbind('click').on('click', function(){
        UI.popupWindowClose()
    });


    //==================================================================================================================popup notification



    // kliknutie na js-popup-notification-open trigger zobrazí popup-notification
    $('.js-popup-notification-open').unbind('click').on('click', function(event){
        event.stopPropagation();
        $('.popup-server').hide();
        $('.popup-notification').toggle();
    });

    // kliknutie na otvorený popup-notification neurobí nič
    $('.popup-notification').unbind('click').on('click', function(event){
        event.stopPropagation();
    });


    //------------------------------------

    // kliknutie na js-popup-notification-open trigger zobrazí popup-notification
    $('.js-popup-server-open').unbind('click').on('click', function(event){
        event.stopPropagation();
        $('.popup-notification').hide();
        $('.popup-server').toggle();
    });

    // kliknutie na otvorený popup-notification neurobí nič
    $('.popup-server').unbind('click').on('click', function(event){
        event.stopPropagation();
    });


    //------------------------------------


    // kliknutie na document schová oba
    $(document).unbind('click').on('click', function(){
        $('.popup-notification').hide();
        $('.popup-server').hide();
    });




    //==================================================================================================================esc keyup




    // ak sa klikne tlačítkom esc ...
    $(document).unbind('keyup').keyup(function(e) {

        // ... a ak to tlačítko je esc (27)...
        if (e.keyCode == 27) {
            // ... schovaj action-popup
            $('.action-wrapper').removeClass('active');

            // ... schovaj overlay
            $('.overlay').hide();

            // schovaj popup-window
            $('.popup-window').hide();

            // schovaj popup-notification
            $('.popup-notification').hide();
        }
    });

    //==================================================================================================================selecting_distance Click

    $('#selecting-distance-ctl .mini-button').off();


    //todo pri klikani na tyhle tlacitka vycentrovat selecting distance
    $('#selecting-distance-plus').unbind('click').click(function(){

    //todo sounds ion.sound.play("door_bump");

        if(building){
            building.design.data.size+=0.1;
            if(building.design.data.size>2.5)building.design.data.size=2.5;//todo funkce pro bounds

            r(building.design.data.size);

            buildingUpdate();
        }else{
            selecting_distance+=100;
            updateSelectingDistance();
        }
    });

    $('#selecting-distance-minus').unbind('click').click(function(){

        //todo sounds ion.sound.play("door_bump");


        if(building){
            building.design.data.size-=0.1;
            if(building.design.data.size<0.5)building.design.data.size=0.5;

            r(building.design.data.size);

            buildingUpdate();
        }else{
            selecting_distance-=100;
            updateSelectingDistance();
        }
    });

    $('#selecting-distance-left').unbind('click').click(function(){
        //todo sounds ion.sound.play("door_bump");
        building.design.data.rotation+=10;
        buildingUpdate();
    });

    $('#selecting-distance-right').unbind('click').click(function(){
        //todo sounds ion.sound.play("door_bump");
        building.design.data.rotation-=10;
        buildingUpdate();
    });

    $('#selecting-distance-color').unbind('click').click(function(){
        $('#color-ctl').toggle();

    });


    $('#selecting-distance-editor').unbind('click').click(function(){
        Editors.block_editor.open(0,building.id);
    });


    $('#selecting-distance-close').unbind('click').click(function(){
        //todo sounds ion.sound.play("door_bump");
        mapSpecialCursorStop();
        $('#popup-action').hide();
    });


    //==================================================================================================================




    //todo usages?
    $('.towns-window'/*todo all classes scss+js should be AllFirstLetters*/).unbind('click').click(function(e){
        e/*todo use e or event???*/.preventDefault();


        var html='<iframe src="'+$(this).attr('href')+'" class="popup-window-iframe"></iframe>';
        UI.popupWindowOpen($(this).attr('title'),html);

    });


    //==================================================================================================================
};


//======================================================================================================================
//SPECIAL CURSOR

var specialCursor=false;

//----------

window.mapSpecialCursorStart = function(){

    specialCursor=true;
    $('#map_drag').draggable('disable');
    map_selected_ids=[];

};

//----------

window.mapSpecialCursorStop = function(){

    specialCursor=false;

    $('#map_drag').draggable('enable');


    $('#selecting-distance-ctl').hide();
    $('#selecting-distance').hide();
    $('.active').removeClass('active');

    buildingStop();
    dismantlingStop();
    terrainChangeStop();
    terrainNeutralizeStop();
    storyWritingStop();
};

//======================================================================================================================
//LEFT MENU


window.showLeftMenu = function(html){

    for(i=0;i<5;i++)
        html+='<br>';

    $('#objectmenu-inner').html(html);
    $('#objectmenu').animate({left:0}, 200);

    uiScript();

};

//----------

window.hideLeftMenu = function(){

    $('.action-wrapper').removeClass('active');
    $('#objectmenu').animate({left:-60}, 200);
};





//======================================================================================================================
//ONLOAD

$(function(){


    mapSpecialCursorStop();
    uiScript();

    /*if(environment!='develop')
    Towns.Plugins.Pages.open('projects');*/


});
