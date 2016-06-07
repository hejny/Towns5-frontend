/**
 * @author Towns.cz
 * @fileOverview  Key controls - eg. arrows, wasd,...
 */
//======================================================================================================================



var controls_keys={
    'UP':  [38,87],
    'DOWN':  [40,83],
    'LEFT':  [37,65],
    'RIGHT':  [39,68]
    /*'slopeup':  [88],
     'slopedown':  [67],
     'perspectiveup':  [86],
     'perspectivedown':  [66],
     'sizeup':  [78],
     'sizedown':  [77]*/


};

//------------------------------------------------------------




window.addEventListener('keydown', function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {

        if(T.UI.Status.focusOnMap()){
            e.preventDefault();
        }


    }
}, false);

//------------------------------------------------------------

var keys=[];
var moving=false;


var controls_down = {
    update: function () {
        for (var control in controls_keys) {

            this[control] = false;

            for (var i = 0, l = keys.length; i < l; i++) {

                if(controls_keys[control].indexOf(keys[i]) !== -1) {

                    this[control] = true;

                }

            }

        }
    }
};




window.addEventListener('keydown', function(e) {

    if(T.UI.Status.focusOnMap()) {
        r('DOWN', e.keyCode);

        if (keys.indexOf(e.keyCode) === -1) {
            keys.push(e.keyCode);

            controls_down.update();
            /*if(typeof releaseKeyTimeout!='undefined')
                clearTimeout(releaseKeyTimeout);

            releaseKeyTimeout=setTimeout(function(){
                r('Released all keys');
                keys=[];
            },500);*/

        }
    }

});

window.addEventListener('keyup', function(e) {

    //if(T.UI.Status.focusOnMap()) {
        r('UP', e.keyCode);

        var i = keys.indexOf(e.keyCode);


        if (i != -1) {
            keys.splice(i, 1);

            controls_down.update();

        }
    //}

});


var last = null;
var keys_tick = function (timestamp) {

    if (!last) last = timestamp;
    var progress = (timestamp - last)/1000;
    last = timestamp;

    if(window_opened)return;



    if (controls_down.UP) {
        moving=true;
        T.UI.Map.scene.moveBy(new T.Position(Math.cos(-T.UI.Map.scene.camera.alpha),Math.sin(-T.UI.Map.scene.camera.alpha)).multiply(-20*progress));
    }

    if (controls_down.DOWN) {
        moving=true;
        T.UI.Map.scene.moveBy(new T.Position(Math.cos(-T.UI.Map.scene.camera.alpha),Math.sin(-T.UI.Map.scene.camera.alpha)).multiply(20*progress));
    }

    if (controls_down.LEFT) {
        moving=true;
        T.UI.Map.scene.camera.alpha+= T.Math.deg2rad(90*progress);
    }


    if (controls_down.RIGHT) {
        moving=true;
        T.UI.Map.scene.camera.alpha-= T.Math.deg2rad(90*progress);
    }



    if (moving=== true && !controls_down.UP &&!controls_down.DOWN &&!controls_down.LEFT &&!controls_down.RIGHT){

        moving=false;
        //alert('stop moving by keys');
        T.UI.Map.scene.moveByProcess();

    }



    requestAnimationFrame(keys_tick);
};
requestAnimationFrame(keys_tick);

