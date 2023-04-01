<?php
// PLACE THIS FILE IN YOUR HTDOCS
//header("Access-Control-Allow-Origin: http://localhost:3000");
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
else{
    //print("Connected fine");
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
	$email = $data['email'];
	$conPass = $data['conPass'];

	$hashed_password = password_hash($password, PASSWORD_DEFAULT);

	if ($username === "" | $password === "" | $email === "" | $conPass === "") {
		echo "Missing Information";
		return;
	} else if ($password != $conPass) {
		echo "Password Mismatch";
		return;
	} else if (!preg_match('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*(_|[^\w])).{8,16}$/', $password)) {
		echo "Password Too Weak";
		return;
	}
	

	$sql = "SELECT * FROM Users WHERE Username = '".$username."'";
	$res = $conn->query($sql);
	$emailsql = "SELECT * FROM Users WHERE Email = '".$email."'";
	$emailres = $conn->query($emailsql);
    if ($res->num_rows > 0) {
		//can't register since username taken
		echo "Username already taken";
	}else if ($emailres->num_rows > 0) {
		echo "Email already taken";
	} else {
		//insert into db
		
		$sql = "INSERT INTO Users (Username, Password, Email) VALUES (?,?,?)";
		$stsm = $conn->prepare($sql);
		$stsm->bind_param("sss", $username, $hashed_password, $email);
		$stsm->execute();

		$message = "Inserted into DB";
		echo $message;
	}
	
}
    ?>