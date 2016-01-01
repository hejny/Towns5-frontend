/**
 * @author Towns.cz
 * @fileOverview Conditions of the game - this file is shared between Frontend and Backend.
 */
//======================================================================================================================



var Game = module.exports = {};


Game.functions={};
Game.coefficients={};

Game.functions.actions={};
Game.coefficients.actions={};


Game.coefficients.create={
    wood: 0.5,
    stone: 0.5
};


/**
 * Simulate result of building object
 * @param object
 * @return {object} Action result //todo class action result
 */
Game.functions.create=function(object){
    return(false);
};
