
import './App.css';
//import LoginForm from './components/CreateUsers'
import React, { useState }from 'react';
import LoginForm from "./components/LoginForm"
import axios from 'axios'

function App() {
  //database details here
  
  // var adminUser = {
  //   username: NaN,
  //   password: NaN
  // }
  // const cors = require('cors');


  const[user, setUser] = useState({username: "", password: ""});
  const[error, setError] = useState("");
  const[regSuccess, setRegSuccess] = useState("");

  // const[usernameReg, setUsernameReg] = useState("");
  // const[passwordReg, setPasswirdReg] = useState("");

  //const[som, setSom] = useState({username: "", password: ""});
  


  const Login = details =>{
    console.log(details);
    setError("");
    setRegSuccess("");

    axios.post('http://localhost/login.php', {
      username: details.username,
      password: details.password
    }).then(val => {
 
    if(val.data === "Wrong username or password"){
      console.log("Wrong Username or Password");
      setError("Wrong Username or Password");
      
    } else{
      
      console.log(val.data);
      console.log("Logged in");
      setUser({
        username: details.username,
        password: details.password
      })
    
      
    }
  })
  }

  const Register = details =>{
    console.log(details);
    
    setError("");
    setRegSuccess("");
    

    axios.post('http://localhost/register.php', {
        username : details.username,
        password : details.password
      }).then(val => {

    if(val.data === "Username already taken"){
      console.log("Username already taken");
      setRegSuccess("Username already taken");
      
      
    } else{
      console.log(val.data);
      console.log("Successfully Registered");
      setRegSuccess("Successfully Registered");
    }
      
  })
  }


  
  const Logout = () => {
    console.log("Logout");
    setUser({
      username: "",
      password: ""
    })
    setError("");
  }
  
  
  return (
    <div className="App">
      
      {(user.username !== "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.username}</span></h2>
          <button onClick={Logout}>Logout</button>
          </div>
      
      ) : (
        <LoginForm Login={Login} Register={Register} error={error} regSuccess = {regSuccess} />
        // <LoginForm Register={Register} error={error} />

      )}
        {/* <LoginForm/> */}
        
        
    </div>
  );
}

export default App;
