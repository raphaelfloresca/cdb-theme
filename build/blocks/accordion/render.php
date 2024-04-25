<?php

function render_my_block($attributes)
{
  $dataAttributes = '';
  foreach ($attributes as $key => $value) {
    if (is_array($value)) {
      // JSON encode the array and escape it for HTML attributes
      $encodedValue = htmlspecialchars(json_encode($value), ENT_QUOTES, 'UTF-8');
      $dataAttributes .= ' data-' . esc_attr($key) . '="' . $encodedValue . '"';
    } else {
      // Handle scalar values as usual
      $dataAttributes .= ' data-' . esc_attr($key) . '="' . esc_attr($value) . '"';
    }
  }
  $uuid = uniqid('block_', true);
  return "<div id='{$uuid}' class='accordion-block' {$dataAttributes}></div>";
}

echo render_my_block($attributes);
