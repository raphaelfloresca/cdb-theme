<?php

/**
 * Enqueue scripts and styles.
 */
function creatordb_enqueue_scripts()
{
  // Enqueue style.css
  wp_enqueue_style('creatordb-style', get_stylesheet_uri());

  /** 
   * If your Tailwind stylesheet is separate, enqueue that too.
   * Update the path to match your project.
   **/
  wp_enqueue_style('tailwind-css', get_template_directory_uri() . '/build/index.css');
}
add_action('wp_enqueue_scripts', 'creatordb_enqueue_scripts');

function creatordb_editor_enqueue()
{
  if (is_admin()) {
    wp_enqueue_style('tailwind-css', get_template_directory_uri() . '/build/index.css');
  }
}
add_action('enqueue_block_assets', 'creatordb_editor_enqueue');

function creatordb_remove_core_patterns()
{
  remove_theme_support('core-block-patterns');
}

add_action('after_setup_theme', 'creatordb_remove_core_patterns');

#[AllowDynamicProperties]
class CDBBlock
{
  function __construct($name)
  {
    $this->name = $name;
    add_action('init', [$this, 'on_init']);
  }

  function on_init()
  {
    register_block_type(__DIR__ . "/build/blocks/{$this->name}");
  }
}

new CDBBlock('card');
new CDBBlock('grid');
new CDBBlock('toggle-section');
new CDBBlock('accordion');
