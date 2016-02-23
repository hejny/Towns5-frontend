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
<form onsubmit="return false;" class="full" id="form">
<table class="full_width">


  <tr><th colspan="2">{{block choose}}</th></tr>
  <tr>
    <td colspan="2" id="block-choose"></td>
  </tr>

  <tr><th colspan="2">{{block actions}}</th></tr>
  <tr>
    <td colspan="2" id="block-actions"></td>
  </tr>


  <tr category="info"><th colspan="2">{{block info}}</th></tr>
  <tr category="info">
    <td>{{block name}}:</td>
    <td><input class="block-parameter full_width" id="name" type="text" /></td>
  </tr>
  <tr category="info">
    <td>{{block link}}:</td>
    <td><input class="block-parameter full_width" id="link" type="text" /></td>
  </tr>




  <tr category="position"><th colspan="2">{{block position}}</th></tr>
  <tr category="position">
    <td>{{block position x}}:</td>
    <td><input class="block-parameter" id="position-x" type="range" min="-100" max="100" step="1" />
</td>
  </tr>
  <tr category="position">
    <td>{{block position y}}:</td>
    <td><input class="block-parameter" id="position-y" type="range" min="-100" max="100" step="1" /></td>
  </tr>
  <tr category="position">
    <td>{{block position z}}:</td>
    <td><input class="block-parameter" id="position-z" type="range" min="0" max="100" step="1" /></td>
  </tr>



  <tr category="shape"><th colspan="2">{{block shape}}</th></tr>
  <tr category="shape">
    <td>{{block shape n}}:</td>
    <td><input class="block-parameter" id="shape-n" type="range" min="3" max="20" step="1" /></td>
  </tr>
  <tr category="shape">
    <td>{{block shape rotated}}:</td>
    <td><input class="block-parameter" id="shape-rotated" type="checkbox" /></td>
  </tr>
  <tr category="shape">
    <td>{{block shape top}}:</td>
    <td><input class="block-parameter" id="shape-top" type="range" min="0" max="2" step="0.05" /></td>
  </tr>
  <tr category="shape">
    <td>{{block shape bottom}}:</td>
    <td><input class="block-parameter" id="shape-bottom" type="range" min="0" max="2" step="0.05" /></td>
  </tr>





  <tr category="size"><th colspan="2">{{block size}}</th></tr>
  <tr category="size">
    <td>{{block size}}:</td>
    <td><input class="block-parameter" id="size" type="range" min="0.1" max="3" step="0.1" /></td>
  </tr>
  <tr category="size">
    <td>{{block size x}}:</td>
    <td><input class="block-parameter" id="size-x" type="range" min="1" max="100" step="1" /></td>
  </tr>
  <tr category="size">
    <td>{{block size y}}:</td>
    <td><input class="block-parameter" id="size-y" type="range" min="1" max="100" step="1" /></td>
  </tr>
  <tr category="size">
    <td>{{block size z}}:</td>
    <td><input class="block-parameter" id="size-z" type="range" min="1" max="100" step="1" /></td>
  </tr>




  <tr category="rotation"><th colspan="2">{{block rotation}}</th></tr>
  <tr category="rotation">
    <td>{{block rotation}}:</td>
    <td><input class="block-parameter" id="rotation" type="range" min="0" max="360" step="10" /></td>
  </tr>



  <tr category="skew"><th colspan="2">{{block skew}}</th></tr>
  <tr category="skew">
    <td>{{block skew z x}}:</td>
    <td><input class="block-parameter" id="skew-z-x" type="range" min="-5" max="5" step="0.05" /></td>
  </tr>
  <tr category="skew">
    <td>{{block skew z y}}:</td>
    <td><input class="block-parameter" id="skew-z-y" type="range" min="-5" max="5" step="0.05" /></td>
  </tr>


  
  <tr category="material"><th colspan="2">{{block material}}</th></tr>
  <tr category="material">
    <td>{{block color}}:</td>
    <td><input class="block-parameter" id="color" type="color" value=""></td>
  </tr>


</table>
</form>
</div>


<div class="page-column-2">

    <div id="model-canvas"></div>

