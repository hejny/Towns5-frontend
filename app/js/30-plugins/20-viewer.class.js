/**
 * @author ©Towns.cz
 * @fileOverview Creates Class Viewer
 */
//======================================================================================================================


T.Plugins.Viewer = class {


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
        this.page = new T.Plugins.Page(
            uri,
            title,
            content
        );


        this.open_callback = open_callback;

        this.opened = false;

    }


    /**
     * Open viewer
     * @param {number} collection 0=T.User.object_prototypes, 1=objects_external
     * @param {string} id
     */
    open(collection, id) {
        var viewer = this;


        viewer.opened = {
            collection: collection
        };


        var object_ready = function (){

            T.URI.object = viewer.opened.object.id;


            viewer.page.open(function (open_callback, object) {

                //-----------------------------------------

                open_callback(object, $('.popup-window .content')[0]);//todo refactor not DI popup window content but use static container with function T.ui.get();

                //-----------------------------------------

            }, [viewer.open_callback, viewer.opened.object]);

        };


        if (collection === 0) {

            viewer.opened.object = T.User.object_prototypes.getById(id);//T.ArrayFunctions.id2item(T.User.object_prototypes,id);
            r('Opening object prototype ' + viewer.opened.object.name + '.');

            object_ready();


        } else if (collection == 1) {

            viewer.opened.object = objects_external.getById(id);//T.ArrayFunctions.id2item(objects_external,id);

            if (viewer.opened.object) {


                r('Opening object ' + viewer.opened.object.name + ' directly from objects_external.');
                object_ready();


            }else{

                T.TownsAPI.townsAPI.get('objects/'+id,{},function(response){

                    viewer.opened.object = T.Objects.Array.initInstance(response);

                    r('Opening object ' + viewer.opened.object.name + ' loaded from API.');
                    object_ready();

                },function(){

                    T.UI.popupWindow.open(T.Locale.get('page','404','title'), T.Locale.get('page','404','content'), false, 'SMALL');

                });

            }




        } else {
            throw new Error('' + collection + ' is invalid identificator of collection!');
        }












    }

};