/**
 * @author ©Towns.cz
 * @fileOverview Loading and storing images from external URLs
 */
//======================================================================================================================


/**
 *
 * @param {object} files
 * @param {string} url Prefix of image urls
 * @constructor
 */
var ImagesCollection = function(files,url='') {

    this.images = {};

    this.images_loaded = 0;
    this.images_count = 0;


    this.files = files;
    this.url = url;


};


/**
 * Start loading of images loading
 * @param {function} onload(percent) Callback on each single image load
 */
ImagesCollection.prototype.load = function(onload=false){

    var self = this;//todo maybe refactor use thisImageCollection ???
    this.onload = onload;


    for(var key in this.files){

        //r('ImagesCollection: start loading '+url+files[key]);

        this.images_count++;

        this.images[key] = new Image();
        this.images[key].src = this.url+this.files[key];
        this.images[key].onload = function(){

            //r('loaded');
            self.images_loaded++;

            if(self.onload){

                self.onload(self.loaded());

            }


        };

    }



};



ImagesCollection.prototype.loaded = function(){

    var percent=this.images_loaded / this.images_count;
    if(percent>1)percent=1;

    return(percent);

};



ImagesCollection.prototype.get = function(key){

    return(this.images[key]);

};



//todo jsdoc
ImagesCollection.prototype.getAll = function(key){

    return(this.images);

};



//todo jsdoc
ImagesCollection.prototype.getInput = function(NameOfRadios,AdditionalClass=''){

    var html='';


    for(var key in this.images){

        html+=`
            <input type="radio" name="`+NameOfRadios+`" id="`+NameOfRadios+`-`+key+`" value="`+key+`" class="`+AdditionalClass+`" />
            <label for="`+NameOfRadios+`-`+key+`">
                <img src="`+this.images[key].src+`">
            </label>
            `;

    }

    html='<div class="textures-input">'+html+'</div>';

    //alert(html);//todo purge Towns from commented alert, r, console.log, ect..
    return(html);

};