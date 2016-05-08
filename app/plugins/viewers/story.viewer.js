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

        <div class="author">
        </div>

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



        T.TownsAPI.townsAPI.get('users/'+object.owner,{},function(response){

            var user = new T.User(response);//todo maybe creation of instance should provide TownsAPI

            $(page).find('.author').html(user.getSignatureHTML());

        });











    
    
        T.UI.popupWindow.setTitle(object.name);
    
    
    
    }


));