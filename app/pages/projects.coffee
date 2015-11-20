
pages.projects={"title": 'Towns 5'};

pages.projects.html='''


  <h2 style="text-align: center;">
<img src="media/image/icon/logo1.png" alt="Towns.cz logo" width="100"/><br/>
Připravujeme novou verzi hry.</h2>

<p style="text-align: center;">
  Svět z Towns 4 bude převeden do nové verze.
  <br>
  Až budeme mít hotovo můžeme ti poslat email:

</p>


  <div class="loading" style="display: none" id="sendpress_loading">Načítání...</div>
  <div class="success" style="display: none" id="sendpress_success">Děkujeme, až bude hra připravena pošleme ti mail.</div>
  <div class="error" style="display: none" id="sendpress_error">Něco se nezdařilo, buď máme chybu na serveru nebo jsi zadal chybný mail, každopádně nás můžeš sledovat přes

    <a href="http://forum.towns.cz/feed/" target="_blank">RSS Feed</a>,
    <a href="https://www.facebook.com/townsgame/" target="_blank">Facebook</a> nebo
    <a href="https://twitter.com/townsgame" target="_blank">Twitter</a>.

  </div>

  <form method="post" action="http://forum.towns.cz/" id="sendpress">
    <input type="hidden" name="sp_list" value="1390"/>
    <input type="hidden" name="sendpress" value="post" />

      <p style="text-align: center;">
        <b>Mail:</b>
        <input type="text" value="@" name="sp_email"/>

        <b>Tvé jméno:</b>
        <input type="text" value="" name="sp_firstname"/>

        <input value="Odeslat" class="sendpress-submit" type="submit" id="submit" name="submit">
      </p>

      <!--<p name="lastname">
        <label for="email">Last Name:</label>
        <input type="text" value="" name="sp_lastname"/>
      </p>-->

    </div>
  </form>


  <script>
      $("#sendpress").submit( function() {

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
              if(data.success==true){
                $("#sendpress")[0].reset();
                $("#sendpress_success").show();

              }else{
                $("#sendpress_error").show();
              }

          }});
          return false;
      });
  </script>


<p style="text-align: center;">
  Nebo se můžeš přihlásit k odběru novinek přes
  <a href="http://forum.towns.cz/feed/" target="_blank">RSS Feed</a>,
  <a href="https://www.facebook.com/townsgame/" target="_blank">Facebook</a> nebo
  <a href="https://twitter.com/townsgame" target="_blank">Twitter</a>.
</p>


<hr>


<p style="text-align: center;">
  <b>Podívej se na nejnovější novinky z vývoje hry:</b>
</p>

<div id="feed" class="feed"></div>

  <script>


    $.get(feed_url, function (data) {



      var html='',
          limit=4;

      $(data).find("item").each(function () {
          if(limit<=0)return;
          limit--;

          var el = $(this);

          /*r("title      : " + el.find("title").text());
          r("author     : " + el.find("author").text());
          r("description: " + el.find("description").text());*/



         var authorname=el.find("creator").text();


          var author = false;

          authors.forEach(function(author_){
            if(author_.name==authorname){
              author=author_;
            }
          });



          html+=[
            '<a class="towns-window" href="'+el.find("link").text()+'" title="'+el.find("title").text()+'" target="_blank">',
              '<div class="feed_item">',
                '<div class="feed_title">'+el.find("title").text()+'</div>',
                '<div class="feed_description">',
                  author?'<img src="http://projects.towns.cz/authors/'+author.nick+'.jpg" alt="'+author.name+'" title="'+author.name+'" width="40" class="feed_author" />':'',
                  el.find("description").text(),
                '</div>',
              '</div>',
            '</a>'].join('');

      });

      $("#feed").html(html);
      uiScript();
    });
  </script>

  <hr>

<p style="text-align: center;">
  <b>Podívej se, na čem právě pracujeme:</b><br>
  Káždý projekt si můžeš rozkliknout a napsat nám svůj názor, za který budeme moc rádi:
</p>

<iframe src="http://projects.towns.cz/?only=1&amp;width=100%" width="100%" height="1500" frameborder="0" scrolling="0"></iframe>



'''

