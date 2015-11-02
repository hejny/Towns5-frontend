<?php
$config = json_decode(file_get_contents(__DIR__."/config/app.json"), true);

// Na zaklade konfiguracie rozhodni ktoru verziu budes spustat
if(isset($config['environment']) && in_array($config['environment'], ["develop", "test"])){
    require('app/index.php');
} else {
    require('app-dist/index.php');
}
