<?php

header("Access-Control-Allow-Origin: *");


$LOCAL_ACCESS = true;
$output = [
    'success' => false,
    'errors' => []
];
if(empty($_POST['action'])){
    $output[errors][] = "No action specified";
    print(json_encode($output));
    exit();
}
require_once('mysql_connect.php');

switch($_POST['action']){
    case 'read':
        include('data/read.php');
        break;
    case 'insert':
        include('data/insert.php');
        break;
    case 'update':
        include('data/update.php');
        break;
    case 'delete':
        include('data/delete.php');
        break;
    case 'cron':
        include('data/cron.php');
        break;
    default:
        $output['errors'][] = 'invalid action';
}
$json_output = json_encode($output);
print($json_output);
?>