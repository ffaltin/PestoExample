<?php

namespace AppInstaller;

use AppInstaller\Shell;
use Exception;

class AppConfig {

	protected $shell;
	protected $config;

	public function __construct(Shell $shell, array $config) {
		$this->shell  = $shell;
		$this->config = $config;
	}

	public function get($key, array $structure) {
		if (! isset($this->config[$key])) {
			throw new Exception('Invalid configuration: database '.$key.' is undefined');
		}
		$config = $this->config[$key];
		foreach ($structure as $name) {
			if (! isset($config[$name])) {
				throw new Exception("{$key}.{$name} is undefined");
			}
		}
		return (object) $config;
	}
}
