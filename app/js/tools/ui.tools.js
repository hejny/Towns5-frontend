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


//------------------------------------------------------------------window_open

var window_closeJS = false;//todo refactor strange name

window.window_open = function(page){


    //todo sounds ion.sound.play("door_bump");
    r('Opening window '+page);

    var header=pages[page].header;
    var content=pages[page].content;


    if(!is(header))header='';
    if(!is(content))content='';

    r(header,content);

    window_open_content(header,content);

    if(is(pages[page].openJS)) {
        setTimeout(function () {
            pages[page].openJS();
        },IMMEDIATELY_MS);
    }


    if(is(pages[page].closeJS)) {
        window_closeJS=pages[page].closeJS;
    }




};

//------------------------------------------------------------------window write

window.window_write_header = function(header){//todo refactor to same names

    $('.popup-window .header').text(header);

};

//-----------------------------

window.window_write_content = function(content){//todo refactor to same names

    $('.popup-window .content').html(content);
    uiScript();

};

//------------------------------------------------------------------window_open_html

window.window_open_content = function(header,content){

    window_write_header(header);
    window_write_content(content);

    $('.overlay').show();
    $('.popup-window').show();


    $('.popup-window .content').mousedown(function(){

        $('body').enableSelection();
    });
    $('body').enableSelection();

    window_opened=true;

};

//------------------------------------------------------------------window_close

window.window_close = function(){

    //todo sounds ion.sound.play("door_bump");

    $('.overlay').hide();
    $('.popup-window').hide();

    $('body').disableSelection();

    if(is(window_closeJS)){

        window_closeJS();
        window_closeJS=false;
    }

    window_opened=false;
};

//------------------------------------------------------------------message

window.message = function(text,type){

    //todo [PH] types of message - error, notice,...?
    //todo [PH] play sound here

    ion.sound.play("bell_ring");

    $('#message_inner').text(text);
    $('#message').show();
    $('#message').fadeOut(MESSAGE_MS);//todo UX?

};