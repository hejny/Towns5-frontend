<?php



require_once(__DIR__.'/files.lib.php');
require_once(__DIR__.'/graphic.lib.php');
require_once(__DIR__.'/init.php');


//header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Headers: *");

$size = '10M';
ini_set('post_max_size', $size);
ini_set('upload_max_filesize', $size);

$method = strtoupper($_SERVER['REQUEST_METHOD']);


//----------------------------------------------------------------------------------------------------------------------



if(!isset($_GET['x']) || !isset($_GET['y'])){

    http_response_code(400);//Bad Request
    die('x,y not defined');

}



$x = intval($_GET['x']);
$y = intval($_GET['y']);
$cachefile = files\mapFile($x,$y,'jpg');





if($method == 'OPTIONS'){

    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");


}elseif($method=='GET'){


    header("Cache-Control: max-age=".(3600*24*100));
    header('Content-Type: image/jpeg');


    if(file_exists($cachefile)){

        readfile($cachefile);


    }else{

        $files = glob(str_replace(basename($cachefile),'*.png',$cachefile));
        //echo($files);
        $randfile = $files[0];

        readfile($randfile);
        //http_response_code(404);//Not found
        //echo('not found');

    }



}elseif($method=='POST') {



    if($_FILES["screenshot"]["type"]!=='image/jpeg'){

        http_response_code(400);//Bad Request
        echo('wrong filetype '.$_FILES["screenshot"]["type"].' ');

        print_r($_FILES);

    }else {

        move_uploaded_file($_FILES["screenshot"]["tmp_name"], $cachefile);
        echo('file uploaded');

    }


}else{

    http_response_code(400);//Bad Request

}



