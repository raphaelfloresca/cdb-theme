<?php

require_once __DIR__ . '/../../lib/utils.php';

if (!is_admin()) {
  wp_enqueue_script('accordion_frontend', __DIR__ . '/view.js', array('wp-element', 'toggle_section_frontend'), '1.0', true);
}

echo render_my_block('accordion', $attributes, $content);
