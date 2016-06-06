/**
 * @author ©Towns.cz
 * @fileOverview Babylon map - moving mode
 */
//======================================================================================================================


T.Map.Scene.prototype.attachMapRotating = function(){

    r('attachMapRotating');

    var self = this;

    self.unattach();
    self.unattach = function(){};

    self.pointer_position=null;

    self.onPointerDown = function (evt) {

        self.pointer_position = {
            x: self.scene.pointerX,
            y: self.scene.pointerY
        };



    };

    self.onPointerUp = function (evt) {

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
        self.camera.beta+=y/1000;

        self.setCamera();

        //r(self.camera.beta,self.camera.alpha);

        self.pointer_position.x = self.scene.pointerX;
        self.pointer_position.y = self.scene.pointerY;


    };



};