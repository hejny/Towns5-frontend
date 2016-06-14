//todo headers




    //var xhr = new XMLHttpRequest();
    //if (xhr.upload) {}//todo browser requirements



var story_prototype = null;
var story_prototype_mesh = null;





// file drop
document.addEventListener("dragover", function(e){
    e.preventDefault();

    //r(e);


    //------------------------------------
    if(!story_prototype) {

        r('Creating story mesh for dropping stories.');

        story_prototype = T.User.object_prototypes.filterTypes('story').getAll()[0];
        if (story_prototype) {


            var story = story_prototype.clone();

            if(story_prototype_mesh){
                r('Disposing last story mesh.');
                story_prototype_mesh.dispose();
            }

            story_prototype_mesh = createStoryMesh('story', story, T.UI.Map.scene.scene, T.UI.Map.scene.shadow_generator);


            r(story_prototype_mesh);


        } else {

            console.warn('Story prototypes are not loaded yet.');

        }
    }
    //------------------------------------


    var position = T.UI.Map.scene.getPositionOnTerrainMesh(e.clientX,e.clientY);
    //position.y = T.UI.Map.scene.terrain_mesh.getHeightAtCoordinates(position.x,position.z);


    story_prototype_mesh.position = position;


}, false);



document.addEventListener("dragleave", function(e){
    e.preventDefault();

    story_prototype_mesh.dispose();
    story_prototype=null;


}, false);



document.addEventListener("drop", function(e){
    e.preventDefault();




    //T.TownsAPI.townsAPI.isLogged(function(logged){

    if(T.TownsAPI.townsAPI.logged===false){

        T.UI.Message.error(T.Locale.get('upload only logged'));
        return;

    }

    r(e);


    //-----------------

    var story_prototype_clone = story_prototype.clone();


    var position = T.UI.Map.scene.babylonToPosition(story_prototype_mesh.position);



    story_prototype_mesh.dispose();
    story_prototype=null;



    story_prototype_clone.x=position.x;
    story_prototype_clone.y=position.y;


    story_prototype_clone.content.data='';

    // fetch FileList object
    var files = e.target.files || e.dataTransfer.files;

    //r(files);
    if(files.length==0){
        r('Shit dropped.');
        return;
    }

    // process all File objects
    var formData = new FormData();
    var files_name_key = {};
    var request_size=1024;//todo is it OK?
    for (var i = 0; i < files.length; i++) {

        if(TOWNS_CDN_FILE_ACCEPTED_TYPES.indexOf(files[i].type)==-1){

            T.UI.Message.error(T.Locale.get('upload error only images'));
            throw new Error('Not allowed filetype.');
        }

        if(files[i].size>TOWNS_CDN_FILE_MAX_SIZE){

            T.UI.Message.error(T.Locale.get('upload error max filesize')+' '+bytesToSize(TOWNS_CDN_FILE_MAX_SIZE));
            throw new Error('File too big');
        }

        request_size+=files[i].size;

        var key='image'+i;

        formData.append(key, files[i]);
        files_name_key[key] = files[i].name;

    }

    //r(files_name_key);

    if(request_size>TOWNS_CDN_REQUEST_MAX_SIZE){

        T.UI.Message.error(T.Locale.get('upload error max requestsize')+' '+bytesToSize(TOWNS_CDN_REQUEST_MAX_SIZE));
        throw new Error('Request too big');

    }


    // now post a new XHR request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', TOWNS_CDN_URL);



    var message = T.UI.Message.info();


    xhr.upload.onprogress = function (event) {

        if (event.lengthComputable) {
            var complete = (event.loaded / event.total * 100 | 0);

            message.text(T.Locale.get('upload progress')+' '+complete+'%');

        }

    };

    xhr.onload = function () {
        if (xhr.status === 200) {

            try{

                var response=(JSON.parse(xhr.response));


                for (var key in files_name_key) {

                    var filename = files_name_key[key];
                    story_prototype_clone.content.data+='!['+markdownEscape(filename)+']('+markdownEscape(response[key])+')\n';

                }




                create(

                    story_prototype_clone

                    /*,function(){

                        T.Map.loadMap();
                        //alert('story created');

                    }
                    todo auto map refresh after create
                    */);


                console.log('all done: ' + xhr.status);
                r(message);
                message.text(T.Locale.get('upload success story'),'success').close();

            }catch(e){

                message.text(T.Locale.get('upload fail'),'error').close();

            }


        } else {

            console.log('Something went terribly wrong...');
            message.text(T.Locale.get('upload fail'),'error').close();

        }
    };
    xhr.send(formData);

    //-----------------






}, false);

    //});

