<?php

namespace AppInstaller;

class Revision {

	protected $path;
	protected $revision;
	protected $description = null;

	public function __construct($path) {
		$file = $path.'/revision.ini';
		if (! is_dir($path) || ! is_file($file)) {
			throw new \InvalidArgumentException('Invalid revision path');
		}
		$this->path = $path;
		$this->revision = parse_ini_file($file, true);
		if (isset($this->revision['description'])) {
			$this->description = $this->revision['description'];
			unset($this->revision['description']);
		}
	}

	public function getDescription() {
		return $this->description;
	}

	public function install(array $modules = array()) {
		foreach ($this->revision as $moduleName => $changeSet) {
			if (! isset($modules[$moduleName])) {
				throw new \Exception(sprintf('Module %s is not defined', $moduleName));
			}
			$path = "{$this->path}/{$moduleName}";
			$modules[$moduleName]->execute($changeSet, $path);
		}
	}
}
