


/**
 * @author ©Towns.cz
 * @fileOverview Login page
 */
//======================================================================================================================



T.Plugins.install(new T.Plugins.Page(
    'deleting',
    T.Locale.get('page','deleting'),
    `
<ul class="news">
</ul>


`
    ,function(page){


        T.TownsAPI.townsAPI.get('stories',{latest:true},function(result){

            var html='',item_html;

            var stories = new T.Objects.Array(result);


            stories.forEach(function(story){

                objects_external.update(story);



                var content=story.content.data;
                content = markdown.toHTML(content);


                var image = $(content).find('img:first').attr('src');
                if(image) {


                    image = URI(image)
                        .removeSearch("width")
                        .addSearch({width: 100})
                        .toString()
                    ;


                }

                var item = {
                    type: 'story',
                    onclick: "deleteObject('"+story.id+"');$(this).css('opacity',0.2);",
                    image: image,
                    title: story.name,
                    date: new Date(story.start_time),
                    target: '_self'
                };

                if(!item.image){
                    item.image='/media/image/icons/view.svg';
                }

                item_html=`
                <li onclick="`+item.onclick+`">
                        <img src="`+item.image+`">
                        <h2 class="title">`+item.title+`</h2>
                        <p class="type">`+ T.Locale.get('news','type',item.type)+(item.target=='_blank'?'<i class="fa fa-external-link"></i>':'')+`</p>
                        <p class="date">`+dateToSmartString(item.date)+`</p>
                        <p>`+content+`</p>
                </li>
                `;

                html+=item_html;

            });

            $(page).find(".news").html(html);
        });





    }
));

