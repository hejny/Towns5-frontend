//todo headers


$(function(){


    r('Checking browser compatibility');
    if(T.UI.Compatibility.check()!== true){

        r('NOT COMPATIBLE',T.UI.Compatibility.check());

        var message = new T.UI.Message(
            T.Locale.get('ui warnings compatibility'),'WARNING',
            `<button class="micro-button" onclick="T.Plugins.open('browser-compatibility')" >` + T.Locale.get('ui','buttons','compatibility')+`</button>`
        );

        r(message);

    }


});
