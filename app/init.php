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
	
	class MarvelousController extends Pesto\Handling\Controller {
		public function indexAction() {
			$v = $this->getRepo("person")->getOneBy("name","Mon bateau");
			return $this->createView('public/hello',[
				'hello' => "Mon dieu",
				'title' => "Title",
			],[
				'title' => 'Mon beau titre',
			]);
		}
	}
	
	$Application = new Pesto\Application();
	$Application
		->defineDatabase(new Pesto\Storage\Database("ffaltin","ff","www_testcom"))
		->setConfig([
			"pathApp" => __DIR__,
			"baseLayoutName" => "base",
			"themeName" => "desktop",
			"appName" => "Mon petit bateau rouge",
		])
	;
	
	$marvelousController = new MarvelousController();
	$marvelousController->defineApplication($Application);
	
	// fast way
	$Application
		->match('/', function() use ($Application){
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
		})
		// controllers way (external file)
		->match("/(\d+)", "index.hello")
		// controllers way (inside file)
		->match("/marvelous", $marvelousController->indexAction())
	// Mount routes
		->mount("/hello",function() use ($Application) {
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
		})
	;
	
	$Application->run();
	