<?php

/*
 * jsonp 跨域请求
 * */
$data = ['name' => 'tcl', 'age' => 25];
$data = json_encode($data);
$func = $_GET['callback'];
echo "$func($data)";

?>