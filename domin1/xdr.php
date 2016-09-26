<?php
    header("Content-Type: text/plain");
    header("XDomainRequestAllowed: 1");
	header("Access-Control-Allow-Origin: *");  //要支持跨域的话,就要设置这个头信息
    header("Content-Length: 27");
    echo "Some data";
    flush();
    echo "Some data";
    flush();
    echo "Some data";
    flush();    
?>