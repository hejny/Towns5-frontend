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