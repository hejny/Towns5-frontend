/**
 * @author ©Towns.cz
 * @fileOverview Creates Class Editor
 */
//======================================================================================================================


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
Towns.Editor = function(uri,conditions,title,content,open_callback,default_object){

    this.uri=uri;
    this.conditions=conditions;

    var self=this;
    this.page = new Towns.Page(
        uri,
        title,
        `
        <form id="editor-object-header">
            <input type="text" id="editor-object-name" value="" placeholder="{{`+default_object.type+` `+default_object.subtype+` name placeholder}}">


            <div class="button-icon"  id="editor-object-duplicate" title="{{`+default_object.type+` `+default_object.subtype+` delete}}"><i class="fa fa-clone"></i></div>


            <div class="button-icon"  id="editor-object-delete" title="{{`+default_object.type+` `+default_object.subtype+` duplicate}}"><i class="fa fa-trash-o"></i></div>


        </form>
        <div id="editor-object-errors"></div>`+content,
        false,
        function(){

            if(self.opened==false)
                throw new Error('Editor error - missing object identificator!');



            if(self.opened.collection==0){

                var i = ArrayFunctions.id2item(object_prototypes,self.opened.object.id);
                object_prototypes[i]=self.opened.object;

                r(object_prototypes[i]);


                objectPrototypesMenu(object_prototypes[i].type,object_prototypes[i].subtype);
                buildingStart(object_prototypes[i].id);


                townsAPI.post('objects/prototypes',object_prototypes[i]
                    ,function(response){


                        objectPrototypesMenu(object_prototypes[i].type,object_prototypes[i].subtype);
                        buildingStart(object_prototypes[i].id);


                    }
                    ,function(errors){

                    self.open(0,object_prototypes[i].id,errors);
                });


                r('Updating object prototype '+self.opened.object.name+'.');

            }else
            if(self.opened.collection==1){


                var i = ArrayFunctions.id2item(objects_external,self.opened.object.id);
                objects_external[i]=self.opened.object;//deepCopyObject(self.opened.object);


                townsAPI.post('objects/'+objects_external[i].id,objects_external[i]
                    ,function(response){

                        UI.message(Locale.get('object',objects_external[i].type,'saved'),'success');

                    }
                    ,function(errors){

                        self.open(0,objects_external[i].id,errors);
                    });


                r('Updating object '+self.opened.object.name+'.');



            }


            self.opened=false;

        }
    );

    this.open_callback=open_callback;
    this.default_object=default_object;


    this.opened=false;

};


/**
 * Open editor
 * @param {number} collection 0=object_prototypes, 1=objects_external
 * @param {string} id
 */
Towns.Editor.prototype.open = function(collection,id,errors=false){

    //r('Towns.Editor');


    this.opened = {
        collection: collection
    };


    if(id==-1){

        this.opened.object = deepCopyObject(this.default_object);
        this.opened.object.id=generateID();


        if(collection==0){

            object_prototypes.push(this.opened.object);
            objectPrototypesMenu(this.opened.object.type,this.opened.object.subtype);

            r('Creating new object prototype '+this.opened.object.name+'.');


        }else
        if(collection==1){

            /*objects_external.push(this.opened.object)
            r('Creating new object '+this.opened.object.name+'.');*/
            throw new Error('In objects can not be created new object without prototype.');

        }else{
            throw new Error(''+collection+' is invalid identificator of collection!');
        }






    }else{

        if(collection==0){

            this.opened.object = ArrayFunctions.id2item(object_prototypes,id);
            r('Opening object prototype '+this.opened.object.name+'.');


        }else
        if(collection==1){

            r(objects_external,id);
            this.opened.object = ArrayFunctions.id2item(objects_external,id);
            r('Opening object '+this.opened.object.name+'.');

        }else{
            throw new Error(''+collection+' is invalid identificator of collection!');
        }

    }


    T.URI.object=this.opened.object.id;


    var editor=this;
    this.page.open(function(open_callback,object){

        //-----------------------------------------

        open_callback(object);


        //-----------------------------------------Errors

        if(errors){

            //r(errors);
            for(key in errors.message){
                //UI.message(errors.message[key].message,'error');

                $('#editor-object-errors').append('<div class="error">'+(errors.message[key].message.text2html())+'</div>');
            }


        }

        //-----------------------------------------Editor header

        //-----------------Name
        //--------Init name
        $('#editor-object-name').val(object.name);
        //--------Update name
        $('#editor-object-name').change(function(){
            object.name=$('#editor-object-name').val();
        });
        //-----------------

        //-----------------Delete
        $('#editor-object-delete').click(function(){
            if(editor.opened.collection==0){

                r('Deleting object prototype '+object.name+'.');

                //todo maybe create action DELETE prototype?
                if(confirm(Locale.get('delete prototype '+object.type+' '+object.subtype+' confirm'))){//todo create better confirm

                    ArrayFunctions.idRemove(object_prototypes,object.id);

                    mapSpecialCursorStop();
                    objectPrototypesMenu(object.type,object.subtype);

                    UI.popupWindowClose(true);

                }


            }else{
                throw new Error(''+collection+' is invalid identificator of collection!');
            }
        });
        //-----------------


        //-----------------Duplicate
        $('#editor-object-duplicate').click(function(){
            if(editor.opened.collection==0){

                r('Duplicating object prototype '+object.name+'.');

                //todo maybe create action DUPLICATE prototype?
                if(confirm(Locale.get('duplicate prototype '+object.type+' '+object.subtype+' confirm'))){//todo create better confirm

                    var object_duplicate=deepCopyObject(editor.opened.object);
                    object_duplicate.id=generateID();

                    object_prototypes.push(object_duplicate);

                    //r('Opening duplicated object prototype '+object.name+'.');
                    //r(object_duplicate);
                    UI.popupWindowClose();
                    editor.open(0,object_duplicate.id);

                }


            }else{
                throw new Error(''+collection+' is invalid identificator of collection!');
            }
        });
        //-----------------


        //-----------------------------------------

    },[this.open_callback,this.opened.object]);


};

