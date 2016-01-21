/**
 * @author ©Towns.cz
 * @fileOverview Creates Class Editor
 */
//======================================================================================================================


/**
 * Creates object editor
 * @param title
 * @param content
 * @param open_callback
 * @param default_object
 * @constructor
 */
var Editor = function(title,content,open_callback,default_object){

    this.page = new Page(
        title,
        `
        <form>
        <input type="text" id="editor-object-name" value="" placeholder="{{`+default_object.type+` `+default_object.subtype+` name placeholder}}">
        </form>
        <button onclick="Pages.block_editor.deleteBlock();">{{`+default_object.type+` `+default_object.subtype+` delete}}</button>
        <button onclick="Pages.block_editor.duplicateBlock();">{{`+default_object.type+` `+default_object.subtype+` duplicate}}</button>`+
        content,
        false,
        function(){

            if(this.opened==false)
                throw new Error('Editor error - missing object identificator!');



            if(is(building)){
                building=deepCopyObject(this.opened.object);
            }

            if(this.opened.id==-1){

                this.opened.id=generateID();
                this.opened.object.id=this.opened.id;


                if(this.opened.collection==0){

                    object_prototypes.push(this.opened.object);

                }else
                if(this.opened.collection==1){

                    objects_external.push(this.opened.object)

                }

            }else{

                if(this.opened.collection==0){

                    var i = ArrayFunctions.id2item(object_prototypes,this.opened.id);
                    object_prototypes[i]=this.opened.object;

                }else
                if(this.opened.collection==1){

                    var i = ArrayFunctions.id2item(objects_external,this.opened.id);
                    objects_external[i]=this.opened.object;

                }

            }

            this.opened=false;

        }
    );

    this.open_callback=open_callback;
    this.default_object=default_object;


    this.opened=false;

};


/**
 * Open editor
 * @param {number} collection 0=object_prototypes, 0=objects_external
 * @param {string} id
 */
Editor.prototype.open = function(collection,id){

    this.opened = {
        collection: collection,
        id: id
    };


    if(id==-1){

        this.opened.object = this.default_object;

    }else{

        if(collection==0){

            this.opened.object = ArrayFunctions.id2item(object_prototypes,id);
            objectPrototypesMenu(this.opened.object.type,this.opened.object.subtype);
            buildingStart(this.opened.object.id);


        }else
        if(collection==1){

            this.opened.object = ArrayFunctions.id2item(objects_external,id);

        }else{
            throw new Error(''+collection+' is invalid identificator of collection!');
        }

    }

    this.opened.object=deepCopyObject(this.opened.object);





    this.page.open(function(open_callback,object){

        //-----------------------------------------

        open_callback(object);

        //-----------------------------------------

        $('#editor-object-name').change(function(){
            object.name=$('#editor-object-name').val();
            r(object);
        });

        //-----------------------------------------

    },[this.open_callback,this.opened.object]);


};

