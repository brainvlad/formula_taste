<?php

    require_once 'connect.php';
    $query = 'SELECT * FROM `goods`';
    $result = mysqli_query($connect, $query);

    $goods = array();
        while ($row = $result->fetch_object()) {
        $goods[] = $row;
    }

    // header('Content-Type: application/json');
    if($goods) {
        echo json_encode($goods);
    } else {
        echo json_encode('false');
    }
