<?php

namespace AppInstaller;

use AppInstaller\AppConfig;

abstract class Module {

	public function __construct(AppConfig $appConfig, $appConfigKey = null) {
	}

	abstract public function execute(array $changeSet, $path);
}
