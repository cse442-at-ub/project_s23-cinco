<?php
// PLACE THIS FILE IN YOUR HTDOCS
header("Access-Control-Allow-Origin: http://localhost:3000");
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
else{
    //print("Connected fine");
}

//returns false on error. returns array of results if successful. could be empty array 
$result = mysqli_query($conn, "SELECT * FROM Users");

if(!$result){
    die(mysqli_error($conn));
}

//checks the number of results returned
if (mysqli_num_rows($result) > 0) {
    
    //gets each result returned. each result referred to as a "row"
    while($rowData = mysqli_fetch_array($result)){
            //print($rowData["Username"]); //print the particular field value
    }
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	header('HTTP/1.1 200 OK');
	exit();
}

//Upon receiving a POST request from axios
if (isset($_POST)) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = $data['username'];
    $password = $data['password'];

	// print($username);
    // print($password);

	$sql = "SELECT * FROM `Users` WHERE `Username` = '".$username."' AND `Password` = '".$password."' ";
	$res = $conn->query($sql);
    if ($res->num_rows > 0) {
		//send results
		// echo '<pre>'; print_r($result); echo '</pre>';
		// while($row = mysqli_fetch_array($res)){							IF YOU WANT TO GET THE OUTPUT FROM $RESULT ARRAY
		// 	// Assuming DB's default fetchmode is DB_FETCHMODE_ORDERED
		// 	echo $row[0] . "\n";
		// }
		echo "Good to go";
	} else {
		//send error Wrong username or password
		$message = "Wrong username or password";
		echo $message;
	}
	
}
    ?>