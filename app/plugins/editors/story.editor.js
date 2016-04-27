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
        <textarea id="story-content" style="display: none;"></textarea>
        <div id="story-content-html" style="display: none;"></div>

    `,function(object){

        //---------------------------------------------------------

        var window_width=750;//todo refactor rename and move to vars
        var separator_bound=10;
        var separator_snap=100;

        var separator_width=5;//T.Math.toInt($('#vertical_separator').scss('width'));
        var separator_border=2;//T.Math.toInt($('#story-content').scss('border-right'));
        var window_padding=20;//T.Math.toInt($('.popup-window .content').scss('padding'));

        //---------------------------------------------------------

        var storyContentWidthReload = function(){

            var width1 = T.Math.toInt($('#vertical_separator').css('left'));

            if(isNaN(width1))width1=0;

            /*if(width1<separator_snap){
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
            }*/

            if(width1<separator_snap){

                width1=separator_snap;
                $('#vertical_separator').css('left',width1);


            }else
            if(width1>window_width-separator_snap+separator_width){

                width1=window_width-separator_snap+separator_width;
                $('#vertical_separator').css('left',width1);


            }


            var width2 = window_width-width1;


            $('#story-content').css('width',width1-window_padding-separator_width-2*separator_border);
            $('#story-content-html')
                .css('width',width2)
                .css('left',width1+separator_width);


            $('#story-content').show();
            $('#story-content-html').show();
            $('#vertical_separator').show();

        };


        var storyContentReload = function(){

            object.content.data = $('#story-content').val();

            var story_content_html = markdown.toHTML(object.content.data);
            $('#story-content-html').html(story_content_html);

        };


        //---------------------------------------------------------


        $('#vertical_separator')
            .css('left',window_width/2+separator_width/2-window_padding)
            .draggable({
            axis: 'x',
            drag: storyContentWidthReload,
            stop: storyContentWidthReload

        });


        $('#story-content').val(object.content.data).keypress(function(){

            setTimeout(function(){
                storyContentReload();
            },IMMEDIATELY_MS);

        });


        storyContentReload();
        storyContentWidthReload();

        //---------------------------------------------------------


    },
    {
        "name": "Story",
        "type": "story",
        "locale": "en",
        "content": {
            "type": "markdown",
            "data": ""
        }
    }



));



//======================================================================================================================







