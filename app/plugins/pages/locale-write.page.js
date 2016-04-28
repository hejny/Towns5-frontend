/**
 * @author Towns.cz
 * @fileOverview Page for writing new locale messages
 */
//======================================================================================================================



T.Plugins.install(new T.Plugins.Page(
    'locale-write',
    'T.Locale',
    `<iframe src="" width="100%" height="100%" frameborder="0" scrolling="0" id="locale-write-iframe"></iframe>`,
    function(){


        var url;

        url=appDir+'/php/locale-write.php?language='+language+'&keys='+T.Locale.keys_write.join(',');
        T.Locale.keys_write=[];


        $('#locale-write-iframe').attr('src',url);

        $('#locale-write-count').html('0');



    }
));


