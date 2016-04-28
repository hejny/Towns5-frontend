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

    <a href="http://forum.towns.cz/feed/" target="_blank">RSS Feed</a>,
    <a href="https://www.facebook.com/townsgame/" target="_blank">Facebook</a> nebo
    <a href="https://twitter.com/townsgame" target="_blank">Twitter</a>.

  </div>

  <form method="post" action="http://forum.towns.cz/" id="sendpress">
    <input type="hidden" name="sp_list" value="1390"/>
    <input type="hidden" name="sendpress" value="post" />

      <p style="text-align: center;">
        <b>{{form mail}}:</b>
        <input type="email" value="@" name="sp_email" style="width: 150px;"/>

        <b>{{form your name}}:</b>
        <input type="text" value="" name="sp_firstname" style="width: 150px;"/>

        <input value="{{form send}}" class="sendpress-submit" type="submit" id="submit" name="submit">
      </p>

      <!--<p name="lastname">
        <label for="email">Last Name:</label>
        <input type="text" value="" name="sp_lastname"/>
      </p>-->

  </form>


  <script>
    $(function() {
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

          }
        });
          return false;
      });
    });
  </script>


<p style="text-align: center;">
  {{home subscribe}}
  <a href="http://forum.towns.cz/feed/" target="_blank">RSS Feed</a>,
  <a href="https://www.facebook.com/townsgame/" target="_blank">Facebook</a> nebo
  <a href="https://twitter.com/townsgame" target="_blank">Twitter</a>.
</p>




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







`,
//`hovno hovno`
]
));