/**
 * @author ©Towns.cz
 * @fileOverview Additional methods to String prototype
 */
//======================================================================================================================


/**
 * @return {string} html
 */
String.prototype.text2html = function(){
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(this).html();
};


/**
 * @return {string} text
 */
String.prototype.html2text = function(){
    return $('<div/>').html(this).text();
};