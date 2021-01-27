<?php

if ( ! function_exists( 'custom_scripts' ) ) {

	function custom_scripts() {
		$the_theme     = wp_get_theme();
		$theme_version = $the_theme->get( 'Version' );
		$current_env = brace_get_current_env();

		if ($current_env === 'production' && file_exists(get_template_directory() . '/dist/css/main.css')) {
			$css_version = $theme_version . '.' . filemtime(get_template_directory() . '/dist/css/main.css');
			wp_enqueue_style( 'custom-styles', get_template_directory_uri() . '/dist/css/main.css', array(), $css_version );
		}

		if ($current_env === 'production' && file_exists(get_template_directory() . '/dist/js/bundle.js')) {
			$js_version = $theme_version . '.' . filemtime(get_template_directory() . '/dist/js/bundle.js');
			wp_enqueue_script( 'custom-scripts', get_template_directory_uri() . '/dist/js/bundle.js', array(), $js_version, true );
		}

		if ($current_env === 'development') {
			wp_enqueue_script( 'custom-scripts', 'http://localhost:3000/js/bundle.js', array(), false, true );
		}
	}
}

add_action( 'wp_enqueue_scripts', 'custom_scripts' );
