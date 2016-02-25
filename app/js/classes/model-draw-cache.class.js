/**
 * @author ©Towns.cz
 * @fileOverview Creates method draw in Class Model
 */
//======================================================================================================================

function IsImageOk(img) {
    // During the onload event, IE correctly identifies any images that
    // weren’t downloaded as not complete. Others should too. Gecko-based
    // browsers act like NS4 in that they report this incorrectly.
    if (!img.complete) {
        return false;
    }

    // However, they do have two very useful properties: naturalWidth and
    // naturalHeight. These give the true size of the image. If it failed
    // to load, either of these should be zero.

    if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
        return false;
    }

    // No other way of checking: assume it’s ok.
    return true;
}

/**
 * Draw model on canvas
 * @param ctx Canvas context
 * @param {number} s Size of 1 virtual px
 * @param {number} x_begin Canvas left
 * @param {number} y_begin Canvas top
 * @param {number} rotation 0-360 Angle in degrees
 * @param {number} slope 0-90 Angle in degrees
 * todo update
 */
Model.prototype.drawCashedAsync = function(ctx, s, x_begin, y_begin, rotation, slope, selected=false, shadow=false,callback=false) {

    width = 300;
    height = 300;

    var image = this.createCacheLocalImage(rotation, slope);

    if(IsImageOk(image)){

        ctx.drawImage(image,x_begin-(width/2),y_begin-(height/2));

    }else{

        image.onload = function(){


            ctx.drawImage(image,x_begin-(width/2),y_begin-(height/2));
            //if(callback)callback();

        };

    }

};


//======================================================================================================================

/** //todo update
 */
Model.prototype.createCacheLocalImage = function(rotation, slope){

    var self = this;

    var file_url=this.cacheURL(rotation, slope);
    var file_url_key=md5(file_url);

    if(!isDefined(BuildingImages[file_url_key])){

        BuildingImages[file_url_key]= new Image();


        /*$.ajax({
            url: file_url,
            method: 'GET'
        }).done(function(result){
            //r('done',result);

            r('Loading image from server cache to local cache.');
            BuildingImages[file_url_key].src = file_url+'&image';


        }).fail(function(result){

            //r('fail',result);

            r('Generating new image and sending to cache.');*/



            var src = createCanvasViaFunctionAndConvertToSrc(500, 500, function (gl) {


                //r(self);
                var webGL = self.create3D(gl, 1, 250, 250, rotation, slope, false, true);
                webGL = null;//removes unused webGL container
                delete webGL;


            }, 'webgl');


            BuildingImages[file_url_key].src = src;



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

    return(BuildingImages[file_url_key]);

};


var BuildingImages={};

//======================================================================================================================


/** //todo update
 * Create icon of Towns model
 * @param {number} size Size of returned image
 * @returns {string} image data in base64
 */
Model.prototype.cacheURL = function(rotation, slope){

    var rotation=((rotation+this.rotation)%360);
    rotation=Math.round(rotation/15)*15;

    var hash = md5(JSON.stringify(this.particles));
    var file_url=appDir+'/php/building-image.php?hash='+hash+'&rotation='+rotation/*(this.rotation%360)*/;


    return(file_url);
};


/** //todo update
 * Create icon of Towns model
 * @param {number} size Size of returned image
 * @returns {string} image data in base64
 */
Model.prototype.createIcon = function(size){

    var rotation=0;
    var slope=30;

    var image = this.createCacheLocalImage(rotation, slope);

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
