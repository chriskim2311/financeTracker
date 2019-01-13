<?php

if(empty($_POST['store_name']) || empty($_POST['category']) || empty($_POST['amount']) || empty($_POST['date']) || empty($_POST["id"])) {
    $output["errors"] = "Edit Failed";
  }

$store_name = $_POST['store_name'];
$category = $_POST['category'];
$amount = $_POST['amount'];
$date = $_POST['date'];
$id = $_POST['id'];


$query = "UPDATE receipts (store_name, category, amount, date, id) VALUES ('$store_name', '$category', '$amount','$date', '$id')";


$output = [
    'success' => false,
    'errors' => [],
];
$result = mysqli_query($conn, $query);


if(!empty($result)){
    if(mysqli_affected_rows($conn)){
        $output['success'] = true;
    }else {
        $output['errors'][] = 'Unable to update receipt';
    }
} else {
    $output['errors'][] = "Invalid query";
}



?>