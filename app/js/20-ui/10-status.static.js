/**
 * @author ©Towns.cz
 * @fileOverview Creates User interface functions
 */
//======================================================================================================================
T.setNamespace('UI');



T.UI.Status=class {



    /**
     * @returns {boolean} is user focused on map
     */
    static focusOnMap() {
        return (!(window_opened || ['INPUT', 'TEXTAREA'].indexOf(document.activeElement.tagName) != -1));
    }





    //todo maybe collision with isLogged????
    /**
     * Change T.UI after login / logout / register
     */
    static logged(callback=false) {

        T.TownsAPI.townsAPI.isLogged(function (is) {

            //alert(is);
            if (is) {

                $('.logged-in').stop().fadeIn();
                $('.logged-out').stop().fadeOut();


                var decoded_token = jwt_decode(T.TownsAPI.townsAPI.token);
                //r(decoded_token);

                T.UI.Message.success(T.Locale.get('logged in as') + ' ' + decoded_token.username);


                var user_html = `
                    <div id="user-profile"></div>
                    <button onclick="if(confirm(T.Locale.get('logout','confirm'))){T.TownsAPI.townsAPI.token=false;T.Storage.delete('token');T.UI.Status.logged();}">
                        ` + T.Locale.get('ui user logout') + `
                    </button>
                    <button onclick="T.Plugins.open('user-settings');">` + T.Locale.get('ui user settings') + `</button>
                `;

                $('#menu-top-popup-user').find('.content').html(user_html);


                T.TownsAPI.townsAPI.get(
                    'users/' + decoded_token.id
                    , {}
                    , function (response) {


                        if (!window.is(response.profile)) {

                            r('Cant get user profile after login.');//todo better
                            return;

                        }

                        T.User.me = response;

                        //r(T.User.me.profile.birthday,new Date(T.User.me.profile.birthday));
                        T.User.me.profile.birthday=new Date(T.User.me.profile.birthday);

                        var email_md5 = md5(T.User.me.profile.email);
                        var user_profile_html = `

                    <img class="user-image" src="https://1.gravatar.com/avatar/` + email_md5 + `?s=200&r=pg&d=mm">
                    <h1 class="user-name">` + T.User.me.profile.username + `</h1>


                    `;

                        $('#user-profile').html(user_profile_html);


                        if(callback)callback(true);


                    }
                    , function () {

                        throw new Error('Cant get user info after login.');

                    }
                );


            } else {

                //T.UI.Message.message(T.Locale.get('logged out'),'info');

                $('.logged-in').stop().fadeOut();
                $('.logged-out').stop().fadeIn();


                if(callback)callback(false);


            }

        });

    }



};