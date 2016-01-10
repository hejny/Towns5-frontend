<?php

$title='map';
require('init.php');
?>

<script>



    $(document).keydown(function (e) {

        r('DOWN', e.which);


    });

    $(document).keyup(function (e) {

        r('UP', e.which);

    });


</script>