//todo headers


var MESSAGES={};

if(!is(LANGUAGE))throw 'LANGUAGE not set';


$.getScript( appDir+'/php/locale.php?LANGUAGE='+LANGUAGE )
    .done(function( script, textStatus ) {


        r( 'language file loaded' );
        r(MESSAGES);


    })
    .fail(function( jqxhr, settings, exception ) {


        throw('cant load language file');


    });



function changeLanguage(LANGUAGE){
    setCookie('LANGUAGE',LANGUAGE);
    location.reload();
}