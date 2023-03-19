import React, { useState } from 'react';

function LoginForm({Login, Register, error, regSuccess}) {
    const [details, setDetails] = useState({username: "", password: ""});
    const [regDetails, setRegDetails] = useState({username: "", password: ""});

    const loginHandler = async (e) => {
        e.preventDefault();

        Login(details);
    }
    const registerHandler = async (e) => {
        e.preventDefault();

        Register(regDetails);
    }

  return (
        <div className="form-inner">
            <h2>Login</h2>
            {(error !== "") ? (<div className="error">{error}</div> ): ""}
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" onChange={e => setDetails({...details, username: e.target.value})} value={details.username}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
            </div>
            <input type="submit" value="LOGIN" onClick= {loginHandler}/>
        
        <div className="form-inner2">
            <h2>Register</h2>
            {(regSuccess !== "") ? (<div className="regSuccess">{regSuccess}</div> ): ""}
            <div className="form-group2">
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" onChange={e => setRegDetails({...regDetails, username: e.target.value})} value={regDetails.username}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange={e => setRegDetails({...regDetails, password: e.target.value})} value={regDetails.password}/>
            </div>
            <input type="submit" value="REGISTER" onClick= {registerHandler}/>
        </div>
</div>
  )
}

export default LoginForm