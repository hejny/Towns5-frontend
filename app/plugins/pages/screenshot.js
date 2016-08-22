


/**
 * @author ©Towns.cz
 * @fileOverview Login page
 */
//======================================================================================================================



TOWNS.Plugins.install(new TOWNS.Plugins.Page(
    'screenshot',
    TOWNS.Locale.get('page','screenshot'),
    `

`
    ,function(page){


        //r(TOWNS.Map.scene);
        //r(TOWNS.Map.scene.canvas);
        //var canvas2D = TOWNS.Map.scene.canvas.getContext('2d');

        var scene = TOWNS.Map.scene;

        //r(scene);



        scene.resetCamera();
        BABYLON.Tools.CreateScreenshot(scene.engine, scene.camera, {width:/*scene.canvas.width*/1920, height:/*scene.canvas.height*/1080},function(screenshot){


                //r(screenshot);

                var img = new Image();

                img.style.width="100%";
                img.src = screenshot;

                $(page).html(img);








                // process all File objects
                var formData = new FormData();
                var files_name_key = {};
                var request_size=1024;//todo is it OK?
                formData.append('screenshot', dataURItoBlob(screenshot), 'screenshot.png');




                // now post a new XHR request
                var xhr = new XMLHttpRequest();
                xhr.open('POST', appDir+'/php/screenshot.php?x='+Math.round(map_center.x)+'&y='+Math.round(map_center.y));



                var message = TOWNS.UI.Message.info();



                xhr.upload.onprogress = function (event) {

                        if (event.lengthComputable) {
                                var complete = (event.loaded / event.total * 100 | 0);

                                message.text(TOWNS.Locale.get('upload screenshot progress')+' '+complete+'%');

                        }

                };




                xhr.onload = function () {
                        if (xhr.status === 200) {

                                try{

                                        var response=(JSON.parse(xhr.response));
                                        r(response);


                                        message.text(TOWNS.Locale.get('upload screenshot success'),'success').close();


                                }catch(e){

                                        message.text(TOWNS.Locale.get('upload screenshot fail'),'error').close();

                                }


                        } else {

                                console.log('Something went terribly wrong...');
                                message.text(TOWNS.Locale.get('upload screenshot fail'),'error').close();

                        }
                };
                xhr.send(formData);




















        });



    },
    undefined,
    'NORMAL'
));

