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


$(function(){



    window.addEventListener('keydown', function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {

            if(T.UI.Status.focusOnMap()){
                e.preventDefault();
            }


        }
    }, false);

    //------------------------------------------------------------


    $(document).keydown(function (e) {

        if(T.UI.Status.focusOnMap()) {
            r('DOWN', e.which);

            if ($.inArray(e.which, keys) == -1) {
                keys.push(e.which);

                if(typeof releaseKeyTimeout!='undefined')
                    clearTimeout(releaseKeyTimeout);

                releaseKeyTimeout=setTimeout(function(){
                    r('Released all keys');
                    keys=[];
                },500);

            }
        }

    });

    $(document).keyup(function (e) {

        //if(T.UI.Status.focusOnMap()) {
            r('UP', e.which);

            var i = $.inArray(e.which, keys);


            if (i != -1) {
                keys.splice(i, 1);

            }
        //}

    });




    setInterval(
        function () {

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




            //r(keys_);

            if ($.inArray('up', keys_) != -1) {
                T.UI.Map.mapMove(0,30,true);
                moving=true;
            }


            if ($.inArray('down', keys_) != -1) {
                T.UI.Map.mapMove(0,-30);
                moving=true;
            }

            if ($.inArray('left', keys_) != -1) {
                T.UI.Map.mapMove(30,0);
                moving=true;
            }


            if ($.inArray('right', keys_) != -1) {
                T.UI.Map.mapMove(-30,0);
                moving=true;
            }


            if(moving=== true)
                if ($.inArray('up', keys_) == -1)
                    if ($.inArray('down', keys_) == -1)
                        if ($.inArray('left', keys_) == -1)
                            if ($.inArray('right', keys_) == -1){
                                moving=false;
                                //alert('stop moving by keys');
                                T.UI.Map.updateMap();
                            }






        },
        100
    );

});