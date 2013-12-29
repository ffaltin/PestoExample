<?php

namespace AppInstaller\Module;

use AppInstaller\Module;
use AppInstaller\AppConfig;
use Mongo;

class MongoModule extends Module {

	protected $db;

	public function __construct(AppConfig $appConfig, $appConfigKey) {
		$config = $appConfig->get($appConfigKey, array('type','host','name','user','pass'));
		if ($config->type !== 'mongo')
			throw new \Exception("Type must be mongo, {$config->type} given");
		$dsn = sprintf('mongodb://%s:%s@%s/%s',
			$config->user,
			$config->pass,
			$config->host,
			$config->name
		);
		$conn = new Mongo($dsn);
		$this->db = $conn->selectDB($config->name);
	}

	public function execute(array $changeSet, $path) {
		foreach ($changeSet as $operation => $args) {
			switch ($operation) {

				case 'collection':
					foreach ((array) $args as $collection)
						$this->initCollection($collection);
					break;

				default: throw new \Exception("Unknown operation: {$operation}");
			}
		}
	}

	public function initCollection($collection) {
		$this->db->dropCollection($collection);
		$this->db->createCollection($collection);
	}
}
