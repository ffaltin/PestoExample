<?php
	
	use Pesto\Routing\Route as Route;

	require __DIR__.'/autoload.php';

	// declare applciation and all configurations
	$Application = new App\Application();
	$Application
		->defineDatabases(__dir__."/config/local/databases.ini") 
		->addRouter([
			"index/hello" => new Route("Index.hello",['en'=>'/en/:person','fr'=>'/fr/:person','nl'=>'/nl/:person'],["id"=>"[0-9]+"])
		])
	;
	// Start application
	$Application->run();
	