<?php

$store_name = $_POST['store_name'];
$category = $_POST['category'];
$amount = $_POST['amount'];
$date = $_POST['date'];



$query = "INSERT INTO receipts (store_name, category, amount, date) VALUES ('$store_name', '$category', '$amount','$date')";
$output['query']=  $query;

if (mysqli_query($conn, $query)){
   
$output['success'] = true;
} else {
$output['message'] = 'No Error';
}

?>