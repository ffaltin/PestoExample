<?php
	
	require __DIR__.'/autoload.php';
	
	// Controller Inside for the example
	class MarvelousController extends Pesto\Handling\Controller {
		public function indexAction() {
			// first array for view, second for the layout
			return $this->createView('public/hello',[
				'hello' => "Hello Marvelous",
			],[
				'title' => 'Inside controller way',
			]);
		}
	}
	
	// declare applciation and all configurations
	$Application = new Pesto\Application();
	$Application
		->defineDatabase(new Pesto\Storage\Database("ffaltin","ff","www_testcom","localhost","pgsql"))
		->setConfig([
			"pathApp" => __DIR__,
			"baseLayoutName" => "base",
			"themeName" => "desktop",
			"appName" => "Pesto Application Sample",
		])
	;
	// define the Inside controller and map application to it
	$marvelousController = new MarvelousController();
	$marvelousController->defineApplication($Application);
	
	// fast way
	$Application
		->match('/', function() use ($Application){
			$content = $Application->createView("public/hello")
				->assign([
					"hello"=>"Hello world",
				])
				->render()
			;
			
			// If you want to use layout
			return $Application->addToLayout([
				"content"=>$content,
				"title" => "Simple way",
			]);
		})
		// controllers way (external file)
		->match("/(\d+)", "index.hello")
		// controllers way (inside file)
		->match("/marvelous", $marvelousController->indexAction())
	// Mount routes
		->mount("/hello",function() use ($Application) {
			$Application->get("/fred",function() use ($Application) {
				// with Layout
				$view = $Application->createView("public/hello")
					->assign([
						"hello"=>"Hello fred",
					])
					->render()
				;				
				// If you want to use layout
				return $Application->addToLayout([
					"content"=>$view,
					"title" => "Mount way",
				]);
			});
			
			$Application->get("/([a-z0-9]+)",function($name) use ($Application) {
				// without Layout
				return new Pesto\Handling\Response($Application->createView("public/hello")
					->assign([
						"hello"=> "Hello {$name}",
					])
					->render());
			});
		})
	;
	// Start application
	$Application->run();
	