//todo header



//======================================================================================================================


/**
 * Towns event tracking system
 * @author PH
 * @param {string} category eg. function, ui,..
 * @param {string} action eg. terrain changing, TOWNS.UI.Menu.dismantling,...
 * @param additional params eg. t10, building_market,...
 */
function trackEvent(category, action , additional){

    r('Tracked event '+category+' / '+action+' !');


    ga('send', 'event', category, action /*'Fall Campaign'*/);



}



