<?php
// PLACE THIS FILE IN YOUR HTDOCS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials:true");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Methods: GET, OPTIONS");


header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$conn = mysqli_connect("oceanus.cse.buffalo.edu", "dchen83", "50360060", "cse442_2023_spring_team_b_db", "3306");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	header('HTTP/1.1 200 OK');
	exit();
}

$sql = "SELECT * FROM `Sessions` ORDER BY `expiration` DESC LIMIT 1";
$res = $conn->query($sql);
$row = mysqli_fetch_row($res);
$user_id = $row[0];

//Upon receiving a GET request from axios
if (isset($_GET)) {
    $sql = "SELECT * FROM `Users` WHERE `user_id` = '$user_id'";
    $res = $conn->query($sql);
    $row = mysqli_fetch_row($res);
    $fileDir = "uploads/" .$row[4];
    echo json_encode($fileDir);
}
?>