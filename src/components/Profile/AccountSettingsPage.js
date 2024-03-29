import '../../style/profile.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import React, {useState} from 'react'
import Axios from 'axios';
import Navbar from '../Navbar';
import SlideoutMenu from '../SlideoutMenu';

const AccountSettingsPage = () => {

    const [details, setDetails] = useState({firstname: "", lastname: "", email: "", phonenumber: "", password: ""});
    const [save, setSave]=useState(false);
    const [refreshed, setRefresh] = useState(true);
    const [validPass, setValidPass] = useState(true);

    const [showSlideout, setShowSlideout] = useState(false)
  
    function displaySlideoutMenu(){
        setShowSlideout(!showSlideout)
    }

    async function FillProfile() {
        const response = await Axios.get('https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/loadAccSettings.php');
        console.log(response);
        if(response.data)
            setDetails({...details, firstname: response.data[1], lastname: response.data[2], email: response.data[3], phonenumber: response.data[4], password: response.data[5]})
    }
    
    if(refreshed){
        setRefresh(false);
        FillProfile();
    }

    const SaveSettings = details => {
        console.log(details);
        async function updateProfile(){
            const {data} = await Axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/edit-settings.php', {
                firstname: details.firstname,
                lastname: details.lastname,
                email: details.email,
                phonenumber: details.phonenumber,
                password: details.password
        })
        console.log(data)
        if(data === "Password Too Weak"){
            setValidPass(false);
        }
        else if(data !== "Password Too Weak"){
            setValidPass(true);
        }
        return data

            };
            updateProfile();
        }

    const SaveHandler = async (e) => {
        e.preventDefault();
        SaveSettings(details);
        setSave(true);
    }

    return (
        <div className='App' style={{textAlign:'center'}}>
            <div className='navigator'>
            <div style = {{display: "flex"}}>
            <div className="App" style = {{textAlign: 'left'}}>
              <Navbar displaySlideoutMenu={displaySlideoutMenu}/>
              {showSlideout && <SlideoutMenu />}
            </div>
            </div>
            </div>
            <br></br>
            {!validPass && <div className="error">Password Too Weak</div>}
            <br></br>
            <p className='profile-text'>First Name</p>
            <br></br>
            <input id = "profile-text-box" onChange={e => setDetails({...details, firstname: e.target.value})} value={details.firstname}/>
            <br></br>
            <br></br>
            <p className='profile-text'>Last Name</p>
            <br></br>
            <input id = "profile-text-box" onChange={e => setDetails({...details, lastname: e.target.value})} value={details.lastname}/>
            <br></br>
            <br></br>
            <p className='profile-text'>Email</p>
            <br></br>
            <input id = "profile-text-box" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
            <br></br>
            <br></br>
            <p className='profile-text'>Phone Number</p>
            <br></br>
            <input  id = "profile-text-box" onChange={e => setDetails({...details, phonenumber: e.target.value})} value={details.phonenumber}/>
            <br></br>
            <br></br>
            <p className='profile-text'>Password</p>
            <br></br>
            <input type = "password" id = "profile-text-box" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
            <br></br>
            <br></br>
            <button style = {{height:30, width:300, fontFamily: "Times", borderRadius: 6}}>Change Password</button>
            <br></br>
            <br></br>
            <button style = {{backgroundColor: '#00C52B', height:40, fontFamily: "Times", borderRadius:8}} onClick = {SaveHandler}>Save Changes</button>
            <br></br>
            <br></br>
            {save && validPass && <p className='profile-text'>Changes Saved!</p>}
            <div>setSave(false)</div>
            </div>
    )
}
export default AccountSettingsPage