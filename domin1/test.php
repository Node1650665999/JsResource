<?php



header("Access-Control-Allow-Origin: http://localhost");  //要支持跨域的话,就要设置这个头信息
header("Access-Control-Allow-Credentials: true");
echo $_COOKIE['name'];
