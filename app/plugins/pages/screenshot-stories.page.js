


/**
 * @author ©Towns.cz
 * @fileOverview Login page
 */
//======================================================================================================================



T.Plugins.install(new T.Plugins.Page(
    'screenshot-stories',
    T.Locale.get('page','screenshot stories'),
    `
        Getting ready

    `
    ,function(page){

        var scene = T.Map.scene;
        var positions = [];

        T.TownsAPI.townsAPI.get('stories',{latest:true},function(result) {

            var stories = new T.Objects.Array(result);

            stories.forEach(function(story){

                positions.push(story.getPosition().getFloored());

            });

            $(page).html('');
            $(page).append('<progress value="0" max="'+(stories.getAll().length)+'"></progress>');
            $(page).append('<button>Start</button>');

            $(page).find('button').click(function(){


                scene.resetCamera();


                $(page).find('button').unbind('click');
                $(page).find('button').html(T.Locale.get('progressing')+' <i class="fa fa-spinner faa-spin animated"></i>');

                makeScreenshot = function (i) {

                    map_center = positions[i];
                    T.Map.loadMap(true,function(){


                        //------------------------------------------------

                        BABYLON.Tools.CreateScreenshot(scene.engine, scene.camera, {width:/*scene.canvas.width*/1920, height:/*scene.canvas.height*/1080},function(screenshot){




                            var canvas = document.createElement("canvas");
                            canvas.width = 1920;
                            canvas.height = 1080;
                            var ctx = canvas.getContext('2d');
                            var img = new Image;
                            img.src = screenshot;
                            ctx.drawImage(img,0,0);
                            var screenshot = canvas.toDataURL("image/jpeg");







                            // process all File objects
                            var formData = new FormData();
                            var files_name_key = {};
                            var request_size=1024;//todo is it OK?
                            formData.append('screenshot', dataURItoBlob(screenshot), 'screenshot.png');




                            // now post a new XHR request
                            var xhr = new XMLHttpRequest();
                            xhr.open('POST', appDir+'/php/screenshot.php?x='+Math.round(map_center.x)+'&y='+Math.round(map_center.y));



                            var message = T.UI.Message.info();



                            xhr.upload.onprogress = function (event) {

                                if (event.lengthComputable) {
                                    var complete = (event.loaded / event.total * 100 | 0);

                                    message.text(T.Locale.get('upload screenshot progress')+' '+complete+'%');

                                }

                            };




                            xhr.onload = function () {
                                if (xhr.status === 200) {

                                    message.text(T.Locale.get('upload screenshot success'),'success').close();


                                } else {

                                    console.log('Something went terribly wrong...');
                                    message.text(T.Locale.get('upload screenshot fail'),'error').close();

                                }
                            };
                            xhr.send(formData);


                            //------------
                            i++;
                            $(page).find('progress').val(i);
                            r(i+' / '+stories.getAll().length);

                            if(positions.length>i){
                                makeScreenshot(i);
                            }else{
                                $(page).find('button').html(T.Locale.get('finished'));

                            }
                            //------------



                        });

                        //------------------------------------------------





                    });

                };


                makeScreenshot(0);


            });




        });







    },
    undefined,
    'SMALL'
));

