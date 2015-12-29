<?php
/**
 * @author ©Towns.cz
 * @fileOverview Convert ne-on localization to JSON
 */
//======================================================================================================================


require __DIR__ . '/neon/neon.php';



$LANGUAGE=$_GET['LANGUAGE'];
$file=__DIR__ ."/../locale/$LANGUAGE.neon";

if(file_exists($file)){


    $content=file_get_contents($file);
    $array=Nette\Neon\Neon::decode($content);
    $json=json_encode($array);


    header('Content-Type: text/javascript');
    echo("var MESSAGES=$json;");

}


