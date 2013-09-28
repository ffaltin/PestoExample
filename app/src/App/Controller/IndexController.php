<?php

	namespace App\Controller;
	
	class IndexController extends \Pesto\Handling\Controller {
		
		public function helloAction($args) {
			$v = $this->application->getRepository("person")->getOneBy("name","Mon bateau");
			return $this->createView('public/hello',[
				'hello' => "Mon dieu",
				'title' => "Title",
			],[
				'title' => 'Mon beau titre',
			]);
		}
		
	}
	