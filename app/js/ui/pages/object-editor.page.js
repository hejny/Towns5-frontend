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

    Pages.object_editor.object=map_object_changes[ArrayFunctions.id2i(map_object_changes,map_selected_ids[0])];

    window_write_header(Pages.object_editor.object.name);



    JSONEditor.defaults.options.theme = 'bootstrap2';

    // Initialize the editor
        var editor = new JSONEditor($('.json-editor')[0],{
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


};
//======================================================================================================================


Pages.object_editor.closeJS = function(){

};
