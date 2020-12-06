<?php

$file_includes = array(
	'/setup.php',
	'/enqueue.php',
	'/utility.php',
	'/svg.php',
);

foreach ($file_includes as $file) {
	require_once get_template_directory() . '/inc' . $file;
}
