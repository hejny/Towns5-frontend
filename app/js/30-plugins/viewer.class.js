/**
 * @author ©Towns.cz
 * @fileOverview Creates Class Viewer
 */
//======================================================================================================================


Towns.Viewer = class {


    /**
     * Creates object viewer
     * @param {string} uri
     * @param {object} conditions of opened object
     * @param {string} title
     * @param {string} content
     * @param {function} open_callback
     * @constructor
     */
    constructor(uri, conditions, title, content, open_callback) {

        this.uri = uri;
        this.conditions = conditions;

        var self = this;
        this.page = new Towns.Page(
            uri,
            title,
            content
        );


        this.open_callback = open_callback;

        this.opened = false;

    };


    /**
     * Open viewer
     * @param {number} collection 0=object_prototypes, 1=objects_external
     * @param {string} id
     */
    open(collection, id) {

        this.opened = {
            collection: collection
        };


        if (collection == 0) {

            this.opened.object = object_prototypes.getById(id);//ArrayFunctions.id2item(object_prototypes,id);
            r('Opening object prototype ' + this.opened.object.name + '.');


        } else if (collection == 1) {

            this.opened.object = objects_external.getById(id);//ArrayFunctions.id2item(objects_external,id);
            r('Opening object ' + this.opened.object.name + '.');

        } else {
            throw new Error('' + collection + ' is invalid identificator of collection!');
        }


        var viewer = this;
        this.page.open(function (open_callback, object) {

            //-----------------------------------------

            open_callback(object, $('.popup-window .content')[0]);//todo refactor not DI popup window content but use static container with function T.ui.get();


            //-----------------------------------------

        }, [this.open_callback, this.opened.object]);


    };

};