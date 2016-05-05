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

            if(confirm(T.Locale.get('story','delete','prompt'))){
                T.UI.popupWindow.close();
                deleteObject(object.id
                    ,function(result){

                        if(result){
                            T.UI.Messages.message.success(T.Locale.get('story','delete','success'));
                        }else{
                            T.UI.Messages.message.error(T.Locale.get('story','delete','error'));
                        }


                    }
                );//todo smarter deleting of objects
            }

        });
    
    
        T.UI.popupWindow.setTitle(object.name);
    
    
    
    }


));