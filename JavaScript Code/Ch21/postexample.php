<?php
    header("Content-Type: text/plain");   
	print_r($_POST);die;
    echo <<<EOF
Name: {$_POST['user-name']}
Email: {$_POST['user-email']}
EOF;
?>