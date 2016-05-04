/**
 * @author Towns.cz
 * @fileOverview Information about Towns
 */
//======================================================================================================================



T.Plugins.install(new T.Plugins.Page(
    'home',
    ['O hře','Autoři'/*,'Technologie'*/],
    [`


  <h2 style="font-size:1.1em;text-align: center;">
<img src="/media/image/icons/logo.png" alt="{{towns logo}}" width="150"/><br/>
{{home info}}</h2>





<hr>

<p style="text-align: center;">
  {{home info subtitle}}

</p>


  <div class="loading" style="display: none" id="sendpress_loading">{{loading}}</div>
  <div class="success" style="display: none" id="sendpress_success">{{home subscribe success}}</div>
  <div class="error" style="display: none" id="sendpress_error">{{home subscribe error}}

    <a href="https://www.facebook.com/townsgame/" target="_blank">Facebook</a> nebo
    <a href="https://twitter.com/townsgame" target="_blank">Twitter</a>.

  </div>

  <form method="post" action="http://forum.towns.cz/" id="sendpress">
    <input type="hidden" name="sp_list" value="1390"/>
    <input type="hidden" name="sendpress" value="post" />

      <p style="text-align: center;">
        <b class="big-component">{{form mail}}:</b>
        <input type="email" value="@" name="sp_email" class="form-big-component"/>

        <!--<b>{{form your name}}:</b>
        <input type="text" value="" name="sp_firstname" style="width: 150px;"/>-->

        <input value="{{form send}}" class="sendpress-submit" type="submit" id="submit" name="submit">
      </p>

      <!--<p name="lastname">
        <label for="email">Last Name:</label>
        <input type="text" value="" name="sp_lastname"/>
      </p>-->

  </form>



<hr>


<ul class="news">
</ul>






`,
`


<style>



</style>


<div class="profile author">
    <img src="https://scontent-frt3-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/12347866_10205519225966134_3259010699440494329_n.jpg?oh=eb14ea4bf817af9c4b868005fc102394&oe=5786495E" alt="Pavol Hejný">
    <h2 class="name">Pavol Hejný</h2>
    <a href="http://pavolhejny.com" class="suburl" target="_blank">pavolhejny.com&nbsp;&nbsp;<i class="fa fa-external-link"></i></a>
    <div class="subname">Frontend</div>

    <!--<p class="description"</p>-->
</div>


<div class="profile author">
    <img src="https://scontent-frt3-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/1535506_10200690395020795_267029065_n.jpg?oh=177aac618924a811ec916d6bb9cd673a&oe=577F1A2C" alt="Štefan Kecskés">
    <h2 class="name">Štefan Kecskés</h2>
    <a href="http://skey.uk" class="suburl" target="_blank">skey.uk&nbsp;&nbsp;<i class="fa fa-external-link"></i></a>
    <div class="subname">Backend</div>
    <!--<p class="description"></p>-->
</div>



<div class="profile co-author">
    <img src="http://www.petrofcik.eu/assets/img/matus-petrofcik-350x350.jpg" alt="Matúš Petrofčík">
    <h2 class="name">Matúš Petrofčík</h2>
    <a href="http://www.petrofcik.eu/" class="suburl" target="_blank">petrofcik.eu&nbsp;&nbsp;<i class="fa fa-external-link"></i></a>
    <div class="subname">Design</div>

</div>







`],
function(page){

    r($(page));
    r($(page).find("#sendpress"));


    //---------------------------------------------------------Email
    $(page).find("#sendpress").submit( function() {

        $("#sendpress_success").hide();
        $("#sendpress_error").hide();
        $("#sendpress_loading").show();
        $.ajax({
            url: "http://blog.towns.cz/",
            type: "post",
            dataType: "json",
            data: $("#sendpress").serialize(),
            success: function(data) {

                $("#sendpress_loading").hide();
                if(data.success=== true){
                    $("#sendpress")[0].reset();
                    $("#sendpress_success").show();

                }else{
                    $("#sendpress_error").show();
                }

            }
        });
        return false;
    });

    //---------------------------------------------------------News

    var news=[];
    var news_draw=function(){

        //r(news);

        var html='',item_html,news_;


        news_ = news.sort(function(a,b){
            if(a.date> b.date){
                return(-1);
            }else
            if(a.date< b.date){
                return(1);
            }else{
                return(0);
            }
        });

        news_=news_.slice(0,16);

        news_.forEach(function(item){

            item_html='';

            if(!item.image){
                if(item.type=='story'){
                    item.image='/media/image/icons/view.svg';
                }else
                if(item.type=='wiki'){
                    item.image='/media/image/icons/wikipedia-logotype-of-earth-puzzle.svg';
                }



            }

            if(!item.image){
                item.onclick='';
            }

            item_html+=`
            <li>
                <a href="`+item.link+`" target="`+item.target+`" onclick="`+item.onclick+`">
                    <img src="`+item.image+`">
                    <h2 class="title">`+item.title+`</h2>
                    <p class="type">`+ T.Locale.get('news','type',item.type)+(item.target=='_blank'?'<i class="fa fa-external-link"></i>':'')+`</p>
                    <p class="date">`+dateToSmartString(item.date)+`</p>
                </a>
            </li>
            `;


            html+=item_html;

        });

        $(page).find(".news").html(html);

    };


    //********************stories

    T.TownsAPI.townsAPI.get('stories',{latest:true},function(result){

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

            news.push({
                type: 'story',
                link: '#'+story.x+','+story.y,
                onclick: "T.Plugins.open('story',1,'"+story.id+"');",
                image: image,
                title: story.name,
                date: new Date(story.start_time),
                target: '_self'
            });


        });

        news_draw();
    });
    //********************
    //********************youtube

    /*
     <entry>
     <id>yt:video:du7UYjhtG_g</id>
     <yt:videoId>du7UYjhtG_g</yt:videoId>
     <yt:channelId>UCSi4hJPmCjyrXjFzKSeitjQ</yt:channelId>
     <title>Towns5 Dev - 11.12.2015 - Stavební bloky</title>
     <link rel="alternate" href="http://www.youtube.com/watch?v=du7UYjhtG_g"/>
     <author>
         <name>Towns</name>
         <uri>http://www.youtube.com/channel/UCSi4hJPmCjyrXjFzKSeitjQ</uri>
     </author>
     <published>2015-12-11T15:06:51+00:00</published>
     <updated>2016-03-20T14:49:23+00:00</updated>
     <media:group>
         <media:title>Towns5 Dev - 11.12.2015 - Stavební bloky</media:title>
         <media:content url="https://www.youtube.com/v/du7UYjhtG_g?version=3" type="application/x-shockwave-flash" width="640" height="390"/>
         <media:thumbnail url="https://i1.ytimg.com/vi/du7UYjhtG_g/hqdefault.jpg" width="480" height="360"/>
         <media:description></media:description>
         <media:community>
             <media:starRating count="2" average="3.00" min="1" max="5"/>
             <media:statistics views="36"/>
         </media:community>
     </media:group>
     </entry>
     */


    $.get(appDir+'/php/proxy.rss.php?url='+encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UCSi4hJPmCjyrXjFzKSeitjQ'), function (data) {


        $(data).find("entry").each(function () {

            var $this = $(this);


            news.push({
                type: 'video',
                title: $this.find("title").text(),
                image: $this.find("media\\:thumbnail").attr('url'),
                date: new Date($this.find("published").text()),
                link: $this.find("link").attr('href'),
                target: '_blank'

            });

        });

        news_draw();
    });
    //********************
    //********************wiki
    /*
    <entry>
        <id>http://wiki.towns.cz/Hlavn%C3%AD_strana</id>
        <title>Hlavní strana</title>
        <link rel="alternate" type="text/html" href="http://wiki.towns.cz/Hlavn%C3%AD_strana"/>
        <updated>2016-04-14T15:21:24Z</updated>

        <summary type="html">&lt;p&gt;MediaWiki default: &lt;/p&gt;
            &lt;hr /&gt;
            &lt;div&gt;'''MediaWiki byla úspěšně nainstalována.'''&lt;br /&gt;
            &lt;br /&gt;
            [//meta.wikimedia.org/wiki/Help:Contents Uživatelská příručka] vám napoví, jak MediaWiki používat.&lt;br /&gt;
            &lt;br /&gt;
            == Začínáme ==&lt;br /&gt;
            &lt;br /&gt;
            * [//www.mediawiki.org/wiki/Special:MyLanguage/Manual:Configuration_settings Nastavení konfigurace]&lt;br /&gt;
            * [//www.mediawiki.org/wiki/Special:MyLanguage/Manual:FAQ Často kladené otázky o MediaWiki]&lt;br /&gt;
            * [https://lists.wikimedia.org/mailman/listinfo/mediawiki-announce E-mailová konference oznámení MediaWiki]&lt;br /&gt;
            * [//www.mediawiki.org/wiki/Special:MyLanguage/Localisation#Translation_resources Překlad MediaWiki do vašeho jazyka]&lt;/div&gt;</summary>
        <author><name>MediaWiki default</name></author>	</entry>

    </feed>
    */

    $.get(appDir+'/php/proxy.rss.php?url='+encodeURIComponent('http://wiki.towns.cz/index.php?title=Special:NewPages&feed=atom&hideredirs=1&limit=50&offset=&namespace=0&username=&tagfilter='), function (data) {

        
        $(data).find("entry").each(function () {

            var $this = $(this);


            news.push({
                type: 'wiki',
                title: $this.find("title").text(),
                //image: $this.find("media\\:thumbnail").attr('url'),
                date: new Date($this.find("updated").text()),
                link: $this.find("id").text(),
                target: '_blank'

            });

        });

        news_draw();
    });


    //********************

    //---------------------------------------------------------


}
));