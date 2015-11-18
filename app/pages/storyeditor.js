
//todo ?? DI

pages.storyeditor={};


pages.storyeditor.html=[
    '<input type="text" id="story-name" value="" placeholder="Název příběhu">',
    '<button id="story-save" onclick="storySave();">Uložit</button>',
    '<br>',
    '<textarea id="story-content"></textarea>',
''].join('');






pages.storyeditor.js = function(){


    var story_name='Nazev';
    var story_content=[
            'Nadpis',
            '=========',
            '',
            'text text text',
        ''].join('\n');

    $('#story-content').val(story_name);
    $('#story-content').val(story_content);


};



function storySave(){

    var story_name = $('#story-name').val();
    var story_content = $('#story-content').val();
    var story_content_html = markdown.toHTML(story_content);

    r(story_name,story_content,story_content_html);

}