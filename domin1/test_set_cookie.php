<?php



header("Access-Control-Allow-Origin: http://localhost");  //要支持跨域的话,就要设置这个头信息
header("Access-Control-Allow-Credentials: true");


echo $_COOKIE['name'];

//if(isset($_COOKIE['name']))
//{
//    echo $_COOKIE['name'];
//}
//else
//{
//    setcookie('name','tcl');
//    echo '未设置';
//}



//if(isset($_COOKIE['age']))
//{
//    echo '已登录';
//}
//else
//{
//    setcookie('age',26,time()+1600);
//}
