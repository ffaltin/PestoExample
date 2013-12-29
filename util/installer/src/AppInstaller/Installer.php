<?php

namespace AppInstaller;

use AppInstaller\Revision;
use AppInstaller\Module;

class Installer {

	protected $shell;
	protected $modules = array();

	public function __construct(Shell $shell, array $modules = array()) {
		$this->shell = $shell;
		foreach ($modules as $name => $module) {
			$this->addModule($name, $module);
		}
	}

	public function addModule($name, Module $module) {
		$this->modules[$name] = $module;
	}

	public function install(Revision $rev) {
		$rev->install($this->modules);
	}

	public function run($directory, array $revisions = array()) {
		if (! is_dir($directory)) {
			throw new \InvalidArgumentException("Invalid directory: {$directory}");
		}

		if (! empty($revisions)) {
			$parsedRev = array();
			foreach ($revisions as $rev) {
				if (preg_match(':^(\\d+)\\.\\.(\\d+)$:', $rev, $m)) {
					$parsedRev = array_merge($parsedRev, range($m[1], $m[2], 1));
				} else {
					$parsedRev[] = $rev;
				}
			}
			$revisions = $parsedRev;
		}

		if (empty($revisions)) {
			foreach (new \DirectoryIterator($directory) as $revDir) {
				if ($revDir->isDir() && preg_match(':^\\d+$:', $revDir->getFilename())) {
					$revisions[] = $revDir->getFilename();
				}
				sort($revisions);
			}
		}

		foreach ($revisions as $revId) {
			$rev = new Revision("{$directory}/{$revId}");
			$this->shell->write("Installing #{$revId}: {$rev->getDescription()}...", false);
			$this->install($rev);
			$this->shell->write('done.');
		}
	}
}
