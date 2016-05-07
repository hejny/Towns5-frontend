


/**
 * @author ©Towns.cz
 * @fileOverview Login page
 */
//======================================================================================================================



T.Plugins.install(new T.Plugins.Page(
    'register',
    T.Locale.get('page','register'),
    `


<div id="login-error" class="hidden"></div>




 <div id="register-form" class="form-big">

    <table>

        `+/*+`
        <tr>
            <th colspan="2">`+T.Locale.get('user','basic')+`</th>
        </tr>
        `*/`

        <tr>
            <td class="messages" colspan="2"></td>
        </tr>


        <tr>
            <td>*`+T.Locale.get('user','username')+`:</td>
            <td><input class="js-townsapi-online" type="text" name="username" placeholder="`+T.Locale.get('user','username','placeholder')+`" value="" autofocus autocomplete="off"></td>
        </tr>


        <tr>
            <td>*`+T.Locale.get('user','password')+`:</td>
            <td><input class="js-townsapi-online" type="password" name="password" autocomplete="off"></td>
        </tr>
        <tr>
            <td>*`+T.Locale.get('user','password','again')+`:</td>
            <td><input class="js-townsapi-online" type="password" name="password-again" autocomplete="off"></td>
        </tr>


        <tr>
            <td>`+T.Locale.get('user','email')+`:</td>
            <td><input class="js-townsapi-online" type="email" name="email" placeholder="`+T.Locale.get('user','email','placeholder')+`" value="@" autocomplete="on"></td>
        </tr>



        `+/*+`
        <tr>
            <th colspan="2">`+T.Locale.get('user','extended')+`</th>
        </tr>

        <tr>
            <td>`+T.Locale.get('user','name')+`:</td>
            <td><input type="text" name="name"></td>
        </tr>
        <tr>
            <td>`+T.Locale.get('user','surname')+`:</td>
            <td><input type="text" name="surname"></td>
        </tr>

        <tr>
            <td>`+T.Locale.get('user','birthday')+`:c</td>
            <td><input type="date" name="birthday"></td>
        </tr>

        <tr>
            <th colspan="2">`+T.Locale.get('user','description')+`</th>
        </tr>
        <tr>
            <td colspan="2"><textarea name="description" class="full"></textarea></td>
        </tr>

        `*/`

        <tr>
            <td colspan="2">
                <button style="width: 150px;">`+T.Locale.get('user','register')+`</button>
            </td>
        </tr>


    </table>





</div>









`
,function(page){

        $(page).find('input').change(function(e){

            r('changed');
            unsetInputError(this);

        });


        $(page).find('button').click(function(e){

            e.preventDefault();

            var data={};

            //todo form to json
            $(page).find('input').each(function(){


                if($(this).attr('type')=='submit')return;
                //r(this);

                var key=$(this).attr('name');
                key=key.split('-').join('_');

                r(key);

                data[key]=$(this).val();

            });


            //---------------------------------------------
            if(data.username.trim().length=== 0){


                setInputError($("input[name='username']")[0],T.Locale.get('user','username','missing'));
                $(page).find('.messages').html('<div class="error messagebox">'+T.Locale.get('user','username','missing')+'</div>');


            }else
            //---------------------------------------------
            if(!validateEmail(data.email)){


                setInputError($("input[name='email']")[0],T.Locale.get('user','email','wrong'));
                $(page).find('.messages').html('<div class="error messagebox">'+T.Locale.get('user','email','wrong')+'</div>');


            }else
            //---------------------------------------------
            if(data.password.length=== 0){

                setInputError($("input[name='password']")[0],T.Locale.get('user','password','missing'));
                $(page).find('.messages').html('<div class="error messagebox">'+T.Locale.get('user','password','missing')+'</div>');

            }else
            //---------------------------------------------
            if(data.password!==data.password_again){


                setInputError($("input[name='password-again']")[0],T.Locale.get('user','password','again','notsame'));
                $(page).find('.messages').html('<div class="error messagebox">'+T.Locale.get('user','password','again','notsame')+'</div>');


            }else
            //---------------------------------------------Register!
            if(true){



                $(page).find('button').html(T.Locale.get('loading')+' <i class="fa fa-spinner faa-spin animated"></i>');
                
                

                var password=data.password;
                delete data.password;
                delete data.password_again;

                T.TownsAPI.townsAPI.post('users',{
                    "profile": data,
                    "login_methods": {
                        password
                    },
                    "contacts": [],
                    "language" : "cs"//todo language
                },
                function(response){


                    T.TownsAPI.townsAPI.post('auth',{
                            "username": data.username,
                            "password": password
                        },
                        function(response){

                            $(page).find('button').html(T.Locale.get('user','login'));

                            T.Storage.save('token',response['x-auth']);
                            T.TownsAPI.townsAPI.token=response['x-auth'];
                            

                            T.UI.popupWindow.close();
                            T.UI.Status.logged();
                            loadObjectPrototypes();//todo should it be here?


                        },
                        function(response){

                            throw new Error('Cant login after registration.');

                        }
                    );
                    
                    

                },
                function(response){

                    $(page).find('button').html(T.Locale.get('user','register'));

                    setInputError($("input[name='username']")[0],T.Locale.get('user','username','taken'));
                    $(page).find('.messages').html('<div class="info messagebox">'+T.Locale.get('user','username','taken')+'</div>');

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

