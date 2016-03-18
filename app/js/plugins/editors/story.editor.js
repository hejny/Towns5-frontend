/**
 * @author ©Towns.cz
 * @fileOverview Story editor
 */
//======================================================================================================================



T.Plugins.install(new T.Editor(
    'story-editor',
    {
        type: 'story'
    },
    Locale.get('story editor'),
    `

        <div id="vertical_separator" style="display: none;"></div>
        <textarea id="story-content" onkeypress="storyContentReload();" style="display: none;"></textarea>
        <div id="story-content-html" style="display: none;"></div>

    `,function(object){


        separator_width=5;//Math.toInt($('#vertical_separator').scss('width'));
        separator_border=2;//Math.toInt($('#story-content').scss('border-right'));
        window_padding=20;//Math.toInt($('.popup-window .content').scss('padding'));

        //r('storywrite',separator_width,separator_border,window_padding,$('#vertical_separator'),$('#story-content').scss('border-right'),$('.popup-window .content'));

        $('#vertical_separator').css('left',window_width/2+separator_width/2-window_padding);




        $('#vertical_separator').draggable({
            axis: 'x',
            drag: storyContentWidthReload,
            stop: storyContentWidthReload

        });

        /*var story_name='Nazev';
         var story_content=[
         'Nadpis',
         '=========',
         '',
         'text text text',
         ''].join('\n');*/


        var i = ArrayFunctions.id2i(objects_external,map_selected_ids[0]);
        r(map_selected_ids,i);

        $('#story-name').val(objects_external[i].name);
        $('#story-content').val(objects_external[i].content.data);


        storyContentReload();
        storyContentWidthReload();



    },
    {
        "name": "Příběh",
        "type": "story",
        "locale": "cs",
        "content": {
            "type": "markdown",
            "data": "Kde bolo tam bolo"
        }
    }



));



//======================================================================================================================


var window_width=780;//todo refactor rename and move to vars
separator_bound=10;
separator_snap=100;
var separator_width,separator_border,window_padding;


/*Pages.story_editor.closeJS = function(){

 map_selected_ids=[];
 Map.loadMap();

 };*/


var storyContentWidthReload = function(){

    var width1 = Math.toInt($('#vertical_separator').css('left'));

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

    //r(window_padding,separator_width,separator_border);
    //r(width1-window_padding-separator_width-2*separator_border,width2,width1+separator_width);


    $('#story-content').css('width',width1-window_padding-separator_width-2*separator_border);
    $('#story-content-html').css('width',width2);
    $('#story-content-html').css('left',width1+separator_width);


    $('#story-content').show();
    $('#story-content-html').show();
    $('#story-content-html').show();
    $('#vertical_separator').show();


    r('Uzzzzzzzzzzzz');

};



var storyContentReload = function(){

    var story_content = $('#story-content').val();

    var story_content_html = markdown.toHTML(story_content);


    $('#story-content-html').html(story_content_html);




};



