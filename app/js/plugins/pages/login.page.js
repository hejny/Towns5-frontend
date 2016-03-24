


/**
 * @author ©Towns.cz
 * @fileOverview Login page
 */
//======================================================================================================================



T.Plugins.install(new T.Page(
    'login',
    Locale.get('page','login'),
    `


<div id="login-error" class="hidden"></div>




 <form id="login-form" class="form-big">

    <table>

        <tr>
            <td>*`+Locale.get('user','username')+`:</td>
            <td><input type="text" name="username" placeholder="`+Locale.get('user','username','placeholder')+`" value="xxx" required autofocus></td>
        </tr>


        <tr>
            <td>*`+Locale.get('user','password')+`:</td>
            <td><input type="text" name="password" required></td>
        </tr>

        <tr>
            <td colspan="2"><input type="submit" value="`+Locale.get('user','register')+`"></td>
        </tr>

    </table>


</form>


`
    ,function(){




        $('#login-form').submit(function(e){

            e.preventDefault();

            var data={};

            //todo form to json
            $(this).find('input').each(function(){


                if($(this).attr('type')=='submit')return;
                //r(this);

                var key=$(this).attr('name');
                key=key.split('-').join('_');

                //r(key);

                data[key]=$(this).val();

            });





            townsAPI.get('auth',{
                    "username": data.username,
                    "password": data.password
                },
                function(response){

                    r(response);


                },
                function(response){

                    setInputError($("input[name='username']")[0],Locale.get('user','username','wrong'));
                    setInputError($("input[name='username']")[0],Locale.get('user','password','wrong'));

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
    'SMALL'
));

