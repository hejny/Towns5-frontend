
//todo ?? DI

pages.storyeditor={};


pages.storyeditor.html=[
    '<input type="text" id="story-name" value="" placeholder="Název příběhu">',
    '<button id="story-save" onclick="storySave();">Uložit</button>',
    '<div id="story-content">cccc</div>'
].join('');


var story_editor;

pages.storyeditor.js = function(){



    var opts = {
        container: 'story-content',
        textarea: null,
        basePath: 'node_modules/epiceditor/epiceditor/',
        clientSideStorage: true,
        localStorageName: 'epiceditor',
        useNativeFullsreen: true,
        parser: marked,
        file: {
            name: 'epiceditor',
            defaultContent: 'ahoj',
            autoSave: 100
        },
        theme: {
            base: 'themes/base/epiceditor.css',
            preview: 'themes/preview/bartik.css',
            editor: 'themes/editor/epic-light.css'
            /*preview: '/themes/preview/preview-dark.css',
            editor: '/themes/editor/epic-dark.css'*/
        },
        button: {
            preview: true,
            fullscreen: false
        },
        focusOnLoad: false,
        shortcut: {
            modifier: 18,
            fullscreen: 70,
            preview: 80
        },
        string: {
            togglePreview: 'Toggle Preview Mode',
            toggleEdit: 'Toggle Edit Mode',
            toggleFullscreen: 'Enter Fullscreen'
        }
    };


    story_editor = new EpicEditor(opts).load();

    var elements=['container','wrapper','wrapperIframe','editor','editorIframe','previewer','previewerIframe'];
    for(var key in elements)
        $(story_editor.getElement(elements[key])).css('height',window.innerHeight-300);


};



function storySave(){

    var story_name = $('#story-name').val();
    var story_content = story_editor.getElement('editor').body.innerHTML;

    r(story_name,story_content);

}