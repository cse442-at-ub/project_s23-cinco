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

    //attempts to redirect to secure site if not using https
    if(!isset($_SERVER['HTTPS'])||($_SERVER['HTTPS']!='on')){
        //header('Location: '.
        //'https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/build/login');
        echo "Missing information";
        return;
    }
        
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = $data['username'];
    $password = $data['password'];

	
	if ($username === "" | $password === "") {
		echo "Missing information";
		return;
	}

	$sql = "SELECT * FROM `Users` WHERE `Username` = '".$username."' AND `Password` = '".$password."' ";
	$res = $conn->query($sql);

    $sql = "SELECT user_id, Username, Password FROM Users WHERE Username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $uname, $pw);

	
    
	//successful login
    $stmt->fetch();
	if ($stmt->num_rows == 1 AND password_verify($password, $pw)) {
		
		//create session id for the now logged in user and store into db.
		session_start();
		
		//setting up a persistent cookie and pairing up with the database
        //persistent lasts even with browser closed until expiration
        //note that you won't see cookies when you npm run. You only see them on the built application on the server 
        //since the php file is on there
        $cookie_name = "session";
        $cookie_value = session_id(); //grab the unique identifier to be stored into database
        $expiration = time() + 86400; // 86400 seconds or 1 day
        setcookie($cookie_name, $cookie_value, $expiration, "/CSE442-542", ".cse.buffalo.edu", 1); 
        
        //getting the user id from the user datatable so we can insert into sessions datatable
        $row = mysqli_fetch_row($res); //columns accessible by 0-based index
        $userID = $row[0];

        //inserting the cookie into database
        $sess_id = $cookie_value;
        $mysql_exp = date("Y-m-d H:i:s", $expiration - 14400); // -4 hours to match with mysql time (daylight savings)
        $result = mysqli_query($conn, "INSERT INTO Sessions (user_id, session_id, expiration) VALUES ('$userID', '$sess_id', '$mysql_exp') ");

		//header('Location: https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/build/'); //redirect to home page. doesnt work?
		echo $sess_id; //return session id to react app

	} else {
		//send error Wrong username or password
		$message = "Wrong username or password";
		echo $message;
	}
	
}
    ?>