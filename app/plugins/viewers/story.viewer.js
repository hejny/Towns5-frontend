/**
 * @author ©Towns.cz
 * @fileOverview Story viewer
 */
//======================================================================================================================


T.Plugins.install(new T.Plugins.Viewer(
    'story'
    ,{
        type: 'story'
    }
    ,''
    ,`
        <article></article>
        <button id="js-story-edit">{{story edit}}</button>
        <button id="js-story-delete">{{story delete}}</button>

    `//todo should js-story-edit be class or id(current) ???
    ,function(object,page){


        r(object);


        var content = $(markdown.toHTML(object.getMarkdown()));
    
        content.find('img').each(function(){
    
            var src = $(this).attr('src');
            src = URI(src)
                .removeSearch("width")
                .addSearch({ width: 800 })//todo constant maybe POPUP_WINDOW_NORMAL_WIDTH
                .toString()
            ;
    
            $(this).attr('src',src);
    
        });
    
        content=content.outerHTML();//todo use this

    
        $(page).find('article').html(content);
    
    
        $(page).find('#js-story-edit').click(function(e){
    
            T.Plugins.open('story-editor',1,object.id);//todo better switching between viewers and editors
    
        });
    
        $(page).find('#js-story-delete').click(function(e){

            if(confirm(Locale.get('story','delete','prompt'))){
                T.UI.popupWindowClose();
                T.TownsAPI.townsAPI.delete('objects/'+object.id
                    ,function(){

                        T.UI.message.success(Locale.get('story','delete','success'));

                    }
                    ,function(e){

                        T.UI.message.error(Locale.get('story','delete','error'));

                    }
                );//todo smarter deleting of objects
            }

        });
    
    
        T.UI.popupWindowTitle(object.name);
    
    
    
    }


));