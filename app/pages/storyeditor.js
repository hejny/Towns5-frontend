
//todo ?? DI

pages.storyeditor={};


pages.storyeditor.html=[
    '<input type="text" id="story-name" value="" placeholder="Název příběhu">',
    //'<button id="story-save" onclick="storyContentReload();">Uložit</button>',
    '<br>',

    '<div id="vertical_separator"></div>',
    '<textarea id="story-content" onkeypress="storyContentReload();"></textarea>',
    '<div id="story-content-html"></div>',
''].join('');


var window_width=780;
    separator_bound=10;
    separator_snap=100;
var separator_width,separator_border,window_padding;

pages.storyeditor.js = function(){

    separator_width=parseInt($('#vertical_separator').css('width'));
    separator_border=parseInt($('#story-content').css('border-right'));
    window_padding=parseInt($('.popup-window .content').css('padding'));

    r(separator_width,separator_border,window_padding);

    $('#vertical_separator').css('left',window_width/2+separator_width/2-window_padding);




    $('#vertical_separator').draggable({
        axis: 'x',
        drag: storyContentWidthReload,
        stop: storyContentWidthReload

    });

    var story_name='Nazev';
    var story_content=[
            'Nadpis',
            '=========',
            '',
            'text text text',
        ''].join('\n');

    $('#story-content').val(story_name);
    $('#story-content').val(story_content);


    storyContentReload();
    storyContentWidthReload();



};



var storyContentWidthReload = function(){

    var width1 = parseInt($('#vertical_separator').css('left'));

    if(isNaN(width1))width1=0;

    if(width1<separator_snap){
        width1=separator_bound;
        $('#vertical_separator').css('left',width1);
        $('#story-content').hide();
        $('#story-content-html').show();
    }else
    if(width1>window_width-separator_snap+separator_width){
        width1=window_width-separator_bound+separator_width;
        $('#vertical_separator').css('left',width1);
        $('#story-content').show();
        $('#story-content-html').hide();
    }else
    {
        $('#story-content').show();
        $('#story-content-html').show();
    }


    var width2 = window_width-width1;


    $('#story-content').css('width',width1-window_padding-separator_width-2*separator_border);
    $('#story-content-html').css('width',width2);
    $('#story-content-html').css('left',width1+separator_width);

};


var storyContentReload = function(){

    var story_name = $('#story-name').val();
    var story_content = $('#story-content').val();
    var story_content_html = markdown.toHTML(story_content);


    $('#story-content-html').html(story_content_html);
    r(story_name,story_content,story_content_html);

};