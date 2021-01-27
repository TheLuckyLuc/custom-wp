<?php

$file_includes = array(
	'/env.php',
	'/setup.php',
	'/enqueue.php',
	'/utility.php',
);

foreach ($file_includes as $file) {
	require_once get_template_directory() . '/inc' . $file;
}
