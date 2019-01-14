<?php

if(empty($_POST['store_name']) || empty($_POST['category']) || empty($_POST['amount']) || empty($_POST['date'])) {
    $output["errors"] = "Edit Failed";
  }

$store_name = $_POST['store_name'];
$category = $_POST['category'];
$amount = $_POST['amount'];
$date = $_POST['date'];
$ID = $_POST['ID'];

$output = [
    'success' => false,
    'errors' => [],
];



$query = "UPDATE `receipts` SET `store_name` = '$store_name', `category` = '$category' , `amount` = '$amount' , `date` = '$date' WHERE `ID` = '$ID'  ";



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