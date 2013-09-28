<?php

	define ('PATH_APP', __dir__);

	function s() {
		if (func_num_args() > 0) {
			$args = func_get_args();
			call_user_func_array('var_dump', $args);
		}
		die;
	}
	
	require __DIR__.'/autoload.php';
	
	$Application = new Pesto\Application();
	$Application
		->defineDatabase(new Pesto\Storage\Database("ffaltin","ff","www_testcom"))
		->setConfig([
			"pathApp" => __DIR__,
			"baseLayoutName" => "base",
		])
	;
	// fast way
	$Application->match('/', function() use ($Application){
		$view = $Application->createView("public/hello")
			->assign([
				"hello"=>"Hello ds world",
			])
			->render()
		;
		
		// If you want to use layout
		return $Application->getLayout()->assign([
			"content"=>$view,
			"title" => "Hello",
			"hello" => "Mondieu",
		]);
	});

	// controllers way
	$Application->match("/test/(\d+)", "index.hello");
	// Mount routes
	$Application->mount("/hello",function() use ($Application) {
		$Application->get("/Jhon",function() use ($Application) {
			print $Application->createView("public/hello")
				->assign([
					"hello"=>"Hello het",
				])
				->render()
			;
		});
		$Application->get("/het",function() use ($Application) {
			print $Application->createView("public/hello")
				->assign([
					"hello"=>"Hello het",
				])
				->render()
			;
		});
		
		$Application->get("/([a-z0-9]+)",function($name) use ($Application) {
			print $Application->createView("public/hello")
				->assign([
					"hello"=>$name,
				])
				->render()
			;
		});
	});
	
	$Application->run();
	