/**
 * @author ©Towns.cz
 * @fileOverview Information about offline mode
 */
//======================================================================================================================



TOWNS.Plugins.install(new TOWNS.Plugins.Page(
    'offline',
    TOWNS.Locale.get('page','offline'),
    `

 Omlouváme se, ale pravděpodobně na našem serveru nastala chyba. Hra je zatím v testovacím módu a proto na ní musíme neustále mnoho věcí ladit a opravovat. Pokud se chcete vrátit, až bude hra zcela funkční, <a href="#" class="js-popup-window-open" page="home" onclick="TOWNS.Plugins.open('feedback')">přihlašte se do našeho newsletteru na stránce o hře</a>. Tak nás můžete sledovat přes

    <a href="https://www.facebook.com/townsgame/" target="_blank">Facebook</a> nebo
    <a href="https://twitter.com/townsgame" target="_blank">Twitter</a>

    `
    ,function(){


    },
    undefined,
    'SMALL'
));

