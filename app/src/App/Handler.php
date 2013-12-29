<?php

namespace App;

use Pesto\View\View as View;
use Pesto\Handling\Response as Response;
use Pesto\Http\Request as Request;
use Pesto\Util\Registry as Registry;

class Handler extends \Pesto\Handling\Controller {

	// Response and dispatching

	protected $layouts = [];
	protected $addToLayoutsVars = [];
	protected $currentView;

	public function getView($template, $contentType = null, $charset = null) {
		return $this->currentView = new View(__dir__ ."/../../views/".$template.".phtml", $contentType, $charset);
	}

	public function createResponse($content = null, $mimetype = null) {
		if (!empty($this->layouts)) {
			array_reverse($this->layouts);
			foreach ($this->layouts as $layout) {
				$layout = new View(__dir__."/../../views/".$layout.".phtml");
				$this->addToLayoutsVars["content"] = $content;
				$content = $layout->assign($this->addToLayoutsVars)->render();
			}
		}
		$response = new Response();
		$response->setContent($content);
		if ($mimetype) {
			$response->setContentType($mimetype);
		}
		return $response;
	}

	protected function addToLayout(array $arr) {
		$this->addToLayoutsVars = array_merge($this->addToLayoutsVars,$arr);
		return $this;
	}

	public function redirect($route, array $arguments = array(), $language = null) {
		if ($route == $this->getRouter()->getCurrent()) {
			$arguments = array_merge($this->getRequest()->getArguments(), $arguments);
		}
		return $this->createResponse()->redirect(
			$this->getRouter()->generate(
				$route,
				$arguments,
				$language ?: $this->getLanguage()
			)
		);
	}

	public function forward($route, $arguments = array(), $language = null) {
		if ($route == $this->getRouter()->getCurrent()) {
			$arguments = array_merge($this->getRequest()->getArguments(), $arguments);
		}
		return $this->getDispatcher()->forward(
			clone $this->getRequest(),
			$route,
			$arguments,
			$language ?: $this->getLanguage()
		);
	}
}
