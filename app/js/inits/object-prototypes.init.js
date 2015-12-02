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
            strenght: 8-10
        }
    },
    design: {
        type: "model",
        data: new Model({
            particles: [
                {
                    shape:"cube",
                    color: "#cccccc",
                    position: {x:20,y:30,z:40},
                    size: {x:20,y:30,z:40},
                    rotation: {"xy":45}

                }
            ]
        })

    }

});