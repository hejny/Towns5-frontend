function r(){


    if(arguments.length==1){

        console.log(arguments[0]);

    }else{

        var arg=[];
        for(var i= 0,l=arguments.length;i<l;i++){
            arg.push(arguments[i]);
        }
        console.log(arg);
    }
}

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


function angleDiff(deg1,deg2){
    var a = deg1 - deg2;
    var a = (a + 180) % 360 - 180;
    return(a);
}

function rad2deg(radians){
    return(radians * (180/Math.PI));
}

function deg2rad(degrees){
    return(degrees * (Math.PI/180));
}

function xy2dist(a,b){
    return(Math.sqrt(Math.pow(a,2)+Math.pow(b,2)));
}

//======================================================================================================================

//todo nahradit vsechny takovahle zjistovani touhle funkci
//todo jsdoc
//todo test TDD
function isNot(val){


    if(typeof(val)==='undefined')return true;

    if(val===false)return true;

    if(val===NaN)return true;
    if(val===0)return true;

    if(val==='')return true;

    if(val===[])return true;
    if(val==={})return true;

    if(typeof(val)==='object')if(val.length===0)return true;


    return false;

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

    // Shallow copy
    //var newObject = jQuery.extend({}, oldObject);

    // Deep copy
    var newObject = jQuery.extend(true, {}, oldObject);

    return(newObject);
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