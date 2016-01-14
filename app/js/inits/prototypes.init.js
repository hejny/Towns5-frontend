/**
 * @author ©Towns.cz
 * @fileOverview Load objects prototypes
 * todo load from API
 */
//======================================================================================================================



var object_prototypes=[];




//r('LOADING prototypes');
townsAPI.get('objects/prototypes',{},function(response){

    //r('LOADED prototypes');

    response.forEach(function(object){

        var object_prototype=deepCopyObject(object);
        object_prototype.prototypeId=object_prototype._id;
        object_prototype.id=object_prototype._id;


        object_prototypes.push(object_prototype);//todo refactor init object or new object

    });

    r(object_prototypes);



});





/*object_prototypes.push({

    id: 'x1',
    name: "Kamenný kvádr",
    type: "building",
    subtype: "block",
    design: {
        type: "model",
        data: new Model({
            particles: [
                {
                    shape:{
                        type: 'prism',
                        n:4
                    },
                    color: "#cccccc",
                    position: {x:0,y:0,z:0},
                    size: {x:40,y:40,z:40},
                    rotation: {"xy":0}

                }
            ]
        })

    }

},{

    id: 'x2',
    name: "Kamenná pyramida",
    type: "building",
    subtype: "block",
    design: {
        type: "model",
        data: new Model({
            particles: [
                {
                    shape:{
                        type: 'prism',
                        n:3
                    },
                    color: "#cccccc",
                    position: {x:0,y:0,z:0},
                    size: {x:40,y:60,z:80},
                    rotation: {"xy":0,"xz":90}

                }
            ]
        })

    }

},{

    id: 'x3',
    name: "Kamenná střecha",
    type: "building",
    subtype: "block",
    design: {
        type: "model",
        data: new Model({
            particles: [
                {
                    shape:{
                        type: 'prism',
                        n:4,
                        top:0
                    },
                    color: "#cccccc",
                    position: {x:0,y:0,z:0},
                    size: {x:40,y:40,z:40},
                    rotation: {"xy":0}

                }
            ]
        })

    }

},{

    id: 'x5',
    name: "Kamenná hradba",
    type: "building",
    subtype: "wall",
    actions: {
        attack: {
            strenght: 15,
            radius: 1,
            rounds: 1,
            cooldown: 1,
            retaliate: true
        },
        defense: {
            strenght: 10
        }
    },
    design: {
        type: "model",
        data: new Model({
            particles: [
                {
                    shape:{
                        type: 'prism',
                        n:17
                    },
                    color: "#874822",
                    position: {x:0,y:0,z:0},
                    size: {x:40,y:20,z:60},
                    rotation: {"xy":0}

                }
            ]
        })

    }

});*/