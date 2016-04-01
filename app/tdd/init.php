
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?=$title?> TDD - towns</title>


<?php

if(!isset($inits)){
    $inits=array();
}

//--------------------------------Includes

$includes = json_decode(file_get_contents(__DIR__."/../../config/includes.json"), true);
foreach ($includes['js'] as $include) {



    if(is_array($include)){
        foreach($include as $environment=>$file){
            if('develop'==$environment){
                echo '<script src="/' . addslashes($file) . '"></script>'."\n";
            }
        }
    }elseif(is_string($include)){

        if((strpos($include,'inits/')===false and strpos($include,'ui/')===false)/**/ or in_array(basename($include),$inits)/**/)
            echo '<script src="/' . addslashes($include) . '"></script>'."\n";

    }

}
//--------------------------------

?>

</head>
<body>