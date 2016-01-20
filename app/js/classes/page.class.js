/**
 * @author ©Towns.cz
 * @fileOverview Creates Class Page
 */
//======================================================================================================================


/**
 * Creates page
 * @param title
 * @param content
 * @param open_callback
 * @param close_callback
 * @constructor
 */
var Page=function(title,content,open_callback=false,close_callback=false) {

    this.title = title;
    this.content = content;
    this.open_callback = open_callback;
    this.close_callback = close_callback;

};


/**
 * Open page in popup window
 */
Page.prototype.open = function(){

    var title=this.title;
    var content=this.content;


    if(!is(title))title='';
    if(!is(content))content='';

    content=content.split('{{');


    for(var i=1,l=content.length;i<l;i++){

        //r(content[i]);
        content[i]=content[i].split('}}');


        //r('eval ','content[i][0]='+content[i][0]+';');

        content[i][0]=Locale.get(content[i][0]);
        content[i]=content[i].join('');


    }
    content=content.join('');


    UI.popupWindowOpen(title,content);

    if(this.open_callback) {
        setTimeout(function () {
            this.open_callback();
        },IMMEDIATELY_MS);
    }


    if(this.close_callback) {
        UI.popupWindowCloseCallback=Pages[page].closeJS;
    }

};

/**
 * Close popup window and run close callback
 * Wrapper for UI.popupWindowClose
 * @static
 */
Page.close = function(){
        UI.popupWindowClose();
};
