<?php
$servername = "localhost";
$username = "root";
$password = "stingray4231";
$database_name = "finance_tracker";
// $port = "8888";
// Create connection
$conn = new mysqli($servername, $username, $password, $database_name);
// Check connection
if (empty($conn)) {
    print(" No Connection");
    exit();
} 

?>