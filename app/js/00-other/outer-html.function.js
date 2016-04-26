//todo header

//todo how to do jsdoc in jQuery functions (plugins)?
/**
 * Converts JQuery object to html code
 * @returns {string}
 */
jQuery.fn.outerHTML = function(s) {

    var html='';
    for(var i= 0,l=this.length;i<l;i++){
        if( typeof this[i].outerHTML=== 'string' ){
            html+=this[i].outerHTML;
        }
    }
    return(html);

};