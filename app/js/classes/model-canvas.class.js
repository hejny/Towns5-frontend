/**
 * @author ©Towns.cz
 * @fileOverview View model on html canvas
 */
//======================================================================================================================



var ModelCanvas = function(id,model,width,height,rotation=map_rotation,size=1,x=0,y=0,slope=map_slope){

    this.rotation=rotation;
    this.slope=slope;
    this.size=size;
    this.width=width;
    this.height=height;
    this.x=x;
    this.y=y;

    this.editor=$('#'+id);

    this.editor.css('width',width);
    this.editor.css('height',height);
    this.editor.css('overflow','hidden');
    this.editor.css('box-shadow','#777777 0px 0px 4px');

    this.editor.html(`

        <style>

            .model-canvas{
                z-index:1;
                display:block;
                width:`+width+`px;
                height:`+height+`px;
            }

            .model-drag{
                z-index:2;
                display:block;
                position:relative;
                top:`+(-1*height)+`px;
                left:0px;
                width:`+width+`px;
                height:`+height+`px;
                /*border: 2px solid #FF0000;*/
            }


            .model-ctl{
                z-index:3;
                position: relative;
                top:`+(-2*height)+`px;
                left: `+(width-40)+`px;
            }

            .model-ctl .mini-button{
                display: block;
                width: 10px;
                height: 10px;
                font-size: 10px;
            }

        </style>


        <canvas class="model-canvas"></canvas>
        <div class="model-drag"></div>
        <div class="model-ctl">

            <div class="model-plus mini-button" title="<?=locale('ui model controls plus')?>"><i class="fa fa-plus"></i></div>
            <div class="model-minus mini-button" title="<?=locale('ui model controls minus')?>"><i class="fa fa-minus"></i></div>

        </div>




    `);

    this.ctx=this.editor.find('.model-canvas')[0].getContext('2d');


    var self=this;

    this.editor.find('.model-ctl').find('.model-plus').click(function(){
        self.size+=0.5;
        self.draw();
    });


    this.editor.find('.model-ctl').find('.model-minus').click(function(){
        self.size-=0.5;
        self.draw();
    });


    var drag_vars={};
    this.editor.find('.model-drag').draggable({
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
            self.draw();
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
    this.draw();

};


ModelCanvas.prototype.draw = function(model){

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.model.draw(this.ctx, this.size, this.x+(this.width/2), this.y+(this.height/2), this.rotation, this.slope);

};
