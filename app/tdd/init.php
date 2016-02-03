
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?=$title?> TDD - towns</title>
    <script>
        var environment='debug';
    </script>


<?php

$includes = json_decode(file_get_contents(__DIR__."/../../config/includes.json"), true);

$js_files=array();

//-----------------------------------------------------

foreach ($includes['js'] as $include) {

    if(is_string($include)){
        if(
            strpos($include,'inits/')===false and
            strpos($include,'ui/')===false and
            strpos($include,'config/')===false and
            strpos($include,'plugins/')===false

        ){

            $js_files=array_merge($js_files,glob('../../'.$include));

        }
    }

}

//-----------------------------------------------------

$js_files=array_unique($js_files);


foreach($js_files as $js_file){
    echo '<script src="/' . addslashes($js_file) . '"></script>'."\n";
}

//-----------------------------------------------------
?>

</head>
<body>
