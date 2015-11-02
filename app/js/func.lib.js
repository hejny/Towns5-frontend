

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
};

//======================================================================================================================

Math.sign = Math.sign || function(x) {
        x = +x; // convert to a number
        if (x === 0 || isNaN(x)) {
            return x;
        }
        return x > 0 ? 1 : -1;
    }

//-------------------------

function angleDiff(deg1,deg2){
    var a = deg1 - deg2;
    var a = (a + 180) % 360 - 180;
    return(a);
}

//-------------------------

function rad2deg(radians){
    return(radians * (180/Math.PI));
}

//-------------------------

function deg2rad(degrees){
    return(degrees * (Math.PI/180));
}

//-------------------------

function xy2dist(x,y){
    return(Math.sqrt(Math.pow(x,2)+Math.pow(y,2)));
}


//-------------------------

function xy2distDeg(x,y){

    var output={};

    output['dist'] = xy2dist(x,y);
    output['deg'] = rad2deg(Math.atan2(y,x));

    return(output);

}

//-------------------------

function distDeg2xy(dist,deg){

    var rad=deg2rad(deg);

    var output={};

    output['x'] = Math.cos(rad)*dist;
    output['y'] = Math.sin(rad)*dist;

    return(output);

}

//-------------------------

function xyRotate(x,y,deg){

    //nevyuzivam funkce xy2distDeg a distDeg2xy, abych nedelal zbytecny prevod do stupnu a spatky
    var dist = xy2dist(x,y);
    var rad = Math.atan2(y,x);

    rad += deg2rad(deg);

    var output={};
    output['x'] = Math.cos(rad)*dist;
    output['y'] = Math.sin(rad)*dist;

    return(output);

}

//======================================================================================================================

//todo stejny prevod string na int v celem projektu
//todo vyhledat v projektu, kde by se to dalo pouzit a nahradit

function toFloat(value,defval){

    if(typeof(value)==='undefined')return(defval);

    value=parseFloat(value);
    if(value===NaN){
        return(defval);
    }else{
        return(value);
    }

}

//----------------------------------------------------------


function toInt(value,defval){

    if(typeof(value)==='undefined')return(defval);

    value=parseInt(value);
    if(value===NaN){
        return(defval);
    }else{
        return(value);
    }

}

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

//======================================================================================================================PHP like functions

//todo ??Refector to native JS

function explode(delimiter,str){
    return(str.split(delimiter));
}


function implode(delimiter,str){
    return(str.join(delimiter));
}


function str_replace(from,to,str){
    return(str.split(from).join(to));
}

function count(str){
    return(str.length);
}

function strlen(str) {
    return(str.length);
}

function substr(str,start,len) {
    return (str.substr(start,len));
}

function strpos(haystack,needle) {

    var pos=haystack.indexOf(needle);
    if(pos==-1)pos=false;

    return (pos);
}

function round(num) {
    return (Math.round(num));
}


//----------------------------------------------------------From Towns4 converted from php to js


function substr2(input,a,b,i,change,startstop){

    if(typeof i=='undefined')i=0;
    if(typeof change=='undefined')change=false;//todo [PH] zprovoznit change
    if(typeof startstop=='undefined')startstop=true;


    /*if(!startstop){
        var start=strlen(a);
        var stop=strlen(b);
    }else{
        var start=0;
        var stop=0;
    }*/

    //--------------------------------------

    var string=input;
    var aLen=strlen(a);

    //--------------------------------------Posun o prislusny pocet vyskytu dany v i
    var p=0;
    for(var ii=0;ii<i;ii++){
        var pp=strpos(string,a)+1;
        p=p+pp;
        string=substr(string,pp);
    }


    //--------------------------------------Pozice zacatku

    var aPos=strpos(string,a);

    //--------------------------------------


    if(aPos!==false){
        //--------------------------------------
        string=substr(string,aPos+aLen);//Oriznuti stringu na 'hledane)blablabla'
        var bPos=strpos(string,b);

        string=substr(string,0,bPos);//Oriznuti stringu na 'hledane'

        /*if(change!=false){

            inner=substr(input,aPos+aLen+p,bPos);
            input=substr_replace(input,change,aPos+aLen+p-start,bbPos+stop+start);//b-a-aa
            ???input=str_replace("[]",inner,input);
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