<?php
    $config = array(
        "host" => "localhost:3306",
        "username" => "root",
        "password" => "",
        "dbname" => "taobao"
    );

    mysql_connect($config["host"], $config["username"], $config["password"]);

    mysql_select_db($config["dbname"]);

    mysql_query("set charset 'utf8'");
    mysql_query("set character set 'utf8'");
?>