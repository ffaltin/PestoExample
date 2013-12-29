<?php

/*
 * Copyright 2013 Frédéric Faltin <frederic.faltin@alpagastudio.be>
 *
 *  This file is part of Pesto.
 *
 *  Pesto is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Pesto is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Pesto.  If not, see <http://www.gnu.org/licenses/>.
 */

namespace App;

use Pesto\Application as ApplicationBase;

class Application extends ApplicationBase {
	private $repositories = array();
	public function __construct() {
		parent::__construct();
		$this->addService("databases", new \Pesto\Util\Registry());
	}
	
	public function defineDatabases($file) {
		$databases = (object) parse_ini_file($file,true);
		foreach ($databases as $type => $db) {
			$db = (object) $db;
			if (in_array($db->type,array("pgsql","postgres","mysql","sqlite")))
				$this->getService("databases")->set($type, new \Pesto\Storage\Database($db->user,$db->pass,$db->name,$db->host,$db->type));
			else if ($db->type == "mongo")
				$this->getService("databases")->set($type,[]);
		}
		return $this;
	}
}
