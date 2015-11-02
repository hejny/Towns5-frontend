
window.projects_html='

  <h2 style="text-align: center;">
<img src="media/image/icon/logo1.png" alt="Towns.cz logo" width="100"/><br/>
Připravujeme novou verzi hry.</h2>

  Svět z Towns 4 bude převeden do nové verze.

  Až budeme mít hotovo můžeme ti poslat email:<br><br>


  <div class="loading" style="display: none" id="sendpress_loading">Načítání...</div>
  <div class="success" style="display: none" id="sendpress_success">Děkujeme, až bude hra připravena pošleme ti mail.</div>
  <div class="error" style="display: none" id="sendpress_error">Něco se nezdařilo, buď máme chybu na serveru nebo jsi zadal chybný mail, každopádně nás můžeš sledovat přes

    <a href="http://forum.towns.cz/feed/" target="_blank">RSS Feed</a>,
    <a href="https://www.facebook.com/townsgame/" target="_blank">Facebook</a> nebo
    <a href="https://twitter.com/townsgame" target="_blank">Twitter</a>.

  </div>

  <br>
  <form method="post" action="http://forum.towns.cz/" id="sendpress">
    <input type="hidden" name="sp_list" value="1390"/>
    <input type="hidden" name="sendpress" value="post" />

        <b>Mail:</b>
        <input type="text" value="@" name="sp_email"/>

        <b>Tvé jméno:</b>
        <input type="text" value="" name="sp_firstname"/>

        <input value="Odeslat" class="sendpress-submit" type="submit" id="submit" name="submit">

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
            url: "http://forum.towns.cz/",
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


  <br><br>
  Nebo se můžeš přihlásit k odběru novinek přes
  <a href="http://forum.towns.cz/feed/" target="_blank">RSS Feed</a>,
  <a href="https://www.facebook.com/townsgame/" target="_blank">Facebook</a> nebo
  <a href="https://twitter.com/townsgame" target="_blank">Twitter</a>.


  <br><br>
  <hr>

  <iframe width="750" height="563" src="https://www.youtube.com/embed/CZ2eFAwOFwU?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

  <br><br>
  <hr>


  Pokud by ses chtěl podívat na čem právě pracujeme a napsat nám svů názor, podívej se na jednotlivé projekty Towns.
  Káždý z nich si můžeš rozkliknout a napsat nám svůj názor, za který budeme moc rádi:<br>

  <iframe src="http://projects.towns.cz/?only=1&amp;width=100%" width="100%" height="1500" frameborder="0" scrolling="0">


';

