


/**
 * @author ©Towns.cz
 * @fileOverview Login page
 */
//======================================================================================================================



TOWNS.Plugins.install(new TOWNS.Plugins.Page(
    'deleting',
    TOWNS.Locale.get('page','deleting'),
    `
<div class="news">
</div>


`
    ,function(page){


        TOWNS.TownsAPI.townsAPI.get('stories',{latest:true},function(result){

            var html='',item_html;

            var stories = new TOWNS.Objects.Array(result);


            stories.forEach(function(story){

                objects_server.update(story);



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
                        <p class="type">`+ TOWNS.Locale.get('news','type',item.type)+(item.target=='_blank'?'<i class="fa fa-external-link"></i>':'')+`</p>
                        <p class="date">`+dateToSmartString(item.date)+`</p>
                        <p>`+content+`</p>
                </li>
                `;

                html+=item_html;

            });

            $(page).find(".news").html('<ul>'+html+'</ul>');
        });





    }
));

