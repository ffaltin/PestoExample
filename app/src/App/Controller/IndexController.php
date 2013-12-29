<?php

	namespace App\Controller;

	class IndexController extends \App\Handler {

		protected $layouts = [
			"layouts/base"
		];

		protected $addToLayoutsVars = [
			"baseLayoutName" => "base",
			"theme" => "desktop",
			"appName" => "Pesto Application Sample",
			"language" => "en"
		];

		public function helloAction($args) {
			$this->addToLayout([
				"title" => "Hello",
				"language"=>$this->getLanguage(),
			]);
			return $this->createResponse(
				$this->getView('public/hello')
				->assign([
					'hello' => "Yop {$args->person}",
				])
				->render()
			);
		}
	}
	