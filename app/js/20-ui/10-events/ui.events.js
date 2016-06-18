/**
 * @author ©Towns.cz
 * @fileOverview User interface initialization
 */
//======================================================================================================================


//------------------------------------------------------------------eu_cookies

$(function(){

    if(document.cookie.indexOf('eu_cookies=1')==-1){


        T.UI.cookie_message = new T.UI.Message(
            T.Locale.get('ui','prompts','cookies'),'WARNING',
            `<button class="micro-button" onclick="setCookie('eu_cookies',1);T.UI.cookie_message.close(0);" >` + T.Locale.get('ui','buttons','agree')+`</button>`
        );


    }


});

//======================================================================================================================
//T.UISCRIPT

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


            if ($(this).hasClass('active') === false) {
                //---------------------------------Označení nástroje
                r('Označení nástroje');

                $(this).addClass('active');
                /* jshint ignore:start */
                eval($(this).attr('action'));
                /* jshint ignore:end */

                //---------------------------------
            } else {
                //---------------------------------Odznačení všeho
                r('Odznačení všeho');

                $('#popup-action').hide();


                //---------------------------------
            }

        }else{

            /* jshint ignore:start */
            eval($(this).attr('action'));
            /* jshint ignore:end */

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


            var max_top=T.Math.toInt($( window ).height())-T.Math.toInt($( '#popup-action' ).height())-20;

            var top=T.Math.toInt(offset.top);
            if(top>max_top)top=max_top;

            var arrow_top=T.Math.toInt(offset.top)-top+20;

            if(arrow_top<T.Math.toInt($( '#popup-action' ).height())){
                $('#popup-action .arrow').css('margin-top',arrow_top).css('visibility','visible');
            }else{
                $('#popup-action .arrow').css('visibility','hidden');
            }

            $('#popup-action').css('top',top);



            $('#popup-action .content').html(html);

            $('#popup-action').stop();
            $('#popup-action').css('opacity',1);
            $('#popup-action').show();


        }else{

            $('#popup-action').hide();
        }

        //---------------------------------

    });

    $('.js-popup-action-open, #popup-action').unbind('mouseleave').on('mouseleave', function(e){
        $('#popup-action').fadeOut(200);
    });


    $('#popup-action').unbind('mouseenter').on('mouseenter', function(e){
        $('#popup-action').stop();
        $('#popup-action').css('opacity',1);
        $('#popup-action').show();
    });





    //==================================================================================================================popup story



    // kliknutie na overlay schová overlay a popup-window
    $('.overlay').unbind('click').on('click', function(){
        T.UI.popupWindow.close();
    });

    // kliknutie na js-popup-window-close trigger schová overlay a popup-window
    $('.js-popup-window-close').unbind('click').on('click', function(){
        T.UI.popupWindow.close();
    });


    //==================================================================================================================popup notification



    // kliknutie na js-popup-notification-open trigger zobrazí popup-notification
    $('.js-menu-top-popup-open').unbind('click').on('click', function(event){
        event.stopPropagation();//todo wtf?

        var page=$(this).attr('page');


        var left = $(this).position().left-360;
        $('#menu-top-popup-'+page).css('left',left);


        $('.menu-top-popup').not('#menu-top-popup-'+page).hide();
        $('#menu-top-popup-'+page).toggle();

    });

    // kliknutie na otvorený popup-notification neurobí nič
    $('.popup-notification').unbind('click').on('click', function(event){
        event.stopPropagation();
    });


    //------------------------------------


    // kliknutie na document schová oba
    $(document).unbind('click').on('click', function(){

        $('.menu-top-popup').hide();

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


    //==================================================================================================================




    //todo usages?
    $('.towns-window'/*todo all classes scss+js should be AllFirstLetters*/).unbind('click').click(function(e){
        e/*todo use e or event???*/.preventDefault();


        var html='<iframe src="'+$(this).attr('href')+'" class="popup-window-iframe"></iframe>';
        T.UI.popupWindow.open($(this).attr('title'),html);

    });


    //==================================================================================================================


    /*r(T.TownsAPI.townsAPI.online);
    if(T.TownsAPI.townsAPI.online){

        $('input.js-townsapi-online').prop('disabled',false);
        $('button.js-townsapi-online').animate({opacity:1});

    }else{

        $('input.js-townsapi-online').prop('disabled',true);
        $('button.js-townsapi-online').animate({opacity:0.4});

    }*/





    //==================================================================================================================




};



//======================================================================================================================
//LEFT MENU


window.showLeftMenu = function(html){

    for(i=0;i<5;i++)
        html+='<br>';

    $('#objectmenu-inner').html(html);
    $('#objectmenu').animate({left:0}, 200);



    //$( "#objectmenu" ).sortable();
    /*$('#objectmenu').find('.js-left-menu-item').draggable({

        scroll: false


    });*/



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

    uiScript();



});
