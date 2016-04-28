/**
 * @author ©Towns.cz
 * @fileOverview Towns API Wrapper
 */
//======================================================================================================================token




var TownsAPI = class {


    constructor(url = '', token = false) {

        this.online = false;
        this.url = url;
        this.token = token;

        //Empty query to check if the API is online
        this.query('', {}, 'GET', {}, {});


    };


//======================================================================================================================


    //todo jsdoc
    setOnline(online) {


        var self = this;

        this.online = online;

        if (online) {

            $('#townsapi-offline').stop().fadeOut();//todo refactor DI HTML divs or !!!BETTER!!! DI calbacks online, offline and loading

            $('#server-loading').hide();
            $('#server-ok').show();
            $('#server-error').hide();

            $('button.js-townsapi-online').animate({opacity: 1});


        } else {

            $('#townsapi-offline').stop().fadeIn();

            $('#server-loading').hide();
            $('#server-ok').hide();
            $('#server-error').show();

            $('button.js-townsapi-online').animate({opacity: 0.4});


            var townsapi_reconnect = $('#townsapi-reconnect');

            if (townsapi_reconnect.hasClass('js-running'))return;

            townsapi_reconnect.unbind('click').bind('click', function () {

                clearInterval(interval);
                townsapi_reconnect.removeClass('js-running');

                $(this).html(Locale.get('ui buttons reconnecting').text2html() + '&nbsp;<i class="fa fa-spinner faa-spin animated"></i>');

                //Empty query to check if the API is online
                self.query('', {}, 'GET', {}, {});//todo duplicate


            });

            var counter = 15;

            townsapi_reconnect.html(Locale.get('ui buttons reconnect').text2html() + '&nbsp(<span class="js-counter">' + counter + '</span>)');
            townsapi_reconnect.addClass('js-running');


            var townsapi_reconnect_counter = townsapi_reconnect.find('.js-counter');

            var interval = setInterval(function () {

                counter--;
                r(counter);

                if (counter > 0) {

                    townsapi_reconnect_counter.text(counter);

                } else {

                    townsapi_reconnect.trigger('click');

                }


            }, 1000);
        }

    };


//======================================================================================================================


    //todo jsdoc
    isLogged(callback) {
        return this.query('auth', {}, 'GET', {}, {},
            function (response) {
                if (isDefined(response.status)) {
                    callback(true)
                } else {
                    callback(false)
                }
            },
            function (response) {
                //r(response);
                callback(false);
            }
        );
    };


//======================================================================================================================

    /**
     * @private
     * @param uri //todo this param should be with /
     * @param method
     * @param data
     * @param headers
     * @param callback_success
     * @param callback_error
     * @returns {object} jQuery $.ajax
     */
    query(uri, query_data, method, data, headers, callback_success = false, callback_error = false) {

        //r(this.url+uri);
        //r(data);
        var self = this;

        if (this.token)headers['x-auth'] = this.token;


        var query_data_string = '';
        var query_separator = '?';

        for (var key in query_data) {

            var value = query_data[key];

            if (value instanceof Array) {
                value = value.join(',');
            }

            value = encodeURIComponent(value);

            query_data_string += query_separator + key + '=' + value;

            query_separator = '&';

        }

        //r(headers);

        var request = $.ajax({
            type: method,
            url: this.url + uri + query_data_string,
            //crossDomain: true,
            headers: headers,
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(data),
            dataType: 'json',
            timeout: 7000
        });

        //r(request);

        //r('sended');

        $('#server-loading').show();
        $('#server-ok').hide();
        $('#server-error').hide();


        request.done(function (response) {

            self.setOnline(true);

            if (callback_success)
                callback_success(response);
        });


        request.fail(function (jqXHR, textStatus) {

            //r(jqXHR.status,jqXHR);

            if (jqXHR.status === 0 && textStatus === 'error') {

                self.setOnline(false);


                if (callback_success)
                    callback_success([]);


            } else {

                self.setOnline(true);

                if (callback_error)
                    callback_error(jqXHR.responseJSON);
                //r('error');
                //throw new Error(textStatus);


            }

        });


        //r('sended');
        //----------------------

        return (request);


    };


//=================================================

    /**
     *
     * @param uri
     * @param data
     * @param callback_success
     * @param callback_error
     * @returns {object} jQuery $.ajax
     */

    get(uri, query_data, callback_success, callback_error) {

        return this.query(uri, query_data, 'GET', {}, {}, callback_success, callback_error);

    };

    /**
     *
     * @param uri
     * @param data
     * @param callback_success
     * @param callback_error
     * @returns {object} jQuery $.ajax
     */
    post(uri, object, callback_success, callback_error) {

        var callback_success_wrapped;

        //----------------------------------------
        if (uri == 'objects/prototypes') {
            //--------------------
            callback_success_wrapped = function (response) {

                r('Updating object prototype id after server response from ' + object.id + ' to ' + response.prototypeId);


                object_prototypes.setById(response.prototypeId, response);

                if (callback_success)
                    callback_success(response);

            };
            //--------------------
        } else {
            //--------------------
            callback_success_wrapped = function (response) {

                if (callback_success)
                    callback_success(response);

            };
            //--------------------
        }
        //----------------------------------------


        //r('API',JSON.stringify(object));
        return this.query(uri, {}, 'POST', object, {}, callback_success_wrapped, callback_error);


    }

    /**
     *
     * @param uri
     * @param callback_success
     * @param callback_error
     * @returns {Object}
     */
    delete(uri, callback_success, callback_error) {

        return this.query(uri, {}, 'DELETE', {}, {}, callback_success, callback_error);

    }


};