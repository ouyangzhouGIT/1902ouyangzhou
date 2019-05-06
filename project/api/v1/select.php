<?php
    include("./config.php");

    $pageIndex = $_GET['pageIndex'];
    $count = $_GET['count'];

    $sqlAll = "select * from shop";
    $serAll = mysql_query($sqlAll);
    $row = mysql_num_rows($serAll);
    $pageCount = ceil($row / $count);

    if($pageIndex > $pageCount){
        $revisePage = $pageIndex = $pageCount;
    }

    $stant = ($pageIndex - 1) * $count;
    $sql = "select * from shop limit $stant,$count ";
    // echo $sql;
    $ser = mysql_query($sql);

    $shop = array();

    while($row = mysql_fetch_assoc($ser)){
        array_push($shop, $row);
    }
    
    
    $json = array( 
        "res_code" => 1,
        "res_message" => "查询成功",
        "revisePage" => $revisePage,
        "res_body" => array(
            "data" => $shop,
            "pageCount" => $pageCount
        )
    );

    echo json_encode($json);

    mysql_close();
?>