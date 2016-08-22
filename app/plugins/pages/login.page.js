


/**
 * @author ©Towns.cz
 * @fileOverview Login page
 */
//======================================================================================================================



TOWNS.Plugins.install(new TOWNS.Plugins.Page(
    'login',
    TOWNS.Locale.get('page','login'),
    `


<div id="login-error" class="hidden"></div>




 <div id="login-form" class="form-big">

    <table>


        <tr>
            <td class="messages" colspan="2"></td>
        </tr>

        <tr>
            <td>*`+TOWNS.Locale.get('user','username')+`:</td>
            <td><input type="text" name="username" placeholder="`+TOWNS.Locale.get('user','username','placeholder')+`" autofocus></td>
        </tr>


        <tr>
            <td>*`+TOWNS.Locale.get('user','password')+`:</td>
            <td><input type="password" name="password" ></td>
        </tr>

        <tr>
            <td colspan="2">
            <button style="width: 150px;">`+TOWNS.Locale.get('user','login')+`</button>
            </td>
        </tr>

    </table>


</div>


`
    ,function(page){



        $(page).find('button').click(function(e){

            e.preventDefault();

            var data={};

            //todo form to json
            $(page).find('input').each(function(){

                if($(this).attr('type')=='submit')return;

                var key=$(this).attr('name');
                key=key.split('-').join('_');

                //r(key);

                data[key]=$(this).val();

            });


            $('#login-form').find('button').html(TOWNS.Locale.get('loading')+' <i class="fa fa-spinner faa-spin animated"></i>');




            TOWNS.TownsAPI.townsAPI.post('auth',{
                    "username": data.username,
                    "password": data.password
                },
                function(response){

                    $('#login-form').find('button').html(TOWNS.Locale.get('user','login'));

                    TOWNS.Storage.save('token',response['x-auth']);
                    TOWNS.TownsAPI.townsAPI.token=response['x-auth'];
                    //$('#login-form').find('.messages').html('<div class="success">'+TOWNS.Locale.get('auth correct')+'</div>');
                    //r(response);

                    TOWNS.UI.popupWindow.close();
                    TOWNS.UI.Status.logged();
                    loadObjectPrototypes();//todo should it be here?

                    //TOWNS.TownsAPI.townsAPI.isLogged(function(user){r(user);});


                },
                function(response){

                    $('#login-form').find('button').html(TOWNS.Locale.get('user','login'));


                    $('#login-form').find('.messages').html('<div class="error messagebox">'+TOWNS.Locale.get('auth wrong')+'</div>');

                    TOWNS.TownsAPI.townsAPI.token=false;
                    TOWNS.UI.Status.logged();
                    //TOWNS.TownsAPI.townsAPI.isLogged(function(user){r(user);});

                    //setInputError($("input[name='username']")[0],TOWNS.Locale.get('user','username','wrong'));
                    //setInputError($("input[name='username']")[0],TOWNS.Locale.get('user','password','wrong'));

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

