/**
 * @author ©Towns.cz
 * @fileOverview Login page
 */
//======================================================================================================================

T.Plugins.install(
  new T.Plugins.Page(
    "login",
    T.Locale.get("page", "login"),
    `


<div id="login-error" class="hidden"></div>




 <div id="login-form" class="form-big">

    <table>


        <tr>
            <td class="messages" colspan="2"></td>
        </tr>

        <tr>
            <td>*` +
      T.Locale.get("user", "username") +
      `:</td>
            <td><input type="text" name="username" placeholder="` +
      T.Locale.get("user", "username", "placeholder") +
      `" autofocus></td>
        </tr>


        <tr>
            <td>*` +
      T.Locale.get("user", "password") +
      `:</td>
            <td><input type="password" name="password" ></td>
        </tr>

        <tr>
            <td colspan="2">
            <button style="width: 150px;">` +
      T.Locale.get("user", "login") +
      `</button>
            </td>
        </tr>

    </table>


</div>


`,
    function (page) {
      $(page)
        .find("button")
        .click(function (e) {
          e.preventDefault();

          var data = {};

          // todo form to json
          $(page)
            .find("input")
            .each(function () {
              if ($(this).attr("type") == "submit") return;

              var key = $(this).attr("name");
              key = key.split("-").join("_");

              // r(key);

              data[key] = $(this).val();
            });

          $("#login-form")
            .find("button")
            .html(
              T.Locale.get("loading") +
                ' <i class="fa fa-spinner faa-spin animated"></i>'
            );

          T.TownsAPI.townsAPI.post(
            "auth",
            { username: data.username, password: data.password },
            function (response) {
              $("#login-form")
                .find("button")
                .html(T.Locale.get("user", "login"));

              T.Storage.save("token", response["x-auth"]);
              T.TownsAPI.townsAPI.token = response["x-auth"];
              //$('#login-form').find('.messages').html('<div
              //class="success">'+T.Locale.get('auth correct')+'</div>');
              // r(response);

              T.UI.popupWindow.close();
              T.UI.Status.logged();
              loadObjectPrototypes(); // todo should it be here?

              // T.TownsAPI.townsAPI.isLogged(function(user){r(user);});
            },
            function (response) {
              $("#login-form")
                .find("button")
                .html(T.Locale.get("user", "login"));

              $("#login-form")
                .find(".messages")
                .html(
                  '<div class="error messagebox">' +
                    T.Locale.get("auth wrong") +
                    "</div>"
                );

              T.TownsAPI.townsAPI.token = false;
              T.UI.Status.logged();
              // T.TownsAPI.townsAPI.isLogged(function(user){r(user);});

              // setInputError($("input[name='username']")[0],T.Locale.get('user','username','wrong'));
              // setInputError($("input[name='username']")[0],T.Locale.get('user','password','wrong'));
            }
          );
        });

      /*{
       "username": "Janko11",
       "name": "Jano",
       "surname": "Mrkvicka",
       "birthday": "11.11.1911",
       "description": "Som Janko a mam rad mrkvicku",
       "image": "cdn.towns.cz/users/profileimages/janko.jpg",
       "email": "jano@mrkvicka.cz"
       }*/
    },
    undefined,
    "SMALL"
  )
);
