

var baseurl='http://towns.local';

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~env

var env_template=[
    'debug',
    'onlymap',
    'restart',
    'nointro'

];

var env_array=[];



var query=location.search;
query=query.substring(1);
query=query.split('&');



for(var i=0;i<env_template.length;i++){

    //console.log(env_template[i],$.inArray(env_template[i],query));


    if($.inArray(env_template[i],query)!=-1){

        env_array.push(env_template[i]);
    }

}


console.log('Starting Towns 5...');
console.log('ENV:');
console.log(env_array);

//~~~~~~~~~~~~~~~~~~~~~~~~~~ENV

function env(envkey) {

    if($.inArray(envkey,env_array)!=-1) {
        return(true);
    }else {
        return(false);
    }

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var query_new;
query_new=env_array.join('&');


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
//~~~~~~~~~~~~~~~~~~~~~~~~~~


var location_new=baseurl+pathname_new+query_new;



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ENV RESTART


if(env('restart')){

    r('Cleaning localStorage');

    localStorage.clear();

    //-----------------------------------------------Calc LS size
    /*localStorage.setItem("DATA", "m");
    for(i=0 ; i<40 ; i++) {
        var data = localStorage.getItem("DATA");
        try {
            localStorage.setItem("DATA", data + data);
        } catch(e) {
            console.log("LIMIT REACHED: (" + i + ")");
            console.log(e);
            break;
        }
    }
    localStorage.removeItem("DATA");*/
    //-----------------------------------------------


}



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*window.onbeforeunload = function() {
    return "Bye now!";
    //@todo Onunload
};*/

