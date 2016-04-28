/**
 * @author ©Towns.cz
 * @fileOverview Creates User interface functions
 */
//======================================================================================================================


T.UI=class {


    /**
     * @returns {boolean} is user focused on map
     */
    static focusOnMap() {
        return (!(window_opened || ['INPUT', 'TEXTAREA'].indexOf(document.activeElement.tagName) != -1));
    };

    
    

    /**
     * @param text
     * @param type error,success,info
     */
    static message(text, type = 'info') {

        //todo [PH] play sound here

        ion.sound.play("bell_ring");

        $('#message_inner')
            .removeClass()//.error, .success, .info, .loading
            .addClass(type)
            .text(text);


        $('#message').stop().show();
        $('#message').delay(4).fadeOut(MESSAGE_MS);//todo what effect use

    };

    
    //todo refactor use this below
    /**
     * @param text
     */
    static error(text) {
        T.UI.message(text, 'error');
    };
    /**
     * @param text
     */
    static success(text) {
        T.UI.message(text, 'success');
    };
    
    
    /**
     * @param text
     */
    static info(text) {
        T.UI.message(text, 'info');
    };


    /**
     * Change T.UI after login / logout / register
     */
    static logged() {

        T.TownsAPI.townsAPI.isLogged(function (is) {

            //alert(is);
            if (is) {

                $('.logged-in').stop().fadeIn();
                $('.logged-out').stop().fadeOut();


                var decoded_token = jwt_decode(T.TownsAPI.townsAPI.token);
                //r(decoded_token);

                T.UI.message(T.Locale.get('logged in as') + ' ' + decoded_token.username, 'success');


                var user_html = `
            <div id="user-profile"></div>
            <button onclick="if(confirm(T.Locale.get('logout','confirm'))){T.TownsAPI.townsAPI.token=false;T.Storage.delete('token');T.UI.logged();}">
                ` + T.Locale.get('ui user logout') + `
            </button>`;

                $('#menu-top-popup-user').find('.content').html(user_html);


                T.TownsAPI.townsAPI.get(
                    'users/' + decoded_token.id
                    , {}
                    , function (response) {


                        if (!window.is(response.profile)) {

                            r('Cant get user profile after login.');//todo better
                            return;

                        }

                        var email_md5 = md5(response.profile.email);
                        var user_profile_html = `

                    <img class="user-image" src="https://1.gravatar.com/avatar/` + email_md5 + `?s=200&r=pg&d=mm">
                    <h1 class="user-name">` + response.profile.username + `</h1>


                    `;

                        $('#user-profile').html(user_profile_html);

                    }
                    , function () {

                        throw new Error('Cant get user info after login.');

                    }
                );


            } else {

                //T.UI.message(T.Locale.get('logged out'),'info');

                $('.logged-in').stop().fadeOut();
                $('.logged-out').stop().fadeIn();

            }

        });

    };


};