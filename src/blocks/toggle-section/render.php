<?php

require_once __DIR__ . '/../../lib/utils.php';

if (!is_admin()) {
  wp_enqueue_script('toggle_section_frontend', __DIR__ . '/view.js', array('wp-element'), '1.0', true);
}

echo render_my_block('toggle-section', $attributes, $content);
