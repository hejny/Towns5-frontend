/**
 * @author ©Towns.cz
 * @fileOverview Towns API Wrapper
 */
//======================================================================================================================token

TownsAPIOffline=function(){

    this.online=false;
};

//======================================================================================================================

/**
 * @private
 * @param uri
 * @param method
 * @param data
 * @param callback_success
 * @param callback_error
 * @returns {object} jQuery $.ajax
 */
TownsAPIOffline.prototype.query = function(uri,query_data,method,data,callback_success=false,callback_error=false){

    r(uri,method);

    //================================================
    //------------------------------------------------
    if(uri=='objects/prototypes' && method=='GET'){
        var response = [

            //==============================================================================================================building

            {

                name: "ttttttttt",
                type: "building",
                subtype: "main",
                design: {
                    type: "model",
                    data: {
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
                                 size: 0.7,
                                 rotation: 45
                                 }*/
                            ]
                        }
                }
            },{
                name: "Kamenná pyramida",
                type: "building",
                subtype: "wall",
                design: {
                    type: "model",
                    data: {
                        particles: [
                            {
                                shape:{
                                    type: 'prism',
                                    n:4,
                                    top:1
                                },
                                color: "#cccccc",
                                position: {x:0,y:0,z:0},
                                size: {x:50,y:50,z:50},
                                rotation: {"xy":0,"xz":0}

                            }
                        ]
                    }

                }

            },{
                name: "Kamenný ježek",
                type: "building",
                subtype: "wall",
                design: {
                    type: "model",
                    data: {
                        particles: [
                            {
                                shape:{
                                    type: 'prism',
                                    n:3,
                                    top:0.1
                                },
                                color: "#cccccc",
                                position: {x:0,y:0,z:0},
                                size: {x:40,y:40,z:40},
                                rotation: {"xy":30,"xz":0}

                            }
                        ]
                    }

                }

            },


            //==============================================================================================================terrain
            {
                "type": "terrain",
                "name": "Terén",
                "design": {
                    "type": "terrain",
                    "data":{
                        image:1,
                        size: 1
                    }
                }
            },{
                "type": "terrain",
                "name": "Terén",
                "design": {
                    "type": "terrain",
                    "data":{
                        image:2,
                        size: 1
                    }
                }
            },{
                "type": "terrain",
                "name": "Terén",
                "design": {
                    "type": "terrain",
                    "data":{
                        image:3,
                        size: 1
                    }
                }
            },{
                "type": "terrain",
                "name": "Terén",
                "design": {
                    "type": "terrain",
                    "data":{
                        image:4,
                        size: 1
                    }
                }
            },{
                "type": "terrain",
                "name": "Terén",
                "design": {
                    "type": "terrain",
                    "data":{
                        image:5,
                        size: 1
                    }
                }
            },{
                "type": "terrain",
                "name": "Terén",
                "design": {
                    "type": "terrain",
                    "data":{
                        image:6,
                        size: 1
                    }
                }
            },{
                "type": "terrain",
                "name": "Terén",
                "design": {
                    "type": "terrain",
                    "data":{
                        image:7,
                        size: 1
                    }
                }
            },{
                "type": "terrain",
                "name": "Terén",
                "design": {
                    "type": "terrain",
                    "data":{
                        image:8,
                        size: 1
                    }
                }
            },{
                "type": "terrain",
                "name": "Terén",
                "design": {
                    "type": "terrain",
                    "data":{
                        image:9,
                        size: 1
                    }
                }
            },{
                "type": "terrain",
                "name": "Terén",
                "design": {
                    "type": "terrain",
                    "data":{
                        image:10,
                        size: 1
                    }
                }
            },{
                "type": "terrain",
                "name": "Terén",
                "design": {
                    "type": "terrain",
                    "data":{
                        image:11,
                        size: 1
                    }
                }
            },{
                "type": "terrain",
                "name": "Terén",
                "design": {
                    "type": "terrain",
                    "data":{
                        image:12,
                        size: 1
                    }
                }
            },{
                "type": "terrain",
                "name": "Terén",
                "design": {
                    "type": "terrain",
                    "data":{
                        image:13,
                        size: 1
                    }
                }
            },{
                "type": "terrain",
                "name": "Terén",
                "design": {
                    "type": "terrain",
                    "data":{
                        image:14,
                        size: 1
                    }
                }
            },


            //==============================================================================================================story


            {
                "name": "Příběh",
                "type": "story",
                "locale": "cs",
                "content": {
                    "type": "markdown",
                    "data": "Kde bolo tam bolo"
                },
                "owner": "5126bc054aed4daf9e2ab772"
            }


            //==============================================================================================================
        ];


        response.map(function(item){
            item._id=generateID();
            return(item);
        });

    }else
    //------------------------------------------------
    //------------------------------------------------
    if(true){
        var response = [];
    }
    //------------------------------------------------
    //================================================


    if(callback_success)
        callback_success(response);


    return(false);


};


//=================================================

/**
 *
 * @param uri
 * @param data
 * @param callback_success
 * @param callback_error
 * @returns {object} jQuery $.ajax
 */
TownsAPIOffline.prototype.get = function(uri,query_data,callback_success,callback_error){
    return this.query(uri,query_data,'GET',{},callback_success,callback_error);


};

/**
 *
 * @param uri
 * @param data
 * @param callback_success
 * @param callback_error
 * @returns {object} jQuery $.ajax
 */
TownsAPIOffline.prototype.post = function(uri,object,callback_success,callback_error){

    return this.query(uri,{},'POST',object,callback_success,callback_error);


};

/**
 *
 * @param uri
 * @param callback_success
 * @param callback_error
 * @returns {Object}
 */
TownsAPIOffline.prototype.delete = function(uri,callback_success,callback_error){

    return this.query(uri,{},'DELETE',{},callback_success,callback_error);

};


