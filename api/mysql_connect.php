<?php


$servername = "kim-chris.com";
$username = "chris";
$password = "bananaRacecar";
$database_name = "finance_tracker";
$port = "3306";
// Create connection
$conn = new mysqli($servername, $username, $password, $database_name,$port);
// Check connection
if (empty($conn)) {
    print(" No Connection");
    exit();
} 

?>