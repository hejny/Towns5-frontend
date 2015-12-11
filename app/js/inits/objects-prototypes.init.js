/**
 * Created by hejny on 1.12.15.
 */
//todo headers


var objectPrototypes=[];





objectPrototypes.push({

    name: "Kamenný kvádr",
    type: "building",
    subtype: "block",
    actions: {
        attack: {
            strenght: 15,
            radius: 1,
            rounds: 1,
            cooldown: 1,
            retaliate: true
        },
        defense: {
            strenght: 8
        }
    },
    design: {
        type: "model",
        data: new Model({
            particles: [
                {
                    shape:"cube",
                    color: "#cccccc",
                    position: {x:0,y:0,z:0},
                    size: {x:10,y:10,z:80},
                    rotation: {"xy":0}

                }
            ]
        })

    }

},{

    name: "Kamenný kvádr",
    type: "building",
    subtype: "block",
    actions: {
        attack: {
            strenght: 15,
            radius: 1,
            rounds: 1,
            cooldown: 1,
            retaliate: true
        },
        defense: {
            strenght: 8
        }
    },
    design: {
        type: "model",
        data: new Model({
            particles: [
                {
                    shape:"cube",
                    color: "#cccccc",
                    position: {x:0,y:0,z:0},
                    size: {x:20,y:30,z:40},
                    rotation: {"xy":0}

                }
            ]
        })

    }

},{

    name: "Kamenná střecha",
    type: "building",
    subtype: "block",
    actions: {
        attack: {
            strenght: 15,
            radius: 1,
            rounds: 1,
            cooldown: 1,
            retaliate: true
        },
        defense: {
            strenght: 8
        }
    },
    design: {
        type: "model",
        data: new Model({
            particles: [
                {
                    shape:"pyramid",
                    color: "#cccccc",
                    position: {x:0,y:0,z:0},
                    size: {x:40,y:40,z:50},
                    rotation: {"xy":0}

                }
            ]
        })

    }

},{

    name: "Kamenná věž",
    type: "building",
    subtype: "main",
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
                    shape:"cube",
                    color: "#999999",
                    position: {x:0,y:0,z:0},
                    size: {x:20,y:30,z:40},
                    rotation: {"xy":0}

                },{
                    shape:"cube",
                    color: "#cccccc",
                    position: {x:0,y:0,z:40},
                    size: {x:50,y:50,z:40},
                    rotation: {"xy":45}

                }
            ]
        })

    }

},{

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
                    shape:"cube",
                    color: "#bbbbbb",
                    position: {x:0,y:0,z:0},
                    size: {x:40,y:40,z:100},
                    rotation: {"xy":0}

                },{
                    shape:"cube",
                    color: "#999999",
                    position: {x:0,y:0,z:100},
                    size: {x:10,y:10,z:30},
                    rotation: {"xy":45}

                }
            ]
        })

    }

});