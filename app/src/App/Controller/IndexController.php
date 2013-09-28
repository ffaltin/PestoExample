<?php

	namespace App\Controller;
	
	class IndexController extends \Pesto\Handling\Controller {
		
		public function helloAction($args) {
			$v = $this->getRepo("person")->getOneBy("name","Mon bateau");
			return $this->createView('public/hello',[
				'hello' => "Hello database person: {$v->name}",
			],[
				'title' => 'External Controller',
			]);
		}
		
	}
	