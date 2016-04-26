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
 * todo write
 */
T.Model.prototype.drawCashedAsync = function(ctx, s, x_begin, y_begin, rotation, slope, selected=false, shadow=false,clearBefore=false) {

    width = 500/*500*2*s*this.size*/;
    height = 500/*500*2*s*this.size*/;

    var image = this.createCacheLocalImage(s , rotation, slope);


    var draw = function(){


        /*CanvasRenderingContext2D.prototype.drawImageAntialias = function(image,x,y,width,height){

            // step 1 - create off-screen canvas
            var oc   = document.createElement('canvas'),
                octx = oc.getContext('2d');


            octx.drawImage(image, 0, 0, width, height);


            //Step 2 reuses the off-screen canvas and draws the image reduced to half again:
            octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);


            // step 3 - And we draw once more to main canvas, again reduced to half but to the final size:
            ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
                0, 0, canvas.width,   canvas.height);

        };*/


        if(clearBefore){
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        ctx.imageSmoothingEnabled = true;
        ctx.mozImageSmoothingEnabled = true;


        if(selected){


            var canvas_ = createCanvasViaFunction(width, height, function (ctx_) {


                ctx_.drawImage(image,0,0,width,height);
                ctx_.blur(5,1);
                ctx_.newcolorImage(hexToRgb('0098FF'));
                ctx_.multiplyAlphaImage(2);


            }, '2d');

            ctx.drawImage(canvas_,x_begin-(width/2),y_begin-(height/2),width,height);


        }


        ctx.drawImage(image,x_begin-(width/2),y_begin-(height/2),width,height);
        //if(callback)callback();




    };

    if(IsImageOk(image)){

        draw();

    }else{

        image.onload = draw;

    }

};


//======================================================================================================================

/** //todo write
 */
T.Model.prototype.createCacheLocalImage = function(size, rotation, slope){

    var self = this;

    var hash=this.cacheHash(size, rotation, slope);

    if(!isDefined(BuildingImages[hash])){

        BuildingImages[hash]= new Image();


        /*$.ajax({
            url: file_url,
            method: 'GET'
        }).done(function(result){
            //r('done',result);

            r('Loading image from server cache to local cache.');
            BuildingImages[hash].src = file_url+'&image';


        }).fail(function(result){

            //r('fail',result);

            r('Generating new image and sending to cache.');*/



            var src = createCanvasViaFunctionAndConvertToSrc(500, 500, function (gl) {


                //r(self);
                var webGL = self.create3D(gl, size, 250, 250, rotation, slope, false, true);
                webGL = null;//removes unused webGL container
                //todo strict mode//delete webGL;


            }, 'webgl');


            BuildingImages[hash].src = src;



            /*$.ajax({
                url: file_url,
                method: 'POST',
                data: {
                    content: src
                }
            }).done(function(result){

                r(result);

            });


        });*/

    }

    return(BuildingImages[hash]);

};


var BuildingImages={};

//======================================================================================================================


/** //todo write
 * Create icon of Towns model
 * @param {number} size Size of returned image
 * @returns {string} image data in base64
 */
T.Model.prototype.cacheHash = function(size, rotation, slope){

    var rotation=((rotation+this.rotation)%360);
    rotation=Math.round(rotation/15)*15;
    
    var size=(size+this.size);
    size=Math.round(size/0.1)*0.1;

    var hash = md5(JSON.stringify(this.particles)+' '+rotation+' '+size);

    return(hash);
};


/** //todo write
 * Create icon of Towns model
 * @param {number} size Size of returned image
 * @returns {string} image data in base64
 */
T.Model.prototype.createIcon = function(size){

    var rotation=0;
    var slope=30;

    var image = this.createCacheLocalImage( 1 , rotation, slope);

    return(image.src);
};


//==================================================

/*todo create url
Model.prototype.createSrc = function( s, x_begin, y_begin, x_size, y_size, rot, slope,selected=false){

    var canvas = document.createElement('canvas');
    canvas.width=x_size;
    canvas.height = y_size;
    var context = canvas.getContext('2d');

    this.draw(context, s, x_begin, y_begin,  rot, slope,false,selected);

    return(canvas.toDataURL());

};*/
