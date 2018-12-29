<?php


$postdata = file_get_contents("php://input");
$_POST = json_decode($postdata, true);

$store_name = $_POST['store_name'];
$category = $_POST['category'];
$amount = $_POST['amount'];
$date = $_POST['date'];



$query = "INSERT INTO receipts (store_name, category, amount, date) VALUES ('$store_name', '$category', '$amount','$date')";


if (mysqli_query($conn, $query)){
$output['success'] = true;
} else {
$output['message'] = 'No Error';
}

?>