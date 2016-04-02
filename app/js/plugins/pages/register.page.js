


/**
 * @author ©Towns.cz
 * @fileOverview Login page
 */
//======================================================================================================================



T.Plugins.install(new T.Page(
    'register',
    Locale.get('page','register'),
    `


<div id="login-error" class="hidden"></div>




 <form id="register-form" class="form-big">

    <table>

        `/*+`
        <tr>
            <th colspan="2">`+Locale.get('user','basic')+`</th>
        </tr>
        `*/+`

        <tr>
            <td>*`+Locale.get('user','username')+`:</td>
            <td><input class="js-townsapi-online" type="text" name="username" placeholder="`+Locale.get('user','username','placeholder')+`" value="" autofocus autocomplete="off"></td>
        </tr>


        <tr>
            <td>*`+Locale.get('user','password')+`:</td>
            <td><input class="js-townsapi-online" type="password" name="password" autocomplete="off"></td>
        </tr>
        <tr>
            <td>*`+Locale.get('user','password','again')+`:</td>
            <td><input class="js-townsapi-online" type="password" name="password-again" autocomplete="off"></td>
        </tr>


        <tr>
            <td>`+Locale.get('user','email')+`:</td>
            <td><input class="js-townsapi-online" type="email" name="email" placeholder="`+Locale.get('user','email','placeholder')+`" value="@" autocomplete="on"></td>
        </tr>



        `/*+`
        <tr>
            <th colspan="2">`+Locale.get('user','extended')+`</th>
        </tr>

        <tr>
            <td>`+Locale.get('user','name')+`:</td>
            <td><input type="text" name="name"></td>
        </tr>
        <tr>
            <td>`+Locale.get('user','surname')+`:</td>
            <td><input type="text" name="surname"></td>
        </tr>

        <tr>
            <td>`+Locale.get('user','birthday')+`:c</td>
            <td><input type="date" name="birthday"></td>
        </tr>

        <tr>
            <th colspan="2">`+Locale.get('user','description')+`</th>
        </tr>
        <tr>
            <td colspan="2"><textarea name="description" class="full"></textarea></td>
        </tr>

        `*/+`

        <tr>
            <td colspan="2">
                <button style="width: 150px;">`+Locale.get('user','register')+`</button>
            </td>
        </tr>


    </table>





</form>









`
,function(){

        $('#register-form').find('input').change(function(e){

            r('changed');
            unsetInputError(this);

        });


        $('#register-form').find('button').click(function(){
            $('#register-form').trigger('submit');
        });
        

        $('#register-form').submit(function(e){

            e.preventDefault();

            var data={};

            //todo form to json
            $(this).find('input').each(function(){


                if($(this).attr('type')=='submit')return;
                //r(this);

                var key=$(this).attr('name');
                key=key.split('-').join('_');

                r(key);

                data[key]=$(this).val();

            });


            //---------------------------------------------
            if(data.username.trim().length==0){


                setInputError($("input[name='username']")[0],Locale.get('user','username'));


            }else
            //---------------------------------------------
            if(!validateEmail(data.email)){


                setInputError($("input[name='email']")[0],Locale.get('user','email'));


            }else
            //---------------------------------------------
            if(data.password.length==0){

                setInputError($("input[name='password']")[0],Locale.get('user','password'));

            }else
            //---------------------------------------------
            if(data.password!==data.password_again){


                setInputError($("input[name='password-again']")[0],Locale.get('user','password','again','notsame'));


            }else
            //---------------------------------------------Register!
            if(true){



                $('#register-form').find('button').html(Locale.get('loading')+' <i class="fa fa-spinner faa-spin animated"></i>');
                
                

                var password=data.password;
                delete data.password;
                delete data.password_again;

                townsAPI.post('users',{
                    "profile": data,
                    "login_methods": {
                        password
                    },
                    "contacts": [],
                    "language" : "cs"//todo language
                },
                function(response){


                    townsAPI.post('auth',{
                            "username": data.username,
                            "password": password
                        },
                        function(response){

                            $('#register-form').find('button').html(Locale.get('user','login'));

                            Storage.save('token',response['x-auth']);
                            townsAPI.token=response['x-auth'];
                            

                            UI.popupWindowClose();
                            UI.logged();


                        },
                        function(response){

                            throw new Error('Cant login after registration.');

                        }
                    );
                    
                    

                },
                function(response){

                    $('#login-form').find('button').html(Locale.get('user','register'));

                    setInputError($("input[name='username']")[0],Locale.get('user','username','taken'));

                }
                );


                //---------------------------------------------
            }



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

