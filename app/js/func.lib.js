/**

     ███████╗██╗   ██╗███╗   ██╗ ██████╗
     ██╔════╝██║   ██║████╗  ██║██╔════╝
     █████╗  ██║   ██║██╔██╗ ██║██║
     ██╔══╝  ██║   ██║██║╚██╗██║██║
     ██║     ╚██████╔╝██║ ╚████║╚██████╗
     ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝
     © Towns.cz

 * @fileOverview Various functions eg. Math functions, html functions, PHP-like functions

 */


//======================================================================================================================

function htmlEncode(value){
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}


function htmlDecode(value){
    return $('<div/>').html(value).text();
}

//======================================================================================================================

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

//======================================================================================================================
/*
 ███╗   ███╗ █████╗ ████████╗██╗  ██╗
 ████╗ ████║██╔══██╗╚══██╔══╝██║  ██║
 ██╔████╔██║███████║   ██║   ███████║
 ██║╚██╔╝██║██╔══██║   ██║   ██╔══██║
 ██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║
 ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
 */


Math.sign = Math.sign || function(x) {
        x = +x; // convert to a number
        if (x === 0 || isNaN(x)) {
            return x;
        }
        return x > 0 ? 1 : -1;
};

//-------------------------

Math.angleDiff = function(deg1,deg2){
    var a = deg1 - deg2;
    var a = (a + 180) % 360 - 180;
    return(a);
};

//-------------------------

Math.rad2deg = function(radians){
    return(radians * (180/Math.PI));
};

//-------------------------

Math.deg2rad = function(degrees){
    return(degrees * (Math.PI/180));
};

//-------------------------

Math.xy2dist = function(x,y){
    return(Math.sqrt(Math.pow(x,2)+Math.pow(y,2)));
};


//-------------------------

Math.xy2distDeg = function(x,y){

    var output={};

    output['dist'] = Math.xy2dist(x,y);
    output['deg'] = Math.rad2deg(Math.atan2(y,x));

    return(output);

};

//-------------------------

Math.distDeg2xy = function(dist,deg){

    var rad=Math.deg2rad(deg);

    var output={};

    output['x'] = Math.cos(rad)*dist;
    output['y'] = Math.sin(rad)*dist;

    return(output);

};

//-------------------------

Math.xyRotate = function(x,y,deg){

    //nevyuzivam funkce Math.xy2distDeg a Math.distDeg2xy, abych nedelal zbytecny prevod do stupnu a spatky
    var dist = Math.xy2dist(x,y);
    var rad = Math.atan2(y,x);

    rad += Math.deg2rad(deg);

    var output={};
    output['x'] = Math.cos(rad)*dist;
    output['y'] = Math.sin(rad)*dist;

    return(output);

};

//======================================================================================================================

//todo stejny prevod string na int v celem projektu
//todo vyhledat v projektu, kde by se to dalo pouzit a nahradit

Math.toFloat = function(value,defval){

    if(typeof(value)==='undefined')return(defval);

    value=parseFloat(value);
    if(value===NaN){
        return(defval);
    }else{
        return(value);
    }

};

//----------------------------------------------------------


Math.toInt = function(value,defval){

    if(typeof(value)==='undefined')return(defval);

    value=parseInt(value);
    if(value===NaN){
        return(defval);
    }else{
        return(value);
    }

};

//======================================================================================================================
/*
 ████████╗██╗   ██╗██████╗ ███████╗███████╗
 ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
    ██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
    ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
    ██║      ██║   ██║     ███████╗███████║
    ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝
 */

//----------------------------------------------------------is


//todo nahradit vsechny takovahle zjistovani touhle funkci
//todo jsdoc
//todo test TDD
//todo funguje !is na NaN apod?
//todo ?? nemelo by [undefined] take vracet ze je to !is
function is(val){


    if(typeof(val)==='undefined')return false;

    if(val===false)return false;

    if(val===NaN)return false;
    if(val===null)return false;
    if(val===0)return false

    if(val==='')return false;

    if(val===[])return false;
    if(val==={})return false;

    if(typeof(val)==='object')if(val.length===0)return false;


    return true;

}

//--------------------cParam

function cParam(value,def){

    if(typeof value==='undefined'){
        return(def);
    }else{
        return(value);
    }

}

//----------------------------------------------------------

//todo vymyslet jak ???? pripadne odstranit
function isNotType(val){


    if(typeof(val)==='undefined')return 'undefined';

    if(val===false)return 'false';

    if(val===NaN)return 'NaN';
    if(val===0)return '0';

    if(val==='')return "''";

    if(val===[])return '[]';
    if(val==={})return '{}';

    if(typeof(val)==='object')if(val.length===0)return 'length=0';

    return 'Var is defined.';

}

//----------------------------------------------------------

function deepCopy(oldObject){

    //todo je to spravne?
    if (typeof oldObject=='object') {
        // Shallow copy
        //var newObject = jQuery.extend({}, oldObject);

        // Deep copy
        var newObject = jQuery.extend(true, {}, oldObject);

            return(newObject);
    }else{
        return(oldObject);

    }

}

//======================================================================================================================
/*
 ███████╗████████╗██████╗ ██╗███╗   ██╗ ██████╗
 ██╔════╝╚══██╔══╝██╔══██╗██║████╗  ██║██╔════╝
 ███████╗   ██║   ██████╔╝██║██╔██╗ ██║██║  ███╗
 ╚════██║   ██║   ██╔══██╗██║██║╚██╗██║██║   ██║
 ███████║   ██║   ██║  ██║██║██║ ╚████║╚██████╔╝
 ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝
 */


function substr2(input,a,b,i,change,startstop){

    if(typeof i=='undefined')i=0;
    if(typeof change=='undefined')change=false;//todo [PH] zprovoznit change
    if(typeof startstop=='undefined')startstop=true;


    /*if(!startstop){
        var start=php.strlen(a);
        var stop=php.strlen(b);
    }else{
        var start=0;
        var stop=0;
    }*/

    //--------------------------------------

    var string=input;
    var aLen= a.length;

    //--------------------------------------Posun o prislusny pocet vyskytu dany v i
    var p=0;
    for(var ii=0;ii<i;ii++){

        var pp=string.indexOf(a)+1;
        p=p+pp;
        string=string.substr(pp);

    }


    //--------------------------------------Pozice zacatku

    var aPos=a.indexOf(string);

    //--------------------------------------


    if(aPos!==-1){
        //--------------------------------------
        string=string.substr(string,aPos+aLen);//Oriznuti stringu na 'hledane)blablabla'
        var bPos=b.indexOf(string);

        string=string.substr(string,0,bPos);//Oriznuti stringu na 'hledane'

        /*if(change!=false){

            inner=substr(input,aPos+aLen+p,bPos);
            input=subphp.split('').join(input,change,aPos+aLen+p-start,bbPos+stop+start);//b-a-aa
            ???input=php.split('').join("[]",inner,input);
        }//průser v akcentu*/



        //if(change)return(input);
        return(string);
        //--------------------------------------
    }else{
        //--------------------------------------
        //if(change)return(input);//Nic se (uz) nenahradilo
        return(false);//Nic (uz) nebylo nalezeno
        //--------------------------------------
    }
}