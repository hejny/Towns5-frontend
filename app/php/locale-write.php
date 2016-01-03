<?php
/**
 * @author Towns.cz
 * @fileOverview Add key(s) to ne-on localization to JSON
 */
//======================================================================================================================

?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Locale - Towns</title>
</head>
<body>

<?php

//todo security, only in dev

require __DIR__ . '/neon/neon.php';
error_reporting(E_ALL & ~E_NOTICE);


$language=$_GET['language'];
$file=__DIR__ ."/../locale/$language.neon";

if(file_exists($file)){


    //=====================================================================



    if(isset($_POST['send'])){


        foreach($_POST as $key=>$value){

            //echo("<b>$key:</b> $value<br>");

            if(substr($key,0,9)=='MESSAGES_'){
                if($value){



                    $key=substr($key,9);

                    file_put_contents(
                        $file,
                        file_get_contents($file)."\n$key: ".Nette\Neon\Neon::encode($value)
                    );
                    //$array[$key]=$value;

                }

            }
        }

        /*print_r($array);
        $neon=Nette\Neon\Neon::encode($array);
        echo(nl2br(htmlspecialchars($neon)));*/

    }


    //-------------------------------------------------------------------



    $content=file_get_contents($file);
    $array=Nette\Neon\Neon::decode($content);
    $json=json_encode($array);





    $keys=$_GET['keys'];
    $keys=explode(',',$keys);


    echo('<form method="post">');
    echo('<table>');

    foreach($keys as $key){
        if(!isset($array[$key]))
            echo('<tr><td>'.$key.'</td><td><input type="text" name="MESSAGES_'.$key.'" value="'./*addslashes($array[$key]).*/'"></td></tr>');
    }

    echo('</table>');
    echo('<input type="hidden" name="send" value="1">');
    echo('<input type="submit" value="OK">');
    echo('</form>');


    //header('Content-Type: text/javascript');
    //echo("var MESSAGES=$json;");

    //=====================================================================

}

?>

</body>
</html>