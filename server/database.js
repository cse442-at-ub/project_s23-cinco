const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createPool ({
    host:"oceanus.cse.buffalo.edu",
    port:"3306",
    user:"dchen83",
    password:"50360060",
    database:"cse442_2023_spring_team_b_db",
    connectionLimit:10
})

const app = express();
app.use(express.json());
app.use(cors());

app.post('/users', function (req, res) {

    const username = req.body.username;
    const password = req.body.password;

    
    db.query("SELECT * FROM Users WHERE `Username` = ? AND `Password` = ? ", [username,password], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.send(results)
        } else {
            res.send({message: " Wrong username or password"})
        }
    // console.log(JSON.parse(JSON.stringify(results)))
    // res.send(results);
})
})

app.post('/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    
    
    db.query("SELECT * FROM Users WHERE `Username` = ? ", [username], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            //Username already exists
            res.send({message: "Username already taken"});
        } else {
            db.query("INSERT INTO Users (Username, Password) VALUES (?,?)", [username, password], (error, results) => {
                if (error){
                console.log(error);
                } else res.send(results);console.log("Inserted into DB");
        })
        }
})
   
})


app.listen(3001, () => {
    console.log('Running server');
   });

// pool.query('select * from Users', (err, result, fields) =>{
//     if (err){
//         return console.log(err);
//     }
//     console.log(result[0].Username)
//     console.log(result[0].Password)
//     return console.log(result);
// }

//}




