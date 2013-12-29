#!/usr/bin/php
<?php

if (! version_compare(phpversion(), '5.3', '>=')) {
	die("This installer requires at least PHP 5.3\n");
}

if (php_sapi_name() !== 'cli') {
	die("This installer must be run in CLI mode\n");
}

set_exception_handler(function(Exception $e) {
	die(
		"\n\nError:\n\n".
		$e->getMessage()."\n"
	);
});

$root = __DIR__.'/../..';
require "{$root}/vendor/pesto/src/Pesto/Util/Autoloader.php";
$loader = new Pesto\Util\Autoloader();
$loader->addNamespace('AppInstaller', __DIR__.'/src');
$loader->register();

$shell = new AppInstaller\Shell();
if (! is_file($file = "{$root}/app/config/local/databases.ini")) {
	$shell->error("Missing configuration file: {$file}");
}
$config    = parse_ini_file("{$root}/app/config/local/databases.ini", true);
$appConfig = new AppInstaller\AppConfig($shell, $config);
$installer = new AppInstaller\Installer($shell, array(
	'postgres' => new AppInstaller\Module\PostgresModule($appConfig, 'main'),
	'mysql' => new AppInstaller\Module\MysqlModule($appConfig, 'mysql'),
	'mongo'    => new AppInstaller\Module\MongoModule($appConfig, 'content'),
));

$revisions = $_SERVER['argv'];
array_shift($revisions);

$installer->run(__DIR__.'/rev', $revisions);
