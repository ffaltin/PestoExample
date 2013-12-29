<?php

namespace AppInstaller\Module;

use AppInstaller\Module;
use AppInstaller\AppConfig;
use PDO;

class PostgresModule extends Module {

	protected $db;

	public function __construct(AppConfig $appConfig, $appConfigKey) {
		$config = $appConfig->get($appConfigKey, array('type','host','name','user','pass'));
		if ($config->type !== 'postgres')
			throw new \Exception("Type must be postgres, {$config->type} given");
		$dsn = "pgsql:host={$config->host};dbname={$config->name}";
		$this->db = new PDO($dsn, $config->user, $config->pass);
		$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
	}

	public function execute(array $changeSet, $path) {
		foreach ($changeSet as $operation => $args) {
			switch ($operation) {

				case 'schema':
					foreach ((array) $args as $schema)
						$this->initSchema($schema);
					break;

				case 'sql':
					foreach ((array) $args as $file)
						$this->loadSql("{$path}/sql/{$file}.sql");
					break;

				case 'sql_data':
					foreach ((array) $args as $file)
						$this->loadSql("{$path}/sql_data/{$file}.sql");
					break;

				case 'custom':
					$do = function($file, $db) {
						include $file;
					};
					foreach ((array) $args as $file)
						$do("{$path}/custom/{$file}.php", $this->db);
					break;

				default: throw new \Exception("Unknown operation: {$operation}");
			}
		}
	}

	public function initSchema($schema) {
		$this->db->exec(sprintf('drop schema if exists "%s" cascade', $schema));
		$this->db->exec(sprintf('create schema "%s"', $schema));
	}

	public function loadSql($file) {
		if (! is_file($file)) {
			throw new \InvalidArgumentException("Invalid file: {$file}");
		}
		$sql = file_get_contents($file);
		$this->db->exec($sql);
	}
}
