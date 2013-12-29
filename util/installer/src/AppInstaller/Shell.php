<?php

namespace AppInstaller;

class Shell {

	protected $in;
	protected $out;
	protected $err;

	public function __construct($in = STDIN, $out = STDOUT, $err = STDERR) {
		$this->in = $in;
		$this->out = $out;
		$this->err = $err;
	}

	public function write($message, $ln = true) {
		if ($ln) $message .= "\n";
		fputs($this->out, $message);
	}

	public function error($message, $code = 1) {
		fputs($this->err, "{$message}\n");
		exit($code);
	}

	public function read($label) {
		fputs($this->out, "{$label}> ");
		return trim(fgets($this->in));
	}
}
