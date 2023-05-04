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
if($conn -> connect_error){
    die("connection failed");
}
error_reporting(E_ALL);
ini_set('display_errors', 'on');

//Upon receiving a POST request from axios
if (isset($_POST)) {

    $data = json_decode(file_get_contents('php://input'), true);
    
    $post_id = $data;
    

    $sql = "DELETE FROM Posts WHERE post_id = (?)";
    $stsm = $conn->prepare($sql);
    $stsm->bind_param("i", $post_id);
    $stsm->execute();
    $stsm->close(); //need this to do another query

    $sql = "DELETE FROM `Post Analytics` WHERE post_id = (?)";
    $stsm = $conn->prepare($sql);
    $stsm->bind_param("i", $post_id);
    $stsm->execute();
    $stsm->close(); //need this to do another query

}


?>