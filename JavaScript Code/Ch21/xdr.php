<?php
    header("Content-Type: text/plain");
    header("XDomainRequestAllowed: 1");
    header("Access-Control-Allow-Origin: *");
    header("Content-Length: 27");
    echo "Some data";
    flush();
    echo "Some data";
    flush();
    echo "Some data";
    flush();    
?>