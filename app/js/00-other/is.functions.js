/**
 * @author ©Towns.cz
 * @fileOverview Creates typing functions
 */
//======================================================================================================================


//todo should it be Types object with static functions?


//----------------------------------------------------------is


//todo nahradit vsechny takovahle zjistovani touhle funkci
//todo jsdoc
function isDefined(val){
    if(typeof(val)==='undefined')return false;
    return true;

}

//----------------------------------------------------------is


//todo nahradit vsechny takovahle zjistovani touhle funkci
//todo jsdoc
//todo test TDD
//todo funguje !is na NaN apod?
//todo ?? nemelo by [undefined] take vracet ze je to !is
function is(val){


    if(typeof(val)==='undefined')return false;

    if(val=== false)return false;

    if(typeof(val)==='number' && isNaN(val))return false;
    if(val===null)return false;
    if(val=== 0)return false;

    if(val==='')return false;

    if(val===[])return false;
    if(val==={})return false;

    if(typeof(val)==='object')if(val.length=== 0)return false;


    return true;

}

