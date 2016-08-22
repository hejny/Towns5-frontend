/**
 * @author ©Towns.cz
 * @fileOverview Block editor
 */
//======================================================================================================================


TOWNS.Plugins.install(new TOWNS.Plugins.Editor(
    'building-editor',
    {
        type: 'building',
    },
    'Editor budov',
    `<div class="page-column-2">
     <div class="full-scroll-column">
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
    <td><input class="block-parameter full_width" name="name" type="text" /></td>
  </tr>
  <tr category="info">
    <td>{{block link}}:</td>
    <td><input class="block-parameter full_width" name="link" type="text" /></td>
  </tr>




  <tr category="position"><th colspan="2">{{block position}}</th></tr>
  <tr category="position">
    <td>{{block position x}}:</td>
    <td><input class="block-parameter" name="position-x" type="range" min="-100" max="100" step="1" />
</td>
  </tr>
  <tr category="position">
    <td>{{block position y}}:</td>
    <td><input class="block-parameter" name="position-y" type="range" min="-100" max="100" step="1" /></td>
  </tr>
  <tr category="position">
    <td>{{block position z}}:</td>
    <td><input class="block-parameter" name="position-z" type="range" min="0" max="100" step="1" /></td>
  </tr>



  <tr category="shape"><th colspan="2">{{block shape}}</th></tr>
  <tr category="shape">
    <td>{{block shape n}}:</td>
    <td><input class="block-parameter" name="shape-n" type="range" min="3" max="20" step="1" /></td>
  </tr>
  <tr category="shape">
    <td>{{block shape rotated}}:</td>
    <td><input class="block-parameter" name="shape-rotated" type="checkbox" /></td>
  </tr>
  <tr category="shape">
    <td>{{block shape top}}:</td>
    <td><input class="block-parameter" name="shape-top" type="range" min="0" max="2" step="0.05" /></td>
  </tr>
  <tr category="shape">
    <td>{{block shape bottom}}:</td>
    <td><input class="block-parameter" name="shape-bottom" type="range" min="0" max="2" step="0.05" /></td>
  </tr>





  <tr category="size"><th colspan="2">{{block size}}</th></tr>
  <tr category="size">
    <td>{{block size}}:</td>
    <td><input class="block-parameter" name="size" type="range" min="0.1" max="3" step="0.1" /></td>
  </tr>
  <tr category="size">
    <td>{{block size x}}:</td>
    <td><input class="block-parameter" name="size-x" type="range" min="1" max="100" step="1" /></td>
  </tr>
  <tr category="size">
    <td>{{block size y}}:</td>
    <td><input class="block-parameter" name="size-y" type="range" min="1" max="100" step="1" /></td>
  </tr>
  <tr category="size">
    <td>{{block size z}}:</td>
    <td><input class="block-parameter" name="size-z" type="range" min="1" max="100" step="1" /></td>
  </tr>




  <tr category="rotation"><th colspan="2">{{block rotation}}</th></tr>
  <tr category="rotation">
    <td>{{block rotation}}:</td>
    <td><input class="block-parameter" name="rotation" type="range" min="0" max="360" step="10" /></td>
  </tr>



  <tr category="skew"><th colspan="2">{{block skew}}</th></tr>
  <tr category="skew">
    <td>{{block skew z x}}:</td>
    <td><input class="block-parameter" name="skew-z-x" type="range" min="-5" max="5" step="0.05" /></td>
  </tr>
  <tr category="skew">
    <td>{{block skew z y}}:</td>
    <td><input class="block-parameter" name="skew-z-y" type="range" min="-5" max="5" step="0.05" /></td>
  </tr>


  
  <tr category="material"><th colspan="2">{{block material}}</th></tr>
  <tr category="material">
    <td colspan="2">
        `+
        //todo repair//TOWNS.Cache.textures.getInput('material','block-parameter')+
        `
    </td>
  </tr>



</table>
</form>
</div>
</div>


<div class="page-column-2">

    <div id="model-canvas"></div>

</div>


    `,function(object) {


        var model_canvas = new TOWNS.ModelCanvas('model-canvas', object.design.data, 380, 600);

        var block_selected_path = [0],
            block_selected = false,
            block_lock = false;


        var blockChoose = function (path) {

            r('blockChoose');



            block_selected_path = path;

            block_selected = object.getModel().filterPath(block_selected_path);


            //var particle=ModelParticles.cParams(object.design.data.particles[blockChoose_i]);


            block_lock = true;


            model_canvas.selected_path = block_selected_path;
            //model_canvas.redrawAsync();

            $('.block-choose').removeClass('selected');
            $('#block-choose-' + i).addClass('selected');


            var categoryies=[];

            //return;
            /**/
            $('.block-parameter').each(function () {

                var path = $(this).attr('name').split('-');
                var actual = TOWNS.ArrayFunctions.filterPath(block_selected, path);


                if (isDefined(actual) && typeof actual!='object') {

                    //-------------------------------------------Putting value into HTML inputs from var actual
                    if ($(this).attr('type') == 'checkbox') {

                        if (actual) {
                            $(this).attr('checked', 'checked');
                        }
                    }else
                    if ($(this).attr('type') == 'radio') {

                        r($(this).attr('value'),actual);
                        if($(this).attr('value')==actual){

                            $(this).attr('checked','checked');

                        }


                    }else{

                        $(this).val(actual);

                    }
                    //-------------------------------------------



                    //todo multiple events eg. change and keypress
                    //-------------------------------------------Setting changing event
                    var event;

                    if ($(this).attr('type') == 'range') {
                        event = 'input';

                    }else
                    if($(this).attr('type') == 'checkbox'){

                        event = 'click';

                    }else
                    if($(this).attr('type') == 'radio'){

                        event = 'click';

                    }else{
                        event = 'change';
                    }
                    //-------------------------------------------
                    var value;

                    $(this).unbind(event).bind(event, function () {

                        //-------------------------------------------Putting value from HTML inputs to var value
                        if ($(this).attr('type') == 'checkbox') {
                            value  = $(this).is(':checked');
                        }else

                        if ($(this).attr('type') == 'checkbox') {
                            value = $(this).attr('value');
                        }else

                        if ($(this).attr('type') == 'range') {
                            value = TOWNS.TMath.toFloat($(this).val());

                        }else{
                            value = $(this).val();
                        }
                        //-------------------------------------------



                        if($(this).attr('id')=='name' || $(this).attr('id')=='link'){
                            $('.model-dir-selected').text(value);
                        }


                        var path = $(this).attr('name').split('-');
                        TOWNS.ArrayFunctions.filterPath(block_selected, path, value);

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
            /**/

            //------------------------

            TOWNS.UI.Html.Form.addRangeNumber(false);


            //------------------------Hiding whole categoryies

            categoryies = TOWNS.ArrayFunctions.unique(categoryies);

            categoryies.forEach(function(category){

                var hide_category = true;

                $('[category="'+category+'"]').each(function(){

                    if($(this).find('th').length!== 0)return;

                    if($(this).is(':visible'))hide_category = false;

                }).each(function(){


                    if($(this).find('th').length=== 0)return;

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

            var icon;

            if(isDefined(block_selected.particles)) {


                //-----------------------Block
                icon = $(`<div class="block-button button-icon" title="` + TOWNS.Locale.get('building editor new block') + `"><i class="fa fa-cube"></i></div>`);

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
                        material: 'clay-bricks',
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
                icon = $(`<div class="block-button button-icon" title="` + TOWNS.Locale.get('building editor new group') + `"><i class="fa fa-cubes"></i></div>`);

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
                icon = $(`<div class="block-button button-icon" title="` + TOWNS.Locale.get('building editor new link') + `"><i class="fa fa-link"></i></div>`);

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


                if(block_selected_path.length!== 0){
                //-----------------------ungroup
                    icon = $(`<div class="block-button button-icon" title="` + TOWNS.Locale.get('building editor ungroup') + `"><i class="fa fa-object-ungroup"></i></div>`);

                    icon.click(function () {


                        var i = block_selected_path.pop();

                        var parent = object.getModel().filterPath(block_selected_path);


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
            icon = $(`<div class="block-button button-icon" title="`+TOWNS.Locale.get('building editor group')+`"><i class="fa fa-object-group"></i></div>`);

            icon.click(function () {


                inner_block=deepCopy(block_selected);

                for(var key in block_selected){
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

            if (block_selected_path.length !== 0) {

                icon = $(`<div class="block-button button-icon" title="`+TOWNS.Locale.get('building editor delete block')+`"><i class="fa fa-trash"></i></div>`);

                icon.click(function () {

                    var i = block_selected_path.pop();

                    var parent = object.getModel().filterPath(block_selected_path);

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

            r('blockButtons');


            $('#' + html_id).addClass('model-dir');

            particles.forEach(function (particle, i) {

                var path_new;

                if (path == -1) {

                    path_new = [];

                } else {

                    path_new = deepCopy(path);
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
                    name = TOWNS.Locale.get('model dir shape');

                } else
                //---------------------------link
                if (isDefined(particle.link)) {
                    $('#' + html_id_i).addClass('model-dir-link');
                    $('#' + html_id_i).addClass('model-dir-label');
                    name = TOWNS.Locale.get('model dir shape');


                } else
                //---------------------------particles
                if (isDefined(particle.particles)) {


                    $('#' + html_id_i).addClass('model-dir-particles');

                    $('#' + html_id).append(`<div id="` + html_id_i + `-dir"></div>`);


                    blockButtons(particle.particles, html_id_i + '-dir', path_new);


                }
                //---------------------------


                if (is(particle.name)) {
                    name = particle.name;
                }else
                if (is(particle.link)) {
                    name = particle.link;
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
                    if (path === '') {

                        path = [];

                    } else {

                        path = path.split(',').map(TOWNS.TMath.toInt);

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
            data: new TOWNS.Model(
                {
                    name:'root',
                    particles: [
                        {
                            name: TOWNS.Locale.get('shape cube'),
                            shape:{
                                type: 'prism',
                                n:4,
                                rotated:false,
                                top: 1,
                                bottom: 1
                            },
                            material: "clay_bricks",
                            position: {x:0,y:0,z:0},
                            size: {x:40,y:40,z:40},
                            rotation: 0
                        }/*,{
                            link: TOWNS.Locale.get('shape cube'),
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