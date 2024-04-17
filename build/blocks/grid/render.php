<?php
// Calculate the number of columns and store the result in a variable
$numberOfColumns = $attributes['numberOfColumns'];
?>

<!-- Now the HTML is cleaner with embedded PHP only where necessary -->
<div class="grid grid-cols-none md:grid-cols-<?php echo $numberOfColumns; ?> gap-4">
  <?php echo $content; ?>
</div>
