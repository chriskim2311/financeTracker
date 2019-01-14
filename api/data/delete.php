<?php
if(empty($LOCAL_ACCESS)){
    die('Direct access not allowed');
}
if(empty($_POST['ID'])){
    $output['errors'][] = "Deletion failed";
}
$output = [
    'success' => false,
    'errors' => [],
];
$ID = $_POST['ID'];
$query = "DELETE FROM `receipts` WHERE `ID` = '$ID' ";

$result = mysqli_query($conn,$query);

if(empty($result)){
    $output['errors'][] = 'Database Error';
}else {
    if(mysqli_affected_rows($conn) ===1){
        $output["success"] = true;
    }else {
        $output["errors"] = 'Unable to delete item';
    }
}
?>