</div>


    `,function(object) {


        var model_canvas = new ModelCanvas('model-canvas', object.design.data, 380, 600);

        var block_selected_path = [0],
            block_selected = false,
            block_lock = false;


        var blockChoose = function (path) {

            block_selected_path = path;

            block_selected = object.design.data.filterPath(block_selected_path);


            //var particle=ModelParticles.cParams(object.design.data.particles[blockChoose_i]);


            block_lock = true;


            model_canvas.selected_path = block_selected_path;
            model_canvas.redrawAsync();

            $('.block-choose').removeClass('selected');
            $('#block-choose-' + i).addClass('selected');


            var categoryies=[];


            $('.block-parameter').each(function () {

                var path = $(this).attr('id').split('-');
                var actual = ArrayFunctions.filterPath(block_selected, path);


                if (isDefined(actual) && typeof actual!='object') {

                    //-------------------------------------------Putting value into HTML inputs from var actual
                    if ($(this).attr('type') == 'checkbox') {

                        if(actual){
                            $(this).attr('checked','checked');
                        }

                    }else{

                        $(this).val(actual);

                    }
                    //-------------------------------------------



                    //todo multiple events eg. change and keypress
                    //-------------------------------------------Setting changing event
                    if ($(this).attr('type') == 'range') {
                        var event = 'input';

                    }else
                    if($(this).attr('type') == 'checkbox'){

                        var event = 'click';

                    }else{
                        var event = 'change';
                    }
                    //-------------------------------------------

                    $(this).unbind(event).bind(event, function () {

                        //-------------------------------------------Putting value from HTML inputs to var value
                        if ($(this).attr('type') == 'checkbox') {
                            var value = $(this).is(':checked');
                        }else

                        if ($(this).attr('type') == 'range') {
                            var value = Math.toFloat($(this).val());

                        }else{
                            var value = $(this).val();
                        }
                        //-------------------------------------------



                        if($(this).attr('id')=='name' || $(this).attr('id')=='link'){
                            $('.model-dir-selected').text(value);
                        }


                        var path = $(this).attr('id').split('-');
                        ArrayFunctions.filterPath(block_selected, path, value);

                        model_canvas.setModel(object.design.data);

                    });


                    $(this).parent().parent().show();

                } else {

                    $(this).parent().parent().hide();//attr('disabled','1');

                }

                var category = $(this).parent().parent().attr('category');
                if(isDefined(category)){
                    categoryies.push(category);
                }



            });

            //------------------------

            HtmlForm.addRangeNumber(false);


            //------------------------Hiding whole categoryies

            categoryies = ArrayFunctions.unique(categoryies);

            categoryies.forEach(function(category){

                var hide_category = true;

                $('[category="'+category+'"]').each(function(){

                    if($(this).find('th').length!=0)return;

                    if($(this).is(':visible'))hide_category = false;

                }).each(function(){


                    if($(this).find('th').length==0)return;

                    if(hide_category){
                        $(this).hide();
                    }else{
                        $(this).show();
                    }

                });

            });
            //------------------------



            block_lock = false;


            //-----------------------

            $('#block-actions').html('');

            //-----------------------New


            if(isDefined(block_selected.particles)) {


                //-----------------------Block
                var icon = $(`<div class="block-button button-icon" title="` + Locale.get('building editor new block') + `"><i class="fa fa-cube"></i></div>`);

                icon.click(function () {

                    block_selected.particles.push({
                        name: '',
                        shape: {
                            type: 'prism',
                            n: 4,
                            top: 1,
                            bottom: 1,
                            rotated: false
                        },
                        color: '#cccccc',
                        position: {x: 0, y: 0, z: 0},
                        size: {x: 10, y: 10, z: 10},
                        rotation: 0,
                        skew: {z: {x: 0, y: 0}}
                    });

                    renderBlockButtons();


                });
                $('#block-actions').append(icon);
                //-----------------------

                //-----------------------Group
                var icon = $(`<div class="block-button button-icon" title="` + Locale.get('building editor new group') + `"><i class="fa fa-cubes"></i></div>`);

                icon.click(function () {

                    block_selected.particles.push({
                        name: '',
                        particles: [],
                        position: {x: 0, y: 0, z: 0},
                        size: 1,
                        rotation: 0,
                        skew: {z: {x: 0, y: 0}}
                    });

                    renderBlockButtons();


                });
                $('#block-actions').append(icon);
                //-----------------------

                //-----------------------Link
                var icon = $(`<div class="block-button button-icon" title="` + Locale.get('building editor new link') + `"><i class="fa fa-link"></i></div>`);

                icon.click(function () {

                    block_selected.particles.push({
                        //name: '',
                        link: '',
                        position: {x: 0, y: 0, z: 0},
                        //size:1,
                        rotation: 0,
                        //skew: {z:{x:0,y:0}}
                    });

                    renderBlockButtons();


                });
                $('#block-actions').append(icon);
                //-----------------------


                if(block_selected_path.length!=0){
                //-----------------------ungroup
                    var icon = $(`<div class="block-button button-icon" title="` + Locale.get('building editor ungroup') + `"><i class="fa fa-object-ungroup"></i></div>`);

                    icon.click(function () {


                        var i = block_selected_path.pop();

                        var parent = object.design.data.filterPath(block_selected_path);


                        block_selected.particles.forEach(function (particle) {
                            parent.particles.push(particle);
                        });


                        parent.particles.splice(i, i + 1);

                        blockChoose(block_selected_path);
                        renderBlockButtons();


                    });
                    $('#block-actions').append(icon);

                //-----------------------
                }

            }


            //-----------------------

            //-----------------------group
            var icon = $(`<div class="block-button button-icon" title="`+Locale.get('building editor group')+`"><i class="fa fa-object-group"></i></div>`);

            icon.click(function () {


                inner_block=deepCopy(block_selected);

                for(key in block_selected){
                    delete block_selected[key];
                }



                block_selected.name='';
                block_selected.particles=[inner_block];
                block_selected.position={x:0,y:0,z:0};
                block_selected.size=1;
                block_selected.rotation=0;
                block_selected.skew={z:{x:0,y:0}};

                renderBlockButtons();
                blockChoose(block_selected_path);


            });
            $('#block-actions').append(icon);
            //-----------------------



            //-----------------------Delete

            if (block_selected_path.length != 0) {

                var icon = $(`<div class="block-button button-icon" title="`+Locale.get('building editor delete block')+`"><i class="fa fa-trash"></i></div>`);

                icon.click(function () {

                    var i = block_selected_path.pop();

                    var parent = object.design.data.filterPath(block_selected_path);

                    parent.particles.splice(i, i + 1);

                    blockChoose(block_selected_path);
                    renderBlockButtons();

                });
                $('#block-actions').append(icon);

            }
            //-----------------------


        };

        //---------------------------------------------------------------------------


        var blockButtons = function (particles, html_id, path) {


            $('#' + html_id).addClass('model-dir');

            particles.forEach(function (particle, i) {


                if (path == -1) {

                    path_new = [];

                } else {

                    var path_new = deepCopy(path);
                    path_new.push(i);

                }


                var html_id_i = html_id + '-' + i;
                var name;

                $('#' + html_id).append(`<div id="` + html_id_i + `"></div>`);
                $('#' + html_id_i).addClass('model-dir-label');

                //---------------------------shape
                if (isDefined(particle.shape)) {

                    $('#' + html_id_i).addClass('model-dir-shape');
                    $('#' + html_id_i).addClass('model-dir-label');
                    name = Locale.get('model dir shape');

                } else
                //---------------------------link
                if (isDefined(particle.link)) {
                    $('#' + html_id_i).addClass('model-dir-link');
                    $('#' + html_id_i).addClass('model-dir-label');
                    name = Locale.get('model dir shape');


                } else
                //---------------------------particles
                if (isDefined(particle.particles)) {


                    $('#' + html_id_i).addClass('model-dir-particles');

                    $('#' + html_id).append(`<div id="` + html_id_i + `-dir"></div>`);


                    blockButtons(particle.particles, html_id_i + '-dir', path_new);


                }
                //---------------------------


                if (is(particle.name)) {
                    name = particle.name
                }else
                if (is(particle.link)) {
                    name = particle.link
                }

                $('#' + html_id_i).html(name);
                $('#' + html_id_i).attr('path', path_new.join(','));


                if (block_selected_path.join(',') == path_new.join(',')) {
                    $('#' + html_id_i).addClass('model-dir-selected');
                }


                $('#' + html_id_i).click(function () {

                    $('.model-dir-label').removeClass('model-dir-selected');
                    $(this).addClass('model-dir-selected');

                    var path = $(this).attr('path');
                    if (path == '') {

                        path = [];

                    } else {

                        path = path.split(',').map(Math.toInt);

                    }

                    blockChoose(
                        path
                    );

                });

            });


        };


        renderBlockButtons = function () {

            $('#block-choose').html('');
            blockButtons([object.design.data]/*.particles*/, 'block-choose', -1);

        };


        //---------------------------------------------------------------------------

        blockChoose([]);
        renderBlockButtons();


        //---------------------------------------------------------------------------


    },
    {

        name: "ttttttttt",
        type: "building",
        subtype: "main",
        design: {
            type: "model",
            data: new Model(
                {
                    name:'root',
                    particles: [
                        {
                            name: Locale.get('shape cube'),
                            shape:{
                                type: 'prism',
                                n:4,
                                rotated:false,
                                top: 1,
                                bottom: 1
                            },
                            color: "#cccccc",
                            position: {x:0,y:0,z:0},
                            size: {x:40,y:40,z:40},
                            rotation: 0
                        }/*,{
                            link: Locale.get('shape cube'),
                            position: {x:0,y:0,z:40},
                            //size: 0.7,
                            rotation: 45
                        }*/
                    ]
                }
            )

        }
    }



));