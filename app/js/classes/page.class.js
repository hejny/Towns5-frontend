/**
 * @author ©Towns.cz
 * @fileOverview Creates Class Towns.Page
 */
//======================================================================================================================


/**
 * Creates page
 * @param {string} uri
 * @param {string} title
 * @param {string} content
 * @param {function} open_callback
 * @param {function} close_callback
 * @constructor
 */
Towns.Page=function(uri,title,content,open_callback=false,close_callback=false) {

    this.uri = uri;
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



    URI.plugin=this.uri;
    URI.write();


    var self=this;

    UI.popupWindowOpen(title,content,function(){

        //r('CLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOoo');

        if(self.close_callback){
            self.close_callback();
        }

        URI.plugin=false;
        URI.object=false;
        URI.write();
    });


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


    /*if(this.close_callback) {
        UI.popupWindowCloseCallback=this.close_callback;
    }*/

};
