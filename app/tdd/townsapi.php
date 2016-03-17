<?php
$title='model';
$inits=array('townsapi.read.js');
require('init.php');
?>


<script>


    townsAPI.post('objects',

        {

            "id":393254684,
            "name":"Kamenný kvádr",
            "type":"building",
            "subtype":"main",
            "design":{
                "type":"model",
                "data":{
                    "particles":[
                        {
                            "shape":{
                                "type":"prism",
                                "n":4
                            },
                            "color":"#cccccc",
                            "position":{
                                "x":0,
                                "y":0,
                                "z":0
                            },
                            "size":{
                                "x":40,
                                "y":40,
                                "z":40
                            },
                            "rotation":{
                                "xy":0
                            }
                        }
                    ],
                    "rotation":0,
                    "size":1
                }
            },
            "x":-417.438363739129,
            "y":646.7402827420082

        }

        ,function(response){

        r('saved',response);

    });




</script>