//todo refactor to TypeScript and remove this file





TOWNS.setNamespace = function(namespace){

    namespace=namespace.split('.');

    var Actual=this;

    var key;
    for(var i= 0,l=namespace.length;i<l;i++){

        key=namespace[i];

        if(key==='TOWNS')throw new Error('Cant set namespace TOWNS under TOWNS!');

        if(typeof Actual[key]==='undefined'){

            Actual[key]={};
            Actual=Actual[key];

        }else{

            Actual=Actual[key];

        }


    }

    return(true);

};
