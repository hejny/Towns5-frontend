<?php
/**
 * @author ©Towns.cz
 * @fileOverview Prototypes for Frontend without API
 */
//======================================================================================================================

header('Content-Type: application/javascript');


$files=
    array_merge(
        glob(__DIR__.'/../../towns-shared/objects/*/*.js'),
        glob(__DIR__.'/../../towns-shared/objects/*/*/*.js')
    );


?>

var objects = [];
var module = {};


<?php


foreach($files as $file){

    $contents = file_get_contents($file);

    echo($contents);

    ?>


    if(module.exports instanceof Array){

        module.exports.forEach(function(object){

        objects.push(object);

        });

    }else
    if(module.exports instanceof Object){

        objects.push(module.exports);

    }else{

        throw new Error('Error in module exports in file <?=basename($file)?>');

    }

    <?php

}

?>
