/**

     ██╗      █████╗ ███╗   ██╗ ██████╗
     ██║     ██╔══██╗████╗  ██║██╔════╝
     ██║     ███████║██╔██╗ ██║██║  ███╗
     ██║     ██╔══██║██║╚██╗██║██║   ██║
     ███████╗██║  ██║██║ ╚████║╚██████╔╝
     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝
     © Towns.cz

 * @fileOverview Language localization functions, Maybe only temporary file

 */


//======================================================================================================================

var locale={};

var lang='cs';


function l(a,b,c,e,f){


    var value=locale[lang];
    for(var i= 0,l=arguments.length;i<l;i++){

        if(typeof value[arguments[i]]!='undefined')
            value=value[arguments[i]];

    }

    return(value);

}