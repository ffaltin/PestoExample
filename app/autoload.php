<?php

// helper
function s() {
	if (func_num_args() > 0) {
		$args = func_get_args();
		call_user_func_array('var_dump', $args);
	}
	die;
}

$vendorPath = __dir__ .'/../vendor';

require $vendorPath.'/Pesto/src/Pesto/Util/Autoloader.php';

$loader = new Pesto\Util\Autoloader();

$loader->addNamespace( 'Pesto',            $vendorPath.'/pesto/src'   );
$loader->addNamespace( 'App',              __dir__ .'/src' );

$loader->addCustom( ':^MobileDetect:', $vendorPath.'/mobiledetect'         );
$loader->addCustom( ':^Requests:', $vendorPath.'/Requests/src'         );
$loader->register();
