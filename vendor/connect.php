<?php

    $connect = mysqli_connect('localhost', 'root', 'root', 'formula-taste');

    if(!$connect){
        die('Error connect to DataBase');
    }
