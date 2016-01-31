/**
 * @author ©Towns.cz
 * @fileOverview Block editor
 */
//======================================================================================================================


T.Plugins.install(new T.Editor(
    'building-editor',
    {
        type: 'building',
    },
    'Editor budov',
    `<div class="page-column-2">
<form onsubmit="return false;" id="block-editing-form">
<table>


  <tr><th colspan="2">{{block choose}}</th></tr>
  <tr>
    <td colspan="2" id="block-choose"></td>
  </tr>


  <tr><th colspan="2">{{block position}}</th></tr>
  <tr>
    <td>{{block position x}}:</td>
    <td><input id="block-editing-position-x" type="range" min="-100" max="100" step="1" /></td>
  </tr>
  <tr>
    <td>{{block position y}}:</td>
    <td><input id="block-editing-position-y" type="range" min="-100" max="100" step="1" /></td>
  </tr>
  <tr>
    <td>{{block position z}}:</td>
    <td><input id="block-editing-position-z" type="range" min="0" max="100" step="1" /></td>
  </tr>



  <tr><th colspan="2">{{block shape}}</th></tr>
  <tr>
    <td>{{block shape n}}:</td>
    <td><input id="block-editing-shape-n" type="range" min="3" max="20" step="1" /></td>
  </tr>
  <tr>
    <td>{{block shape top}}:</td>
    <td><input id="block-editing-shape-top" type="range" min="0" max="2" step="0.05" /></td>
  </tr>
  <tr>
    <td>{{block shape bottom}}:</td>
    <td><input id="block-editing-shape-bottom" type="range" min="0" max="2" step="0.05" /></td>
  </tr>




  <tr><th colspan="2">{{block skew}}</th></tr>
  <tr>
    <td>{{block skew z x}}:</td>
    <td><input id="block-editing-skew-z-x" type="range" min="-5" max="5" step="0.05" /></td>
  </tr>
  <tr>
    <td>{{block skew z y}}:</td>
    <td><input id="block-editing-skew-z-y" type="range" min="-5" max="5" step="0.05" /></td>
  </tr>




  <tr><th colspan="2">{{block size}}</th></tr>
  <tr>
    <td>{{block size x}}:</td>
    <td><input id="block-editing-size-x" type="range" min="1" max="100" step="1" /></td>
  </tr>
  <tr>
    <td>{{block size y}}:</td>
    <td><input id="block-editing-size-y" type="range" min="1" max="100" step="1" /></td>
  </tr>
  <tr>
    <td>{{block size z}}:</td>
    <td><input id="block-editing-size-z" type="range" min="1" max="100" step="1" /></td>
  </tr>




  <tr><th colspan="2">{{block rotation}}</th></tr>
  <tr>
    <td>{{block rotation xy}}:</td>
    <td><input id="block-editing-rotation-xy" type="range" min="0" max="360" step="10" /></td>
  </tr>
    <tr>
    <td>{{block rotation xz}}:</td>
    <td><input id="block-editing-rotation-xz" type="range" min="0" max="90" step="10" /></td>
  </tr>


  <tr><th colspan="2">{{block material}}</th></tr>
  <tr>
    <td colspan="2"><div id="farbtastic-color-box"></div></td>
  </tr>


</table>
</form>
</div>


<div class="page-column-2">

    <div id="model-canvas"></div>

</div>


    `,function(object){


        var model_canvas= new ModelCanvas('model-canvas',object.design.data,380,600);
        var farbtastic = $.farbtastic('#farbtastic-color-box')

        var block_choose_i=0;


        var block_choose = function(i){

            r('Choosed block '+i);

            $('.block-choose').removeClass('selected');
            $('#block-choose-'+i).addClass('selected');
            r($('#block-choose-'+i));
            block_choose_i=i;

            var particle=ModelParticles.cParams(object.design.data.particles[0]);

            $('#block-editing-position-x').val(particle.position.x);
            $('#block-editing-position-y').val(particle.position.y);
            $('#block-editing-position-z').val(particle.position.z);

            $('#block-editing-shape-n').val(particle.shape.n);

            $('#block-editing-shape-top').val(particle.shape.top);
            $('#block-editing-shape-bottom').val(particle.shape.bottom);

            $('#block-editing-skew-z-x').val(particle.skew.z.x);
            $('#block-editing-skew-z-y').val(particle.skew.z.y);

            $('#block-editing-size-x').val(particle.size.x);
            $('#block-editing-size-y').val(particle.size.y);
            $('#block-editing-size-z').val(particle.size.z);

            $('#block-editing-rotation-xy').val(particle.rotation.xy);
            $('#block-editing-rotation-xz').val(particle.rotation.xz);
            //('#block-editing-rotation-yz').val(particle.rotation.yz);


            farbtastic.setColor(object.design.data.particles[0].color);

        };




        object.design.data.particles.forEach(function(particle,block_i){

            var particle_model = new Model({
                particles:[
                    particle
                ]
            });

            r(particle_model);

            var particle_icon=particle_model.createIcon(50);


            var particle_button = $('<img>');
            particle_button.attr('src',particle_icon);
            particle_button.attr('block_i',block_i);
            particle_button.attr('id','block-choose-'+block_i);
            particle_button.attr('class','block-choose');

            //r(block_choose);
            particle_button.click(function(){

                var block_i=$(this).attr('block_i');

                block_choose(block_i);


            });

            $('#block-choose').append(particle_button);


        });


        block_choose(0);




        farbtastic.linkTo(Interval.maxRunPerMs(function (color) {

            object.design.data.particles[block_choose_i].color=color;
            model_canvas.setModel(object.design.data);

        }, 200));


        $('#block-editing-form').find('input').mousemove(function(){


                object.design.data.particles[block_choose_i].position.x = Math.toInt($('#block-editing-position-x').val());
                object.design.data.particles[block_choose_i].position.y = Math.toInt($('#block-editing-position-y').val());
                object.design.data.particles[block_choose_i].position.z = Math.toInt($('#block-editing-position-z').val());

                object.design.data.particles[block_choose_i].shape.n = Math.toInt($('#block-editing-shape-n').val());

                object.design.data.particles[block_choose_i].shape.top = Math.toFloat($('#block-editing-shape-top').val());
                object.design.data.particles[block_choose_i].shape.bottom = Math.toFloat($('#block-editing-shape-bottom').val());

                object.design.data.particles[block_choose_i].skew={z:{}};
                object.design.data.particles[block_choose_i].skew.z.x = Math.toFloat($('#block-editing-skew-z-x').val());
                object.design.data.particles[block_choose_i].skew.z.y = Math.toFloat($('#block-editing-skew-z-y').val());


                object.design.data.particles[block_choose_i].size.x = Math.toInt($('#block-editing-size-x').val());
                object.design.data.particles[block_choose_i].size.y = Math.toInt($('#block-editing-size-y').val());
                object.design.data.particles[block_choose_i].size.z = Math.toInt($('#block-editing-size-z').val());

                object.design.data.particles[block_choose_i].rotation.xy = Math.toInt($('#block-editing-rotation-xy').val());
                object.design.data.particles[block_choose_i].rotation.xz = Math.toInt($('#block-editing-rotation-xz').val());
                //particle.rotation.yz = Math.toInt($('#block-editing-rotation-yz').val());

                model_canvas.setModel(object.design.data);


            }

        );


    },
    {

        name: "",
        type: "building",
        subtype: "main",
        design: {
            type: "model",
            data: new Model({
                particles: [
                    {
                        shape:{
                            type: 'prism',
                            n:4,
                        },
                        color: "#cccccc",
                        position: {x:0,y:0,z:0},
                        size: {x:40,y:40,z:40},
                        rotation: {"xy":0}

                    },{
                        shape:{
                            type: 'prism',
                            n:4,
                        },
                        color: "#cccccc",
                        position: {x:0,y:0,z:0},
                        size: {x:40,y:40,z:40},
                        rotation: {"xy":0}

                    }
                ]
            })

        }
    }



));