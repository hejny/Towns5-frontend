<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TDD Model</title>


    <?php

    $inits=array('prototypes.read.js');

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




<script>

    building1=TOWNS.User.object_prototypes[0];
    building2=building1.clone();
    building1.design.data.rotation=40;


    console.log(building1);
    console.log(building2);

    console.log(building1.design.data);
    console.log(building2.design.data);

    building1.design.data.compileRotationSize();
    building2.design.data.compileRotationSize();

    console.log(building1.design.data);
    console.log(building2.design.data);

    //-----------------

    /*design1=objectPrototypes[0].design.data;
    design2=deepCopy(design1);
    design1.rotation=40;


    console.log(design1);
    console.log(design2);*/


</script>

</body>
</html>