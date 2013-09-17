<?php 
error_reporting(0);
echo "Languages you selected: <br>";
echo htmlspecialchars(implode(array_keys($_POST), ', ')); ?>

