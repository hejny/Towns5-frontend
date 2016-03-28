


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
            <td class="messages" colspan="2"></td>
        </tr>

        <tr>
            <td>*`+Locale.get('user','username')+`:</td>
            <td><input type="text" name="username" placeholder="`+Locale.get('user','username','placeholder')+`" value="xxx" required autofocus></td>
        </tr>


        <tr>
            <td>*`+Locale.get('user','password')+`:</td>
            <td><input type="text" name="password" required></td>
        </tr>

        <tr>
            <td colspan="2">
            <button>`+Locale.get('user','login')+`</button>
            </td>
        </tr>

    </table>


</form>


`
    ,function(){



        $('#login-form').find('button').click(function(){
            $('#login-form').trigger('submit');
        });


        $('#login-form').submit(function(e){

            e.preventDefault();

            var data={};

            //todo form to json
            $(this).find('input').each(function(){

                if($(this).attr('type')=='submit')return;

                var key=$(this).attr('name');
                key=key.split('-').join('_');

                //r(key);

                data[key]=$(this).val();

            });



            $('#login-form').find('button').html(Locale.get('loading')+' <i class="fa fa-spinner faa-spin animated"></i>');



            townsAPI.post('auth',{
                    "username": data.username,
                    "password": data.password
                },
                function(response){


                    townsAPI.token=response['x-auth'];
                    $('#login-form').find('.messages').html('<div class="success">'+Locale.get('auth correct')+'</div>');
                    //r(response);


                    townsAPI.isLogged(function(user){r(user);});


                },
                function(response){

                    $('#login-form').find('.messages').html('<div class="error">'+Locale.get('auth wrong')+'</div>');

                    townsAPI.token=false;
                    townsAPI.isLogged(function(user){r(user);});

                    //setInputError($("input[name='username']")[0],Locale.get('user','username','wrong'));
                    //setInputError($("input[name='username']")[0],Locale.get('user','password','wrong'));

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

