import React from 'react';
import {useState , useEffect} from 'react';
import axios from 'axios';
const bcrypt = require('bcryptjs');

const UserRegister = () => {

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    

    const handleSubmit = (e) => {
        e.preventDefault()


        setUserName("");
        setEmail("");
        setPassword("");
    } // end of handle submit

    const sendData = () => { 

        let validData = true;
        if(username.length <  4){
            validData = false;
            alert("Username must have at least 4 characters");
        }

        if(password.length <  4){
            validData = false;
            alert("Password must have at least 4 characters");
        }

        if(email.length <  5){
            validData = false;
            alert("Invalid email");
        }

        if(validData){
            const hashedPassword = bcrypt.hashSync(password, 10);
            axios.post(
            "http://localhost:6005/register?username=" + String(username) 
                                                    + "&email=" + String(email)
                                                    + "&password=" + String(hashedPassword)  
            ).then( response => {
               console.log(response) 
            }      
            )
        }
        setUserName("");
        setEmail("");
        setPassword("");
    }

/* 
"http://localhost:6003/register?username=" + String(username) 
                                                    + "&email=" + String(email)
                                                    + "&password=" + String(password);
*/

    return (
        <div>
            <form className="form-admin" onSubmit={handleSubmit}>
                <label className="label-admin" htmlFor="username">UserName</label>
                <input 
                    className="input-admin" 
                    type="text" 
                    placeholder="type any characters max 50 ..."
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label className="label-admin" htmlFor="email">Email</label>
                <input  
                    className="input-admin" 
                    type="email" 
                    placeholder="Enter email address..."
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="label-admin" htmlFor="password">Password</label>
                <input  
                    className="input-admin" 
                    type="password"
                    placeholder="password here ..."
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button 
                    className="submitBtn" 
                    type="submit" 
                    onClick={sendData}
                    >Submit
                </button>
            </form>
           
        </div>
    )
}

export default UserRegister
