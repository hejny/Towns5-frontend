//todo headers


$(function(){


    r('Checking browser compatibility');
    if(TOWNS.UI.Compatibility.check()!== true){

        r('NOT COMPATIBLE',TOWNS.UI.Compatibility.check());

        var message = new TOWNS.UI.Message(
            TOWNS.Locale.get('ui warnings compatibility'),'WARNING',
            `<button class="micro-button" onclick="TOWNS.Plugins.open('browser-compatibility')" >` + TOWNS.Locale.get('ui','buttons','compatibility')+`</button>`
        );

        r(message);

    }


});
