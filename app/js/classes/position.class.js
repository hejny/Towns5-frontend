/**

 ██████╗  ██████╗ ███████╗██╗████████╗██╗ ██████╗ ███╗   ██╗
 ██╔══██╗██╔═══██╗██╔════╝██║╚══██╔══╝██║██╔═══██╗████╗  ██║
 ██████╔╝██║   ██║███████╗██║   ██║   ██║██║   ██║██╔██╗ ██║
 ██╔═══╝ ██║   ██║╚════██║██║   ██║   ██║██║   ██║██║╚██╗██║
 ██║     ╚██████╔╝███████║██║   ██║   ██║╚██████╔╝██║ ╚████║
 ╚═╝      ╚═════╝ ╚══════╝╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 © Towns.cz

 * @fileOverview Position on map

 */


//======================================================================================================================

//todo ?? point vs position
//todo refactoring extend types of coord systems - cartesian, cartesian3D, polar
//todo refactoring extend types of meaning - map, screen, screen_center, color, other
//todo refactoring xy2DistDeg, ect. should be under position
//todo refactoring creating instances via. 1 parameter
//todo refactoring hexToRgb ect. move here



var Position = function (x,y) {
    this.x = x;
    this.y = y;
};

//---------------------------------------------------------------------------------------Color is also type of position in 3D or 4D


var Position3D = function (x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
};


//---------------------------------------------------------------------------------------Color is also type of position in 3D or 4D


var Color = function (r,g,b,a=255) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
};


Color.prototype.bounds = function(){

    this.r=Math.round(this.r);
    this.g=Math.round(this.g);
    this.b=Math.round(this.b);
    this.a=Math.round(this.a);

    if (this.r > 255) {
        this.r = 255;
    }
    if (this.r < 0) {
        this.r = 0;
    }
    if (this.g > 255) {
        this.g = 255;
    }
    if (this.g < 0) {
        this.g = 0;
    }
    if (this.b > 255) {
        this.b = 255;
    }
    if (this.b < 0) {
        this.b = 0;
    }

    if (this.a > 255) {
        this.a = 255;
    }
    if (this.a < 0) {
        this.a = 0;
    }
};


Color.prototype.rgb = function(){

    this.bounds();
    if(this.a==255){
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }else{
        //r('rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + Math.round(this.a/255*100)/100 + ')');
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + Math.round(this.a/255*100)/100 + ')';
    }

};

Color.prototype.hex = function(){
    this.bounds();
    return '#' + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
};



//----------------------------------------------------------


/**
 * Convert HTML HEX Color to {r:...,g:...,b:...}
 * @param {string} hex code of color
 * @returns Color
 */
function hexToRgb(hex) {
    var result, shorthandRegex;
    if (hex == null) {
        hex = '000000';
    }
    shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        return new Color(
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        );
    } else {
        return new Color(0,0,0);

    }
};

