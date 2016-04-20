/**
 * @author Towns.cz
 * @fileOverview Object manipulation functions
 */
//======================================================================================================================



//todo should it be here?
//todo should it be Copy object with static functions?


function deepCopy(oldObject) {//todo maybe test id under prototype exists method clone

    if(typeof(oldObject)=='undefined') throw 'You can not copy undefined.';
    if(oldObject==null) throw 'You can not copy null.';

    return JSON.parse(JSON.stringify(oldObject));

}

//-------------------------------



function deepCopyObject(oldObject) {


    var newObject = deepCopy(oldObject);

    if(is(newObject.design)){
        if(newObject.design.type=='model'){
            newObject.design.data = new T.Model(newObject.design.data);//todo maybe use clone
        }
    }

    if(is(newObject.path))
        newObject.path = new Path(newObject.path);

    return(newObject);

}


function deepCopyModel(oldObject) {


    var newObject = deepCopy(oldObject);

    newObject = new T.Model(newObject);//todo maybe use clone

    return(newObject);

}
