/**
 * @author ©Towns.cz
 * @fileOverview Loading and storing images from external URLs
 */
//======================================================================================================================



//todo jsdoc
var ImagesCollection = function(files,url='',onload=false){

    var self=this;//todo maybe refactor use thisImageCollection ???

    this.images={};
    this.onload=onload;

    this.images_loaded=0;
    this.images_count=0;


    for(var key in files){

        //r('ImagesCollection: start loading '+url+files[key]);

        this.images_count++;

        this.images[key] = new Image();
        this.images[key].src = url+files[key];
        this.images[key].onload = function(){

            //r('loaded');
            self.images_loaded++;

            if(self.onload){

                var percent=self.images_loaded / self.images_count;
                if(percent>1)percent=1;
                self.onload(percent);

            }


        };

    }



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