/**
 * @author Towns.cz
 * @fileOverview Additional methods to Resources prototype
 */
//======================================================================================================================


Resources.prototype.toHTML = function(){

    var strings = [];

    for(var key in this){

        if(typeof this[key]=='number'){//todo better solution

            if(this[key]!=0){

                var name = Locale.get('resource',key);
                strings.push('<div><img src="media/image/resources/'+key+'.png" title="'+name+'" alt="'+name+'" >'+this[key]+'</div>');
            }

        }

    }
    strings=strings.join(' ');
    strings='<div class="resources">'+strings+'</div>';

    return strings;

};