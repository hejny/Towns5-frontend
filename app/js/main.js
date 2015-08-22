

//======================================================================================================================


function r(r){console.log(r);}

//======================================================================================================================


var baseurl='http://towns.local';

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~env

var env_template=[
    'debug',
    'onlymap'

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



//@todo Onunload

