/**

     ██╗      ██████╗  ██████╗
     ██║     ██╔═══██╗██╔════╝
     ██║     ██║   ██║██║  ███╗
     ██║     ██║   ██║██║   ██║
     ███████╗╚██████╔╝╚██████╔╝
     ╚══════╝ ╚═════╝  ╚═════╝
     © Towns.cz

 * @fileOverview Functions for debuging, logging and tracking events.

 */


//======================================================================================================================

/**
 * Report to console. Wrapper for console.log().
 * @author PH
 */
function r(){


    if(arguments.length==1){

        console.log(arguments[0]);

    }else{

        var arg=[];
        for(var i= 0,l=arguments.length;i<l;i++){
            arg.push(deepCopy(arguments[i]));
        }
        console.log(deepCopy(arg));
    }
}


//======================================================================================================================

var lastMs=0;
function t(flag){

    var actualDate=new Date();
    var actualMs=actualDate.getTime();


    var deltaMs=actualMs-lastMs;
    r(flag+' '+deltaMs);

    lastMs=actualMs;

}
t('start timing');

//======================================================================================================================


/**
 * Towns event tracking system
 * @author PH
 * @param {string} category eg. function, ui,..
 * @param {string} action eg. terrain changing, dismantling,...
 * @param additional params eg. t10, building_market,...
 */
function trackEvent(category, action , additional){

    r('Tracked event '+category+' / '+action+' !');


    ga('send', 'event', category, action /*'Fall Campaign'*/);



}






