/**
 * @author ©Towns.cz
 * @fileOverview Additional methods to object Math
 */
//======================================================================================================================


/**
 *
 * @static
 * @param {number}
 * @return {number}
 */
Math.sign = Math.sign || function(x) {
    x = +x; // convert to a number
    if (x === 0 || isNaN(x)) {
        return x;
    }
    return x > 0 ? 1 : -1;
};

//-------------------------

/**
 * Difference between two angeles
 * @static
 * @param {number} degrees 1
 * @param {number} degrees 2
 * @return {number} degrees difference
 */
Math.angleDiff = function(deg1,deg2){
    var a = deg1 - deg2;
    var a = (a + 180) % 360 - 180;
    return(a);
};

//-------------------------

/**
 * @static
 * @param {number} radians
 * @return {number} degrees
 */
Math.rad2deg = function(radians){
    return(radians * (180/Math.PI));
};

//-------------------------

/**
 * @static
 * @param {number} degrees
 * @return {number} radians
 */
Math.deg2rad = function(degrees){
    return(degrees * (Math.PI/180));
};

//-------------------------

/**
 * @static
 * @param x
 * @param y
 * @return {number} distance
 */
Math.xy2dist = function(x,y){
    return(Math.sqrt(Math.pow(x,2)+Math.pow(y,2)));
};


//-------------------------

//todo refactor to position
Math.xy2distDeg = function(x,y){

    var output={};

    output['dist'] = Math.xy2dist(x,y);
    output['deg'] = Math.rad2deg(Math.atan2(y,x));

    return(output);

};

//-------------------------

//todo refactor to position
Math.distDeg2xy = function(dist,deg){

    var rad=Math.deg2rad(deg);

    var output={};

    output['x'] = Math.cos(rad)*dist;
    output['y'] = Math.sin(rad)*dist;

    return(output);

};

//-------------------------

//todo mybe refactor to position
Math.xyRotate = function(x,y,deg){

    //nevyuzivam funkce Math.xy2distDeg a Math.distDeg2xy, abych nedelal zbytecny prevod do stupnu a spatky
    var dist = Math.xy2dist(x,y);
    var rad = Math.atan2(y,x);

    rad += Math.deg2rad(deg);

    var output={};
    output['x'] = Math.cos(rad)*dist;
    output['y'] = Math.sin(rad)*dist;

    return(output);

};

//======================================================================================================================

/**
 * Converts multitype to float
 * @static
 * @param value
 * @param {number} defval
 * @return {number}
 */
Math.toFloat = function(value,defval=0){

    if(typeof(value)==='undefined')return(defval);

    value=parseFloat(value);
    if(value===NaN){
        return(defval);
    }else{
        return(value);
    }

};

//----------------------------------------------------------

/**
 * Converts multitype to integer
 * @static
 * @param value
 * @param {number} defval
 * @return {number}
 */
Math.toInt = function(value,defval){

    if(typeof(value)==='undefined')return(defval);

    value=parseInt(value);
    if(value===NaN){
        return(defval);
    }else{
        return(value);
    }

};


//----------------------------------------------------------

/**
 * Is line A colliding line B?
 * @static
 * @param a1x
 * @param a1y
 * @param a2x
 * @param a2y
 * @param b1x
 * @param b1y
 * @param b2x
 * @param b2y
 * @return {boolean}
 */
Math.lineCollision = function(a1x,a1y,a2x,a2y,b1x,b1y,b2x,b2y){



    var denominator = ((a2x - a1x) * (b2y - b1y)) - ((a2y - a1y) * (b2x - b1x));
    var numerator1 = ((a1y - b1y) * (b2x - b1x)) - ((a1x - b1x) * (b2y - b1y));
    var numerator2 = ((a1y - b1y) * (a2x - a1x)) - ((a1x - b1x) * (a2y - a1y));

    // Detect coincident lines (has a problem, read below)
    if (denominator == 0){

        //var collision= (numerator1 == 0 && numerator2 == 0);
        collision=false;

    }else{

        var r = numerator1 / denominator;
        var s = numerator2 / denominator;

        var collision=((r >= 0 && r <= 1) && (s >= 0 && s <= 1));

    }




    //-------------------------------Debug TDD

    /*var size=50;
    var src=createCanvasViaFunctionAndConvertToSrc(
        size*2,size*2,function(ctx){

            //ctx.strokeStyle = '#000000';
            //ctx.strokeWidth = 2;

            ctx.beginPath();
            ctx.moveTo(a1x+size,a1y+size);
            ctx.lineTo(a2x+size,a2y+size);
            ctx.stroke();
            ctx.closePath();


            ctx.beginPath();
            ctx.moveTo(b1x+size,b1y+size);
            ctx.lineTo(b2x+size,b2y+size);
            ctx.stroke();
            ctx.closePath();

        }


    );
    $('body').append('<img src="'+src+'" border='+(collision?2:0)+'>');*/

    //-------------------------------

    //console.log(collision);

    return collision;

};
