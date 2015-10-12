

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


if($.inArray('restart',env)!=-1){

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

