/**
 * @author ©Towns.cz
 * @fileOverview Block editor
 */
//======================================================================================================================


Pages.building_editor={};

Pages.building_editor.header='Budova';

Pages.building_editor.content= `
<div class="json-editor"></div>

`;

//======================================================================================================================


Pages.building_editor.openJS = function(){

    var object=map_object_changes[ArrayFunctions.id2i(map_object_changes,map_selected_ids[0])];

    window_write_header(object.name);



    JSONEditor.defaults.options.theme = 'bootstrap3';
    /*JSONEditor.defaults.options.theme = 'foundation5';
    JSONEditor.defaults.options.icon = 'fontawesome3';
    JSONEditor.defaults.options.object_layout = 'grid';*/


    // Initialize the editor
    Pages.building_editor.editor = new JSONEditor($('.json-editor')[0],{
            schema: {
                "title": "Budova",
                "type": "object",
                "id": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        //"description": "First and Last name",
                        "minLength": 4
                    },

                    "subtype": {
                        "type": "enum",
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
                            "name": {
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
                                                            "default": 21,
                                                            "minimum": 18,
                                                            "maximum": 99
                                                        },
                                                        "top": {
                                                            "type": "integer",
                                                            "default": 21,
                                                            "minimum": 18,
                                                            "maximum": 99
                                                        },
                                                        "bottom": {
                                                            "type": "integer",
                                                            "default": 21,
                                                            "minimum": 18,
                                                            "maximum": 99
                                                        }
                                                    }
                                                },
                                                "size":{
                                                    "type": "object",
                                                    "properties": {
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
                                                        "z": {
                                                            "type": "integer",
                                                            "default": 21,
                                                            "minimum": 18,
                                                            "maximum": 99
                                                        }
                                                    }
                                                },
                                                "position":{
                                                    "type": "object",
                                                    "properties": {
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
                                                        "z": {
                                                            "type": "integer",
                                                            "default": 21,
                                                            "minimum": 18,
                                                            "maximum": 99
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "rotation": {
                                        "type": "integer",
                                        "default": 21,
                                        "minimum": 18,
                                        "maximum": 99
                                    },
                                    "size": {
                                        "type": "integer",
                                        "default": 21,
                                        "minimum": 18,
                                        "maximum": 99
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


    Pages.building_editor.editor.setValue(object);
    /*editor.on("change",  function() {

        var json = editor.getValue();
        r(json);

    });*/


};
//======================================================================================================================


Pages.building_editor.closeJS = function(){

    map_object_changes[ArrayFunctions.id2i(map_object_changes,map_selected_ids[0])]
        = deepCopyObject(Pages.building_editor.editor.getValue());

};
