/**
 * @author Towns.cz
 * @fileOverview Towns API initialization
 */
//======================================================================================================================


townsAPI = new TownsAPI(TOWNS_API_URL,Storage.load('token'));
//townsAPI = new TownsAPIOffline();


$(function(){//todo maybe in other file

    UI.logged();

});
