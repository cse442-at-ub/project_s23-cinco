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

    //in case a user's session has expired
    if(!isset($_COOKIE["session"])){
        echo "invalid session";
        return;
    }

    //$data = json_decode(file_get_contents('php://input'), true);
    
    $post_id = $_POST['post_id'];
    // $user_id = $data["user_id"];
    // $username = $data["username"];
    $comment = $_POST["comment"];
    $date = $_POST["date"];
    $date = intdiv($date, 1000);
    $date = $date - 14400;
    $date = date("Y-m-d H:i:s", $date);

    $session_id = $_COOKIE["session"];

    $sql = "SELECT Username, user_id FROM Sessions JOIN Users USING (user_id) WHERE session_id = (?) LIMIT 1";
    $stsm = $conn->prepare($sql);
    $stsm->bind_param("s", $session_id);
    $stsm->execute();
    $stsm->bind_result($username, $user_id);
    $stsm->fetch();
    $stsm->close(); //need this to do another query
    

    
    $sql = "INSERT INTO Comments (post_id, user_id, username, comment, date) VALUES (?, ?, ?, ?, ?)";
    //find all comments for specific post
    $stsm = $conn->prepare($sql);
    $stsm->bind_param("iisss", $post_id, $user_id, $username, $comment, $date);
    $stsm->execute();
    //echo $post_id, $user_id, $username, $comment, $date;
    // $stsm->store_result();
    // $stsm->bind_result($poster, $title, $type, $location, $description, $thumbnail, $images);
    
    // $stsm->close(); //need this to do another query

	// $resultSet = $stsm->get_result();
	// $data = $resultSet->fetch_all(MYSQLI_ASSOC);
	// echo json_encode($data);
    return;

    
}


?>