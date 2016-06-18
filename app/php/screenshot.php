<?php



require_once(__DIR__.'/files.lib.php');
require_once(__DIR__.'/graphic.lib.php');
require_once(__DIR__.'/init.php');


//header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Headers: *");


$method = strtoupper($_SERVER['REQUEST_METHOD']);


//----------------------------------------------------------------------------------------------------------------------



if(!isset($_GET['x']) || !isset($_GET['y'])){

    http_response_code(400);//Bad Request
    die('x,y not defined');

}



$x = intval($_GET['x']);
$y = intval($_GET['y']);
$cachefile = files\mapFile($x,$y,'png');;





if($method == 'OPTIONS'){

    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");


}elseif($method=='GET'){


    if(file_exists($cachefile)){


        header("Cache-Control: max-age=".(3600*24*100));
        header('Content-Type: image/png');
        readfile($cachefile);


    }else{

        http_response_code(404);//Not found
        echo('not found');

    }



}elseif($method=='POST') {



    if($_FILES["screenshot"]["type"]!=='image/png'){

        http_response_code(400);//Bad Request
        echo('wrong filetype');

    }else {

        move_uploaded_file($_FILES["screenshot"]["tmp_name"], $cachefile);
        echo('file uploaded');

    }


}else{

    http_response_code(400);//Bad Request

}



