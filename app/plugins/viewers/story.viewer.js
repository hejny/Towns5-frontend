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



        content.find('a').each(function(){

            $this=$(this);

            var href = $this.attr('href');
            uri = URI(href);

            if(uri.domain()==''){

                var uri = uri.path();
                uri=uri.substr(1);
                uri=uri.split('/');

                var onclick = `T.Plugins.open('`+uri[0]+`',1,'`+uri[1]+`');`;

                $this.attr('href',null);
                $this.attr('onclick',onclick);

                //r($this);

            }else{

                var html = $this.html();
                html+='<i class="fa fa-external-link" aria-hidden="true"></i>';
                $this.html(html);

                $this.attr('target','_blank');

            }




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