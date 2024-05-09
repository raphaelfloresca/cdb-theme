<?php

require_once __DIR__ . '/../../lib/utils.php';

print_r($attributes);
print_r($content);

echo render_my_block('accordion', $attributes, $content);
