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

        var particle=ModelParticles.cParams(object.design.data.particles[0]);

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




        var farbtastic = $.farbtastic('#farbtastic-color-box').setColor(object.design.data.particles[0].color);

        farbtastic.linkTo(Interval.maxRunPerMs(function (color) {

            object.design.data.particles[0].color=color;
            model_canvas.setModel(object.design.data);

        }, 200));


        $('#block-editing-form').find('input').mousemove(function(){


                object.design.data.particles[0].shape.n = Math.toInt($('#block-editing-shape-n').val());

                object.design.data.particles[0].shape.top = Math.toFloat($('#block-editing-shape-top').val());
                object.design.data.particles[0].shape.bottom = Math.toFloat($('#block-editing-shape-bottom').val());

                object.design.data.particles[0].skew={z:{}};
                object.design.data.particles[0].skew.z.x = Math.toFloat($('#block-editing-skew-z-x').val());
                object.design.data.particles[0].skew.z.y = Math.toFloat($('#block-editing-skew-z-y').val());


                object.design.data.particles[0].size.x = Math.toInt($('#block-editing-size-x').val());
                object.design.data.particles[0].size.y = Math.toInt($('#block-editing-size-y').val());
                object.design.data.particles[0].size.z = Math.toInt($('#block-editing-size-z').val());

                object.design.data.particles[0].rotation.xy = Math.toInt($('#block-editing-rotation-xy').val());
                object.design.data.particles[0].rotation.xz = Math.toInt($('#block-editing-rotation-xz').val());
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