/**
 * Created by Pavel on 11.09.2015.
 */


var locale={};

var lang='cs';


function l(a,b,c,e,f){

    var params=[];

    //todo Jde to vyresit i jinak?
    if(typeof a!='undefined')params.push(a);
    if(typeof b!='undefined')params.push(b);
    if(typeof c!='undefined')params.push(c);
    if(typeof d!='undefined')params.push(d);
    if(typeof e!='undefined')params.push(e);


    var value=locale[lang];
    for(var i= 0,l=params.length;i<l;i++){

        if(typeof value[params[i]]!='undefined')
            value=value[params[i]];

    }

    return(value);

}