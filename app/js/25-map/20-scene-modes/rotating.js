/**
 * @author ©Towns.cz
 * @fileOverview Babylon map - moving mode
 */
//======================================================================================================================


TOWNS.Map.Scene.prototype.attachROTATING = function(){

    var self = this;


    self.pointer_position=null;

    self.onLeftDown = function (evt) {

        self.pointer_position = {
            x: self.scene.pointerX,
            y: self.scene.pointerY
        };



    };

    self.onLeftUp = function (evt) {

        self.pointer_position=null;

    };


    self.onPointerMove = function (evt) {



        if (!self.pointer_position) {
            return;
        }


        var x = self.scene.pointerX-self.pointer_position.x;
        var y = self.scene.pointerY-self.pointer_position.y;

        //r(x,y);

        self.camera.alpha+=x/-500;
        self.camera.beta+=y/-1000;

        self.setCamera();

        //r(self.camera.beta,self.camera.alpha);

        self.pointer_position.x = self.scene.pointerX;
        self.pointer_position.y = self.scene.pointerY;


    };



};