
import './App.css';
//import LoginForm from './components/CreateUsers'
import React, { useState }from 'react';
import LoginForm from "./components/LoginForm"
import Axios from 'axios'
function App() {
  //database details here
  
  // var adminUser = {
  //   username: NaN,
  //   password: NaN
  // }
  
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

    async function change_value() {
      const {data} = await Axios.post('http://localhost:3001/users', {
      username: details.username,
      password: details.password
    })

      //  adminUser.username = data[0].Username;
      //  adminUser.password = data[0].Password;
      // console.log(data[0].Username);
      // console.log(data[0].Password);
      
      
      return data
  
};
  change_value().then(val => {
 
    if(val.message){
      console.log("Wrong Username or Password Please Try Again");
      setError("Wrong Username or Password Please Try Again");
      
      
    } else{
      console.log(val);
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
    

    async function change_value() {
      const {data} = await Axios.post('http://localhost:3001/register', {
        username : details.username,
        password : details.password})  
      
      return data
    
};
  change_value().then(val => {


    if(val.message){
      console.log("Username already taken");
      setRegSuccess("Username already taken");
      
      
    } else{
      console.log(val);
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
