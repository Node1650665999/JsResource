<?php
    header("Content-Type: text/plain");
    header("MyHeader: MyNewValue");
    
    echo "Value of MyHeader: {$_SERVER['HTTP_MYHEADER']}
User-agent: {$_SERVER['HTTP_USER_AGENT']}";


?>