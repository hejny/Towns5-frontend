/**
 * @author ©Towns.cz
 * @fileOverview Profile viewer
 */
//======================================================================================================================


T.Plugins.install(new T.Viewer(
    'profile-viewer'
    ,{}
    ,'Profil'
    ,`
    name: <div id="profile-viewer-name">name</div>
    `
    ,function(object){


        $('#profile-viewer-name').text(object.name);


    }


));