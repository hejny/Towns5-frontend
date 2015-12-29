/**
 * @author ©Towns.cz
 * @fileOverview Object manipulation functions
 */
//======================================================================================================================



//todo should it be here?
//todo should it be Copy object with static functions?


function deepCopy(oldObject) {

    if(typeof(oldObject)=='undefined') throw 'You can not copy undefined.';

    return JSON.parse(JSON.stringify(oldObject));

}

//-------------------------------



function deepCopyObject(oldObject) {


    var newObject = deepCopy(oldObject);

    if(is(newObject.design))
        newObject.design.data = new Model(newObject.design.data);

    if(is(newObject.path))
        newObject.path = new Path(newObject.path);

    return(newObject);

}


function deepCopyModel(oldObject) {


    var newObject = deepCopy(oldObject);

    newObject = new Model(newObject);

    return(newObject);

}
