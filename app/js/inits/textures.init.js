/**
 * @author ©Towns.cz
 * @fileOverview Load material textures
 */
//======================================================================================================================

//todo jsdoc
var Textures={
    images: {}
};



//todo jsdoc
Textures.init = function(files){

    var self=this;

    files.forEach(function(file){


        var key = file.split('.');
        key=key[0];
        key=key.split('-').join('_');


        self.images[key] = new Image();
        self.images[key].src = "/media/image/textures/"+file;//todo cache optimized

    });



};


/*//todo jsdoc
Textures.get = function(key){

    return(this.images[key]);

};*/


//todo jsdoc
Textures.getAll = function(key){

    return(this.images);

};


//todo jsdoc
Textures.getInput = function(NameOfRadios){

    var html='';


    for(var key in this.images){

        html+=`
            <input type="radio" name="`+NameOfRadios+`" id="`+NameOfRadios+`-`+key+`" value="`+key+`" required/>
            <label for="`+NameOfRadios+`-`+key+`">
                <img src="`+this.images[key].src+`">
            </label>
            `;

    }

    html='<div class="textures-input">'+html+'</div>';

    //alert(html);//todo purge Towns from commented alert, r, console.log, ect..
    return(html);

};



//----------------------------------------------------------------------------------------------------------------------


//todo maybe create normal class ImagesContainer and use it in terrains and textures
//todo maybe separate into more files?

var files=[
    'shadow.png',

    'clay-bricks.jpg',
    'clay-roof.jpg',
    'iron-plates.jpg',
    'stone-bricks.jpg',
    'stone-plain.jpg',
    'wood-boards.jpg',
    'wood-raw.jpg',
    'woon-fence.jpg'
];

Textures.init(files);
