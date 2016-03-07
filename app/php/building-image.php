<?php
/**
 * @author ©Towns.cz
 * @fileOverview Functions for file operations
 */
//======================================================================================================================



require_once('files.lib.php');
require_once('graphic.lib.php');
require_once('init.php');



$hash=$_GET['hash'];
$rotation=$_GET['rotation'];
$method=strtoupper($_SERVER['REQUEST_METHOD']);

$file=files\cacheFile(array($hash,$rotation),'png','building');


if($method=='GET'){
    //----------------------------------------------------------------GET

    if(file_exists($file)){

        //header("Cache-Control: max-age=2592000");

        if(isset($_GET['image'])){

            header('Content-Type: image/png');
            readfile($file);

        }else{

            header('Content-Type: application/json');
            echo(json_encode(array('success'=> 'file exists')));
        }


    }else{

        header("HTTP/1.0 404 Not Found");
        header('Content-Type: application/json');
        echo(json_encode(array('error'=> 'no file')));

    }

    //move_uploaded_file()

    //----------------------------------------------------------------
}elseif($method=='POST'){
    //----------------------------------------------------------------POST

    if(!file_exists($file)){

        $begining='data:image/png;base64,';
        if(strpos($_POST['content'],$begining)===0){

            $content=substr($_POST['content'],strlen($begining));
            $content=base64_decode($content);

            file_put_contents($file,$content);
            chmod($file,0777);

            header('Content-Type: application/json');
            echo(json_encode(array('success'=> 'file created')));

        }else{

            header('Content-Type: application/json');
            echo(json_encode(array('error'=> 'wrong format')));

        }


    }else{
        header('Content-Type: application/json');
        echo(json_encode(array('error'=> 'file already exists')));
    }



    //----------------------------------------------------------------
}

