/**
 * @author ©Towns.cz
 * @fileOverview Block editor
 */
//======================================================================================================================


Pages.object_editor={};

Pages.object_editor.header='Budova';

Pages.object_editor.content= `
<div class="json-editor"></div>

`;

//======================================================================================================================


Pages.object_editor.openJS = function(){

    var object=objects_external[ArrayFunctions.id2i(objects_external,map_selected_ids[0])];

    window_write_header(object.name);



    //JSONEditor.defaults.options.theme = 'bootstrap3';
    JSONEditor.defaults.options.theme = 'foundation5';
    JSONEditor.defaults.options.icon = 'fontawesome3';
    JSONEditor.defaults.options.object_layout = 'grid';
    JSONEditor.defaults.options.disable_collapse = true;
    JSONEditor.defaults.options.disable_properties = true;
    JSONEditor.defaults.options.disable_edit_json = true;


    // Initialize the editor
    Pages.object_editor.editor = new JSONEditor($('.json-editor')[0],{
            schema: {
                "title": /*object.name*/'',
                "type": "object",
                "id": "object",
                "properties": {

                    "id": {
                        "type": "string",
                        "minLength": 4
                    },

                    "name": {
                        "type": "string",
                        //"description": "First and Last name",
                        "minLength": 4
                    },


                    "type": {
                        "type": "string",
                        "enum": [
                            "building",
                            "story",
                            "terrain"
                        ]
                    },

                    "subtype": {
                        "type": "string",
                        "enum": [
                            "main",
                            "block",
                            "wall"
                        ]
                    },

                    "x": {
                        "type": "integer",
                        "default": 21,
                        "minimum": 18,
                        "maximum": 99
                    },
                    "y": {
                        "type": "integer",
                        "default": 21,
                        "minimum": 18,
                        "maximum": 99
                    },
                    "design": {
                        "type": "object",
                        "properties": {
                            "type": {
                                "type": "string"
                            },

                            "data": {
                                "type": "object",
                                "properties": {
                                    "particles": {
                                        "type": "array",
                                        "items": {
                                            type: "object",
                                            "properties": {
                                                "shape": {
                                                    "type": "object",
                                                    "properties": {
                                                        "n": {
                                                            "type": "integer",
                                                            "default": 4,
                                                            "minimum": 3,
                                                            "maximum": 20
                                                        },
                                                        "top": {
                                                            "type": "number",
                                                            "default": 1,
                                                            "minimum": 0,
                                                            "maximum": 10
                                                        },
                                                        "bottom": {
                                                            "type": "number",
                                                            "default": 1,
                                                            "minimum": 0,
                                                            "maximum": 10
                                                        }
                                                    }
                                                },
                                                "size":{
                                                    "type": "object",
                                                    "properties": {
                                                        "x": {
                                                            "type": "number",
                                                            "default": 0
                                                        },
                                                        "y": {
                                                            "type": "number",
                                                            "default": 0
                                                        },
                                                        "z": {
                                                            "type": "number",
                                                            "default": 0
                                                        }
                                                    }
                                                },
                                                "position":{
                                                    "type": "object",
                                                    "properties": {
                                                        "x": {
                                                            "type": "number",
                                                            "default": 0
                                                        },
                                                        "y": {
                                                            "type": "number",
                                                            "default": 0
                                                        },
                                                        "z": {
                                                            "type": "number",
                                                            "default": 0
                                                        }
                                                    }
                                                },
                                                "rotation":{
                                                    "type": "object",
                                                    "properties": {
                                                        "xy": {
                                                            "type": "integer",
                                                            "default": 0
                                                        },
                                                        "yz": {
                                                            "type": "integer",
                                                            "default": 0
                                                        },
                                                        "xz": {
                                                            "type": "integer",
                                                            "default": 0
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "rotation": {
                                        "type": "integer",
                                        "default": 0
                                    },
                                    "size": {
                                        "type": "number",
                                        "default": 1,
                                        "minimum": 0
                                    }
                                }

                            }
                        }
                    }
                }
            }
        });

    // Set the value
    /*editor.setValue({
        name: "John Smith"
    });*/


    Pages.object_editor.editor.setValue(object);
    /*editor.on("change",  function() {

        var json = editor.getValue();
        r(json);

    });*/


};
//======================================================================================================================


Pages.object_editor.closeJS = function(){

    objects_external[ArrayFunctions.id2i(objects_external,map_selected_ids[0])]
        = deepCopyObject(Pages.object_editor.editor.getValue());

};
