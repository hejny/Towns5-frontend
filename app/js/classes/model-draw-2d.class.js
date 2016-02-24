/**
 * @author ©Towns.cz
 * @fileOverview Creates method draw in Class Model
 */
//======================================================================================================================

/**
 * Draw model on canvas
 * @param ctx Canvas context
 * @param {number} s Size of 1 virtual px
 * @param {number} x_begin Canvas left
 * @param {number} y_begin Canvas top
 * @param {number} rotation 0-360 Angle in degrees
 * @param {number} slope 0-90 Angle in degrees
 * @param {string} force color - format #ff00ff //todo maybe delete
 * todo update
 */
Model.prototype.draw = function(ctx, s, x_begin, y_begin, rotation, slope, force_color=false, selected=false, shadow=false, cache=false) {

    /*if(cache){
        cache+=s+(rotation%360)+(this.rotation%360)+this.size;//+md5(JSON.stringify(this));
    }


    if(cache==false || !isDefined(ImageCache[cache])) {*/


        width = 300;
        height = 300;

        var self = this;
        var canvas = createCanvasViaFunction(width, height, function (gl) {


            //r(self);
            var webGL = self.create3D(gl, s, x_begin, y_begin, rotation, slope, force_color, selected, shadow);
            webGL = null;//removes unused webGL container
            delete webGL;


        }, 'webgl');

        /*if(cache!==false){
            r('Putting image into cache '+cache+'.');
            ImageCache[cache]=canvas;
        }


    }else{

        canvas=ImageCache[cache];

    }*/


    ctx.drawImage(canvas,x_begin-(width/2),y_begin-(height/2));


};


var ImageCache = {};


//======================================================================================================================


/**
 * Create icon of Towns model
 * @param {number} size Size of returned image
 * @returns {string} image data in base64
 */
Model.prototype.createIcon = function(size){

    var canvas = document.createElement('canvas');
    canvas.height=size;
    canvas.width = size;
    var context = canvas.getContext('2d');

    //r(context);
    this.draw(context, 0.5, size*(1/2), size*(2/3) , 10, 35);

    //r(canvas.toDataURL());

    return(canvas.toDataURL());

};

//==================================================


Model.prototype.createSrc = function( s, x_begin, y_begin, x_size, y_size, rot, slope,selected=false){

    var canvas = document.createElement('canvas');
    canvas.width=x_size;
    canvas.height = y_size;
    var context = canvas.getContext('2d');

    this.draw(context, s, x_begin, y_begin,  rot, slope,false,selected);

    return(canvas.toDataURL());

};
