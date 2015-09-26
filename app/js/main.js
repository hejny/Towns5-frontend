

//======================================================================================================================


function r(){
    for(var i= 0,l=arguments.length;i<l;i++)
        console.log(arguments[i]);
}


function htmlEncode(value){
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

function htmlDecode(value){
    return $('<div/>').html(value).text();
}



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


var baseurl='http://towns.local';

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~env

var env_template=[
    'debug',
    'onlymap',
    'restart'

];

var env=[];



var query=location.search;
query=query.substring(1);
query=query.split('&');




for(var i=0;i<env_template.length;i++){


    if($.inArray(env_template[i],query)!=-1){
        env.push(env_template[i]);
    }

}



var query_new;
query_new=env.join('&');


if(query_new!='')query_new='?'+query_new;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~pathname

var pathname_new=[];


var pathname=location.pathname;
pathname=pathname.split('/');


for(var i=0;i<pathname.length;i++){
    if(pathname[i]!=''){
        //@todo parse permalink
        pathname_new.push(pathname[i]);
    }
}

pathname_new=pathname_new.join('/');

if(pathname_new!='')pathname_new='/'+pathname_new;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


var location_new=baseurl+pathname_new+query_new;

//r(location_new);


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ENV RESTART


if($.inArray('restart',env)!=-1)
    localStorage.clear();


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*window.onbeforeunload = function() {
    return "Bye now!";
    //@todo Onunload
};*/

