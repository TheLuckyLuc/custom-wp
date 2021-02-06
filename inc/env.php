<?php

function brace_get_current_env() {

	if (!file_exists(get_template_directory() . '/.current-env')) {
		return;
	}

	$file_contents = trim(file_get_contents(get_template_directory() . '/.current-env'));
	return $file_contents;
}
