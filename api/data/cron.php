<?php
$query = "DELETE * FROM `receipts`";

$result = mysqli_query($conn,$query);




$store_name = $_POST['store_name'];
$category = $_POST['category'];
$amount = $_POST['amount'];
$date = $_POST['date'];

$dataArray = [
    [
        "store_name" => "Apple",
        "category" => "Electronics",
        "amount" => "2499.99",
        "date" => "2019-01-14"
    ],
    [
        "store_name" => "Macys",
        "category" => "Clothing",
        "amount" => "15.98",
        "date" => "2019-01-14"

    ],
    [
        "store_name" => "Target",
        "category" => "Groceries",
        "amount" => "42.43",
        "date" => "2019-01-14"
    ],
    [
        "store_name" => "Ikea",
        "category" => "Home",
        "amount" => "24.91",
        "date" => "2019-01-14"
    ],
    [
        "store_name" => "Trader Joes",
        "category" => "Groceries",
        "amount" => "24.91",
        "date" => "2019-01-14"
    ],
    [
        "store_name" => "Yard House",
        "category" => "Food",
        "amount" => "58.00",
        "date" => "2019-01-14"
    ]
    ];

for($i = 0; $i < sizeof($dataArray); $i++ ) {
$store_name = $dataArray[$i]['store_name'];
$category = $dataArray[$i]['category'];
$amount = $dataArray[$i]['amount'];
$date = $dataArray[$i]['date'];

$query = "INSERT INTO receipts (store_name, category, amount, date) VALUES ('$store_name', '$category', '$amount','$date')";
$output['query']=  $query;

if (mysqli_query($conn, $query)){
   
$output['success'] = true;
} else {
$output['message'] = 'No Error';
}
}
?>