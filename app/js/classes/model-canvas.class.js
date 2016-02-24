/**
 * @author ©Towns.cz
 * @fileOverview View model on html canvas
 */
//======================================================================================================================



var ModelCanvas = function(id,model,width,height,rotation=map_rotation,zoom=0,x=0,y=0,slope=map_slope,simple=true){

    this.rotation=rotation;
    this.slope=slope;
    this.zoom=zoom;
    this.width=width;
    this.height=height;
    this.simple=simple;
    this.selected_path=false;
    this.x=x;
    this.y=y;

    this.editor=$('#'+id);


    this.editor.css('width',this.width);
    this.editor.css('height',this.height);

    this.width=this.editor.width();
    this.height=this.editor.height();


    this.editor.css('overflow','hidden');

    this.editor.addClass('model-canvas');

    this.editor.html(`

        <style>

            .model-canvas-canvas{
                z-index:1;
                display:block;
            }

            .model-canvas-drag{
                z-index:2;
                display:block;
                position:relative;
                top:`+(-1*this.height)+`px;
                left:0px;
                width:`+this.width+`px;
                height:`+this.height+`px;
                /*border: 2px solid #FF0000;*/
            }


            .model-canvas-ctl{
                z-index:3;
                position: relative;
                top:`+(-2*this.height)+`px;
                left: `+(this.width-40)+`px;
            }

            .model-canvas-ctl .button-icon{
                display: block;
                width: 10px;
                height: 10px;
                font-size: 10px;
            }

        </style>


        <canvas class="model-canvas-canvas" width="`+this.width+`" height="`+this.height+`"></canvas>
        <div class="model-canvas-drag"></div>
        <div class="model-canvas-ctl">

            <div class="model-canvas-plus button-icon" title="<?=locale('ui model controls plus')?>"><i class="fa fa-plus"></i></div>
            <div class="model-canvas-minus button-icon" title="<?=locale('ui model controls minus')?>"><i class="fa fa-minus"></i></div>

        </div>




    `);

    this.gl=this.editor.find('.model-canvas-canvas')[0].getContext('webgl');


    var self=this;

    this.editor.find('.model-canvas-ctl').find('.model-canvas-plus').click(function(){
        self.zoom+=0.2;
        self.redraw();
    });


    this.editor.find('.model-canvas-ctl').find('.model-canvas-minus').click(function(){
        self.zoom-=0.2;
        self.redraw();
    });


    var drag_vars={};
    this.editor.find('.model-canvas-drag').draggable({
        //'axis': 'x',
        'start': function(){

            drag_vars.x_original=$(this).css('left');
            drag_vars.y_original=$(this).css('top');
            drag_vars.x_last=$(this).position().left;
            drag_vars.y_last=$(this).position().top;

        },
        'drag': function(){

            var x=$(this).position().left;
            var y=$(this).position().top;
            var x_delta=x-drag_vars.x_last;
            var y_delta=y-drag_vars.y_last;
            drag_vars.x_last=x;
            drag_vars.y_last=y;

            self.rotation=(self.rotation-x_delta)%360;
            self.slope=Math.bounds(self.slope+y_delta,0,90);



            self.webGL.rotations[1].deg=self.rotation+45;//todo better solution than 45
            self.webGL.rotations[0].deg=self.slope-90;//todo better solution than 180

            self.webGL.drawScene();

            //self.draw();

        },
        'stop': function(){
            $(this).css('left',drag_vars.x_original);
            $(this).css('top',drag_vars.y_original);
        }
    });


    this.setModel(model);

};


ModelCanvas.prototype.setModel = function(model){

    this.model=model;
    this.redraw();

};


ModelCanvas.prototype.redraw = function(model){

    var size=Math.pow(Math.E,this.zoom);

    if(this.selected_path instanceof Array && this.selected_path.length==0){
        var selected=true;
    }else{
        var selected=false;
    }


    //this.gl.clearRect(0, 0, this.width, this.height);
    this.webGL = this.model.create3D(this.gl, size, this.x+(this.width/2), this.y+(this.height*(2/3)), this.rotation, this.slope, false, selected, this.simple,false);


    /*if(is(this.selected_path)){


        //r(this);
        var block_choosen=this.model.filterPathSiblings(this.selected_path);

        block_choosen.draw3D(this.gl, size, this.x+(this.width/2), this.y+(this.height*(2/3)), this.rotation, this.slope, false, true, this.simple);

    }*/

};



ModelCanvas.prototype.redrawAsync = function(model, ms=IMMEDIATELY_MS){

    var self=this;
    setInterval(
        function(){
            self.redraw(model);
        },ms
    );

};