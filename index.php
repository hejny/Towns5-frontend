<?php
/**

    ██╗███╗   ██╗██████╗ ███████╗██╗  ██╗    ██╗███╗   ██╗██╗████████╗
    ██║████╗  ██║██╔══██╗██╔════╝╚██╗██╔╝    ██║████╗  ██║██║╚══██╔══╝
    ██║██╔██╗ ██║██║  ██║█████╗   ╚███╔╝     ██║██╔██╗ ██║██║   ██║
    ██║██║╚██╗██║██║  ██║██╔══╝   ██╔██╗     ██║██║╚██╗██║██║   ██║
    ██║██║ ╚████║██████╔╝███████╗██╔╝ ██╗    ██║██║ ╚████║██║   ██║
    ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝
    © Towns.cz

 * @fileOverview Initialization file
 */


//======================================================================================================================


// Config autoloader - get all files from config folder
foreach(scandir(__DIR__."/config") as $config_file)
{
    // and if the file is .json, then
    if (($offset = strlen($config_file) - strlen(".json")) >= 0 && strpos($config_file, ".json", $offset) !== FALSE)
    {
        // load it to config array
        $name = substr($config_file, 0, $offset);
        $config[$name] = json_decode(file_get_contents(__DIR__."/config/".$config_file), true);
    }
}

// load the app based on configuration environment
if(isset($config['app']['environment']) && in_array($config['app']['environment'], ["develop", "test"])){
    require('app/index.php');
} else {
    require('app-dist/index.php');
}
