<?php

function camel_to_kebab($input)
{
  // Split the string at each uppercase letter
  $words = preg_split('/(?=[A-Z])/', $input, -1, PREG_SPLIT_NO_EMPTY);

  // Convert the array into a lowercase string separated by hyphens
  return strtolower(implode('-', $words));
}

function render_my_block($attributes)
{
  $dataAttributes = '';
  foreach ($attributes as $key => $value) {
    if (is_array($value)) {
      // JSON encode the array and escape it for HTML attributes
      $encodedValue = htmlspecialchars(json_encode($value), ENT_QUOTES, 'UTF-8');
      $dataAttributes .= ' data-' . esc_attr(camel_to_kebab($key)) . '="' . $encodedValue . '"';
    } else {
      // Handle scalar values as usual
      $dataAttributes .= ' data-' . esc_attr(camel_to_kebab($key)) . '="' . esc_attr($value) . '"';
    }
  }
  return "<div class='accordion-block' {$dataAttributes}></div>";
}

echo render_my_block($attributes);
