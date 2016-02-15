/**
 * @author ©Towns.cz
 * @fileOverview Block editor
 */
//======================================================================================================================


T.Plugins.install(new T.Editor(
    'building-block-editor',
    {
      type: 'building',
      subtype: 'block'
    },
    'Stavební bloky',
    `<div class="page-column-2">
<form onsubmit="return false;" id="block-editing-form">
<table>

  <tr><th colspan="2">{{block shape}}</th></tr>
  <tr>
    <td>{{block shape n}}:</td>
    <td><input id="block-editing-shape-n" type="range" min="3" max="20" step="1" /></td>
  </tr>
    <tr>
    <td>{{block shape rotated}}:</td>
    <td><input id="block-editing-shape-rotated" type="checkbox" /></td>
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
    <td>{{block rotation}}:</td>
    <td><input id="block-editing-rotation" type="range" min="0" max="360" step="10" /></td>
  </tr>



  <tr><th colspan="2">{{block material}}</th></tr>
  <tr>
    <td>{{block color}}:</td>
    <td><input id="block-editing-color" type="color" value=""></td>
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

        if(particle.shape.rotated){
            $('#block-editing-shape-rotated').attr('checked','checked');
        }


        $('#block-editing-shape-top').val(particle.shape.top);
        $('#block-editing-shape-bottom').val(particle.shape.bottom);

        $('#block-editing-skew-z-x').val(particle.skew.z.x);
        $('#block-editing-skew-z-y').val(particle.skew.z.y);

        $('#block-editing-size-x').val(particle.size.x);
        $('#block-editing-size-y').val(particle.size.y);
        $('#block-editing-size-z').val(particle.size.z);

        $('#block-editing-rotation').val(particle.rotation);
        $('#block-editing-color').val(particle.color);



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

                object.design.data.particles[0].rotation = Math.toInt($('#block-editing-rotation').val());


                model_canvas.setModel(object.design.data);


        });

        $('#block-editing-shape-rotated').click(function(){

            object.design.data.particles[0].shape.rotated = $('#block-editing-shape-rotated').is(':checked');

            model_canvas.setModel(object.design.data);

        });



        $('#block-editing-color').change(function(){

            object.design.data.particles[0].color = $('#block-editing-color').val();
            model_canvas.setModel(object.design.data);


        });




    },
    {

        name: "",
        type: "building",
        subtype: "block",
        design: {
            type: "model",
            data: new Model({
                particles: [
                    {
                        shape:{
                            type: 'prism',
                            n:6,
                            rotated:true
                        },
                        color: "#cccccc",
                        position: {x:0,y:0,z:0},
                        size: {x:40,y:40,z:40},
                        rotation: 0

                    }
                ]
            })

        }
    }



));