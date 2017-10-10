<?php



setcookie('name',$_COOKIE['name'],time ()+ 3600,'/','http://domin1.com/');
echo '<a href="http://domin1.com/test.php">'.$_COOKIE['name'].'</a>';
