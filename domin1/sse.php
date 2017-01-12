<?php
header('Content-Type: text/event-stream');  //类型为事件流
header('Cache-Control: no-cache');
//echo "event:test\n\n";  //特定事件,类似命名空间的作用，客户端可以这样监听事件 ： addEventListner('test',function(){})
$arr = ['name' => 'tcl' , 'age' => 25, 'state' => 1];
//echo "data:服务器端当前时间:".date('Y/m/d H:i:s')."\n\n";  // 数据格式必须为 data: str 这种格式
echo "data:".json_encode($arr)."\n\n";  // 数据格式必须为 data: str 这种格式
sleep(3);  //延缓5秒执行
//echo 'retry : 5000\n\n' ; 
flush();
?>
