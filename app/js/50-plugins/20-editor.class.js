/**
 * @author ©Towns.cz
 * @fileOverview Creates Class Editor
 */
//======================================================================================================================


T.Plugins.Editor = class {


    /**
     * Creates object editor
     * @param {string} uri
     * @param {object} conditions of opened object
     * @param {string} title
     * @param {string} content
     * @param {function} open_callback
     * @param {function} default_object
     * @constructor
     */
    constructor(uri, conditions, title, content, open_callback, default_object) {

        this.uri = uri;
        this.conditions = conditions;

        var self = this;
        this.page = new T.Plugins.Page(
            uri,
            title,
            `
        <form id="editor-object-header">
            <input type="text" id="editor-object-name" value="" placeholder="{{` + default_object.type + ` ` + default_object.subtype + ` name placeholder}}">


            <div class="button-icon"  id="editor-object-duplicate" title="{{` + default_object.type + ` ` + default_object.subtype + ` duplicate}}"><i class="fa fa-clone"></i></div>


            <div class="button-icon"  id="editor-object-delete" title="{{` + default_object.type + ` ` + default_object.subtype + ` delete}}"><i class="fa fa-trash-o"></i></div>


        </form>
        <div id="editor-object-errors"></div>` + content,
            false,
            function () {

                if (self.opened === false)
                    throw new Error('Editor error - missing object identificator!');


                if (self.opened.collection === 0) {

                    T.User.object_prototypes.setById(self.opened.object.id, self.opened.object);


                    T.UI.Menu.Prototypes.menu(self.opened.object, self.opened.object.subtype);
                    T.UI.Menu.Building.start(self.opened.object.id);


                    T.TownsAPI.townsAPI.post('objects/prototypes', self.opened.object
                        , function (response) {


                            T.UI.Menu.Prototypes.menu(self.opened.object.type, self.opened.object.subtype);
                            T.UI.Menu.Building.start(self.opened.object.id);


                        }
                        , function (errors) {

                            self.open(0, self.opened.object.id, errors);
                        });


                    r('Updating object prototype ' + self.opened.object.name + '.');

                } else if (self.opened.collection == 1) {


                    //todo refactor make by saveObject
                    objects_server.update(self.opened.object);


                    T.TownsAPI.townsAPI.post('objects/' + self.opened.object.id, self.opened.object
                        , function (response) {

                            T.UI.Message.success(T.Locale.get('object', self.opened.object.type, 'saved'));

                        }
                        , function (errors) {

                            r(self.opened);
                            self.open(0, self.opened.object.id, errors);
                        });


                    r('Updating object ' + self.opened.object.name + '.');


                }


                //todo self.opened = false;

            }
        );

        this.open_callback = open_callback;
        this.default_object = default_object;


        this.opened = false;

    }


    /**
     * Open editor
     * @param {number} collection 0=T.User.object_prototypes, 1=objects_server
     * @param {string} id
     */
    open(collection, id, errors = false) {
        var editor = this;

        this.opened = {
            collection: collection
        };



        var object_ready = function() {

            T.URI.object = editor.opened.object.id;


            editor.page.open(function (open_callback, object) {

                //-----------------------------------------


                open_callback(object);


                //-----------------------------------------Errors

                if (errors) {

                    //r(errors);
                    for (var key in errors.message) {
                        //T.UI.Message.message(errors.message[key].message,'error');

                        $('#editor-object-errors').append('<div class="error">' + (errors.message[key].message.text2html()) + '</div>');
                    }


                }

                //-----------------------------------------Editor header

                //-----------------Name
                //--------Init name
                $('#editor-object-name').val(object.name);
                //--------Update name
                $('#editor-object-name').change(function () {
                    object.name = $('#editor-object-name').val();
                });
                //-----------------

                //-----------------Delete
                $('#editor-object-delete').click(function () {

                    if (editor.opened.collection === 0) {

                        r('Deleting object prototype ' + object.name + '.');

                        //todo maybe create action DELETE prototype?
                        if (confirm(T.Locale.get('delete prototype ' + object.type + ' ' + object.subtype + ' confirm'))) {//todo create better confirm

                            T.User.object_prototypes.removeId(object.id);

                            T.UI.Menu.Prototypes.menu(object.type, object.subtype);

                            T.UI.popupWindow.close(true);

                        }


                    } else
                    if (editor.opened.collection === 1) {

                        r('Deleting object ' + object.name + '.');

                        //todo maybe create action DELETE prototype?
                        if (confirm(T.Locale.get(object.type,'delete','confirm'))) {//todo create better confirm

                            deleteObject(object.id);

                            T.UI.popupWindow.close(true);

                        }


                    } else {
                        throw new Error('' + collection + ' is invalid identificator of collection!');
                    }
                });
                //-----------------


                //-----------------Duplicate
                if(collection===0){

                    $('#editor-object-duplicate').show().click(function () {
                        if (editor.opened.collection === 0) {

                            r('Duplicating object prototype ' + object.name + '.');

                            //todo maybe create action DUPLICATE prototype?
                            if (confirm(T.Locale.get('duplicate prototype ' + object.type + ' ' + object.subtype + ' confirm'))) {//todo create better confirm

                                var object_duplicate = editor.opened.object.clone();
                                object_duplicate.id = generateID();

                                T.User.object_prototypes.push(object_duplicate);

                                //r('Opening duplicated object prototype '+object.name+'.');
                                //r(object_duplicate);
                                T.UI.popupWindow.close();
                                editor.open(0, object_duplicate.id);

                            }


                        } else {
                            throw new Error('' + collection + ' is invalid identificator of collection!');
                        }
                    });

                }else{

                    $('#editor-object-duplicate').hide();

                }

                //-----------------


                //-----------------------------------------

            }, [editor.open_callback, editor.opened.object]);

        };



        if (id == -1) {

            this.opened.object = this.default_object.clone();
            this.opened.object.id = generateID();


            if (collection === 0) {

                T.User.object_prototypes.push(this.opened.object);
                T.UI.Menu.Prototypes.menu(this.opened.object.type, this.opened.object.subtype);

                r('Creating new object prototype ' + this.opened.object.name + '.');

                object_ready();

            } else if (collection == 1) {

                /*objects_server.push(this.opened.object)
                 r('Creating new object '+this.opened.object.name+'.');*/
                throw new Error('In objects can not be created new object without prototype.');

                //object_ready();


            } else {
                throw new Error('' + collection + ' is invalid identificator of collection!');
            }


        } else {

            if (collection === 0) {

                this.opened.object = T.User.object_prototypes.getById(id);
                r('Opening object prototype ' + this.opened.object.name + '.');

                object_ready();


            } else if (collection == 1) {

                this.opened.object = objects_server.getById(id);

                if (editor.opened.object) {

                    r('Opening object ' + this.opened.object.name + '.');
                    object_ready();

                } else {


                    T.TownsAPI.townsAPI.get('objects/'+id,{},function(response){

                        editor.opened.object = T.Objects.Object.init(response);

                        r('Opening object ' + editor.opened.object.name + ' loaded from API.');
                        object_ready();

                    },function(){

                        T.UI.popupWindow.open(T.Locale.get('page','404','title'), T.Locale.get('page','404','content'), false, 'SMALL');

                    });


                }

            } else {
                throw new Error('' + collection + ' is invalid identificator of collection!');
            }

        }





    }

};