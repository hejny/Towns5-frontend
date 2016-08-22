


/**
 * @author ©Towns.cz
 * @fileOverview Login page
 */
//======================================================================================================================



TOWNS.Plugins.install(new TOWNS.Plugins.Page(
    'user-settings',
    TOWNS.Locale.get('page','user_settings'),
    `


    <div class="full-loading">
        <div style="display: inline-block;color: #a0cadb;" class="la-ball-atom la-3x">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

    </div>


<div class="form-big">


    <table>

        <tr>
            <td class="messages" colspan="2"></td>
        </tr>


        <tr>
            <th colspan="2">`+TOWNS.Locale.get('user','basic')+`</th>
        </tr>




        <tr>
            <td>`+TOWNS.Locale.get('user','username')+`:</td>
            <td><input class="js-townsapi-online" type="text" name="username" placeholder="`+TOWNS.Locale.get('user','username','placeholder')+`" value="" disabled="disabled" autocomplete="off"></td>
        </tr>



        <tr>
            <td>`+TOWNS.Locale.get('user','email')+`:</td>
            <td><input class="js-townsapi-online" type="email" name="email" placeholder="`+TOWNS.Locale.get('user','email','placeholder')+`" value="@" autocomplete="on"></td>
        </tr>




     <tr>
     <th colspan="2">`+TOWNS.Locale.get('user','extended')+`</th>
     </tr>

     <tr>
     <td>`+TOWNS.Locale.get('user','name')+`:</td>
     <td><input type="text" name="name"></td>
     </tr>
     <tr>
     <td>`+TOWNS.Locale.get('user','surname')+`:</td>
     <td><input type="text" name="surname"></td>
     </tr>

     <tr>
     <td>`+TOWNS.Locale.get('user','birthday')+`:</td>
     <td><input type="text" name="birthday"></td>
     </tr>

     <tr>
     <th colspan="2">`+TOWNS.Locale.get('user','description')+`</th>
     </tr>
     <tr>
     <td colspan="2"><textarea name="description" class="full"></textarea></td>
     </tr>

     <tr>
     <th colspan="2">`+TOWNS.Locale.get('user','signature')+`</th>
     </tr>
     <tr>
     <td colspan="2"><textarea name="signature" class="full"></textarea></td>
     </tr>


    <tr>
        <td colspan="2">
            <button style="width: 150px;">`+TOWNS.Locale.get('user','update')+`</button>
        </td>
    </tr>




    </table>


<div>








`
    ,function(page){




        TOWNS.UI.Status.logged(function(logged){

            if(!logged){
                TOWNS.UI.popupWindow.close();
                TOWNS.Plugins.open('register');
                return;
            }




            r(TOWNS.User.me);
            $(page).find("input[name='username']").val(TOWNS.User.me.profile.username);
            $(page).find("input[name='email']").val(TOWNS.User.me.profile.email);
            $(page).find("input[name='name']").val(TOWNS.User.me.profile.name);
            $(page).find("input[name='surname']").val(TOWNS.User.me.profile.surname);
            $(page).find("input[name='birthday']").val(
                (TOWNS.User.me.profile.birthday.getDay()+1)+'.'+(TOWNS.User.me.profile.birthday.getMonth()+1)+'.'+TOWNS.User.me.profile.birthday.getFullYear()
            );
            $(page).find("textarea[name='description']").val(TOWNS.User.me.profile.description);
            $(page).find("textarea[name='signature']").val(TOWNS.User.me.profile.signature);







            $(page).find(".full-loading").hide();







            $(page).find('input').change(function(e){

                r('changed');
                unsetInputError(this);

            });




            $(page).find('button').click(function(e){

                e.preventDefault();


                $(page).find('.messages').html('');


                //---------------------------------------------

                var data={};

                //todo form to json
                $(page).find('input').each(function(){


                    if($(this).attr('type')=='submit')return;
                    //r(this);

                    var key=$(this).attr('name');
                    key=key.split('-').join('_');

                    data[key]=$(this).val();

                });

                $(page).find('textarea').each(function(){


                    var key=$(this).attr('name');
                    key=key.split('-').join('_');

                    data[key]=$(this).val();

                });


                data.birthday=data.birthday.trim();
                //if(data.birthday!==''){
                    data.birthday=dateFromDotString(data.birthday);
                //}




                //---------------------------------------------
                if(data.username.trim().length=== 0){


                    setInputError($("input[name='username']")[0],TOWNS.Locale.get('user','username','missing'));
                    $(page).find('.messages').html('<div class="error messagebox">'+TOWNS.Locale.get('user','username','missing')+'</div>');


                }else
                //---------------------------------------------
                if(!validateEmail(data.email)){


                    setInputError($("input[name='email']")[0],TOWNS.Locale.get('user','email','wrong'));
                    $(page).find('.messages').html('<div class="error messagebox">'+TOWNS.Locale.get('user','email','wrong')+'</div>');


                }else
                //---------------------------------------------
                if(data.birthday===false){

                    r(data.birthday,isValidDate(data.birthday));

                    setInputError($("input[name='birthday']")[0],TOWNS.Locale.get('user','birthday','wrong'));
                    $(page).find('.messages').html('<div class="error messagebox">'+TOWNS.Locale.get('user','birthday','wrong')+'</div>');


                }else
                //---------------------------------------------Update!
                if(true){



                    $(page).find('button').html(TOWNS.Locale.get('loading')+' <i class="fa fa-spinner faa-spin animated"></i>');


                    r(data);



                    TOWNS.TownsAPI.townsAPI.post('users/'+TOWNS.User.me._id,{
                            "profile": data,
                        },
                        function(response){

                            $(page).find('button').html(TOWNS.Locale.get('user','update'));


                        },
                        function(response){


                            r(response);

                            $(page).find('button').html(TOWNS.Locale.get('user','update'));

                            setInputError($("input[name='username']")[0],TOWNS.Locale.get('user','username','taken'));
                            $(page).find('.messages').html('<div class="info messagebox">'+TOWNS.Locale.get('user','username','taken')+'</div>');

                        }
                    );


                    //---------------------------------------------
                }

            });


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
    'VERTICAL'
));

