<?php

$vendorPath = __dir__ .'/../vendor';

require $vendorPath.'/Pesto/src/Pesto/Util/Autoloader.php';

$loader = new Pesto\Util\Autoloader();

$loader->addNamespace( 'Pesto',            $vendorPath.'/pesto/src'   );
$loader->addNamespace( 'App',              __dir__ .'/src' );

$loader->addCustom( ':^MobileDetect:', $vendorPath.'/mobiledetect'         );
$loader->register();
