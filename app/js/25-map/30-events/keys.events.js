/**
 * @author Towns.cz
 * @fileOverview  Key controls - eg. arrows, wasd,...
 */
//======================================================================================================================



var controls={
    'up':  [38,87],
    'down':  [40,83],
    'left':  [37,65],
    'right':  [39,68]
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


window.addEventListener('keydown', function(e) {

    if(T.UI.Status.focusOnMap()) {
        r('DOWN', e.keyCode);

        if ($.inArray(e.keyCode, keys) == -1) {
            keys.push(e.keyCode);

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

        var i = $.inArray(e.keyCode, keys);


        if (i != -1) {
            keys.splice(i, 1);

        }
    //}

});


var moving=false;

var last = null;
var keys_tick =
function (timestamp) {

    if (!last) last = timestamp;
    var progress = (timestamp - last)/1000;
    last = timestamp;

    if(window_opened)return;

    //console.log(keys);

    var keys_ = [];


    for(var key in controls){

        for (var i = 0, l=keys.length; i < l; i++) {

            if (controls[key].indexOf(keys[i]) != -1) {
                keys_.push(key);

            }

        }

    }




    if ($.inArray('up', keys_) != -1) {
        moving=true;
        T.UI.Map.scene.moveBy(new T.Position(Math.cos(-T.UI.Map.scene.camera.alpha),Math.sin(-T.UI.Map.scene.camera.alpha)).multiply(-20*progress));
    }

    if ($.inArray('down', keys_) != -1) {
        moving=true;
        T.UI.Map.scene.moveBy(new T.Position(Math.cos(-T.UI.Map.scene.camera.alpha),Math.sin(-T.UI.Map.scene.camera.alpha)).multiply(20*progress));
    }

    if ($.inArray('left', keys_) != -1) {
        moving=true;
        T.UI.Map.scene.camera.alpha+= T.Math.deg2rad(90*progress);
    }


    if ($.inArray('right', keys_) != -1) {
        moving=true;
        T.UI.Map.scene.camera.alpha-= T.Math.deg2rad(90*progress);
    }


    if(moving=== true)
        if ($.inArray('up', keys_) == -1)
            if ($.inArray('down', keys_) == -1)
                if ($.inArray('left', keys_) == -1)
                    if ($.inArray('right', keys_) == -1){
                        moving=false;
                        //alert('stop moving by keys');
                        T.UI.Map.scene.moveByProcess();
                    }






    requestAnimationFrame(keys_tick);
};
requestAnimationFrame(keys_tick);

