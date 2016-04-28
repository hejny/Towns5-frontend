//todo headers





$(function(){




    //var xhr = new XMLHttpRequest();
    //if (xhr.upload) {}//todo browser requirements




    // file drop
    document.addEventListener("dragover", function(e){
        e.preventDefault();

        r('T.UI Event: dragover');

        $('#map_drag').css('background','rgba(0,0,0,0.5)');

    }, false);
    document.addEventListener("dragleave", function(e){
        e.preventDefault();

        r('T.UI Event: dragleave');

        $('#map_drag').css('background','rgba(0,0,0,0)');

    }, false);
    document.addEventListener("drop", function(e){
        e.preventDefault();

        r('T.UI Event: drop');

        $('#map_drag').css('background','rgba(0,0,0,0)');


        //-----------------todo duplicite
        canvas_mouse_x = e.clientX + window_width;//-pos.left;
        canvas_mouse_y = e.clientY + window_height;//-pos.top;


        var map_click_x=(e.clientX-(window_width/2));
        var map_click_y=(e.clientY-(window_height/2));
        var mapPos=T.UI.Map.mouseCenterPos2MapPos(map_click_x,map_click_y);
        //-----------------


        //-----------------

        var story_prototype = T.User.object_prototypes.filterTypes('story').getAll()[0];

        //-----------------

        //-----------------
        if(story_prototype){

            story_prototype.x=mapPos.x;
            story_prototype.y=mapPos.y;


            story_prototype.content.data='';

            // fetch FileList object
            var files = e.target.files || e.dataTransfer.files;

            // process all File objects
            var formData = new FormData();
            var files_name_key = {};
            var request_size=1024;//todo is it OK?
            for (var i = 0; i < files.length; i++) {

                if(TOWNS_CDN_FILE_ACCEPTED_TYPES.indexOf(files[i].type)==-1){

                    T.UI.message(T.Locale.get('upload error only images'),'error');
                    throw new Error('Not allowed filetype.');
                }

                if(files[i].size>TOWNS_CDN_FILE_MAX_SIZE){

                    T.UI.message(T.Locale.get('upload error max filesize')+' '+bytesToSize(TOWNS_CDN_FILE_MAX_SIZE),'error');
                    throw new Error('File too big');
                }

                request_size+=files[i].size;

                var key='image'+i;

                formData.append(key, files[i]);
                files_name_key[key] = files[i].name;

            }

            if(request_size>TOWNS_CDN_REQUEST_MAX_SIZE){

                T.UI.message(T.Locale.get('upload error max requestsize')+' '+bytesToSize(TOWNS_CDN_REQUEST_MAX_SIZE),'error');
                throw new Error('Request too big');

            }


            // now post a new XHR request
            var xhr = new XMLHttpRequest();
            xhr.open('POST', TOWNS_CDN_URL);


            xhr.upload.onprogress = function (event) {

                if (event.lengthComputable) {
                    var complete = (event.loaded / event.total * 100 | 0);

                    T.UI.message(T.Locale.get('upload progress')+' '+complete+'%','info');

                }

            };

            xhr.onload = function () {
                if (xhr.status === 200) {

                    try{

                        var response=(JSON.parse(xhr.response));



                        for (var key in files_name_key) {

                            var filename = files_name_key[key];
                            story_prototype.content.data+='!['+markdownEscape(filename)+']('+markdownEscape(response[key])+')';

                        }




                        create(

                            story_prototype

                            ,function(){

                                T.UI.Map.loadMapAsync();
                                //alert('story created');

                            });


                        console.log('all done: ' + xhr.status);
                        T.UI.message(T.Locale.get('upload success story'),'success');

                    }catch(e){

                        T.UI.message(T.Locale.get('upload fail'),'error');

                    }


                } else {

                    console.log('Something went terribly wrong...');
                    T.UI.message(T.Locale.get('upload fail'),'error');

                }
            };
            xhr.send(formData);





        }else{
            throw new Error('Can not find any prototype of type story.');
        }

        //-----------------






        r(mapPos,e)



    }, false);



});