<?php
    include("./config.php");

    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "select * from user where username='$username' and password='$password'";

    //查询的结果是资源类型
    $res = mysql_query($sql);

    //取行数来判断
    $row = mysql_num_rows($res);

    if($row>0){
        echo json_encode(array(
            "res_code" => 1,
            "res_message" => "登录成功"
        ));
    }else{
        echo json_encode(array(
            "res_code" => 0,
            "res_message" => "用户名或密码错误,请重新登录"
        ));
    }
?>