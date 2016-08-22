/**
 * @author ©Towns.cz
 * @fileOverview Creates User interface functions
 */
//======================================================================================================================
TOWNS.setNamespace('UI');



TOWNS.UI.Status=class {



    /**
     * @returns {boolean} is user focused on map
     */
    static focusOnMap() {
        return (!(window_opened || ['INPUT', 'TEXTAREA'].indexOf(document.activeElement.tagName) != -1));
    }





    //todo maybe collision with isLogged????
    /**
     * Change TOWNS.UI after login / logout / register
     */
    static logged(callback=false) {

        TOWNS.TownsAPI.townsAPI.isLogged(function (is) {

            //alert(is);
            if (is) {

                $('.logged-in').stop().fadeIn();
                $('.logged-out').stop().fadeOut();


                var decoded_token = jwt_decode(TOWNS.TownsAPI.townsAPI.token);
                //r(decoded_token);

                //TOWNS.UI.Message.success(TOWNS.Locale.get('logged in as') + ' ' + decoded_token.username);


                var user_html = `
                    <div id="user-profile"></div>
                    <button onclick="if(confirm(TOWNS.Locale.get('logout','confirm'))){TOWNS.TownsAPI.townsAPI.token=false;TOWNS.Storage.delete('token');TOWNS.UI.Status.logged();}">
                        ` + TOWNS.Locale.get('ui user logout') + `
                    </button>
                    <button onclick="TOWNS.Plugins.open('user-settings');">` + TOWNS.Locale.get('ui user settings') + `</button>
                `;

                $('#menu-top-popup-user').find('.content').html(user_html);


                TOWNS.TownsAPI.townsAPI.get(
                    'users/' + decoded_token.id
                    , {}
                    , function (response) {


                        if (!window.is(response.profile)) {

                            r('Cant get user profile after login.');//todo better
                            return;

                        }

                        TOWNS.User.me = response;

                        //r(TOWNS.User.me.profile.birthday,new Date(TOWNS.User.me.profile.birthday));
                        TOWNS.User.me.profile.birthday=new Date(TOWNS.User.me.profile.birthday);

                        var email_md5 = md5(TOWNS.User.me.profile.email);
                        var user_profile_html = `

                    <img class="user-image" src="https://1.gravatar.com/avatar/` + email_md5 + `?s=200&r=pg&d=mm">
                    <h1 class="user-name">` + TOWNS.User.me.profile.username + `</h1>


                    `;

                        $('#user-profile').html(user_profile_html);


                        if(callback)callback(true);


                    }
                    , function () {

                        throw new Error('Cant get user info after login.');

                    }
                );


            } else {

                //TOWNS.UI.Message.message(TOWNS.Locale.get('logged out'),'info');

                $('.logged-in').stop().fadeOut();
                $('.logged-out').stop().fadeIn();


                if(callback)callback(false);


            }

        });

    }



};