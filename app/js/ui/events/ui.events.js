/**

     ██╗   ██╗██╗
     ██║   ██║██║
     ██║   ██║██║
     ██║   ██║██║
     ╚██████╔╝██║
     ╚═════╝ ╚═╝
     © Towns.cz

 * @fileOverview User interface initialization

 */




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
/*
 ██╗   ██╗██╗███████╗ ██████╗██████╗ ██╗██████╗ ████████╗
 ██║   ██║██║██╔════╝██╔════╝██╔══██╗██║██╔══██╗╚══██╔══╝
 ██║   ██║██║███████╗██║     ██████╔╝██║██████╔╝   ██║
 ██║   ██║██║╚════██║██║     ██╔══██╗██║██╔═══╝    ██║
 ╚██████╔╝██║███████║╚██████╗██║  ██║██║██║        ██║
  ╚═════╝ ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝
 */

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

        if($(this).hasClass('active')==false){
            //---------------------------------Označení nástroje
            r('Označení nástroje');
            mapSpecialCursorStop();
            $('.active').removeClass('active');
            $(this).addClass('active');

            eval($(this).attr('action'));

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
            $('.active').removeClass('active');
            $('#popup-action').hide();
            mapSpecialCursorStop();

            //---------------------------------
        }

    });


    $('.js-popup-action-close').unbind('click').on('click', function(){

        $('#popup-action').hide();

    });

    //==================================================================================================================popup story




    // kliknutie na js-popup-window-open trigger zobrazí overlay a popup-window
    $('.js-popup-window-open').unbind('click').on('click', function(){


        var content=$(this).attr('content');
        window_open(content);



    });

    // kliknutie na overlay schová overlay a popup-window
    $('.overlay').unbind('click').on('click', function(){
        window_close()
    });

    // kliknutie na js-popup-window-close trigger schová overlay a popup-window
    $('.js-popup-window-close').unbind('click').on('click', function(){
        window_close()
    });


    //==================================================================================================================popup notification



    // kliknutie na js-popup-notification-open trigger zobrazí popup-notification
    $('.js-popup-notification-open').unbind('click').on('click', function(event){
        event.stopPropagation();
        $('.popup-notification').toggle();
    });

    // kliknutie na otvorený popup-notification neurobí nič
    $('.popup-notification').unbind('click').on('click', function(event){
        event.stopPropagation();
    });

    // kliknutie na document schová popup-notification
    $(document).unbind('click').on('click', function(){
        $('.popup-notification').hide();
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

    $('#selecting-distance-plus').off();
    $('#selecting-distance-minus').off();
    $('#selecting-distance-left').off();
    $('#selecting-distance-right').off();
    $('#selecting-distance-close').off();

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
        building.design.data.rotation-=10;
        buildingUpdate();
    });

    $('#selecting-distance-right').unbind('click').click(function(){
        //todo sounds ion.sound.play("door_bump");
        building.design.data.rotation+=10;
        buildingUpdate();
    });

    $('#selecting-distance-color').unbind('click').click(function(){
        $('#color-ctl').toggle();

    });

    $('#selecting-distance-close').unbind('click').click(function(){
        //todo sounds ion.sound.play("door_bump");
        mapSpecialCursorStop();
        $('#popup-action').hide();
        $('#color-ctl').hide();
    });


    //==================================================================================================================




    $('.towns-window'/*todo all classes css+js should be AllFirstLetters*/).unbind('click').click(function(e){
        e/*todo use e or event???*/.preventDefault();


        var html='<iframe src="'+$(this).attr('href')+'" class="popup-window-iframe"></iframe>';
        window_open_content($(this).attr('title'),html);

    });


    //==================================================================================================================
};


//======================================================================================================================
/*
 ███████╗██████╗ ███████╗ ██████╗██╗ █████╗ ██╗          ██████╗██╗   ██╗██████╗ ███████╗ ██████╗ ██████╗
 ██╔════╝██╔══██╗██╔════╝██╔════╝██║██╔══██╗██║         ██╔════╝██║   ██║██╔══██╗██╔════╝██╔═══██╗██╔══██╗
 ███████╗██████╔╝█████╗  ██║     ██║███████║██║         ██║     ██║   ██║██████╔╝███████╗██║   ██║██████╔╝
 ╚════██║██╔═══╝ ██╔══╝  ██║     ██║██╔══██║██║         ██║     ██║   ██║██╔══██╗╚════██║██║   ██║██╔══██╗
 ███████║██║     ███████╗╚██████╗██║██║  ██║███████╗    ╚██████╗╚██████╔╝██║  ██║███████║╚██████╔╝██║  ██║
 ╚══════╝╚═╝     ╚══════╝ ╚═════╝╚═╝╚═╝  ╚═╝╚══════╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝
 */


var specialCursor=false;

//----------

window.mapSpecialCursorStart = function(){

    specialCursor=true;
    $('#map_drag').draggable('disable');

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
    storyWriteStop();
};


//======================================================================================================================
/*
 ███████╗██████╗ ███████╗ ██████╗██╗ █████╗ ██╗          ██████╗██╗   ██╗██████╗ ███████╗ ██████╗ ██████╗
 //todo ASCII
 ╚══════╝╚═╝     ╚══════╝ ╚═════╝╚═╝╚═╝  ╚═╝╚══════╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝
 */


$(function() {

    $('#selecting-distance-color-box').farbtastic(Interval.maxRunPerMs(function (color) {

        r(color);
        selected_color = color;
        $('#selecting-distance-color').css('background-color', selected_color);

        buildingUpdate();

    }, 200));

    /*('#selecting-distance-color-input');
     picker.setColor(selected_color); //set initial color
     picker.linkTo(function(){



     r(selected_color);


     $('#selecting-distance-color').css('selected_color',selected_color);


     }); //link to callback*/
});

//======================================================================================================================
/*
 ███████╗██████╗ ███████╗ ██████╗██╗ █████╗ ██╗          ██████╗██╗   ██╗██████╗ ███████╗ ██████╗ ██████╗
//todo ASCII
 ╚══════╝╚═╝     ╚══════╝ ╚═════╝╚═╝╚═╝  ╚═╝╚══════╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝
 */


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
/*
  ██████╗ ███╗   ██╗██╗      ██████╗  █████╗ ██████╗
 ██╔═══██╗████╗  ██║██║     ██╔═══██╗██╔══██╗██╔══██╗
 ██║   ██║██╔██╗ ██║██║     ██║   ██║███████║██║  ██║
 ██║   ██║██║╚██╗██║██║     ██║   ██║██╔══██║██║  ██║
 ╚██████╔╝██║ ╚████║███████╗╚██████╔╝██║  ██║██████╔╝
  ╚═════╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝
 */

$(function(){


    mapSpecialCursorStop();
    uiScript();

    if(environment!='develop')
    window_open('projects');


});
