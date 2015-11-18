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


//======================================================================================================================
/*
 ████████╗ ██████╗ ██╗    ██╗███╗   ██╗███████╗
 ╚══██╔══╝██╔═══██╗██║    ██║████╗  ██║██╔════╝
    ██║   ██║   ██║██║ █╗ ██║██╔██╗ ██║███████╗
    ██║   ██║   ██║██║███╗██║██║╚██╗██║╚════██║
    ██║   ╚██████╔╝╚███╔███╔╝██║ ╚████║███████║
    ╚═╝    ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝╚══════╝

 ██╗    ██╗██╗███╗   ██╗██████╗  ██████╗ ██╗    ██╗
 ██║    ██║██║████╗  ██║██╔══██╗██╔═══██╗██║    ██║
 ██║ █╗ ██║██║██╔██╗ ██║██║  ██║██║   ██║██║ █╗ ██║
 ██║███╗██║██║██║╚██╗██║██║  ██║██║   ██║██║███╗██║
 ╚███╔███╔╝██║██║ ╚████║██████╔╝╚██████╔╝╚███╔███╔╝
  ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝╚═════╝  ╚═════╝  ╚══╝╚══╝
 */

window.window_open = function(header,content){

    //todo sounds ion.sound.play("door_bump");

    $('.popup-window .header').html(header);
    $('.popup-window .content').html(content);

    $('.overlay').show();
    $('.popup-window').show();


    $('.popup-window .content').mousedown(function(){

        $('body').enableSelection();
    });
    $('body').enableSelection();

    window_opened=true;

};


window.window_close = function(){

    //todo sounds ion.sound.play("door_bump");

    $('.overlay').hide();
    $('.popup-window').hide();

    $('body').disableSelection();

    window_opened=false;
};


window.message = function(text,type){

    //todo [PH] types of message - error, notice,...?
    //todo [PH] play sound here

    ion.sound.play("bell_ring");

    $('#message_inner').text(text);
    $('#message').show();
    $('#message').fadeOut(MESSAGE_MS);//todo UX?

};


$(function(){

    if(document.cookie.indexOf('eu_cookies=1')==-1){
        $('#eu_cookies').show();
    }


    $('#eu_cookies').click(function() {
        var date = new Date();
        date.setFullYear(date.getFullYear() + 10);
        document.cookie = 'eu_cookies=1; path=/; expires=' + date.toGMTString();
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

    //todo Unbind events
    //todo ??? $(document).on('contextmenu', function (event) { event.preventDefault(); });

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
    $('.js-popup-action-open').on('click', function(e){

        e.preventDefault();

        if($(this).hasClass('active')==false){
            //---------------------------------Označení nástroje
            r('Označení nástroje');
            mapSpecialCursorStop();
            $('.active').removeClass('active');
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
            $('.active').removeClass('active');
            $('#popup-action').hide();
            mapSpecialCursorStop();

            //---------------------------------
        }

    });


    $('.js-popup-action-close').on('click', function(){

        $('#popup-action').hide();

    });

    //==================================================================================================================popup story




    // kliknutie na js-popup-window-open trigger zobrazí overlay a popup-window
    $('.js-popup-window-open').on('click', function(){

        //todo sounds ion.sound.play("door_bump");

        var content=$(this).attr('content');

        if(is(pages[content].html)){
            var html=pages[content].html;
        }else{
            throw 'wrong page';
        }

        window_open($(this).attr('header'),html);


        if(is(pages[content].js)) {
            setTimeout(function () {
                pages[content].js();
            },IMMEDIATELY_MS);
        }



    });

    // kliknutie na overlay schová overlay a popup-window
    $('.overlay').on('click', function(){
        window_close()
    });

    // kliknutie na js-popup-window-close trigger schová overlay a popup-window
    $('.js-popup-window-close').on('click', function(){
        window_close()
    });


    //==================================================================================================================popup notification



    // kliknutie na js-popup-notification-open trigger zobrazí popup-notification
    $('.js-popup-notification-open').on('click', function(event){
        event.stopPropagation();
        $('.popup-notification').toggle();
    });

    // kliknutie na otvorený popup-notification neurobí nič
    $('.popup-notification').on('click', function(event){
        event.stopPropagation();
    });

    // kliknutie na document schová popup-notification
    $(document).on('click', function(){
        $('.popup-notification').hide();
    });



    //==================================================================================================================esc keyup




    // ak sa klikne tlačítkom esc ...
    $(document).keyup(function(e) {

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
    $('#selecting-distance-plus').click(function(){

    //todo sounds ion.sound.play("door_bump");

        if(building){
            building.size+=0.1;
            if(building.size>2.5)building.size=2.5;//todo funkce pro bounds

            r(building.size);

            buildingUpdate();
        }else{
            selecting_distance+=100;
            updateSelectingDistance();
        }
    });

    $('#selecting-distance-minus').click(function(){

        //todo sounds ion.sound.play("door_bump");


        if(building){
            building.size-=0.1;
            if(building.size<0.5)building.size=0.5;

            r(building.size);

            buildingUpdate();
        }else{
            selecting_distance-=100;
            updateSelectingDistance();
        }
    });

    $('#selecting-distance-left').click(function(){
        //todo sounds ion.sound.play("door_bump");
        building.rot-=10;
        buildingUpdate();
    });

    $('#selecting-distance-right').click(function(){
        //todo sounds ion.sound.play("door_bump");
        building.rot+=10;
        buildingUpdate();
    });

    $('#selecting-distance-close').click(function(){
        //todo sounds ion.sound.play("door_bump");
        mapSpecialCursorStop();
        $('#popup-action').hide();
    });


    //==================================================================================================================




    $('.towns-window'/*todo all classes css+js should be AllFirstLetters*/).click(function(e){
        e/*todo use e or event???*/.preventDefault();


        var html='<iframe src="'+$(this).attr('href')+'" class="popup-window-iframe"></iframe>';
        window_open($(this).attr('title'),html);

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
};

//======================================================================================================================
/*
 ████████╗███████╗███╗   ███╗██████╗ ██╗      █████╗ ████████╗███████╗███████╗
 ╚══██╔══╝██╔════╝████╗ ████║██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝██╔════╝
    ██║   █████╗  ██╔████╔██║██████╔╝██║     ███████║   ██║   █████╗  ███████╗
    ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  ╚════██║
    ██║   ███████╗██║ ╚═╝ ██║██║     ███████╗██║  ██║   ██║   ███████╗███████║
    ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝
 */


var objectmenu_template='';



$(function(){

    objectmenu_template = $('#objectmenu-inner').html()
        .split('template_params')
        .join('style="background: url(\'%icon\');background-size: cover;" title="%title" content="%content" onclick="%action"');


});


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
    window_open('Towns 5',pages.projects.html);


});
