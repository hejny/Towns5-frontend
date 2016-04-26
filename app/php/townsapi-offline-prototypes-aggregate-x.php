<?php
/**
 * @author ©Towns.cz
 * @fileOverview Prototypes for Frontend without API
 */
//======================================================================================================================

header('Content-Type: application/javascript');


$files=
    array_merge(
        glob(__DIR__.'/../../node_modules/towns5shared/objects/*/*/*.js')
    );


foreach($files as $file){

    $contents = file_get_contents($file);

    echo($contents);


}

?>
