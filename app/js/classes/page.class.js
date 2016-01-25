/**
 * @author ©Towns.cz
 * @fileOverview Creates Class Towns.Page
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
Towns.Page=function(title,content,open_callback=false,close_callback=false) {

    this.title = title;
    this.content = content;
    this.open_callback = open_callback;
    this.close_callback = close_callback;

};


/**
 * Open page in popup window
 */
Towns.Page.prototype.open = function(additional_callback=false,additional_parameters=false){

    var title=this.title;
    var content=this.content;


    if(!is(title))title='';
    if(!is(content))content='';

    content=content.split('{{');


    for(var i=1,l=content.length;i<l;i++){

        content[i]=content[i].split('}}');



        content[i][0]=Locale.get(content[i][0]);
        content[i]=content[i].join('');


    }
    content=content.join('');


    UI.popupWindowOpen(title,content);

    var self=this;
    if(this.open_callback) {
        setTimeout(function () {
            self.open_callback();
        },IMMEDIATELY_MS);
    }

    if(additional_callback) {
        setTimeout(function () {
            additional_callback.apply(this,additional_parameters);
        },IMMEDIATELY_MS);
    }



    if(this.close_callback) {
        UI.popupWindowCloseCallback=this.close_callback;
    }

};

/**
 * Close popup window and run close callback
 * Wrapper for UI.popupWindowClose
 * @static
 */
Towns.Page.close = function(){
        UI.popupWindowClose();
};
