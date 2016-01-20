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
 * @param create_object
 * @param default_object
 * @constructor
 */
var Editor = function(title,content,open_callback,create_object,default_object){

    this.page = new Page(
        title,
        content,
        false,
        function(){

            if(this.opened==false)
                throw new Error('Editor error - missing object identificator!');


            var object=this.create_object();

            if(this.opened.id==-1){

                this.opened.id=generateID();
                object.id=this.opened.id;


                if(this.opened.collection==0){

                    object_prototypes.push(object);

                }else
                if(this.opened.collection==1){

                    objects_external.push(object)

                }

            }else{

                if(this.opened.collection==0){

                    var i = ArrayFunctions.id2item(object_prototypes,this.opened.id);
                    object_prototypes[i]=object;

                }else
                if(this.opened.collection==1){

                    var i = ArrayFunctions.id2item(objects_external,this.opened.id);
                    objects_external[i]=object;

                }

            }

        }
    );

    this.open_callback=open_callback;
    this.create_object=create_object;
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

        var object = this.default_object;

    }else{

        if(collection==0){

            var object = ArrayFunctions.id2item(object_prototypes,id);

        }else
        if(collection==1){

            var object = ArrayFunctions.id2item(objects_external,id);

        }else{
            throw new Error(''+collection+' is invalid identificator of collection!');
        }

    }

    //object=deepCopyObject(object);
    this.open_callback(object);


}

